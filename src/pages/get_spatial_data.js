import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function compare_ws() {
  const {earthEngineApps} = useDocusaurusContext().siteConfig.customFields;
  return (
    <Layout title="get spatial data">
     
     
  <div class="aspect-ratio__inner-wrapper">
        <iframe class="ee_embed" 
        // width="100%" height="800"  */}
        src={earthEngineApps.downloadLayers}
         frameborder="0" ></iframe>
  </div>

        

    </Layout>
  );
}

export default compare_ws;