const linkout_svg =
  '<svg style="fill: #1DA1F2; vertical-align: middle;" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>';


/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
    title: 'stormwaterheatmap.org',
    tagline: 'Explore your watersheds. Get data, generate reports, and make informed decisions' +
            '.',
    url: 'https://www.stormwaterheatmap.dev',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'stormwaterheatmap',
    projectName: 'website',
    themeConfig: {
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true
        },
        announcementBar: {
            
            content: '🚧 This site is under development and testing. Please submit bug report' +
                    's to our  <a target="_blank" rel="noopener noreferrer" href="#">github repo.</a>',
                    //  <img src=/static/img/External_link.svg></img>',

            backgroundColor: '#003F35',
            // '#2b7126',

            textColor: '#D9D8DA',
            isCloseable: false
        },
        navbar: {
            hideOnScroll: true,
            title: 'StormwaterHeatmap.Org',
            logo: {
                alt: 'TNC Logo',
                src: 'img/tnc-logo-white.svg',
                srcDark: 'img/favicon.ico'
            },
            items: [
                {
                    position: 'left',
                    label: 'View Data Layers',
                    to: "/"
                }, {
                    position: 'left',
                    label: 'Analyze Watersheds',
                    items: [
                        {
                            label: 'Analyze Single Watershed',
                            to: "single_watershed"
                        }, {
                            label: 'Compare Watersheds',
                            to: "compare_watersheds"
                        }
                    ]
                }, {
                    position: 'left',
                    label: 'Get Data',
                    items: [
                        {
                            label: 'Get Spatial Data'
                        }, {
                            label: 'Get Timeseries Data'
                        }, {
                            label: 'Bulk Download'
                        }
                    ]
                }, {
                    label: 'About',
                    position: 'right',
                    items: [
                        {
                            label: 'All About Stormwater',
                            to: "about_stormwater"
                        }, {
                            label: 'Technical Reference',
                            to: 'docs/Technical Reference/overview'
                        }, {
                            label: 'API Reference',
                            to: 'docs/API/Page1'
                        }, {
                            label: 'Github Repo',
                            href: 'https://github.com/stormwaterheatmap'
                        }
                    ]
                }, {
                    position: 'right',
                    label: 'User Stories',
                    to: "user_stories"
                }
            ]
        },
        footer: {
            logo: {
                src: 'img/tnc-logo-white.svg'
            },
            copyright: `Copyright © ${new Date().getFullYear()} The Nature Conservancy. ${ "<br>"} 
      Developed by Geosyntec Consultants, Inc.`,
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Technical Reference',
                            to: 'docs/Technical%20Reference/overview'
                        }, {
                            label: 'API Reference',
                            to: '/docs/API/page1'
                        }, {
                            label: 'Github Repo',
                            href: 'https://github.com/stormwaterheatmap/'
                        }
                    ]
                },
                // title: 'Docs', items: [{
                //
                //   },   {    ',   },   {     label: 'Github',     to: '/docs/intro',   }, ],

                {
                    title: 'About',
                    items: [
                        {
                            label: "All About Stormwater",
                            to: "pages/about_stormwater"
                        }, {
                            label: 'License & Terms',
                            href: 'https://www.conservationgateway.org/Pages/Terms-of-Use.aspx'
                        }
                    ]
                }

            ]
        }
    },

    presets: [
        [
            '@docusaurus/preset-classic', {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your
                    // repo.https://github.com/stormwaterheatmap/website.git
                    editUrl: 'https://github.com/stormwaterheatmap/website/tree/main/'
                },
                // blog: {   showReadingTime: true,   // Please change this to your repo.
                // editUrl: 'https://github.com/stormwaterheatmap/website/edit/main/', },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            }
        ]
    ]
};