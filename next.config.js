/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
