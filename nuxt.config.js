require('dotenv').config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-gql',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css',
      },
    ],
  },

  // Customize the progress-bar color
  loading: { color: '#fff' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '~plugins/apollo.js',
      mode: 'client',
    },
    // '~plugins/axios.js',
    '@/plugins/element-ui',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Doc: https://github.com/microcipcip/cookie-universal
    'cookie-universal-nuxt',
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    headers: {
      'X-Parse-Application-Id': process.env.X_PARSE_APP_ID,
      'X-Parse-Client-Key': process.env.X_PARSE_CLIENT_KEY,
    },
  },

  /*
   ** Apollo configuration
   */
  apollo: {
    tokenName: 'auth.sessionToken',
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GQL_HTTP_URL,
        httpLinkOptions: {
          includeExtensions: true,
        },
        wsEndpoint: process.env.GQL_WSS_URL,
      },
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.LOGIN_URL,
            method: 'post',
            token: 'sessionToken',
          },
          // logout: { url: '/api/auth/logout', method: 'post' },
          logout: false,
          user: {
            url: process.env.USER_URL,
            method: 'get',
            propertyName: '',
          },
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        autoFetchUser: true,
        tokenType: false,
        tokenName: 'X-Parse-Session-Token',
      },
    },
    plugins: [
      '~plugins/axios.js',
      // '~plugins/auth-isAuth.js'
    ],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }

      config.node = {
        fs: 'empty',
      }
    },
  },
}
