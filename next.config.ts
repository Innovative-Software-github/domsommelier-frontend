import type { NextConfig } from 'next';

const backendHost = process.env.BROWSER_BACKEND_SERVER || '194.87.190.20:8080';
const backendBaseUrl = (backendHost.startsWith('http')
  ? backendHost
  : `http://${backendHost}`).replace(/\/+$/, '');

const nextConfig: NextConfig = {
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
