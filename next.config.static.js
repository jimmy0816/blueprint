/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*"]
    }
  }
};

module.exports = nextConfig;
