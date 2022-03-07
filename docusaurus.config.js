const linkout_svg =
'<svg width="10" height="10" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_3JMu"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>'

const linkout_svg_footer =
'<svg width="10" height="10" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_3JMu"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>'
const math = require('remark-math');
const katex = require('rehype-katex');
/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
    title: 'The Nature Conservancy StormwaterHeatmap',
    tagline: 'Explore your watersheds. get data, and make informed decisions.',
    url: 'https://stormwaterheatmap.dev',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'The Nature Conservancy',
    projectName: 'website',
    // plugins: ['@docusaurus/plugin-google-gtag'],
    
    themeConfig: {


        // gtag: {
        //     // You can also use your "G-" Measurement ID here.
        //     trackingID: 'G-NY607SJH9G',
        //     // Optional fields.
        //     anonymizeIP: false, // Should IPs be anonymized?
        // },





        
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true
        },
        announcementBar: {
            id: 'announcementBar-dev', 
            
            content: `🚧 This site is under development and testing. Please submit bug reports` +
            ` to our <a target="_blank" rel="noopener noreferrer" href="https://github.com/stormwaterheatmap/website">github repo.</a> ${linkout_svg}`,

            backgroundColor: '#003F35',
            // '#2b7126',

            textColor: '#D9D8DA',
            isCloseable: true
        },
        navbar: {
            hideOnScroll: true,

            //title: 'StormwaterHeatmap.Org',

            logo: {
                alt: 'TNC Logo',
                src: 'img/tnc-logo-white.svg',
                srcDark: 'img/favicon.ico'
            },

            items: [
                {
                    position: 'left',
                    label: '🏠 View Data Layers',
                    to: "/"

                }, {
                    position: 'left',
                    label: 'Analyze Watersheds',
                    //items: [
                        // {
                        //     label: 'Analyze Single Watershed',
                        //     
                        to: "single_watershed"
                        //}, {
                    //         label: 'Compare Watersheds',
                    //         to: "compare_watersheds"
                    //     }
                    // ]
                }, 
                // {
                //     position: 'left',
                    
                //     label: 'Technical Reference',
                //             to: 'docs/Technical Reference/overview'
                // }, 
                {
                    label: 'Documentation',
                    position: 'left',
                    items: [
                        {
                            label: 'Methodology',
                            to: 'docs/category/methods'
                        }, {
                            label: 'Layer Reference',
                            to: 'docs/category/DataLayers/'
                        }, 
                        {
                            label: 'Resources',
                            to: "docs/category/resources"
                        },
                        {
                            label: 'Github Repo',
                            href: 'https://github.com/stormwaterheatmap'
                        }
                    ]
                }, 
                {
                    position: 'left',
                    label: 'Get Data',
                    to: 'docs/get_data'
                    
                }, 
                {
                    position: 'right',
                    label: 'Contact',
                    items: [
                        {
                            label: "Get in touch", 
                            to: "contact"
                        },
                        {
                            label: "Share your Story", 
                            to: "user_stories", 

                        }

                    ]
                }
            ]
        },
        footer: {
            logo: {
                src: 'img/tnc-logo-white.svg'
            },
            copyright: 
            `Copyright © ${new Date().getFullYear()} The Nature Conservancy. ${ "<br>"} 
      ${ "<small>"}Developed by Geosyntec Consultants, Inc.${"</small>"}`,
            links: [
                {
                    title: 'Documentation',
                    items: [
                        {
                            label: 'Methodology',
                            to: 'docs/category/methods'
                        }, {
                            label: 'Layer Reference',
                            to: '/docs/category/DataLayers/'
                        }, 
                    ]
                },
                // title: 'Docs', items: [{
                //
                //   },   {    ',   },   {     label: 'Github',     to: '/docs/intro',   }, ],

                // {title: "Contact",
                //  items:[
                //     {label: 'Contact form', to: 'docs/contact'}]}, 
                {title: "Get Involved",

                items: [
                    {
                        label: 'Contact us', 
                        to: 'docs/contact'
                    },
                    {
                        label: 'Github Repo',
                        href: 'https://github.com/stormwaterheatmap/'
                    }
                ]
            },

                
                {title: "Resources",
                
                    
                    items: [
                        
                        {
                            label: `Background`,
                            to: `about_stormwater`
                        }, 
                        {
                            label: `Links`, 
                            // ${linkout_svg_footer}`,
                            to: `docs/links`
                        },
                    ]},
                
                {title: "More",
                items:[
                    {
                        label: `License & Terms`, 
                        // ${linkout_svg_footer}`,
                        to: `docs/license`
                        
                    }

                ]}

            ]
        }
    },

    presets: [
        [
            '@docusaurus/preset-classic', {
                docs: {
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your
                    // repo.https://github.com/stormwaterheatmap/website.git
                    editUrl: 'https://github.com/stormwaterheatmap/website/tree/main/'
                },
                gtag: {
                    // You can also use your "G-" Measurement ID here.
                    trackingID: 'G-NY607SJH9G',
                    // Optional fields.
                    anonymizeIP: false, // Should IPs be anonymized?
                  },
                // blog: {   showReadingTime: true,   // Please change this to your repo.
                // editUrl: 'https://github.com/stormwaterheatmap/website/edit/main/', },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }, 

            }, 
        ], 
    ], 
    stylesheets: [
        {
          href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
          integrity:
            'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
          crossorigin: 'anonymous',
        },
      ],
};