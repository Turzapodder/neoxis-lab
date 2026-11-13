import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Social preview cards (/api/og) stay reachable; the CMS and other endpoints do not.
      allow: ['/', '/api/og'],
      disallow: ['/admin', '/api/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
