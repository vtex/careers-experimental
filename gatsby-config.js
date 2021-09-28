module.exports = {
  siteMetadata: {
    title: `VTEX Careers - Create the future of Commerce`,
    description: `Your extraordinary future starts here. Explore our opportunities and discover challenging ways to power the global commerce transformation.`,
    author: `@vtex`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://careers.vtex.com/graphql`,
        type: {
          Post: {
            exclude: true,
          },
          Page: {
            exclude: true,
          },
        },
        schema: {
          perPage: 50,
          timeout: 600000,
        },
        html: {
          createStaticFiles: true,
        }
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `src/images/vtex-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    'gatsby-plugin-postcss',
    'gatsby-plugin-use-query-params',
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        }
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://careers.vtex.com`,
      },
    },
    'gatsby-plugin-no-index'
  ],
}
