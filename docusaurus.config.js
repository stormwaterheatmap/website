/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'StormwaterHeatmap.org',
  tagline: 'Explore your watersheds. Get data, generate reports, and make informed decisions.',
  url: 'https://www.stormwaterheatmap.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'stormwaterheatmap', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true},

    navbar: {
      style: 'dark',
      hideOnScroll: true,
      title: 'StormwaterHeatmap.org',
      logo: {
        // height: '100px', 
        alt: 'TNC Logo',
        src: 'img/logo_dark.svg', //'img/logo.svg',
        srcDark: 'img/logo_dark.svg'
      },
      items: [
      
        {
          position: 'left',
          label: 'Analyze Watersheds',
          
          items: [ 
            {label: 'Analyze Single Watershed', 
          to: "react_page"}, 
            {label: 'Compare Watersheds',
             to: "compare_watersheds"}, 
          ]
        },
        {
          position: 'left',
          label: 'Get Data',
          items: [ 
            {label: 'Get Spatial Data'}, 
            {label: 'Get Timeseries Data'}, 
            {label: 'Bulk Download/API'}
          ]
        },
        {
          position: 'right',
          label: 'About',
          items: [ 
            {label: 'Documentation',
            to: "docs/intro"}, 
            {label: 'User Vignettes'}, 
            {label: 'All About Stormwater'}
          ]
        },
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: { 
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'API Reference',
              to: '/docs/API/page1',
            },
            {
              label: 'Technical Reference',
              to: '/docs/Technical%20Reference/intro',
            },
            {
              label: 'Github', 
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Contact', 
              to: '/docs/intro',
            },
            {
              label: 'License & Terms', 
              to: '/docs/intro',
            }
          ],
        }

      ],
      copyright: "Copyright © ${new Date().getFullYear()} Geosyntec Consultants Inc. & The Nature Conservancy.  Built with Docusaurus."
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.https://github.com/stormwaterheatmap/website.git
          editUrl:
            'https://github.com/stormwaterheatmap/website/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/stormwaterheatmap/website/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],



};
