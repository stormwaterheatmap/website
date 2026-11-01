import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPages, renderPage, catalogEntryLink, resolveHref, formatBytes, pageOf, itemIdOf, titleFor, subtitleFor } from './gen-layers.mjs';

const config = {
  catalogUrl: 'https://example.org/stac/collection.json',
  stacBrowser: 'https://example.org/browser/',
  earthEngineAssetRoot: 'projects/p/assets/layers',
  legacyDownloadBase: 'https://legacy.example.org/rasters/',
  legacySizes: { Land_Cover: '2.4 GB' },
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
      href: `../image/${id}.tif?v=abc`,
      'file:size': 58010820,
      'raster:bands': [{ data_type: 'uint8', spatial_resolution: 4.78 }],
      ...extra.asset,
    },
  },
});

const catalog = {
  collectionUrl: config.catalogUrl,
  items: new Map([
    ['soils', item('soils', { asset: { 'classification:classes': [{ value: 1, title: 'Outwash', color_hint: '69995D' }] } })],
    ['runoff_mm', item('runoff_mm')],
    ['climate_ensemble_2040-2070_runoff_mm', item('climate_ensemble_2040-2070_runoff_mm', { properties: { datetime: null, start_datetime: '2040-01-01T00:00:00Z', end_datetime: '2069-12-31T23:59:59Z' } })],
  ]),
  itemUrls: new Map([
    ['soils', 'https://example.org/stac/soils.json'],
    ['runoff_mm', 'https://example.org/stac/runoff_mm.json'],
    ['climate_ensemble_2040-2070_runoff_mm', 'https://example.org/stac/climate_ensemble_2040-2070_runoff_mm.json'],
  ]),
};

test('helpers', () => {
  assert.equal(pageOf(dict.Soils), 'soils');
  assert.equal(itemIdOf(dict['Runoff (mm) GCM Ensemble 2040-2070']), 'climate_ensemble_2040-2070_runoff_mm');
  assert.equal(resolveHref('../image/soils.tif?v=1', 'https://example.org/stac/soils.json'), 'https://example.org/image/soils.tif?v=1');
  assert.equal(catalogEntryLink(config, 'https://example.org/stac/soils.json'), 'https://example.org/browser/#/external/example.org/stac/soils.json');
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
  assert.match(md, /\[STAC item\]\(https:\/\/example\.org\/browser\/#\/external\/example\.org\/stac\/soils\.json\)/);
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

test('no STAC item: legacy download, dictionary palette, note', () => {
  const page = buildPages(dict, catalog, config).find((p) => p.slug === 'land_cover');
  const md = renderPage(page);
  assert.match(md, /\[GeoTIFF \(full extent, WGS 84\)\]\(https:\/\/legacy\.example\.org\/rasters\/Land_Cover\.tif\) \(2\.4 GB\)/);
  assert.match(md, /\| Grass \| 1 \| <span style=\{\{[^}]*background:'#ffffff'/);
  assert.match(md, /:::note/);
  assert.doesNotMatch(md, /Catalog entry/);
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
