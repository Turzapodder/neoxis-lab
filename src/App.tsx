import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/pages/LandingPage';
import { ProjectDetailsPage } from '@/pages/ProjectDetails';
import { TermsAndConditionsPage } from '@/pages/TermsAndConditions';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicy';

export const App: React.FC = () => {
  const [locationState, setLocationState] = useState(() => {
    if (typeof window === 'undefined') {
      return { path: '/', hash: '' };
    }
    return {
      path: window.location.pathname.toLowerCase(),
      hash: window.location.hash || '',
    };
  });

  useEffect(() => {
    const onLocationChange = () => {
      setLocationState({
        path: window.location.pathname.toLowerCase(),
        hash: window.location.hash || '',
      });
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  const path = locationState.path;
  const hash = locationState.hash;

  // 1. Project view checks (/project/:id or #project/:id)
  const isProjectView = path.startsWith('/project') || hash.startsWith('#project');
  const projectId = isProjectView
    ? (path.startsWith('/project')
        ? path.replace('/project/', '').replace('/project', '').trim()
        : hash.replace('#project/', '').replace('#project', '').trim()) || 'space'
    : null;

  // 2. Terms & Conditions checks (/terms-and-conditions, /terms, or #terms)
  const isTermsView =
    path === '/terms-and-conditions' ||
    path === '/terms-and-conditions/' ||
    path === '/terms' ||
    path === '/terms/' ||
    path.startsWith('/terms-') ||
    path.startsWith('/terms/') ||
    hash === '#terms' ||
    hash.startsWith('#terms-') ||
    hash.startsWith('#terms/');

  // 3. Privacy Policy checks (/privacy-policy, /privacy, or #privacy)
  const isPrivacyView =
    path === '/privacy-policy' ||
    path === '/privacy-policy/' ||
    path === '/privacy' ||
    path === '/privacy/' ||
    path.startsWith('/privacy-') ||
    path.startsWith('/privacy/') ||
    hash === '#privacy' ||
    hash.startsWith('#privacy-') ||
    hash.startsWith('#privacy/');

  const navigateToProject = (id: string) => {
    window.history.pushState({}, '', `/project/${id}`);
    setLocationState({ path: `/project/${id}`.toLowerCase(), hash: '' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToTerms = () => {
    window.history.pushState({}, '', '/terms-and-conditions');
    setLocationState({ path: '/terms-and-conditions', hash: '' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToPrivacy = () => {
    window.history.pushState({}, '', '/privacy-policy');
    setLocationState({ path: '/privacy-policy', hash: '' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = (sectionId?: string) => {
    if (sectionId) {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState({}, '', `/#${sectionId}`);
        setLocationState({ path: '/', hash: `#${sectionId}` });
      } else {
        window.location.hash = `#${sectionId}`;
        setLocationState({ path: '/', hash: `#${sectionId}` });
      }
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.history.pushState({}, '', '/');
      setLocationState({ path: '/', hash: '' });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  if (isProjectView) {
    return (
      <ProjectDetailsPage
        projectId={projectId || 'space'}
        onNavigateHome={navigateToHome}
        onNavigateProject={navigateToProject}
        onNavigateTerms={navigateToTerms}
        onNavigatePrivacy={navigateToPrivacy}
      />
    );
  }

  if (isTermsView) {
    return (
      <TermsAndConditionsPage
        onNavigateHome={navigateToHome}
        onNavigateTerms={navigateToTerms}
        onNavigatePrivacy={navigateToPrivacy}
      />
    );
  }

  if (isPrivacyView) {
    return (
      <PrivacyPolicyPage
        onNavigateHome={navigateToHome}
        onNavigateTerms={navigateToTerms}
        onNavigatePrivacy={navigateToPrivacy}
      />
    );
  }

  return (
    <LandingPage
      onNavigateHome={navigateToHome}
      onNavigateProject={navigateToProject}
      onNavigateTerms={navigateToTerms}
      onNavigatePrivacy={navigateToPrivacy}
    />
  );
};

export default App;
