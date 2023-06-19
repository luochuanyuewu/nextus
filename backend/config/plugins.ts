module.exports = ({ env }) => ({
  // 'generic-vod': {
  //   enabled: true,
  //   resolve: './src/plugins/generic-vod'
  // },
  'import-export-entries': {
    enabled: true,
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
  upload: {
    config: {
      provider: 'strapi-provider-upload-oss', // full package name is required
      providerOptions: {
        accessKeyId: env('OSS_ACCESS_KEY_ID'),
        accessKeySecret: env('OSS_ACCESS_KEY_SECRET'),
        region: env('OSS_REGION'),
        bucket: env('OSS_BUCKET'),
        uploadPath: env('OSS_UPLOAD_PATH'),
        baseUrl: env('OSS_BASE_URL'),
        timeout: env('OSS_TIMEOUT'),
        secure: env('OSS_SECURE')
      }
    }
  }
});
