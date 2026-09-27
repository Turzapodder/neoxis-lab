import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/pages/LandingPage';
import { ProjectDetailsPage } from '@/pages/ProjectDetails';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.hash || '#' : '#';
  });

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash || '#');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isProjectView = currentHash.startsWith('#project');
  const projectId = isProjectView
    ? currentHash.replace('#project/', '').replace('#project', '').trim() || 'space'
    : null;

  const navigateToProject = (id: string) => {
    window.location.hash = `#project/${id}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = (sectionId?: string) => {
    if (sectionId) {
      window.location.hash = `#${sectionId}`;
    } else {
      window.location.hash = '#';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  if (isProjectView) {
    return (
      <ProjectDetailsPage
        projectId={projectId || 'space'}
        onNavigateHome={navigateToHome}
        onNavigateProject={navigateToProject}
      />
    );
  }

  return <LandingPage onNavigateProject={navigateToProject} />;
};

export default App;
