/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "galore-mobile-bucket.s3.eu-central-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
