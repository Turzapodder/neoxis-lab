import React, { useEffect, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { ConnectModal } from '@/components/modals/ConnectModal';
import { MenuModal } from '@/components/modals/MenuModal';
import { PROJECT_DETAILS_MAP, SPACE_PROJECT_DETAIL } from '@/data/projectDetails';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Navbar } from '@/components/layout/Navbar';
import { ProjectHeader } from './ProjectHeader';
import { ProjectNarrative } from './ProjectNarrative';
import { NextProjectBanner } from './NextProjectBanner';

interface ProjectDetailsPageProps {
  projectId?: string;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateProject: (id: string) => void;
}

export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  projectId = 'space',
  onNavigateHome,
  onNavigateProject,
}) => {
  const menu = useDisclosure();
  const connect = useDisclosure();
  const pageRef = useRef<HTMLDivElement>(null);

  const project = PROJECT_DETAILS_MAP[projectId] || SPACE_PROJECT_DETAIL;

  // Scroll to top and set document title whenever project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const originalTitle = document.title;
    document.title = `${project.title} — NeoXis Lab | Selected Work`;
    return () => {
      document.title = originalTitle;
    };
  }, [project]);

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-screen bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] selection:bg-purple-500/25 selection:text-current transition-colors duration-300 overflow-x-clip"
    >
      {/* Same Navbar as Landing Page */}
      <Navbar
        activeTab="Project"
        variant="light"
        onSelectTab={(tab) => {
          if (tab.target) onNavigateHome(tab.target);
          else onNavigateHome();
        }}
        onLogoClick={() => onNavigateHome()}
        onOpenMenu={menu.open}
        className="sticky top-0 z-50 bg-[var(--color-canvas-bg)]/85 backdrop-blur-md transition-all duration-300"
      />

      {/* Main Case Study Content Container */}
      <main className="w-full">
        {/* 1. Project Header (Title, Subtitle, Meta Dock, Showcase Media) */}
        <ProjectHeader project={project} />

        {/* 2. Project Narrative (Sticky Purpose, Split Grids, Achieved Goals, Testimonial) */}
        <ProjectNarrative project={project} />

        {/* 3. Next Project Transition Banner (Explore Next Marquee + Interactive CTA) */}
        <NextProjectBanner
          project={project}
          onNavigateProject={onNavigateProject}
          onNavigateHome={onNavigateHome}
        />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      <ConnectModal isOpen={connect.isOpen} onClose={connect.close} />
      <MenuModal isOpen={menu.isOpen} onClose={menu.close} />
    </div>
  );
};
