module.exports = ({env}) => ({
  'generic-vod': {
    enabled: true,
    resolve: './src/plugins/generic-vod'
  },
  email: {
    config: {
      settings: {
        defaultFrom: 'luochuanyuewu@qq.com',
        defaultReplyTo: 'luochuanyuewu@qq.com',
        testAddress: 'luochuanyuewu@qq.com',
      },
    },
  },
  // upload: {
  //   config: {
  //     provider: 'strapi-provider-upload-oss', // full package name is required
  //     providerOptions: {
  //       accessKeyId: env('ACCESS_KEY_ID'),
  //       accessKeySecret: env('ACCESS_KEY_SECRET'),
  //       region: env('REGION'),
  //       bucket: env('BUCKET'),
  //       uploadPath: env('UPLOAD_PATH'),
  //       baseUrl: env('BASE_URL'),
  //       timeout: env('TIMEOUT'),
  //       secure: env('OSS_SECURE')
  //     }
  //   }
  // }
});
