#!/usr/bin/env node
/**
 * Generate the Layer Reference pages (docs/03_Data Layers/<page>.mdx).
 *
 * Two independent inputs, each with its own URL in swhm.config.json:
 *   - the production STAC catalog (`catalogUrl`: files, sizes, bands, classes,
 *     renders, dates), walked from its root through `child` links to every `item`
 *   - the published data dictionary (`dataDict`: prose, labels, units,
 *     app-facing fields)
 *
 * One page per distinct `docs_link` in the dictionary. Records that share a
 * docs_link (precipitation ensembles, runoff ensembles, pollutant
 * concentrations and loads) render on one page with a per-record table.
 * Dictionary and catalog join on `assetId.toLowerCase()` === STAC item id.
 *
 * Any fetch failure throws, so a build never ships pages made from partial data.
 *
 * Usage:
 *   node scripts/gen-layers.mjs             # fetch catalog and dictionary, write pages
 *   node scripts/gen-layers.mjs --dry-run   # print what would be written
 *   SWHM_DATA_DICT=../swhm-io/published/data_dict_published.json node scripts/gen-layers.mjs
 *                                           # preview an unpublished dictionary (path or URL)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// --- inputs -------------------------------------------------------------------

export async function loadConfig(root = ROOT) {
  return JSON.parse(await fs.readFile(path.join(root, 'swhm.config.json'), 'utf8'));
}

/** GET a JSON document; throws on any non-2xx so partial data never reaches the pages. */
export async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  return res.json();
}

/** The dictionary from a URL, or from a local path (the SWHM_DATA_DICT preview override). */
export async function loadDict(source, { getJson = fetchJson, root = ROOT } = {}) {
  if (/^https?:\/\//.test(source)) return getJson(source);
  return JSON.parse(await fs.readFile(path.resolve(root, source), 'utf8'));
}

/**
 * Walk the catalog from its root: `child` links lead to catalogs/collections,
 * `item` links to items. Every href is resolved against the document it
 * appears in. Returns {rootUrl, items, itemUrls}, the last two keyed by item
 * id: the item and its URL.
 */
export async function loadCatalog(config, { getJson = fetchJson } = {}) {
  const rootUrl = config.catalogUrl;
  const items = new Map();
  const itemUrls = new Map();
  const seen = new Set();

  async function walk(url, doc) {
    if (seen.has(url)) return;
    seen.add(url);
    const links = (doc.links || []).map((l) => ({ ...l, url: new URL(l.href, url).toString() }));
    await Promise.all(
      links
        .filter((l) => l.rel === 'item')
        .map(async (l) => {
          const item = await getJson(l.url);
          items.set(item.id, item);
          itemUrls.set(item.id, l.url);
        }),
    );
    for (const l of links.filter((l) => l.rel === 'child')) await walk(l.url, await getJson(l.url));
  }

  await walk(rootUrl, await getJson(rootUrl));
  return { rootUrl, items, itemUrls };
}

// --- model --------------------------------------------------------------------

export const pageOf = (rec) => decodeURIComponent(rec.docs_link).split('/').pop();
export const itemIdOf = (rec) => rec.assetId.toLowerCase();

/** Group dictionary records into pages keyed by docs_link slug, joined to STAC items. */
export function buildPages(dict, catalog, config) {
  const pages = new Map();
  for (const [name, rec] of Object.entries(dict)) {
    if (!rec.docs_link) throw new Error(`${name}: missing docs_link`);
    if (!rec.assetId) throw new Error(`${name}: missing assetId`);
    const slug = pageOf(rec);
    const id = itemIdOf(rec);
    const item = catalog.items.get(id) || null;
    const layer = {
      name,
      rec,
      item,
      itemUrl: item ? catalog.itemUrls.get(id) : null,
      download: downloadFor(item, catalog),
      eeLink: `https://code.earthengine.google.com/?asset=${config.earthEngineAssetRoot}/${rec.assetId}`,
      catalogLink: item ? catalogEntryLink(config, catalog.itemUrls.get(id)) : null,
    };
    if (!pages.has(slug)) pages.set(slug, { slug, layers: [] });
    pages.get(slug).layers.push(layer);
  }
  return [...pages.values()];
}

/**
 * Deep link to an item in the STAC Browser, which opens in a new tab off the
 * site (Docusaurus adds target=_blank to external links). The browser owns its
 * catalog connection and resolves a hash path against its configured catalog,
 * so the link carries only the item's path relative to the catalog root's
 * folder ("#/layers/soils.json"). This assumes the site's `catalogUrl` and the
 * browser's `catalogUrl` (swhm-stac-browser config.js) are the same document.
 * Returns null when the item is not below the catalog root's folder.
 */
export function catalogEntryLink(config, itemUrl) {
  const root = config.catalogUrl;
  const folder = root.slice(0, root.lastIndexOf('/') + 1);
  if (!itemUrl.startsWith(folder)) return null;
  return `${config.stacBrowser.replace(/\/?$/, '/')}#/${itemUrl.slice(folder.length)}`;
}

export function resolveHref(href, itemUrl) {
  return new URL(href, itemUrl).toString();
}

export function formatBytes(n) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)} GB`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} MB`;
  return `${Math.round(n / 1e3)} KB`;
}

