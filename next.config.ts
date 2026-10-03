import type { NextConfig } from 'next';
import { fileURLToPath, URL } from 'url';

const nextConfig: NextConfig = {
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  // Short legal URLs resolve to the canonical pages
  async redirects() {
    return [
      { source: '/terms', destination: '/terms-and-conditions', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // Some crawlers honour the HTTP header over the meta tag.
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
