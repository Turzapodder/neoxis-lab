import type { ProjectDetail } from '@/types/content';
import { SITE } from '@/config/site';

/**
 * JSON-LD structured data builders (schema.org).
 * Server-rendered into the HTML so crawlers and rich results pick them up.
 */

const absoluteUrl = (path: string) => new URL(path, SITE.url).toString();

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  alternateName: SITE.shortName,
  legalName: `${SITE.name} Studio`,
  url: SITE.url,
  logo: absoluteUrl('/favicon.svg'),
  email: SITE.email,
  description: SITE.description,
  foundingDate: SITE.founded,
  founder: {
    '@type': 'Person',
    name: SITE.founder,
  },
  /** Every real profile you control — this is what populates the panel's Profiles row. */
  sameAs: [
    'https://twitter.com',
    'https://dribbble.com',
    'https://instagram.com',
    'https://facebook.com',
    'https://linkedin.com',
  ],
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
