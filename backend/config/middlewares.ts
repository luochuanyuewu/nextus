export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'script-src': [
            "'self'",
            "'unsafe-eval'",
            "'unsafe-inline'",
            'cdn.jsdelivr.net',
            "g.alicdn.com"],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'cdn.jsdelivr.net',
            'strapi.io',
            'gumola.com',
            'g.alicdn.com',
            "*.oss-cn-shanghai.aliyuncs.com", "*.oss-cn-beijing.aliyuncs.com", "*.aliyuncs.com"
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'gumola.com',
            'market-assets.strapi.io',
            "*.oss-cn-shanghai.aliyuncs.com", "*.oss-cn-beijing.aliyuncs.com"
          ],
          'style-src-elem': ["'self'", "'unsafe-inline'", "g.alicdn.com"]
        },
      }
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];


// export default [
//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::logger',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];
