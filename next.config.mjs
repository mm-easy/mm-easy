/** @type {import('next').NextConfig} */
import pkg from 'next-fonts';

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icnlbuaakhminucvvzcj.supabase.co'
      }
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  }
};

export default pkg(nextConfig);
