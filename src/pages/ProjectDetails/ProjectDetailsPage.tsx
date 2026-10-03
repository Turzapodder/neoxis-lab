import React from 'react';
import { NextProjectBanner } from '@/components/sections/ProjectDetails/NextProjectBanner';
import { ProjectHeader } from '@/components/sections/ProjectDetails/ProjectHeader';
import { ProjectNarrative } from '@/components/sections/ProjectDetails/ProjectNarrative';
import { getProjectDetail } from '@/data/projectDetails';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

interface ProjectDetailsPageProps {
  projectId?: string;
}

/** Case study page for one project. */
export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ projectId }) => {
  const project = getProjectDetail(projectId);

  useDocumentTitle(`${project.title} — NeoXis Lab | Selected Work`);

  return (
    <main className="w-full">
      <ProjectHeader project={project} />
      <ProjectNarrative project={project} />
      <NextProjectBanner project={project} />
    </main>
  );
};
