import type { ProjectDetail } from '@/types/content';
import { SITE } from '@/config/site';

/**
 * JSON-LD structured data builders (schema.org).
 * Server-rendered into the HTML so crawlers and rich results pick them up.
 */

const absoluteUrl = (path: string) => new URL(path, SITE.url).toString();

/**
 * Social profiles you control. Add full profile URLs (https://dribbble.com/neoxis),
 * never bare network homepages: those tell Google the brand *is* twitter.com.
 */
const SOCIAL_PROFILE_URLS: string[] = [
  'https://twitter.com',
  'https://dribbble.com',
  'https://instagram.com',
  'https://facebook.com',
  'https://linkedin.com',
];

/** Keeps only real profile URLs (something after the domain). */
const realProfiles = (urls: string[]) => urls.filter((url) => new URL(url).pathname.replace(/\/+$/, '') !== '');
const sameAs = realProfiles(SOCIAL_PROFILE_URLS);

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  alternateName: SITE.shortName,
  legalName: `${SITE.name} Studio`,
  url: SITE.url,
  // Raster logo: Google's Organization logo guidelines ask for at least 112x112px.
  logo: absoluteUrl('/icons/icon-512.png'),
  image: absoluteUrl('/icons/icon-512.png'),
  email: SITE.email,
  description: SITE.description,
  foundingDate: SITE.founded,
  founder: {
    '@type': 'Person',
    name: SITE.founder,
  },
  /** Every real profile you control — this is what populates the panel's Profiles row. */
  ...(sameAs.length > 0 ? { sameAs } : {}),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: SITE.email,
    availableLanguage: 'English',
  },
});

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${SITE.shortName}® — Design Agency`,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
});

export const projectJsonLd = (project: ProjectDetail) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  headline: `${project.title} — ${SITE.name} Case Study`,
  description: project.subtitle.replace(/^"|"$/g, ''),
  url: absoluteUrl(`/project/${project.id}`),
  image: absoluteUrl(`/api/og?title=${encodeURIComponent(project.title)}`),
  datePublished: project.year,
  creator: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  },
  about: project.industry,
  keywords: [project.service, project.industry].filter(Boolean).join(', '),
});

/** Aggregate FAQ page schema from the landing FAQ section. */
export const faqJsonLd = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});
