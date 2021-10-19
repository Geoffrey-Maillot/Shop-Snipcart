require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Gatsby test shop",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-ngrok-tunneling",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        useResolveUrlLoader: true,
        cssLoaderOptions: {
          import: true
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.URL_STRAPI,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`categories`, `products`],
        // singleTypes: [`home-page`, `contact`],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `limelight`,
          `open sans \:400,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-plugin-snipcart-advanced',
      options: {
        version: "3.0.20",
        publicApiKey: process.env.GATSBY_SNIPCART_APIKEY,
        defaultLang: "fr",
        currency: "eur",
        openCartOnAdd: false,
        useSideCart: false,
        // be careful with this mode cart. The cart in this mode has a bug of scroll in firefox
        locales: {
          fr: {
            actions: {
              checkout: "Valider le panier",
            },
          },
        },

        templatesUrl: "/snipcartTemplate/template.html",
      },

    }

  ],
};

