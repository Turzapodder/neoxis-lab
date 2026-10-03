import { SiteLayout } from '@/components/layout/SiteLayout';

/** Public pages share the site chrome; /admin sits outside this group and keeps its own shell. */
export default function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
