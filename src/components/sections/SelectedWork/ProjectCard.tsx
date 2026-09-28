import React from 'react';
import type { SelectedProject } from '@/types/content';
import { ProjectLogo } from './ProjectLogo';

interface ProjectCardProps {
  project: SelectedProject;
  onSelect?: (project: SelectedProject) => void;
}

/**
 * Project Case Study Card matching unusually.webflow.io:
 * - Frosted glass card container
 * - Header pill with title, bullet, category, and dual-sliding animated arrow
 * - Image frame with scale-up hover zoom
 * - Center logo pill with dual vertical rolling logo animation
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect?.(project)}
      className="group relative w-full cursor-pointer select-none rounded-[26px] sm:rounded-[32px] p-2.5 sm:p-3.5 lg:p-4 transition-all duration-500"
    >
      {/* Background Glass Panel */}
      <div className="absolute inset-0 rounded-[26px] sm:rounded-[32px] bg-white/80 backdrop-blur-2xl border border-black/[0.08] shadow-[0_15px_45px_-10px_rgba(0,0,0,0.05)] group-hover:border-black/20 group-hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 pointer-events-none" />

      {/* Relative Content Container */}
      <div className="relative z-10 flex flex-col">
        {/* Top Header Pill */}
        <div className="flex items-center justify-between gap-3 rounded-[18px] sm:rounded-[20px] bg-black/[0.035] border border-black/[0.06] py-2 sm:py-2.5 px-3.5 sm:px-4 mb-2.5 sm:mb-3.5 group-hover:bg-black/[0.05] transition-colors duration-300">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="font-clash text-xs sm:text-sm md:text-[15px] font-bold tracking-wider text-neutral-950 uppercase truncate">
              {project.title.replace(/\.$/, '')}
            </span>
            <span className="text-neutral-400 text-xs sm:text-sm font-bold shrink-0">•</span>
            <span className="font-neue text-[11px] sm:text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-wider truncate">
              {project.category}
            </span>
          </div>

          {/* Interactive Arrow Button with Dual Sliding Animation */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/[0.04] border border-black/10 flex items-center justify-center shrink-0 overflow-hidden text-neutral-900 group-hover:scale-105 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300 shadow-sm">
            <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 overflow-hidden">
              {/* Arrow 1: slides out to right on hover */}
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z" />
                </svg>
              </span>
              {/* Arrow 2: slides in from left on hover */}
              <span className="absolute inset-0 flex items-center justify-center -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Project Image Frame */}
        <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-950 shadow-inner">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-85" />

          {/* Centered Logo with Vertical Rolling Animation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
            <div className="rounded-2xl px-6 sm:px-7 py-3 sm:py-3.5 bg-black/45 backdrop-blur-md border border-white/20 shadow-2xl">
              <div className="relative h-6 sm:h-7 md:h-8 flex flex-col overflow-hidden">
                {/* Logo 1: moves up out of view on hover */}
                <div className="h-full flex items-center justify-center shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                  <ProjectLogo type={project.logoType} />
                </div>
                {/* Logo 2: moves up into view from below on hover */}
                <div className="h-full flex items-center justify-center shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                  <ProjectLogo type={project.logoType} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
