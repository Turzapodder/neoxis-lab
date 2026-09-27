import React from 'react';
import { SectionTag } from '@/components/ui/SectionTag';
import { FEATURED_PROJECT_COUNT, SELECTED_PROJECTS } from '@/data/projects';
import type { SelectedProject } from '@/types/content';
import { ProjectTile } from './ProjectTile';

const featuredProjects = SELECTED_PROJECTS.slice(0, FEATURED_PROJECT_COUNT);
const otherProjects = SELECTED_PROJECTS.slice(FEATURED_PROJECT_COUNT);

interface SelectedWorkSectionProps {
  onSelectProject?: (project: SelectedProject) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => (
  <section className="relative w-full bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] py-16 sm:py-20 md:py-24 transition-colors duration-500">
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      {/* 1. SECTION HEADER */}
      <div className="pb-10 sm:pb-12 md:pb-14">
        <SectionTag className="text-neutral-600 mb-3 sm:mb-4">Proof of work</SectionTag>

        <div className="flex items-start gap-2.5 sm:gap-3 select-none">
          <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.04]">
            Selected Work.
          </h2>
          <span className="font-neue text-base sm:text-xl md:text-2xl font-normal text-neutral-400 mt-0.5 sm:mt-1">
            ({SELECTED_PROJECTS.length})
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4 pt-1">
          <p className="font-neue text-sm sm:text-base text-neutral-500 font-normal max-w-[480px] leading-relaxed">
            From hyper-growth startups to culture-defining brands — peep some of our favorite recent drops.
          </p>
          <span className="font-mono text-xs sm:text-sm text-neutral-400 tracking-wider select-none shrink-0">20-25©</span>
        </div>
      </div>

      {/* 2. FEATURED ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-10">
        {featuredProjects.map((project) => (
          <ProjectTile
            key={project.id}
            project={project}
            className={project.colSpanClass}
            heightClass="h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px]"
            onSelect={onSelectProject}
          />
        ))}
      </div>

      {/* 3. REMAINING PROJECTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {otherProjects.map((project) => (
          <ProjectTile
            key={project.id}
            project={project}
            heightClass="h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px]"
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </div>
  </section>
);
