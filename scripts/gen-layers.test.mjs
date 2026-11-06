import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPages, renderPage, catalogEntryLink, resolveHref, formatBytes, pageOf, itemIdOf, titleFor, subtitleFor,
  loadCatalog, loadDict,
} from './gen-layers.mjs';

const config = {
  catalogUrl: 'https://example.org/stac/catalog.json',
  stacBrowser: 'https://example.org/browser/',
  earthEngineAssetRoot: 'projects/p/assets/layers',
};

const dict = {
  Soils: {
    assetId: 'Soils',
    discrete: true,
    labels: ['Outwash', 'Till'],
    values: [1, 2],
    units: 'Hydrologic Soil Group',
    description: 'Hydrologic Soil Group',
    docs_link: 'docs/Data%20Layers/soils',
    long_description: 'Soils prose.',
    sourceName: 'TNC',
    sourceUrl: '',
    layer: { name: 'Soils', visParams: { min: 1, max: 2, palette: ['#111111', '#222222'] } },
  },
  'Runoff (mm)': {
    assetId: 'Runoff_mm',
    discrete: false,
    units: 'mm/year',
    description: 'Mean annual runoff',
    docs_link: 'docs/Data%20Layers/runoff',
    long_description: 'Historic runoff prose.',
    colormap_name: 'ice_r',
    layer: { name: 'Runoff (mm)', visParams: { min: 25, max: 1016 } },
  },
  'Runoff (mm) GCM Ensemble 2040-2070': {
    assetId: 'Climate_Ensemble_2040-2070_Runoff_mm',
    discrete: false,
    units: 'mm/year',
    description: 'GCM runoff 2040-2070',
    start_datetime: '2040-01-01',
    end_datetime: '2069-12-31',
    docs_link: 'docs/Data%20Layers/runoff',
    long_description: 'Ensemble runoff prose.',
    colormap_name: 'ice_r',
    layer: { name: 'Runoff (mm) GCM Ensemble 2040-2070', visParams: { min: 25, max: 1016 } },
  },
  'Land Cover': {
    assetId: 'Land_Cover',
    discrete: true,
    labels: ['Grass'],
    values: [1],
    units: 'Land Cover Type',
    description: 'Land cover',
    docs_link: 'docs/Data%20Layers/land_cover',
    long_description: 'Land cover prose.',
    sourceName: 'TNC',
    layer: { name: 'Land Cover', visParams: { min: 0, max: 1, palette: ['#ffffff', '#3ead63'] } },
  },
};

const item = (id, extra = {}) => ({
  id,
  properties: {
    title: id,
    description: 'd',
    datetime: '2026-10-28T00:00:00Z',
    'proj:epsg': 3857,
    providers: [{ name: 'The Nature Conservancy', roles: ['producer'] }],
    renders: { default: { colormap: { 0: [1, 2, 3, 255], 1: [4, 5, 6, 255] }, rescale: [[25, 1016]] } },
    ...extra.properties,
  },
  assets: {
    data: {
      href: `../../image/${id}.tif?v=abc`,
      'file:size': 58010820,
      'raster:bands': [{ data_type: 'uint8', spatial_resolution: 4.78 }],
      ...extra.asset,
    },
  },
});

const catalog = {
  rootUrl: config.catalogUrl,
  items: new Map([
    ['soils', item('soils', { asset: { 'classification:classes': [{ value: 1, title: 'Outwash', color_hint: '69995D' }] } })],
    ['runoff_mm', item('runoff_mm')],
    ['climate_ensemble_2040-2070_runoff_mm', item('climate_ensemble_2040-2070_runoff_mm', { properties: { datetime: null, start_datetime: '2040-01-01T00:00:00Z', end_datetime: '2069-12-31T23:59:59Z' } })],
  ]),
  itemUrls: new Map([
    ['soils', 'https://example.org/stac/layers/soils.json'],
    ['runoff_mm', 'https://example.org/stac/layers/runoff_mm.json'],
    ['climate_ensemble_2040-2070_runoff_mm', 'https://example.org/stac/layers/climate_ensemble_2040-2070_runoff_mm.json'],
  ]),
};

