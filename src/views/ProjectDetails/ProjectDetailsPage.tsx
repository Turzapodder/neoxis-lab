'use client';

import React from 'react';
import { NextProjectBanner } from '@/components/sections/ProjectDetails/NextProjectBanner';
import { ProjectHeader } from '@/components/sections/ProjectDetails/ProjectHeader';
import { ProjectNarrative } from '@/components/sections/ProjectDetails/ProjectNarrative';
import type { ProjectDetail } from '@/types/content';

interface ProjectDetailsPageProps {
  project: ProjectDetail;
}

/** Case study page for one project. */
export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ project }) => (
  <div className="w-full">
    <ProjectHeader project={project} />
    <ProjectNarrative project={project} />
    <NextProjectBanner project={project} />
  </div>
);
