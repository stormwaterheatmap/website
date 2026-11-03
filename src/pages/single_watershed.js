import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


function placeholder_page() {
  const {earthEngineApps} = useDocusaurusContext().siteConfig.customFields;
  return (
    <Layout title="Analyze Single Watershed">
      <div>
      


       {/* <div class="aspect-ratio--16x9"> */}
         
  <div class="aspect-ratio__inner-wrapper">
        <iframe class="ee_embed" 
        //  width="100%" height="800"  
         src={earthEngineApps.singleWatershed}
          frameborder="0" >
            </iframe> 
   </div> 
 </div> 
        
      {/* </div>  */}
      
    </Layout>
  );
}

export default placeholder_page;