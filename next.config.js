/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  // swcMinify: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mye-commerce.storage.iran.liara.space',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig

// mye-commerce.storage.iran.liara.space
