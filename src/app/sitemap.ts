import type { MetadataRoute } from 'next';
import { ROUTES, projectPath } from '@/constants/routes';
import { absoluteUrl } from '@/lib/seo';
import { getCmsContent } from '@/server/content';
import { PROJECT_DETAILS_MAP } from '@/data/projectDetails';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cms = await getCmsContent();

  // CMS projects first, plus any template-only ids so nothing 404s in the sitemap.
  const ids = [...new Set([...cms.projects.map((p) => p.id), ...Object.keys(PROJECT_DETAILS_MAP)])];

  return [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...ids.map((id) => ({
      url: absoluteUrl(projectPath(id)),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...[ROUTES.terms, ROUTES.privacy].map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
