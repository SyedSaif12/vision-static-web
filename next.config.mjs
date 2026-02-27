/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vision-tech-bucket.s3.eu-north-1.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