test('helpers', () => {
  assert.equal(pageOf(dict.Soils), 'soils');
  assert.equal(itemIdOf(dict['Runoff (mm) GCM Ensemble 2040-2070']), 'climate_ensemble_2040-2070_runoff_mm');
  assert.equal(resolveHref('../image/soils.tif?v=1', 'https://example.org/stac/soils.json'), 'https://example.org/image/soils.tif?v=1');
  // browser-relative, from the catalog root's folder: the browser resolves the hash path against its own catalog root
  assert.equal(catalogEntryLink(config, 'https://example.org/stac/layers/soils.json'), 'https://example.org/browser/#/layers/soils.json');
  assert.equal(catalogEntryLink(config, 'https://other.org/soils.json'), null, 'item outside the catalog folder: no link');
  assert.equal(formatBytes(58010820), '58.0 MB');
  assert.equal(formatBytes(2_400_000_000), '2.4 GB');
});

test('records group into pages by docs_link and join to STAC by lowercased assetId', () => {
  const pages = buildPages(dict, catalog, config);
  const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));
  assert.deepEqual(Object.keys(bySlug).sort(), ['land_cover', 'runoff', 'soils']);
  assert.equal(bySlug.runoff.layers.length, 2);
  assert.ok(bySlug.soils.layers[0].item, 'soils joined to its item');
  assert.equal(bySlug.land_cover.layers[0].item, null, 'land cover has no item');
});

