/** @type {import('next').NextConfig} */
import { i18n } from './next-i18next.config.mjs';

const nextConfig = {
  i18n,
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
