import type { MetadataRoute } from 'next';
import { SITE } from '@/config/site';

/**
 * Web app manifest (served automatically at /manifest.webmanifest).
 * Uses the brand bolt icon so the site installs cleanly as a PWA and shows
 * a proper icon in Android/Chrome UI surfaces.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    id: '/',
    start_url: '/',
    display: 'browser',
    background_color: '#F8F9FC',
    theme_color: '#7E14FF',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
