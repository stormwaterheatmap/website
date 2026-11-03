import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Embeds the Stormwater Heatmap STAC Browser. The browser owns its catalog
// connection (catalogUrl in the swhm-stac-browser repo), so the page passes
// no catalog of its own and opens the browser at its root.
export default function CatalogPage() {
  const { siteConfig } = useDocusaurusContext();
  const { stacBrowser } = siteConfig.customFields;
  return (
    <Layout title="Data Catalog" description="Browse and download the Stormwater Heatmap data layers as Cloud-Optimized GeoTIFFs.">
      <div className="aspect-ratio__inner-wrapper">
        <iframe className="ee_embed" title="Stormwater Heatmap data catalog" src={stacBrowser} frameBorder="0" />
      </div>
    </Layout>
  );
}
