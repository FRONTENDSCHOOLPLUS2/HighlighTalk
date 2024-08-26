/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fesp.shop',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.kakaousercontent.com',
        pathname: '**',
      },
    ],
    domains: ['k.kakaocdn.net'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
