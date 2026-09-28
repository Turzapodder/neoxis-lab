import { getCmsContent } from '@/server/content';
import type { SiteContent } from '@/components/content/ContentProvider';

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
