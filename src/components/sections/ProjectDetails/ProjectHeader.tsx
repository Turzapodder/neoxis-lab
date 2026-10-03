import React from 'react';
import { RollingLinkLabel } from '@/components/ui/RollingText';
import type { ProjectDetail } from '@/types/content';
import { ShowcaseImage } from './ShowcaseImage';

const VALUE_CLASS = 'font-clash text-sm sm:text-base font-semibold text-neutral-950';

interface MetaCardProps {
  label: string;
  children: React.ReactNode;
}

/** Glass card in the project facts row. */
const MetaCard: React.FC<MetaCardProps> = ({ label, children }) => (
  <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
    <span className="font-neue text-xs sm:text-[13px] font-medium text-neutral-400 uppercase tracking-wider">
      {label}:
    </span>
    {children}
  </div>
);

interface ProjectHeaderProps {
  project: ProjectDetail;
}

/** Case study opener: title and summary beside the lead image, a facts row, then a wide showcase image. */
export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  const facts = [
    { label: 'Service', value: project.service },
    { label: 'Industry', value: project.industry },
    { label: 'Year', value: project.year },
  ];

  return (
    <header className="relative w-full pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
          <div className="flex flex-col justify-between h-full py-2">
            <h1 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold tracking-tight text-neutral-950 uppercase leading-[0.92] select-none">
              {project.title}
            </h1>

            <div className="w-full h-px bg-neutral-200/90 my-8 sm:my-10 lg:my-12" />

            <p className="max-w-xl font-neue text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed font-normal">
              {project.subtitle}
            </p>
          </div>

          <ShowcaseImage
            src={project.heroImage1}
            alt={project.title}
            eager
            className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[380px] rounded-[24px] sm:rounded-[32px] bg-neutral-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]"
          />
        </div>

        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {facts.map((fact) => (
            <MetaCard key={fact.label} label={fact.label}>
              <span className={VALUE_CLASS}>{fact.value}</span>
            </MetaCard>
          ))}

          {project.liveUrl && (
            <MetaCard label="View Live">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/roll relative inline-flex items-center gap-1.5 select-none cursor-pointer ${VALUE_CLASS}`}
              >
                <RollingLinkLabel label={project.liveLabel || project.title} hoverClassName="text-neutral-500" />
              </a>
            </MetaCard>
          )}
        </div>

        <ShowcaseImage
          src={project.heroImage2}
          alt={`${project.title} Showcase`}
          eager
          zoomClassName="group-hover:scale-[1.03]"
          className="mt-6 sm:mt-8 lg:mt-10 aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.3/1] rounded-[24px] sm:rounded-[36px] bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.09)]"
        />
      </div>
    </header>
  );
};