function downloadFor(item, catalog) {
  const a = item?.assets?.data;
  if (!a) return null;
  return {
    url: resolveHref(a.href, catalog.itemUrls.get(item.id)),
    size: a['file:size'] ? formatBytes(a['file:size']) : null,
    kind: 'Cloud-Optimized GeoTIFF',
    epsg: item.properties['proj:epsg'],
  };
}

// --- rendering ----------------------------------------------------------------

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const swatch = (hex) =>
  `<span style={{display:'inline-block',width:14,height:14,background:'#${hex.replace(/^#/, '')}',border:'1px solid #8884',verticalAlign:'middle',marginRight:6}} />`;

function period(rec, item) {
  if (rec.start_datetime) return `${rec.start_datetime.slice(0, 4)} to ${rec.end_datetime.slice(0, 4)}`;
  if (item?.properties?.datetime) return `released ${item.properties.datetime.slice(0, 10)}`;
  return '';
}

function band(item) {
  return item?.assets?.data?.['raster:bands']?.[0] || null;
}

function keyFacts(layer) {
  const { rec, item, download } = layer;
  const b = band(item);
  const rows = [
    ['Earth Engine asset', `\`${rec.assetId}\` ([open](${layer.eeLink}))`],
    ['Period', period(rec, item)],
    ['Units', rec.units],
    ['Data type', rec.discrete ? 'Categorical' : 'Continuous'],
    b ? ['Pixel size', `${b.spatial_resolution.toFixed(1)} m (EPSG:${item.properties['proj:epsg']})`] : null,
    b ? ['Pixel type', b.data_type] : null,
    download ? ['Download', `[${download.kind}](${download.url})${download.size ? ` (${download.size})` : ''}`] : null,
    layer.catalogLink ? ['Catalog entry', `[STAC item](${layer.catalogLink})`] : null,
  ].filter((r) => r && r[1]);
  return ['| | |', '|---|---|', ...rows.map(([k, v]) => `| **${k}** | ${esc(v)} |`)].join('\n');
}

function layerTable(page) {
  const head = '| Layer | Period | Units | Earth Engine | Download | Catalog |';
  const sep = '|---|---|---|---|---|---|';
  const rows = page.layers.map((l) => {
    const d = l.download ? `[${l.download.size || 'file'}](${l.download.url})` : '';
    const c = l.catalogLink ? `[item](${l.catalogLink})` : '';
    return `| ${esc(l.name)} | ${esc(period(l.rec, l.item))} | ${esc(l.rec.units)} | [\`${l.rec.assetId}\`](${l.eeLink}) | ${d} | ${c} |`;
  });
  return [head, sep, ...rows].join('\n');
}

