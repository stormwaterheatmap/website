import React from 'react';
import Layout from '@theme/Layout';


function placeholder_page() {
  return (
    <Layout title="Analyze Single Watershed">
      <div>
      


       {/* <div class="aspect-ratio--16x9"> */}
         
  <div class="aspect-ratio__inner-wrapper">
        <iframe class="ee_embed" 
        //  width="100%" height="800"  
         src="https://stormwaterheatmap.users.earthengine.app/view/singlewatershed"
          frameborder="0" >
            </iframe> 
   </div> 
 </div> 
        
      {/* </div>  */}
      
    </Layout>
  );
}

export default placeholder_page;