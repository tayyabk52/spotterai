/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable standalone output for Vercel
  output: 'standalone',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

module.exports = nextConfig;
