/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
    ],
  },
  experimental: {
    urlImports: ["https://themer.sanity.build/"],
  },
};

module.exports = nextConfig;
