'use client';

import React, { useRef } from 'react';
import { NextProjectBanner } from '@/components/sections/ProjectDetails/NextProjectBanner';
import { ProjectGoals } from '@/components/sections/ProjectDetails/ProjectGoals';
import { ProjectHero } from '@/components/sections/ProjectDetails/ProjectHero';
import { ProjectPurpose } from '@/components/sections/ProjectDetails/ProjectPurpose';
import { ProjectStatement } from '@/components/sections/ProjectDetails/ProjectStatement';
import { ProjectTestimonial } from '@/components/sections/ProjectDetails/ProjectTestimonial';
import { useProjectPageAnimation } from '@/components/sections/ProjectDetails/useProjectPageAnimation';
import { useScrollTriggerAutoRefresh } from '@/hooks/useScrollTriggerAutoRefresh';
import { useSectionTransitions } from '@/hooks/useSectionTransitions';
import type { ProjectDetail } from '@/types/content';

interface ProjectDetailsPageProps {
  project: ProjectDetail;
}

/**
 * Case study page for one project. Text is split for animation, so render it with a
 * `key` of the project id: switching projects then remounts instead of patching split text.
 */
export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ project }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useSectionTransitions(pageRef);
  useProjectPageAnimation(pageRef);
  useScrollTriggerAutoRefresh(pageRef);

  return (
    <div ref={pageRef} className="w-full">
      <ProjectHero project={project} />
      <ProjectStatement project={project} />
      <ProjectPurpose project={project} />
      <ProjectGoals project={project} />
      <ProjectTestimonial project={project} />
      <NextProjectBanner project={project} />
    </div>
  );
};
