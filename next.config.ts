import type { NextConfig } from 'next';
import { fileURLToPath, URL } from 'url';

/** Pages that must never appear in search results. */
const NOINDEX_PATHS = ['/admin/:path*', '/api/:path*'];

const nextConfig: NextConfig = {
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  images: {
    // AVIF first (smallest), WebP fallback; the original format only for very old browsers.
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
    // Seed images rarely change and Cloudinary URLs are versioned, so cache optimized
    // output for 31 days (also sent to browsers as max-age).
    minimumCacheTTL: 2678400,
    // CMS uploads. Keep in sync with OPTIMIZED_HOSTS in src/components/ui/SmartImage.tsx.
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
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
        // Public pages only; some crawlers honour the HTTP header over the meta tag.
        source: '/((?!admin|api).*)',
        headers: [{ key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' }],
      },
      ...NOINDEX_PATHS.map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      })),
    ];
  },
};

export default nextConfig;
