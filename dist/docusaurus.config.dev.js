"use strict";

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      // Hides the switch in the navbar
      disableSwitch: true
    },
    announcementBar: {
      id: 'tag',
      // Any value that will identify this message.
      content: 'Explore your watersheds. Get data, generate reports, and make informed decisions',
      backgroundColor: '#4D6059',
      // Defaults to `#fff`.
      textColor: 'white',
      // Defaults to `#000`.
      isCloseable: false // Defaults to `true`.

    },
    navbar: {
      hideOnScroll: true,
      title: 'StormwaterHeatmap.Org',
      logo: {
        // height: '100px', 
        alt: 'TNC Logo',
        src: 'img/logo_dark.svg',
        srcDark: 'img/favicon.ico'
      },

      /*
      ///navbar items 
      */
      items: [{
        position: 'left',
        label: 'View Data Layers'
      }, {
        position: 'left',
        label: 'Analyze Watersheds',
        items: [{
          label: 'Analyze Single Watershed',
          to: "single_watershed"
        }, {
          label: 'Compare Watersheds',
          to: "compare_watersheds"
        }]
      }, {
        position: 'left',
        label: 'Get Data',
        items: [{
          label: 'Get Spatial Data'
        }, {
          label: 'Get Timeseries Data'
        }, {
          label: 'Bulk Download'
        }]
      }, //Right side menu items 
      //Background 
      {
        label: 'About',
        position: 'right',
        //type: 'dropdown'
        //  items: [
        //        {
        //navbar doc link 
        to: 'docs/all_about_stormwater' // label: 'Background'

      }, //]
      //    },
      //   }]},
      // Documentation 
      {
        label: 'Documentation',
        items: [{
          label: "Technical Reference",
          type: 'doc',
          docId: 'overview'
        }, {
          label: 'API Reference',
          type: 'doc',
          docId: 'page1'
        }, {
          label: 'Github Repo',
          href: 'https://github.com/stormwaterheatmap'
        }]
      }, //         // className: 'header-github-link',
      //         // 'aria-label': 'GitHub repository',
      //       }
      //       ],
      //     },
      {
        //User Stories 
        position: 'right',
        label: 'User Stories',
        to: "user_stories"
      }]
    },
    footer: {
      logo: {
        src: 'img/logo_dark.svg'
      },
      copyright: "Copyright \xA9 ".concat(new Date().getFullYear(), " The Nature Conservancy."),
      links: [(_ref = {
        title: 'Docs',
        items: [{
          label: 'API Reference',
          to: '/docs/API/page1'
        }, {
          label: 'Technical Reference',
          to: 'docs/Technical%20Reference/overview'
        }, {
          label: 'Github',
          to: '/docs/intro'
        }]
      }, _defineProperty(_ref, "title", 'About'), _defineProperty(_ref, "items", [{
        label: 'Contact',
        to: '/docs/intro'
      }, {
        label: 'License & Terms',
        href: 'https://www.conservationgateway.org/Pages/Terms-of-Use.aspx'
      }]), _ref)]
    }
  },
  presets: [['@docusaurus/preset-classic', {
    docs: {
      sidebarPath: require.resolve('./sidebars.js'),
      // Please change this to your repo.https://github.com/stormwaterheatmap/website.git
      editUrl: 'https://github.com/stormwaterheatmap/website/tree/main/'
    },
    // blog: {
    //   showReadingTime: true,
    //   // Please change this to your repo.
    //   editUrl: 'https://github.com/stormwaterheatmap/website/edit/main/',
    // },
    theme: {
      customCss: require.resolve('./src/css/custom.css')
    }
  }]]
};