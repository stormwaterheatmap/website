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
| `npm run serve` | Serves the last `build/` as static files. Compiles nothing. | Only to inspect a finished build. CI builds with the defaults too, so `npm run build` then `npm run serve` shows what will deploy. |
| `npm run gen:layers` | Regenerates the Layer Reference pages (`docs/03_Data Layers/*.mdx`) from the data dictionary and the STAC catalog. | After any change to the dictionary, the catalog, or a note partial. `start` and `build` call it for you; run it by hand when the dev server is already up. |
| `npm test` | Unit tests for the generator. | After editing `scripts/gen-layers.mjs`. |

### How the Layer Reference is built

The layer pages are generated. Do not edit the `.mdx` files in `docs/03_Data Layers/`; the generator overwrites them.

The generator reads two independent inputs from the production bucket, each at its own URL in `swhm.config.json`:

- **The STAC catalog** (`catalogUrl`). The generator walks it from the root `catalog.json` through its `child` collections to every item. File links, sizes, pixel details, class colors, dates.
- **The data dictionary** (`dataDict`). Prose (`long_description`), units, class labels, Earth Engine asset ids, and each layer's page (`docs_link`). The catalog does not reference it.

The Data Catalog page embeds the STAC Browser at its root and passes no catalog. The browser owns its catalog connection (`catalogUrl` in the `swhm-stac-browser` repo). The "Catalog entry" links on layer pages are browser-relative paths such as `#/soils.json`, which the browser resolves against its own catalog. They match as long as the browser's catalog is the layers collection.

The two are joined on the lowercased `assetId`. Records that share a `docs_link` (the precipitation and runoff ensembles, the pollutant concentrations, the pollutant loads) render on one page. A dictionary record with no catalog item gets a page without a download link and a note saying so.

Page-specific prose that is not in the dictionary lives in `docs/03_Data Layers/_notes/<page>.mdx` and is included after the Description when present.

The generator runs before every `npm start` and `npm run build`, including in CI. It needs network access. If any fetch fails, it stops with an error rather than build pages from partial data; in CI that means the deploy fails and the site keeps its previous version. To work offline, run `npx docusaurus start` directly, which skips regeneration.

To preview an unpublished dictionary, point `SWHM_DATA_DICT` at a local file or another URL:

```bash
SWHM_DATA_DICT=../swhm-io/published/data_dict_published.json npm run gen:layers
```

### Release checklist for a data change

1. In `swhm-io`: publish the layer (`swhm-io publish cog`) and the dictionary to the production bucket.
2. Here: `npm run build`, review the diff in `docs/03_Data Layers/`, commit it. CI regenerates from the bucket anyway; committing keeps each data change reviewable in the history.
3. Push to `main`, or run the Pages workflow by hand from the Actions tab. The site does not rebuild by itself when the bucket changes.

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
