/**
 * Single source of truth for brand identity, canonical URLs and SEO defaults.
 * Update SITE_URL when deploying — every canonical, sitemap and OG image derives from it.
 */
export const SITE = {
  name: 'NeoXis Lab',
  shortName: 'neoxis',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://neoxis.design',
  tagline: 'Creative Lab // Digital First',
  description:
    'We create digital experiences that are beautiful, functional, and built to make an impact. Branding, web, motion & product design for ambitious teams.',
  email: 'hello@neoxis.design',
  locale: 'en_US',
  twitter: '@neoxis',
  /** Used in Organization JSON-LD — feed Google the facts for its Knowledge Panel. */
  founder: 'NeoXis Lab',
  founded: '2023',
  logo: '/favicon.svg',
} as const;

/** SEO-optimized default title: ~55 chars, keyword-rich, brand at the front. */
export const DEFAULT_TITLE = 'neoxis® — Creative Design Agency for Digital Experiences';
