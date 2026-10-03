import React from 'react';
import { RollingLinkLabel } from '@/components/ui/RollingText';
import type { ProjectDetail } from '@/types/content';
import { CONTAINER_CLASS } from './styles';

const FACT_CLASS = 'px-5 py-4 sm:px-6 sm:py-5';
const FACT_LABEL_CLASS = 'font-neue text-xs sm:text-sm text-white/60';
const FACT_VALUE_CLASS = 'mt-1 font-clash text-base sm:text-lg font-semibold text-white';

interface ProjectHeroProps {
  project: ProjectDetail;
}

/** Case study opener: the lead image fills a rounded frame, with the title and a frosted facts bar over it. */
export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const facts = [
    { label: 'Service', value: project.service },
    { label: 'Industry', value: project.industry },
    { label: 'Year', value: project.year },
  ];

  return (
    <section className="w-full bg-white p-1.5 sm:p-2">
      <div className="relative isolate flex min-h-[calc(100svh-0.75rem)] sm:min-h-[calc(100svh-1rem)] flex-col justify-end overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[44px] bg-neutral-950">
        <div data-hero-media className="absolute inset-0 -z-10">
          <img
            src={project.heroImage1}
            alt={`${project.title} key visual`}
            className="h-full w-full scale-[1.15] object-cover object-center"
          />
          {/* Darkens the lower half so the title and facts read over any image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45" />
        </div>

        <div className={`${CONTAINER_CLASS} pt-[var(--navbar-height)] pb-5 sm:pb-8 lg:pb-10`}>
          <h1
            data-hero-title
            data-intro
            className="max-w-[12ch] text-balance font-clash text-[clamp(3.25rem,11vw,11rem)] font-bold leading-[0.88] tracking-[-0.045em] text-white"
          >
            {project.title}
          </h1>

          <dl
            data-hero-facts
            data-intro
            className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/10 rounded-[20px] sm:rounded-[24px] border border-white/15 bg-white/10 backdrop-blur-xl backdrop-saturate-150"
          >
            {facts.map((fact) => (
              <div key={fact.label} className={FACT_CLASS}>
                <dt className={FACT_LABEL_CLASS}>{fact.label}</dt>
                <dd className={FACT_VALUE_CLASS}>{fact.value}</dd>
              </div>
            ))}

            {project.liveUrl && (
              <div className={FACT_CLASS}>
                <dt className={FACT_LABEL_CLASS}>Live site</dt>
                <dd className={FACT_VALUE_CLASS}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/roll relative inline-flex items-center gap-1.5 select-none"
                  >
                    <RollingLinkLabel label={project.liveLabel || project.title} hoverClassName="text-white/60" />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
};
