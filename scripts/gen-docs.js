/* eslint-disable no-console */

// ── built-ins ──────────────────────────────────────────────────────────────
const fs   = require('node:fs/promises');
const path = require('node:path');

// ── third-party  ───────────────────────────────────────────────────────────
const prettier = require('prettier');   // npm i -D prettier

// ── constants ──────────────────────────────────────────────────────────────
const OUT_DIR = path.resolve('docs/API/image_layers');
const JSON_PATH = path.resolve(__dirname, '../metadata/rasters.json');

/**
 * Load rasters.json as a JavaScript object.
 * Works in CommonJS without import assertions.
 */
async function loadRasters() {
  const text = await fs.readFile(JSON_PATH, 'utf8');
  return JSON.parse(text);
}

/**
 * Generate one MDX page for every raster in the dictionary.
 */
async function run() {
  const rasters = await loadRasters();
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const [name, meta] of Object.entries(rasters)) {
    const {
      description,
      sourceName,
      sourceUrl,
      units,
      scale,
      discrete,
      labels,
      vizType,
      safe_name,
    } = meta;

    // ---------- front-matter ----------
    const frontMatter = [
      '---',
      `id: ${safe_name}`,
      `title: ${name}`,
      `description: >`,
      `  ${description}`,
      `sidebar_label: ${name}`,
      `tags: [${discrete === 'TRUE' ? 'categorical' : 'continuous'}]`,
      '---',
      '',
    ].join('\n');

    // ---------- body ----------
    const body = `
import LayerDemo from '@site/src/components/LayerDemo';

<LayerDemo layerKey="${name}" />

### Metadata

| Field           | Value |
|-----------------|-------|
| **Units**       | ${units || '—'} |
| **Scale**       | ${scale} m |
| **Source**      | ${sourceUrl ? `[${sourceName}](${sourceUrl})` : sourceName} |
| **Discrete**    | ${discrete} |
| **Default viz** | ${vizType} |

${
  labels
    ? `\n**Category labels**  \n${labels.map((l) => '\\- ' + l).join('\n')}\n`
    : ''
}
`.trimStart();

    // ---------- write file ----------
    const fileContents = await prettier.format(frontMatter + body, {
      parser: 'mdx',
    });

    const outPath = path.join(OUT_DIR, `${safe_name}.mdx`);
    await fs.writeFile(outPath, fileContents);
    console.log('✅  wrote', path.relative('.', outPath));
  }

  console.log('\nDone. Generated', Object.keys(rasters).length, 'MDX pages.');
}

run().catch((err) => {
  console.error('❌  generator failed:', err);
  process.exitCode = 1;
});