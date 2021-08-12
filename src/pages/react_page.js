import React from 'react';
import Layout from '@theme/Layout';
import backgroundImg from '@site/static/img/lid.png';

function placeholder_page() {
  return (
    <Layout title="placeholder_page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage:  "url(" + backgroundImg + ")", 
        //   height: '50vh',
          fontSize: '20px',
        }}>



       <div class="aspect-ratio--16x9">
         
  <div class="aspect-ratio__inner-wrapper">
        <iframe class="ee_embed" 
         width="100%" height="800"  
         src="https://stormwaterheatmap.users.earthengine.app/view/watershed-inspector"
          frameborder="0" >
            </iframe> 
   </div> 
 </div> 
        
      </div> 
      
    </Layout>
  );
}

export default placeholder_page;