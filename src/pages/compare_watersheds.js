import React from 'react';
import Layout from '@theme/Layout';

function compare_ws() {
  return (
    <Layout title="placeholder">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        //   height: '50vh',
          fontSize: '20px',
        }}>
       <div class="aspect-ratio--16x9">
  <div class="aspect-ratio__inner-wrapper">
        <iframe class="ee_embed" 
        // width="100%" height="800"  */}
        src="https://stormwaterheatmap.users.earthengine.app/view/placeholder"
         frameborder="0" ></iframe>
  </div>
</div>
        
      </div>
    </Layout>
  );
}

export default compare_ws;