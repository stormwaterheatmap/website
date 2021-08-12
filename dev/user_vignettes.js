import React from 'react';
import Layout from '@theme/Layout';

function user_vignettes() {
  return (
      <Layout title = "User Vignettes">
        <div
          style = {{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            fontSize: '20px', 
          }}>
        </div>
        <div class = "hero-image">

    <img src="/static/img/lid.png" 
/>
</div>
    <div class = "hero__title">
    User Case Stories
    <p class="hero__subtitle">How are you are using the Stormwater Heatmap? 


Send us your story and a photo! </p>



<a class="button button--lg button--primary" href="mailto:courtney.baxter@tnc.org">
     Share your story
  </a>

    </div>


    


  </Layout>
  ); 
}

export default user_vignettes; 