# stormwaterheatmap.org

The public website for the Stormwater Heatmap, built with [Docusaurus](https://docusaurus.io). Pushes to `main` deploy to GitHub Pages through `.github/workflows/pages.yml`.

## Setup

Node 26 (see `.nvmrc`), then:

```bash
npm install
```

## Scripts

| Command | What it does | When to run it |
|---|---|---|
| `npm start` | Dev server with hot reload at http://localhost:3000. Runs `gen:layers` first. | While editing. Restart after changing `docusaurus.config.mjs` or `swhm.config.json`; those are read once at startup. |
| `npm run build` | Production build into `build/`. Runs `gen:layers` first. | Before a pull request, to see the warnings CI will see. |
| `npm run serve` | Serves the last `build/` as static files. Compiles nothing. | Only to inspect a finished build. Pair it with the CI environment: `SITE_URL="https://stormwaterheatmap.github.io" SITE_BASE_URL="/website/" npm run build`. |
| `npm run gen:layers` | Regenerates the Layer Reference pages (`docs/03_Data Layers/*.mdx`) from the data dictionary and the STAC catalog. | After any change to the dictionary, the catalog, or a note partial. `start` and `build` call it for you; run it by hand when the dev server is already up. |
| `npm test` | Unit tests for the generator. | After editing `scripts/gen-layers.mjs`. |

### How the Layer Reference is built

The layer pages are generated. Do not edit the `.mdx` files in `docs/03_Data Layers/`; the generator overwrites them.

Inputs, both named in `swhm.config.json`:

- **The data dictionary**, `../swhm-io/published/data_dict_published.json` in the sibling `swhm-io` checkout. Prose (`long_description`), units, class labels, Earth Engine asset ids, and each layer's page (`docs_link`).
- **The STAC catalog**, fetched from the production bucket. File links, sizes, pixel details, class colors, dates.

The two are joined on the lowercased `assetId`. Records that share a `docs_link` (the precipitation and runoff ensembles, the five pollutant concentrations) render on one page. A layer with no catalog item yet falls back to the legacy download listed in `swhm.config.json` and shows a note.

Page-specific prose that is not in the dictionary lives in `docs/03_Data Layers/_notes/<page>.mdx` and is included after the Description when present.

When the dictionary file is absent, as on the CI runner, the generator skips and the committed pages are built as they are. That is why regenerated pages must be committed.

### Release checklist for a data change

1. In `swhm-io`: publish the layer (`swhm-io publish cog`) and the dictionary (`swhm-io publish datadict`).
2. Here: `npm run build`, review the diff in `docs/03_Data Layers/`, commit it.
3. Merge to `main`. GitHub Pages deploys.

## Bug reports

Good bug reports are extremely helpful - thank you!

### Using the issue tracker
The issue tracker is the preferred channel for bug reports, features requests and submitting pull requests. Use the GitHub issue search — check if the issue has already been reported.

### Feature requests
Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

## Contributing

We hope that other organizations can benefit from stormwaterheatmap.org. We are thankful for any contributions from the community.
Pull requests are the best way to propose changes to the website. We actively welcome your pull requests:

* Fork the repo and create your branch from `main`.
* Install the site locally: `npm install`
* Make changes and test in a local development server: `npm start`
* Build the site to make sure it will deploy: `npm run build`
* Commit your changes
* Issue that pull request!
