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
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
