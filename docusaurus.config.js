/** @type {import('@docusaurus/types').DocusaurusConfig} */


module.exports = {
  title: 'Explore your watersheds. Get data, generate reports, and make informed decisions',
  tagline: 'Explore your watersheds. Get data, generate reports, and make informed decisions.',
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
    navbar: {
      hideOnScroll: true,
      title: 'StormwaterHeatmap.Org',
      logo: {
        alt: 'TNC Logo',
        src: 'img/tnc-logo-white.svg',
        srcDark: 'img/favicon.ico'
      },
      items: [{
          position: 'left',
          label: 'View Data Layers',
          to: "/"
        },
        {
          position: 'left',
          label: 'Analyze Watersheds',
          items: [{
              label: 'Analyze Single Watershed',
              to: "single_watershed"
            },
            {
              label: 'Compare Watersheds',
              to: "compare_watersheds"
            },
          ]
        },
        {
          position: 'left',
          label: 'Get Data',
          items: [{
              label: 'Get Spatial Data'
            },
            {
              label: 'Get Timeseries Data'
            },
            {
              label: 'Bulk Download'
            },
          ]
        },
        {
          label: 'About',
          position: 'right',
          items: [
            {label: 'All About Stormwater', 
          to: "about_stormwater"
          },
            {
            label: 'Technical Reference',
            to: 'docs/Technical Reference/overview'}, 
             {
              label: 'API Reference',
              to:'docs/API/Page1'
            },
            {
              label: 'Github Repo',
              href: 'https://github.com/stormwaterheatmap'
            }
          ]
        },
        {
          position: 'right',
          label: 'User Stories',
          to: "user_stories"
        },
      ]
    },
    footer: {
      logo: {
        src: 'img/tnc-logo-white.svg'
      },
      copyright: `Copyright © ${new Date().getFullYear()} The Nature Conservancy. ${"<br>"} 
      Developed by Geosyntec Consultants, Inc.` ,
      links: [{
          title: 'Docs',
          items: [{
              label: 'API Reference',
              to: '/docs/API/page1',
            },
            {
              label: 'Technical Reference',
              to: 'docs/Technical%20Reference/overview',
            },
            {
              label: 'Github',
              to: '/docs/intro',
            },
          ],


          title: 'About',
          items: [{
              label: 'Contact',
              to: '/docs/intro',
            },
            {
              label: 'License & Terms',
              href: 'https://www.conservationgateway.org/Pages/Terms-of-Use.aspx'
            }
          ],
        }

      ],

    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.https://github.com/stormwaterheatmap/website.git
          editUrl: 'https://github.com/stormwaterheatmap/website/tree/main/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl: 'https://github.com/stormwaterheatmap/website/edit/main/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],



};