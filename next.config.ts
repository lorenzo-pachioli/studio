import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    APIKEY: process.env.API_KEY,
    SECRET: process.env.SECRET,
    MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'sxxrjsh6-3000.brs.devtunnels.ms',
        'https://sxxrjsh6-3000.brs.devtunnels.ms'
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
