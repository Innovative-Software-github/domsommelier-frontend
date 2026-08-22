import type { NextConfig } from 'next';

const backendHost = process.env.BROWSER_BACKEND_SERVER || '194.87.190.20:8080';
const backendBaseUrl = (backendHost.startsWith('http')
  ? backendHost
  : `http://${backendHost}`).replace(/\/+$/, '');

const nextConfig: NextConfig = {
  // Самодостаточная сборка для Docker — .next/standalone содержит только
  // нужные зависимости и свой server.js, без node_modules целиком.
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api-back/:path*',
        destination: `${backendBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
