
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';


function App() {  
  return (
  <Layout> 
    {/* <div> */}
    <div class="hero hero--dark hero--shadow--lw">
  <div class="container">
    <h1 class="hero__title">User Stories</h1>
    <p class="hero__subtitle">
      How are you using the Stormwater Heatmap?</p> <br />
   
     
 {/* Send us your story and photo!</p> */}

 {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSemsJbWPUpIHq8hZ2jeibBOrDajNH3i2qd0TMVEiTaREXhy_w/viewform?embedded=true" width="640" height="855" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
 <Link
            className="button button--primary button--lg"
            to="contact">
            Share your story
          </Link>



              <div></div>

  </div>
  </div>
  
    </Layout>
  );
}

export default App;