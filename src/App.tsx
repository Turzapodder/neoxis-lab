import React from 'react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { useLocation } from '@/hooks/useLocation';
import { useNavigationScroll } from '@/hooks/useNavigationScroll';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { resolveRoute, type Route } from '@/lib/router';
import { LandingPage } from '@/pages/LandingPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicy';
import { ProjectDetailsPage } from '@/pages/ProjectDetails';
import { TermsAndConditionsPage } from '@/pages/TermsAndConditions';

const Page: React.FC<{ route: Route }> = ({ route }) => {
  switch (route.name) {
    case 'project':
      return <ProjectDetailsPage projectId={route.projectId} />;
    case 'terms':
      return <TermsAndConditionsPage />;
    case 'privacy':
      return <PrivacyPolicyPage />;
    case 'home':
      return <LandingPage />;
  }
};

export const App: React.FC = () => {
  const location = useLocation();
  const route = resolveRoute(location.pathname);

  // Smooth scrolling starts before navigation scroll so page changes reset Lenis too
  useSmoothScroll();
  useNavigationScroll(location);

  return (
    <SiteLayout route={route}>
      <Page route={route} />
    </SiteLayout>
  );
};

export default App;
