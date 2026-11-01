import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Embeds the STAC Browser opened on our production catalog. Both URLs come
// from swhm.config.json via customFields, so the catalog location is written
// in one place.
export default function CatalogPage() {
  const { siteConfig } = useDocusaurusContext();
  const { catalogUrl, stacBrowser } = siteConfig.customFields;
  const src = `${stacBrowser.replace(/\/?$/, '/')}#/external/${catalogUrl.replace(/^https?:\/\//, '')}`;
  return (
    <Layout title="Data Catalog" description="Browse and download the Stormwater Heatmap data layers as Cloud-Optimized GeoTIFFs.">
      <div className="aspect-ratio__inner-wrapper">
        <iframe className="ee_embed" title="Stormwater Heatmap data catalog" src={src} frameBorder="0" />
      </div>
    </Layout>
  );
}
