import { LandingPage } from '@/views/LandingPage';
import { ContentProvider } from '@/components/content/ContentProvider';
import { loadSiteContent } from '@/lib/cms-bridge';
import { faqJsonLd } from '@/lib/jsonld';

/**
 * Served from cache and rebuilt in the background at most every 5 minutes, instead of
 * hitting the database on every visit. Admin saves revalidate immediately
 * (see src/app/api/admin/sections/[key]/route.ts).
 */
export const revalidate = 300;

export default async function Home() {
  const content = await loadSiteContent();

  return (
    <ContentProvider content={content}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(content.faqs)) }}
      />
      <LandingPage />
    </ContentProvider>
  );
}
