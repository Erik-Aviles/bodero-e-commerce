/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.unsplash.com", "bodero-ecommence-admin.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
