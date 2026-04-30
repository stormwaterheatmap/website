import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const linkout_svg =
'<svg width="10" height="10" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_3JMu"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>'

const linkout_svg_footer =
'<svg width="10" height="10" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_3JMu"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>'

/** @type {import('@docusaurus/types').DocusaurusConfig} */

export default {
    title: 'The Nature Conservancy StormwaterHeatmap',
    tagline: 'Explore your watersheds. get data, and make informed decisions.',
    url: 'https://stormwaterheatmap.org',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: 'warn',
        },
    },
    favicon: 'img/favicon.ico',
    organizationName: 'The Nature Conservancy',
    projectName: 'website',

    headTags: [
        {
            tagName: 'meta',
            attributes: {
                name: 'description',
                content: 'Interactive stormwater data layers and watershed analysis tools for the Puget Sound region. Developed by The Nature Conservancy and Geosyntec Consultants.',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:type',
                content: 'website',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                property: 'og:site_name',
                content: 'Stormwater Heatmap',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
        },
    ],

    themeConfig: {
        image: 'img/stormwater-default-share.jpg',
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false
        },
        announcementBar: {
            id: 'announcementBar-dev',

            content: `<strong>Full-extent data layer downloads are now available!</strong> Read more on our blog
            <a target="_blank" rel="noopener noreferrer" href="https://www.stormwaterheatmap.org/blog/feature-announcement-ago"> here.</a>${linkout_svg}`,

            backgroundColor: '#003F35',

            textColor: '#f5f6f7',
            isCloseable: true
        },
        navbar: {
            hideOnScroll: true,

            logo: {
                alt: 'TNC Logo',
                src: 'img/tnc-logo-white.svg',
                srcDark: 'img/tnc-logo-white.svg'
            },

            items: [
                {
                    position: 'left',
                    label: '🏠 View Data Layers',
                    to: "/"

                }, {
                    position: 'left',
                    label: 'Analyze Watersheds',
                    to: 'single_watershed',
},
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
                    label: 'Blog',
                    position: 'left',
                    to: 'blog'
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
                            to: `docs/links`
                        },
                    ]},

                {title: "More",
                items:[
                    {
                        label: `License & Terms`,
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
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/stormwaterheatmap/website/tree/main/'
                },
                      gtag: {
        trackingID: 'G-WS0E1W7LBB',   
        anonymizeIP: false,
      },
                blog: {
                    onUntruncatedBlogPosts: 'ignore',
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                    filename: 'sitemap.xml',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                },

            },
        ],
    ],
    plugins: [
        [
            "@gracefullight/docusaurus-plugin-microsoft-clarity",
            { projectId: "wf84tzxkf3" },
        ],
    ],
    stylesheets: [
        {
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
          integrity:
            'sha384-n8MVuj4nber5hLgLEQnQb3oP5Po6YExyjslPNXYOKHB3aNsgASc7sNrPcn1OZHGB',
          crossorigin: 'anonymous',
        },
      ],
};
