/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wegot-bucket.sfo2.digitaloceanspaces.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
