/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icnlbuaakhminucvvzcj.supabase.co'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
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

export default nextConfig;
