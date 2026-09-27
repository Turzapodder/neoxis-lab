import React from 'react';
import type { ProjectDetail } from '@/types/content';

interface NextProjectBannerProps {
  project: ProjectDetail;
  onNavigateProject: (id: string) => void;
  onNavigateHome: (sectionId?: string) => void;
}

/**
 * Next Project Transition Section matching:
 * https://unusually.webflow.io/project/space
 * - Subtitle ticker with asterisk icon and continuous "Next Project — " marquee loop
 * - Heading: "Explore Next" with dual tone (white / secondary gray)
 * - Next Project pill button with dual rolling text and rotating star icon
 * - "All Projects" underline link with dual rolling text and sliding diagonal arrow
 */
export const NextProjectBanner: React.FC<NextProjectBannerProps> = ({
  project,
  onNavigateProject,
  onNavigateHome,
}) => {
  return (
    <section className="relative w-full bg-[var(--color-canvas-bg)] pt-12 sm:pt-16 md:pt-20 transition-colors duration-500">
      <div className="p-1.5 sm:p-2">
        <div className="relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-neutral-950 text-white overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 py-14 sm:py-20 lg:py-24 flex flex-col items-center justify-center text-center">
            {/* 1. SUBTITLE MARQUEE TICKER */}
          <div className="relative z-10 inline-flex items-center gap-2.5 w-56 sm:w-64 mb-6 select-none overflow-hidden">
            {/* Asterisk Icon */}
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-neutral-400" viewBox="0 0 78 83" fill="currentColor">
              <path d="M32.7 31.8V5.4H44.3V31.8H32.7ZM26.9 41.8L4.1 28.6L9.9 18.6L32.6 31.8L26.9 41.8ZM49.9 41.8L44.3 31.9L67.1 18.6L72.9 28.6L49.9 41.8ZM67.1 65L44.1 51.8L49.9 41.9L72.9 55L67.1 65ZM9.9 65L4.1 55L26.9 41.9L32.7 51.8L9.9 65ZM32.7 78.2V51.9H44.1V78.2H32.7Z" />
            </svg>

            {/* Masked Marquee */}
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_15%,black_85%,transparent_100%)]">
              <div className="flex whitespace-nowrap animate-[marquee_12s_linear_infinite] will-change-transform text-[11px] sm:text-xs font-neue font-medium tracking-[0.18em] text-neutral-400 uppercase">
                <span>Next Project —&nbsp;</span>
                <span>Next Project —&nbsp;</span>
                <span>Next Project —&nbsp;</span>
                <span>Next Project —&nbsp;</span>
                <span>Next Project —&nbsp;</span>
                <span>Next Project —&nbsp;</span>
              </div>
            </div>
          </div>

          {/* 2. BIG DISPLAY HEADING */}
          <h2 className="relative z-10 font-clash text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95] mb-8 sm:mb-12 select-none">
            <span className="text-white">Explore</span>{' '}
            <span className="text-neutral-500">Next</span>
          </h2>

          {/* 3. BUTTON ACTION GROUP */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {/* Primary Next Project Button */}
            <button
              type="button"
              onClick={() => onNavigateProject(project.nextProject.id)}
              className="group/btn relative inline-flex items-center gap-3.5 bg-white hover:bg-neutral-100 text-neutral-950 pl-7 pr-2.5 py-2.5 rounded-full font-clash font-semibold text-sm sm:text-base transition-all duration-300 shadow-xl active:scale-95 cursor-pointer"
            >
              {/* Dual rolling text */}
              <div className="relative h-5 overflow-hidden flex flex-col justify-start">
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-full">
                  {project.nextProject.title}
                </span>
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-full text-neutral-600">
                  {project.nextProject.title}
                </span>
              </div>

              {/* Rotating Star Icon Circle */}
              <div className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover/btn:rotate-90 transition-transform duration-500 shadow-sm">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z" />
                </svg>
              </div>
            </button>

            {/* Secondary "All Projects" Underline Link with sliding diagonal arrow */}
            <button
              type="button"
              onClick={() => onNavigateHome('selected-work')}
              className="group/link relative inline-flex items-center gap-2 font-clash font-semibold text-sm sm:text-base text-white select-none cursor-pointer py-2"
            >
              {/* Dual rolling text */}
              <span className="relative h-5 overflow-hidden flex flex-col justify-start">
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-full">
                  All Projects
                </span>
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-full text-neutral-400">
                  All Projects
                </span>
              </span>

              {/* Dual sliding diagonal arrow */}
              <span className="relative w-4 h-4 overflow-hidden shrink-0">
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-full group-hover/link:-translate-y-full">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                  </svg>
                </span>
                <span className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-0 group-hover/link:translate-y-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                  </svg>
                </span>
              </span>

              {/* Underline slide */}
              <span className="absolute left-0 bottom-1 w-full h-[1.5px] bg-white scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
