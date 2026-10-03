import { ROUTES } from '@/constants/routes';
import { PRIVACY_META } from '@/data/privacy';
import { buildPageMetadata } from '@/lib/seo';
import { PrivacyPolicyPage } from '@/views/PrivacyPolicy';

export const metadata = buildPageMetadata({
  title: PRIVACY_META.title,
  description: PRIVACY_META.intro,
  path: ROUTES.privacy,
  tag: 'Legal',
});

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
