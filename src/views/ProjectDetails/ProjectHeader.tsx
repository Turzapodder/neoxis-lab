import React from 'react';
import type { ProjectDetail } from '@/types/content';

interface ProjectHeaderProps {
  project: ProjectDetail;
}

/**
 * Project Header Section modeled directly from:
 * https://unusually.webflow.io/project/space
 * - Top 2-column grid: Large H1 + dividing line + quote description alongside Hero Image 1
 * - 4-column Meta Dock (Service, Industry, Year, View Live with dual-sliding diagonal arrow)
 * - Full-width showcase hero image 2 with rounded glass frame and scale zoom
 */
export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <header className="relative w-full pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* 1. TOP GRID: Title + Description on Left, Top Showcase Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Title, dividing line, quote */}
          <div className="flex flex-col justify-between h-full py-2">
            <div>
              <h1 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold tracking-tight text-neutral-950 uppercase leading-[0.92] select-none">
                {project.title}
              </h1>
            </div>

            <div className="w-full h-px bg-neutral-200/90 my-8 sm:my-10 lg:my-12" />

            <div className="max-w-xl">
              <p className="font-neue text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed font-normal">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Right Column: Hero Image 1 in rounded card frame */}
          <div className="group relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[380px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-100 border border-black/[0.08] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
            <img
              src={project.heroImage1}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </div>
        </div>

        {/* 2. SPACER */}
        <div className="h-10 sm:h-14 lg:h-16" />

        {/* 3. 4-COLUMN META DOCK (project-info-grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Item 1: Service */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <span className="font-neue text-xs sm:text-[13px] font-medium text-neutral-400 uppercase tracking-wider">
              Service:
            </span>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">
              {project.service}
            </span>
          </div>

          {/* Item 2: Industry */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <span className="font-neue text-xs sm:text-[13px] font-medium text-neutral-400 uppercase tracking-wider">
              Industry:
            </span>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">
              {project.industry}
            </span>
          </div>

          {/* Item 3: Year */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <span className="font-neue text-xs sm:text-[13px] font-medium text-neutral-400 uppercase tracking-wider">
              Year:
            </span>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">
              {project.year}
            </span>
          </div>

          {/* Item 4: View Live Link with animated text roll, sliding arrow, and underline */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <span className="font-neue text-xs sm:text-[13px] font-medium text-neutral-400 uppercase tracking-wider">
              View Live:
            </span>

            <a
              href={project.liveUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link relative inline-flex items-center gap-1.5 font-clash text-sm sm:text-base font-semibold text-neutral-950 select-none cursor-pointer"
            >
              {/* Dual rolling text */}
              <span className="relative h-5 overflow-hidden flex flex-col justify-start">
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-full">
                  {project.liveLabel || project.title}
                </span>
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-full text-neutral-500">
                  {project.liveLabel || project.title}
                </span>
              </span>

              {/* Dual sliding diagonal arrow */}
              <span className="relative w-4 h-4 overflow-hidden shrink-0">
                {/* Arrow 1: starts at 0, slides up-right on hover */}
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-full group-hover/link:-translate-y-full">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                  </svg>
                </span>
                {/* Arrow 2: starts bottom-left, slides to center on hover */}
                <span className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-0 group-hover/link:translate-y-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                  </svg>
                </span>
              </span>

              {/* Sliding underline */}
              <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-neutral-950 scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100" />
            </a>
          </div>
        </div>

        {/* 4. SPACER */}
        <div className="h-6 sm:h-8 lg:h-10" />

        {/* 5. FULL-WIDTH HERO SHOWCASE IMAGE 2 */}
        <div className="group relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.3/1] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-neutral-900 border border-black/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.09)]">
          <img
            src={project.heroImage2}
            alt={`${project.title} Showcase`}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </header>
  );
};
