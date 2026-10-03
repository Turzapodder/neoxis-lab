import { LandingPage } from '@/views/LandingPage';
import { ContentProvider } from '@/components/content/ContentProvider';
import { loadSiteContent } from '@/lib/cms-bridge';
import { faqJsonLd } from '@/lib/jsonld';

export const dynamic = 'force-dynamic';

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
