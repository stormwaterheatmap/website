/* eslint-disable no-console */

// ── built-ins ──────────────────────────────────────────────────────────────
const fs = require('node:fs/promises');
const path = require('node:path');

// ── third-party  ───────────────────────────────────────────────────────────
const prettier = require('prettier'); // npm i -D prettier

// ── constants ──────────────────────────────────────────────────────────────
const OUT_DIR = path.resolve('docs/API/image_layers');
// We now point to our new STAC-compliant JSON file.
const JSON_PATH = path.resolve(__dirname, '../metadata/stac-items.json');

/**
 * Loads the STAC Items from the JSON file.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of STAC Item objects.
 */
async function loadStacItems() {
  const text = await fs.readFile(JSON_PATH, 'utf8');
  // STAC collections are typically arrays of Items.
  return JSON.parse(text);
}

/**
 * Generates a Markdown table from an array of objects.
 * @param {Array<{header: string, key: string}>} columns - Column configuration.
 * @param {Array<object>} data - The data to display.
 * @returns {string} A Markdown table.
 */
function createMarkdownTable(columns, data) {
  if (!data || data.length === 0) return '';
  const header = `| ${columns.map((c) => c.header).join(' | ')} |`;
  const separator = `| ${columns.map(() => '---').join(' | ')} |`;
  const rows = data
    .map((item) => {
      const rowData = columns
        .map((c) => item[c.key] || '—')
        .join(' | ');
      return `| ${rowData} |`;
    })
    .join('\n');
  return `${header}\n${separator}\n${rows}`;
}

/**
 * Generate one MDX page for every STAC Item in the array.
 */
async function run() {
  const stacItems = await loadStacItems();
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const item of stacItems) {
    // Destructure properties from the STAC Item.
    // Note the nesting under `properties` and the new top-level fields.
    const { id, bbox, properties, assets } = item;
    const { title, description, providers } = properties;
    // We can nest our custom metadata to keep the top-level clean.
    const { units, scale, discrete, viz_type, labels } = properties.custom_metadata;

    // ---------- front-matter ----------
    // The front-matter is richer, using more STAC fields.
    const frontMatter = [
      '---',
      `id: ${id}`, // Use the STAC ID for a stable identifier.
      `title: ${title}`,
      `description: >`,
      `  ${description}`,
      `sidebar_label: ${title}`,
      // Tags can be derived from STAC properties.
      `tags: [${discrete ? 'categorical' : 'continuous'}, stac]`,
      '---',
      '',
    ].join('\n');

    // ---------- body helper functions ----------
    const createProvidersTable = () => {
        if (!providers || providers.length === 0) return '';
        const table = createMarkdownTable(
            [{ header: 'Name', key: 'name' }, { header: 'URL', key: 'url' }, { header: 'Roles', key: 'roles' }],
            providers.map(p => ({ ...p, url: p.url ? `[${p.url}](${p.url})` : '—', roles: p.roles?.join(', ') }))
        );
        return `### Providers\n\n${table}\n`;
    };

    const createAssetsTable = () => {
        if (!assets || Object.keys(assets).length === 0) return '';
        const assetsData = Object.entries(assets).map(([key, value]) => ({
            key,
            title: value.title,
            type: `\`${value.type}\``,
            roles: value.roles?.join(', ') || '—'
        }));
        const table = createMarkdownTable(
            [{ header: 'Asset Key', key: 'key' }, { header: 'Title', key: 'title' }, { header: 'Media Type', key: 'type' }, { header: 'Roles', key: 'roles' }],
            assetsData
        );
        return `### Assets\n\nThis item contains the following assets:\n\n${table}\n`;
    };

    const createCategoryLabels = () => {
        if (!labels || labels.length === 0) return '';
        return `**Category Labels**\n${labels.map((l) => `* ${l}`).join('\n')}\n`;
    };


    // ---------- body ----------
    // The body is now much more detailed.
    const body = `
import LayerDemo from '@site/src/components/LayerDemo';

<LayerDemo layerKey="${id}" />

### Key Information

| Field | Value |
|---|---|
| **STAC ID** | \`${id}\` |
| **Bounding Box** | \`${JSON.stringify(bbox)}\` |
| **Datetime** | ${properties.datetime ? new Date(properties.datetime).toUTCString() : '—'} |
| **Scale** | ${scale} m |
| **Data Type** | ${discrete ? 'Discrete (Categorical)' : 'Continuous'} |
| **Units** | ${units || '—'} |

${createProvidersTable()}
${createAssetsTable()}
${createCategoryLabels()}
`.trimStart();

    // ---------- write file ----------
    const fileContents = await prettier.format(frontMatter + body, {
      parser: 'mdx',
    });

    // Use the STAC ID for the filename for consistency.
    const outPath = path.join(OUT_DIR, `${id}.mdx`);
    await fs.writeFile(outPath, fileContents);
    console.log('✅  Wrote', path.relative('.', outPath));
  }

  console.log(`\nDone. Generated ${stacItems.length} MDX pages.`);
}

run().catch((err) => {
  console.error('❌  Generator failed:', err);
  process.exitCode = 1;
});
