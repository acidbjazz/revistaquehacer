/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/d94szfse8f33/**",
      },
    ],
  },
};

module.exports = nextConfig;
