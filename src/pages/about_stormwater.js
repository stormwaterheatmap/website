import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function App() {
    return (
        <Layout>

            {/* <div class="hero hero--dark hero--shadow--lw"> */}
            {/* <div class="container"> */}

            {/* <div class = "page_w_background"> */}
            <div class="alt-flexbox">
                {/* <!-- The items --> */}
                <div class="item">
                    <div class="content">

                        <h1>
                            All About Stormwater</h1>

                        <p>
                            Each year, 370 billion gallons of untreated stormwater enters Puget Sound's
                            streams, rivers, lakes, and marine waters. Untreated stormwater contains a mixed
                            soup of chemicals generated on the land surface and concentrated into waterways
                            from a decentralized network of roads, aging and over-burdened sewer pipes, and
                            impervious, urbanized landscapes. 
                            </p>
                            <p>
                            
                            As the leading contributor of toxic pollutants
                            to Puget Sound waters, untreated stormwater runoff is a key ecological problem
                            that has harmed virtually all urban and urbanizing streams and rivers, as well
                            as the waters of Puget Sound. As a result, the abundance, health, and survival
                            of aquatic and marine species has declined at all levels of the food web,
                            including the region's iconic orca whales. Human health is also suffering as we
                            live out our lives adjacent to near-ubiquitous pollution, with communities of
                            color shouldering most of the burden. 
                            </p>
                            <p>
                            The Stormwater Heatmap was designed to
                            help communities take targeted, high-impact action on rolling back this legacy
                            of pollution. The heatmap harnesses the power of machine learning, cloud
                            computing, and long-term spatial datasets to model where stormwater pollution is
                            generated across the landscape. From Olympia to Bellingham and Snoqualmie Pass
                            to Neah Bay, the stormwater heatmap metrics can be used to help prioritize green
                            and grey infrastructure investments in key hotspot locations across the
                            landscape.
                            </p> 

                            <h2>What is the Stormwater Heatmap?</h2>
                        
                        <p>
                            The Stormwater Heatmap is an interactive mapping tool, report generator, and
                            data repository that quantitatively visualizes hotspots of pollution generation
                            and runoff throughout the Puget Sound watershed. 
                            </p>
                            <p>
                            
                            The mapping tool is designed to
                            support stormwater planning at multiple scales- from large watershed to local
                            neighborhoods. The pollution heatmaps provide new and rigorous insight into
                            where stormwater infrastructure investments are needed in order to buffer
                            against the adverse environmental impacts of stormwater pollution to people and
                            nature. 
                            
                            All spatial data layers, images, and reports are downloadable for use
                            outside of the online tool, and all code is open source. 
                            </p>
                            <p>
                              <em>
                            Please note: the
                            pollution heatmap models are best suited for strategic management decisions
                            wherein the relative loading of different pollutants is more important than the
                            estimated load quantity itself.
                        </em>
                        </p>
                        <p>
                            <h2>Stormwater Heatmap development</h2>
                            This tool was developed by The Nature Conservancy, Geosyntec Consultants, and
                            Cheva Consultants, with collaboration from the University of Washington Climate
                            Impacts Group, the Washington Department of Fish & Wildlife, and the NOAA Office
                            of Coastal Management. Funding was provided by The Boeing Company. The
                            Stormwater Heatmap was conceptualized by The Nature Conservancy- preserving and
                            protecting the land and waters upon which all life depends.
                        </p>
<h1> Resources </h1>

<iframe class="ee_embed" 
        // width="100%" height="800"  */}
        src="https://form.jotform.com/220617865372157"
         frameborder="0" ></iframe>

                       
<Link
            className="button button--primary button--lg"
            to="/docs/All%20About%20Stormwater%20Resources">
            Find out more
          </Link>
                       
                       
                        
                    </div>
                </div>
                <div class="item">
                    {/* <div class="content"> */}
                    <div class="img">
                        <img src={require('@site/static/img/sw_img.png').default}/> {/* </div> */}
                    </div>
                </div>
            </div>
            {/* </div> */}
        </Layout>
    );
}

export default App;