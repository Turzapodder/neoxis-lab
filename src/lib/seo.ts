import type { Metadata } from 'next';
import type { ProjectDetail } from '@/types/content';
import { DEFAULT_TITLE, SITE } from '@/config/site';
import { PROJECT_DETAILS_MAP } from '@/data/projectDetails';

/**
 * Dynamic metadata builders shared by the home page and project pages.
 * Next.js merges these with the root layout metadata; page values win.
 */

export const absoluteUrl = (path = '/') => new URL(path, SITE.url).toString();

export const ogImageUrl = (params: {
  title: string;
  subtitle?: string;
  tag?: string;
}) => {
  const search = new URLSearchParams({
    title: params.title,
    ...(params.subtitle ? { subtitle: params.subtitle } : {}),
    ...(params.tag ? { tag: params.tag } : {}),
  });
  return absoluteUrl(`/api/og?${search.toString()}`);
};

export const buildProjectMetadata = (project: ProjectDetail): Metadata => ({
  title: `${project.title} — Case Study`,
  description: project.subtitle.replace(/^"|"$/g, ''),
  alternates: { canonical: `/project/${project.id}` },
  openGraph: {
    title: `${project.title} — ${SITE.name} Case Study`,
    description: project.subtitle.replace(/^"|"$/g, ''),
    url: absoluteUrl(`/project/${project.id}`),
    siteName: SITE.name,
    locale: SITE.locale,
    type: 'article',
    images: [
      {
        url: ogImageUrl({
          title: project.title,
          subtitle: project.service,
          tag: project.industry,
        }),
        width: 1200,
        height: 630,
        alt: `${project.title} — ${SITE.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${project.title} — ${SITE.name} Case Study`,
    description: project.subtitle.replace(/^"|"$/g, ''),
    images: [
      ogImageUrl({
        title: project.title,
        subtitle: project.service,
        tag: project.industry,
      }),
    ],
  },
});

/** Metadata for a standalone content page, such as the legal pages. */
export const buildPageMetadata = (page: {
  title: string;
  description: string;
  path: string;
  tag?: string;
}): Metadata => {
  const title = `${page.title} — ${SITE.name}`;
  const image = ogImageUrl({ title: page.title, subtitle: SITE.tagline, tag: page.tag });

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title,
      description: page.description,
      url: absoluteUrl(page.path),
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.description,
      images: [image],
    },
  };
};

export const HOME_METADATA: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'design agency',
    'digital studio',
    'brand identity',
    'web experiences',
    'creative lab',
    'neoxis',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    siteName: SITE.name,
    locale: SITE.locale,
    title: DEFAULT_TITLE,
    description: SITE.description,
    images: [
      {
        url: ogImageUrl({ title: 'neoxis®', subtitle: SITE.tagline, tag: 'Design Agency' }),
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: SITE.description,
    images: [ogImageUrl({ title: 'neoxis®', subtitle: SITE.tagline, tag: 'Design Agency' })],
  },
};

/** All known projects, for static generation of case-study pages. */
export const ALL_PROJECT_DETAILS = Object.values(PROJECT_DETAILS_MAP);