test('single categorical page: key facts, palette from classification classes, EE link keeps casing', () => {
  const page = buildPages(dict, catalog, config).find((p) => p.slug === 'soils');
  const md = renderPage(page);
  assert.match(md, /^title: "Soils"$/m);
  assert.match(md, /\*\*Download\*\* \| \[Cloud-Optimized GeoTIFF\]\(https:\/\/example\.org\/image\/soils\.tif\?v=abc\) \(58\.0 MB\)/);
  assert.match(md, /code\.earthengine\.google\.com\/\?asset=projects\/p\/assets\/layers\/Soils\)/);
  assert.match(md, /\| Outwash \| 1 \| <span style=\{\{[^}]*background:'#69995D'/);
  assert.match(md, /\[STAC item\]\(https:\/\/example\.org\/browser\/#\/layers\/soils\.json\)/);
  assert.doesNotMatch(md, /#\/external\//, 'never override the browser catalog');
  assert.doesNotMatch(md, /:::note/, 'no legacy note when the item exists');
});

test('grouped page: layer table, per-record descriptions, period from start/end dates', () => {
  const page = buildPages(dict, catalog, config).find((p) => p.slug === 'runoff');
  const md = renderPage(page);
  assert.match(md, /^title: "Runoff \(mm\)"$/m);
  assert.match(md, /^## Layers$/m);
  assert.match(md, /\| Runoff \(mm\) GCM Ensemble 2040-2070 \| 2040 to 2069 \|/);
  assert.match(md, /### Runoff \(mm\)\n\nHistoric runoff prose\./);
  assert.match(md, /### Runoff \(mm\) GCM Ensemble 2040-2070\n\nEnsemble runoff prose\./);
  assert.match(md, /linear-gradient\(to right, rgb\(1,2,3\)/);
  assert.match(md, /Colormap `ice_r`, from 25 to 1016 mm\/year\./);
});

test('no STAC item: no download, palette from the dictionary, note', () => {
  const page = buildPages(dict, catalog, config).find((p) => p.slug === 'land_cover');
  const md = renderPage(page);
  assert.doesNotMatch(md, /\*\*Download\*\*/);
  assert.match(md, /\| Grass \| 1 \| <span style=\{\{[^}]*background:'#ffffff'/);
  assert.match(md, /:::note\nThis layer is not yet in the data catalog/);
  assert.doesNotMatch(md, /Catalog entry/);
});

test('loadCatalog walks root -> child collection -> items, and fetches nothing else', async () => {
  const docs = {
    'https://example.org/stac/catalog.json': {
      links: [
        { rel: 'root', href: './catalog.json' },
        { rel: 'child', href: './layers/collection.json' },
        { rel: 'version-history', href: './releases.json' },
      ],
    },
    'https://example.org/stac/layers/collection.json': {
      links: [
        { rel: 'root', href: '../catalog.json' },
        { rel: 'parent', href: '../catalog.json' },
        { rel: 'item', href: './soils.json' },
        { rel: 'item', href: './runoff_mm.json' },
      ],
    },
    'https://example.org/stac/layers/soils.json': { id: 'soils', links: [] },
    'https://example.org/stac/layers/runoff_mm.json': { id: 'runoff_mm', links: [] },
  };
  const fetched = [];
  const getJson = async (url) => {
    fetched.push(url);
    if (!(url in docs)) throw new Error(`unexpected fetch ${url}`);
    return docs[url];
  };
  const cat = await loadCatalog(config, { getJson });
  assert.equal('dictUrl' in cat, false, 'the catalog carries no dictionary; it is a separate input');
  assert.deepEqual([...cat.items.keys()].sort(), ['runoff_mm', 'soils']);
  assert.equal(cat.itemUrls.get('soils'), 'https://example.org/stac/layers/soils.json');
  assert.equal(fetched.filter((u) => u.endsWith('catalog.json')).length, 1, 'root/parent links are not re-fetched');
  // a COG href two levels up from the item resolves to the bucket's image folder
  assert.equal(resolveHref('../../image/soils.tif', cat.itemUrls.get('soils')), 'https://example.org/image/soils.tif');
});

test('loadCatalog propagates fetch failures instead of returning partial data', async () => {
  const getJson = async (url) => {
    if (url.endsWith('catalog.json')) return { links: [{ rel: 'child', href: './layers/collection.json' }] };
    throw new Error(`GET ${url} -> HTTP 404`);
  };
  await assert.rejects(loadCatalog(config, { getJson }), /HTTP 404/);
});

test('loadDict fetches URLs and reads local paths', async () => {
  const fromUrl = await loadDict('https://example.org/config/data_dict.json', { getJson: async () => ({ A: { assetId: 'A' } }) });
  assert.deepEqual(fromUrl, { A: { assetId: 'A' } });
  const fs = await import('node:fs/promises');
  const os = await import('node:os');
  const path = await import('node:path');
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'gen-layers-'));
  await fs.writeFile(path.join(dir, 'dd.json'), JSON.stringify({ B: { assetId: 'B' } }));
  assert.deepEqual(await loadDict('dd.json', { root: dir }), { B: { assetId: 'B' } });
  await fs.rm(dir, { recursive: true });
});

test('notes partial is imported and placed after the description', () => {
  const page = buildPages(dict, catalog, config).find((p) => p.slug === 'soils');
  const md = renderPage(page, { hasNotes: true });
  assert.match(md, /^import Notes from '\.\/_notes\/soils\.mdx';$/m);
  assert.ok(md.indexOf('Soils prose.') < md.indexOf('<Notes />'));
  assert.ok(md.indexOf('<Notes />') < md.indexOf('## Layer Access in Earth Engine'));
});

test('grouped-page title and subtitle: common prefix only when it is most of the name', () => {
  const page = (names) => ({ slug: 'pollutant_concentration', layers: names.map((n) => ({ name: n, rec: { description: `Predicted ${n}` } })) });
  const pollutants = page(['Total Suspended Solids Concentration', 'Total Copper Concentration', 'Total Zinc Concentration']);
  assert.equal(titleFor(pollutants), 'Pollutant Concentration');
  assert.equal(subtitleFor(pollutants), '3 layers: Total Suspended Solids Concentration, Total Copper Concentration, Total Zinc Concentration');
  const runoff = page(['Runoff (mm)', 'Runoff (mm) GCM Ensemble 2040-2070']);
  assert.equal(titleFor(runoff), 'Runoff (mm)');
  const same = { slug: 'x', layers: [{ name: 'A', rec: { description: 'Shared' } }, { name: 'B', rec: { description: 'Shared' } }] };
  assert.equal(subtitleFor(same), 'Shared');
});

test('missing docs_link or assetId fails loudly', () => {
  assert.throws(() => buildPages({ X: { assetId: 'X' } }, catalog, config), /missing docs_link/);
  assert.throws(() => buildPages({ X: { docs_link: 'docs/x' } }, catalog, config), /missing assetId/);
});
