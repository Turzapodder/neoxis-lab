import { ROUTES } from '@/constants/routes';
import { TERMS_META } from '@/data/terms';
import { buildPageMetadata } from '@/lib/seo';
import { TermsAndConditionsPage } from '@/views/TermsAndConditions';

export const metadata = buildPageMetadata({
  title: TERMS_META.title,
  description: TERMS_META.intro,
  path: ROUTES.terms,
  tag: 'Legal',
});

export default function TermsAndConditions() {
  return <TermsAndConditionsPage />;
}