function paletteSection(layer) {
  const { rec, item } = layer;
  const classes = item?.assets?.data?.['classification:classes'];
  if (rec.discrete) {
    const rows = classes?.length
      ? classes.map((c) => [c.title || c.name, c.value, c.color_hint])
      : (rec.labels || []).map((label, i) => [label, rec.values?.[i], (rec.layer?.visParams?.palette || [])[i]]);
    if (!rows.length) return '';
    return [
      '| Label | Raster value | Color |',
      '|:--|:--|:--|',
      ...rows.map(([l, v, hex]) => `| ${esc(l)} | ${esc(v)} | ${hex ? `${swatch(hex)} \`#${String(hex).replace(/^#/, '')}\`` : ''} |`),
    ].join('\n');
  }
  const render = item?.properties?.renders?.default;
  const vis = rec.layer?.visParams || {};
  const [lo, hi] = render?.rescale?.[0] || [vis.min, vis.max];
  const cmap = render?.colormap;
  let bar = '';
  if (cmap) {
    const keys = Object.keys(cmap).map(Number).sort((a, b) => a - b);
    const stops = Array.from({ length: 9 }, (_, i) => keys[Math.round((i * (keys.length - 1)) / 8)]).map((k) => {
      const [r, g, b] = cmap[k];
      return `rgb(${r},${g},${b})`;
    });
    bar = `<div style={{height:16,borderRadius:4,background:'linear-gradient(to right, ${stops.join(', ')})'}} />`;
  }
  const scale = rec.palette_scale === 'log' ? ' (log scale)' : '';
  return [
    bar,
    '',
    `Colormap \`${rec.colormap_name || 'custom'}\`${scale}, from ${lo} to ${hi} ${rec.units || ''}`.trim() + '.',
  ].join('\n');
}

function sourceSection(page) {
  const seen = new Set();
  const lines = [];
  for (const l of page.layers) {
    const provs = l.item?.properties?.providers || [{ name: l.rec.sourceName, url: l.rec.sourceUrl }];
    for (const p of provs) {
      if (!p?.name || seen.has(p.name)) continue;
      seen.add(p.name);
      const url = p.url && !/stormwaterheatmap\.dev/.test(p.url) ? p.url : null;
      lines.push(url ? `- [${p.name}](${url})` : `- ${p.name}`);
    }
  }
  return lines.join('\n');
}

function descriptions(page) {
  const texts = page.layers.map((l) => (l.rec.long_description || '').trim());
  const distinct = new Set(texts.filter(Boolean));
  if (distinct.size <= 1) return [...distinct][0] || '';
  return page.layers
    .filter((l) => l.rec.long_description)
    .map((l) => `### ${l.name}\n\n${l.rec.long_description.trim()}`)
    .join('\n\n');
}

function eeSection(page) {
  const names = page.layers.map((l) => l.name);
  const first = names[0];
  const list = names.length > 1 ? `\nThis page covers ${names.length} layers: ${names.map((n) => `"${n}"`).join(', ')}.\n` : '';
  return `The JavaScript below loads this layer in the [Earth Engine Code Editor](https://developers.google.com/earth-engine/guides/playground). An Earth Engine account is required. The "open" links above show each asset's details in the Code Editor.
${list}
\`\`\`javascript
// Import the layer data dictionary
var data = require('users/stormwaterheatmap/apps:data/public')

// To view data dictionary, print to the console:
print('Data:', data)

// Get this layer from the layer data dictionary:
var layer_name = data.rasters["${first}"]

// Add the styled layer to the map:
Map.addLayer(layer_name.layer)

// Raw image for analysis:
var raw_image = layer_name.layer.eeObject
Map.addLayer(raw_image, {}, '${first}')
\`\`\``;
}

export function renderPage(page, { hasNotes = false } = {}) {
  const first = page.layers[0];
  const grouped = page.layers.length > 1;
  const title = grouped ? titleFor(page) : first.name;
  const short = grouped ? subtitleFor(page) : first.rec.description || '';
  const parts = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(short)}`,
    `sidebar_label: ${JSON.stringify(title)}`,
    '---',
    '',
    '{/* GENERATED by scripts/gen-layers.mjs. Do not edit: change the data dictionary in swhm-io,',
    `    or docs/03_Data Layers/_notes/${page.slug}.mdx for page-specific prose, then run npm run gen:layers. */}`,
    '',
  ];
  if (hasNotes) parts.push(`import Notes from './_notes/${page.slug}.mdx';`, '');
  parts.push(`*${short}*`, '');
  parts.push(page.layers.length > 1 ? `## Layers\n\n${layerTable(page)}` : keyFacts(first), '');
  const desc = descriptions(page);
  if (desc) parts.push('## Description', '', desc, '');
  if (hasNotes) parts.push('<Notes />', '');
  parts.push('## Layer Access in Earth Engine', '', eeSection(page), '');
  const palettes = page.layers.length > 1 && !allSamePalette(page)
    ? page.layers.map((l) => `### ${l.name}\n\n${paletteSection(l)}`).join('\n\n')
    : paletteSection(first);
  if (palettes.trim()) parts.push('## Visualization', '', palettes, '');
  const src = sourceSection(page);
  if (src) parts.push('## Source', '', src, '');
  if (page.layers.some((l) => !l.item)) {
    parts.push(':::note', 'This layer is not yet in the data catalog, so it has no download link yet.', ':::', '');
  }
  return parts.join('\n');
}

