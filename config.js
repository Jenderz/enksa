const pkg = require('./package')

module.exports = {
  apiKey: 'AIzaSyCgwAhTr_xxihZ47AG5Zv4Z5EGkeKPqPJk',
  projectId: 'delivery-e7702',
  authDomain: 'delivery-e7702.firebaseapp.com',
  ANALYTICS_TRACKING_ID: '',
  clearCart: true, // Whether to clear the cart after order is placed. Useful while testing
  currency: { symbol: '$', code: 'USD' },
  manifest: {
    name: 'Enksa',
    short_name: 'Enksa',
    start_url: '/',
    display: 'standalone',
    background_color: 'whitesmoke',
    theme_color: 'whitesmoke'
  },
  head: {
    titleTemplate: 'Enksa | %s',
    title: pkg.description,
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Karla:400,700'
      }
    ],
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keyword', name: 'keyword', content: pkg.keyword },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        hid: 'og:title',
        property: 'og:title',
        content: pkg.description
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: pkg.description
      },
      // {
      //   property: "og:image",
      //   content:
      //     "https://s3.envato.com/files/252462089/banner.png"
      // },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: pkg.description
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: pkg.description
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://foodfire.info'
      }
    ],
    noscript: [
      {
        innerHTML: `We're sorry but Foodfire doesn't work properly without JavaScript enabled. Please enable it to continue.`
      }
    ],
    htmlAttrs: { lang: 'es' },
    __dangerouslyDisableSanitizers: ['script']
  }
}
