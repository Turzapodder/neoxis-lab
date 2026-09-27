import React from 'react';

import neonFrameImg from '../assets/images/work/neon-frame.jpg';
import musicOsImg from '../assets/images/work/music-os.jpg';
import botlyAppImg from '../assets/images/work/botly-app.jpg';
import cureaStudioImg from '../assets/images/work/curea-studio.jpg';
import sosIdentityImg from '../assets/images/work/sos-identity.jpg';

export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  year: string;
  category: string;
  image: string;
  aspectClass?: string;
  colSpanClass?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'neon-frame-system',
    num: '01.',
    title: 'Neon Frame System.',
    year: '2025',
    category: 'Interactive Web Platform',
    image: neonFrameImg,
    colSpanClass: 'lg:col-span-7 xl:col-span-8',
  },
  {
    id: 'music-os-ai',
    num: '02.',
    title: 'Music OS AI.',
    year: '2024',
    category: 'Brand & Visual Identity',
    image: musicOsImg,
    colSpanClass: 'lg:col-span-5 xl:col-span-4',
  },
  {
    id: 'botly-port-app',
    num: '03.',
    title: 'Botly® Port App.',
    year: '2022',
    category: 'Mobile Product Design',
    image: botlyAppImg,
  },
  {
    id: 'curea-studio',
    num: '04.',
    title: 'Curea Studio',
    year: '2020',
    category: 'Editorial & Brand Art',
    image: cureaStudioImg,
  },
  {
    id: 'sos-core-identity-app',
    num: '05.',
    title: 'Sos Core Identity App.',
    year: '2024',
    category: 'Tactile iOS Application',
    image: sosIdentityImg,
  },
];

interface SelectedWorkSectionProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onSelectProject,
}) => {
  const topProjects = PROJECTS.slice(0, 2);
  const bottomProjects = PROJECTS.slice(2, 5);

  return (
    <section
      id="selected-work-section"
      className="relative w-full bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] py-16 sm:py-20 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER: "• Project showcase", "Selected Work. (5)", Info & 16-25© */}
        {/* ========================================================================= */}
        <div className="pb-10 sm:pb-12 md:pb-14">
          {/* Badge: • Project showcase */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="tracking-wide">Project showcase</span>
          </div>

          {/* Headline with count badge */}
          <div className="flex items-start gap-2.5 sm:gap-3 select-none">
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.04]">
              Selected Work.
            </h2>
            <span className="font-neue text-base sm:text-xl md:text-2xl font-normal text-neutral-400 mt-0.5 sm:mt-1">
              (5)
            </span>
          </div>

          {/* Subtext and Copyright Indicator Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4 pt-1">
            <p className="font-neue text-sm sm:text-base text-neutral-500 font-normal max-w-[460px] leading-relaxed">
              We've helped businesses across industries achieve their goals. Here are some of our recent projects.
            </p>
            <span className="font-mono text-xs sm:text-sm text-neutral-400 tracking-wider select-none shrink-0">
              16-25©
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TOP ROW (2 Projects: 01. Neon Frame System & 02. Music OS AI)           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {topProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject?.(project)}
              className={`${project.colSpanClass} group flex flex-col cursor-pointer select-none`}
            >
              {/* Image Container with rounded corners */}
              <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-950 shadow-sm border border-neutral-200/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                {/* Subtle dark gradient overlay for depth */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Bottom Info Bar */}
              <div className="pt-3.5 pb-1 flex items-center justify-between text-neutral-900">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs sm:text-sm text-neutral-400 font-medium">
                    {project.num}
                  </span>
                  <h3 className="font-neue text-sm sm:text-base font-bold text-neutral-950 tracking-tight group-hover:opacity-80 transition-opacity">
                    {project.title}
                  </h3>
                </div>
                <span className="font-mono text-xs sm:text-sm text-neutral-400">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM ROW (3 Projects: 03. Botly, 04. Curea, 05. Sos)                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bottomProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject?.(project)}
              className="group flex flex-col cursor-pointer select-none"
            >
              {/* Image Container */}
              <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-950 shadow-sm border border-neutral-200/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Bottom Info Bar */}
              <div className="pt-3.5 pb-1 flex items-center justify-between text-neutral-900">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs sm:text-sm text-neutral-400 font-medium">
                    {project.num}
                  </span>
                  <h3 className="font-neue text-sm sm:text-base font-bold text-neutral-950 tracking-tight group-hover:opacity-80 transition-opacity">
                    {project.title}
                  </h3>
                </div>
                <span className="font-mono text-xs sm:text-sm text-neutral-400">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorkSection;
