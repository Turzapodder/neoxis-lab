import { getCmsContent } from '@/server/content';
import type { SiteContent } from '@/components/content/ContentProvider';
import { SPACE_PROJECT_DETAIL, findProjectDetail } from '@/data/projectDetails';
import type { ProjectDetail } from '@/types/content';

/**
 * Server-side adapter: CMS view models → the SiteContent shape consumed by
 * the client ContentProvider. Field names already align; this keeps the cast
 * boundary in one auditable place.
 */
export async function loadSiteContent(): Promise<SiteContent> {
  const cms = await getCmsContent();
  return {
    projects: cms.projects as SiteContent['projects'],
    services: cms.services as SiteContent['services'],
    pricing: cms.pricing as SiteContent['pricing'],
    team: cms.team as SiteContent['team'],
    testimonials: cms.testimonials as SiteContent['testimonials'],
    faqs: cms.faqs as SiteContent['faqs'],
    hero: cms.hero as SiteContent['hero'],
    heroStats: cms.heroStats as SiteContent['heroStats'],
  };
}

/**
 * Case study for `id`. A project managed in the CMS shows its tile's title, category, year
 * and image over the bundled narrative for that id (or the Space template for projects added
 * in the CMS). Returns null when the id is neither in the CMS nor bundled.
 */
export function resolveProjectDetail(content: SiteContent, id: string): ProjectDetail | null {
  const template = findProjectDetail(id);
  const tile = content.projects.find((project) => project.id === id);
  if (!tile) return template ?? null;

  return {
    ...(template ?? SPACE_PROJECT_DETAIL),
    id: tile.id,
    title: tile.title.replace(/\.$/, ''),
    subtitle: `"${tile.category}"`,
    service: tile.category,
    industry: tile.year,
    year: tile.year,
    heroImage1: tile.image,
    heroImage2: tile.image,
    showcaseImage: tile.image,
  };
}