/** Grouped-page title: the records' common name prefix when it is most of the
 * shortest name ("Runoff (mm)" for the runoff ensembles), else the page slug
 * ("Pollutant Concentration" for the five "Total ... Concentration" records). */
export function titleFor(page) {
  const names = page.layers.map((l) => l.name);
  const common = names.reduce((a, b) => {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return a.slice(0, i);
  });
  const trimmed = common.replace(/[\s(]+$/, '');
  const shortest = Math.min(...names.map((n) => n.length));
  if (trimmed.length >= 4 && trimmed.length >= shortest / 2) return trimmed;
  return page.slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Grouped-page subtitle: the shared one-liner if the records agree, else a list of the layers. */
export function subtitleFor(page) {
  const descs = new Set(page.layers.map((l) => (l.rec.description || '').trim()).filter(Boolean));
  if (descs.size === 1) return [...descs][0];
  return `${page.layers.length} layers: ${page.layers.map((l) => l.name).join(', ')}`;
}

function allSamePalette(page) {
  const key = (l) => JSON.stringify([l.rec.colormap_name, l.rec.layer?.visParams?.min, l.rec.layer?.visParams?.max, l.rec.labels]);
  return new Set(page.layers.map(key)).size === 1;
}

// --- main ---------------------------------------------------------------------

export async function main(argv = process.argv.slice(2)) {
  const dryRun = argv.includes('--dry-run');
  const config = await loadConfig();
  const catalog = await loadCatalog(config);
  const dictSource = process.env.SWHM_DATA_DICT || config.dataDict;
  if (!dictSource) {
    throw new Error('No data dictionary: set "dataDict" in swhm.config.json, or SWHM_DATA_DICT to a path or URL.');
  }
  const dict = await loadDict(dictSource);
  console.log(`catalog:    ${catalog.rootUrl}\ndictionary: ${dictSource}${process.env.SWHM_DATA_DICT ? ' (SWHM_DATA_DICT override)' : ''}`);
  const outDir = path.resolve(ROOT, config.layerDocsDir);
  const notesDir = path.join(outDir, '_notes');
  const pages = buildPages(dict, catalog, config);

  for (const page of pages) {
    const hasNotes = await fs.access(path.join(notesDir, `${page.slug}.mdx`)).then(() => true, () => false);
    const text = renderPage(page, { hasNotes });
    const out = path.join(outDir, `${page.slug}.mdx`);
    const missing = page.layers.filter((l) => !l.item).map((l) => l.rec.assetId);
    const note = missing.length ? `  (no STAC item: ${missing.join(', ')})` : '';
    if (dryRun) console.log(`would write ${path.relative(ROOT, out)}${note}`);
    else {
      await fs.writeFile(out, text);
      console.log(`wrote ${path.relative(ROOT, out)}${note}`);
    }
  }
  const unused = [...catalog.items.keys()].filter((id) => !Object.values(dict).some((r) => itemIdOf(r) === id));
  if (unused.length) {
    const sample = unused.slice(0, 5).join(', ');
    console.log(`catalog items with no dictionary record (skipped): ${unused.length} (${sample}${unused.length > 5 ? ', …' : ''})`);
  }
  console.log(`${pages.length} pages from ${Object.keys(dict).length} records and ${catalog.items.size} catalog items.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
