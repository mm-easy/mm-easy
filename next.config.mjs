/** @type {import('next').NextConfig} */
<<<<<<< HEAD
// import { i18n } from './next-i18next.config.mjs';

const nextConfig = {
  // i18n,
=======

const nextConfig = {
>>>>>>> 114d7b1b39a0f0efea22bc0149485b65d75c90c8
  reactStrictMode: false,
  images: {
    domains: ['icnlbuaakhminucvvzcj.supabase.co', 'via.placeholder.com']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  }
};

export default nextConfig;
