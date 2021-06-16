/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'StormwaterHeatmap.org',
  tagline: 'Explore your watersheds. Get data, generate reports, and make informed decisions.',
  url: 'https://www.stormwaterheatmap.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'stormwaterheatmap', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  themeConfig: {
    colorMode: {
    defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false},
    navbar: {
      hideOnScroll: true,
      title: 'StormwaterHeatmap.org',
      logo: {
        // height: '100px', 
        alt: 'TNC Logo',
        src: 'img/logo.svg',
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
            {label: 'Documentation'}, 
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
              to: '/docs/intro',
            },
            {
              label: 'Technical Reference',
              to: '/docs/intro',
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
      copyright: `Copyright © ${new Date().getFullYear()} Geosyntec Consultants Inc. and The Nature Conservancy. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
