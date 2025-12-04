/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc/**',
      },
    ],
  },
};

module.exports = nextConfig;
