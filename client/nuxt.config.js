require('dotenv').config()

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  // buildDir: '.ran',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.SITE_TITLE || '',
    titleTemplate: '%s - ' + process.env.SHORT_SITE_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          process.env.npm_package_description ||
          process.env.SITE_DESCRIPTION ||
          '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&family=Rubik:wght@300;400;500;700&display=swap',
      },
    ],
  },
  loading: { color: '#fff' },
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // To Slug Function (Fixing Sending Hebrew Slug To Server)
    '@/plugins/Helpers/helpers.server.js',
    '@/plugins/Helpers/helpers.client.js',
    // Doc: https://github.com/michalsnik/aos#animations
    '@/plugins/aos.client.js',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.js',
    cssPath: '~/assets/css/app.sass',
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'lang',
          alwaysRedirect: true,
          fallbackLocale: 'he',
        },
        locales: [
          {
            code: 'he',
            name: 'עברית',
            file: 'he-IL.js',
          },
          {
            code: 'en',
            name: 'English',
            file: 'en-US.js',
          },
        ],
        strategy: 'prefix_except_default',
        defaultLocale: 'he',
        lazy: true,
        langDir: 'locales/',
        vuex: {
          moduleName: 'i18n',
          syncLocale: true,
          syncMessages: true,
          syncRouteParams: true,
        },
      },
    ],
    '@nuxtjs/auth',
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          user: { url: '/auth/me', method: 'get', propertyName: 'user' },
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  proxy: {
    '/api': {
      target: process.env.API_URL,
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_module)/,
          options: {
            fix: true,
          },
        })
      }
    },
  },
}
