/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true, // allow <Image> to show svg.
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: '127.0.0.1',
      },
      {
        hostname: '*.yuewu.dev',
      },
      {
        hostname: '*.aliyuncs.com',
      },
    ],
  },
  // transpilePackages: ['react-daisyui'],
  // reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
)

module.exports = withNextIntl(nextConfig)
