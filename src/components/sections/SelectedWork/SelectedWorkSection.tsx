import React, { useRef } from 'react';
import { SELECTED_PROJECTS } from '@/data/projects';
import type { SelectedProject } from '@/types/content';
import { ProjectCard } from './ProjectCard';
import { useProjectStackAnimation } from './useProjectStackAnimation';

interface SelectedWorkSectionProps {
  onSelectProject?: (project: SelectedProject) => void;
}

const featuredProjects = SELECTED_PROJECTS.slice(0, 4);
const row1Projects = featuredProjects.slice(0, 2);
const row2Projects = featuredProjects.slice(2, 4);

/**
 * Selected Work Section matching "section-home-projects" from unusually.webflow.io:
 * - Subtitle marquee with asterisk & masked continuous loop
 * - Heading: "Selected work©" + right-aligned project counter "(04)"
 * - 3D Perspective Card Deck: Row 1 sticks and recedes into 3D space as Row 2 stacks on top
 * - Interactive Case Study Cards with dual-sliding arrow and dual-rolling logo badges
 * - Bottom "All Projects" pill button with vertical rolling text animation
 * - Canvas background preserved as requested
 */
export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useProjectStackAnimation({
    containerRef,
    row1Ref,
    row2Ref,
  });

  return (
    <section className="relative w-full bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] py-20 sm:py-24 md:py-32 transition-colors duration-500 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* 1. TOP HEADER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end justify-between gap-6 pb-12 sm:pb-16 md:pb-20">
          <div className="flex flex-col items-start">
            {/* Subtitle Marquee Component */}
            <div className="inline-flex items-center gap-2.5 w-60 sm:w-72 mb-4 sm:mb-6 select-none overflow-hidden">
              {/* Asterisk Icon */}
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-neutral-400" viewBox="0 0 78 83" fill="currentColor">
                <path d="M32.7 31.8V5.4H44.3V31.8H32.7ZM26.9 41.8L4.1 28.6L9.9 18.6L32.6 31.8L26.9 41.8ZM49.9 41.8L44.3 31.9L67.1 18.6L72.9 28.6L49.9 41.8ZM67.1 65L44.1 51.8L49.9 41.9L72.9 55L67.1 65ZM9.9 65L4.1 55L26.9 41.9L32.7 51.8L9.9 65ZM32.7 78.2V51.9H44.1V78.2H32.7Z" />
              </svg>

              {/* Masked Marquee Ticker */}
              <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_15%,black_85%,transparent_100%)]">
                <div className="flex whitespace-nowrap animate-[marquee_14s_linear_infinite] will-change-transform text-[11px] sm:text-xs font-neue font-medium tracking-[0.18em] text-neutral-500 uppercase">
                  <span>Our Portfolio —&nbsp;</span>
                  <span>Our Portfolio —&nbsp;</span>
                  <span>Our Portfolio —&nbsp;</span>
                  <span>Our Portfolio —&nbsp;</span>
                  <span>Our Portfolio —&nbsp;</span>
                  <span>Our Portfolio —&nbsp;</span>
                </div>
              </div>
            </div>

            {/* Display Heading */}
            <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold tracking-tight leading-[0.92] select-none text-neutral-950 uppercase">
              Selected
              <br />
              <span className="text-neutral-400 font-bold lowercase tracking-normal">work©</span>
            </h2>
          </div>

          {/* Right Counter */}
          <div className="font-clash text-3xl sm:text-5xl md:text-6xl text-neutral-400 font-light select-none pb-1 sm:pb-3">
            ({String(featuredProjects.length).padStart(2, '0')})
          </div>
        </div>

        {/* 2. 3D PERSPECTIVE STACKING PROJECT DECK */}
        <div ref={containerRef} className="relative flex flex-col [perspective:1200px]">
          {/* ROW 1: Sticky 3D Receding Layer */}
          <div
            ref={row1Ref}
            className="md:sticky md:top-24 lg:md:top-28 z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 will-change-transform"
          >
            {row1Projects.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={onSelectProject} />
            ))}
          </div>

          {/* ROW 2: Glides over Row 1 with smooth overlap */}
          <div
            ref={row2Ref}
            className="relative z-20 mt-5 sm:mt-6 md:mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
          >
            {row2Projects.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={onSelectProject} />
            ))}
          </div>
        </div>

        {/* 3. BOTTOM "ALL PROJECTS" BUTTON WITH DUAL ROLLING TEXT */}
        <div className="flex justify-center pt-16 sm:pt-24">
          <button
            type="button"
            onClick={() => onSelectProject?.(featuredProjects[0])}
            className="group/btn relative inline-flex items-center gap-3.5 bg-neutral-950 hover:bg-neutral-850 text-white pl-7 pr-2.5 py-2.5 rounded-full font-clash font-semibold text-sm transition-all duration-300 shadow-xl active:scale-95 cursor-pointer"
          >
            {/* Dual rolling text */}
            <div className="relative h-5 overflow-hidden flex flex-col justify-start">
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-full">
                All Projects
              </span>
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-full text-white/80">
                All Projects
              </span>
            </div>

            {/* Rotating Star Icon Circle */}
            <div className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center group-hover/btn:rotate-90 transition-transform duration-500 shadow-sm">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
