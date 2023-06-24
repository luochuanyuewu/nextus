/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
