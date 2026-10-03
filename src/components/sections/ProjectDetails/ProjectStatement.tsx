import React from 'react';
import type { ProjectDetail } from '@/types/content';
import { stripQuotes } from '@/utils/format';
import { CONTAINER_CLASS } from './styles';

interface ProjectStatementProps {
  project: ProjectDetail;
}

/** The project summary as a large statement that inks in on scroll, then the wide showcase opening up. */
export const ProjectStatement: React.FC<ProjectStatementProps> = ({ project }) => (
  <section className="w-full pt-20 sm:pt-28 lg:pt-36">
    <div className={CONTAINER_CLASS}>
      <p
        data-scrub-words
        className="max-w-[26ch] md:ml-[16.666%] font-clash text-[clamp(1.75rem,4.4vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-neutral-950"
      >
        {stripQuotes(project.subtitle)}
      </p>
    </div>

    {/* Opens from an inset rounded window to full width as it scrolls in (useSectionTransitions) */}
    <div className="mt-16 sm:mt-24 lg:mt-32 px-1.5 sm:px-2">
      <div
        data-wipe
        className="relative h-[62svh] sm:h-[80svh] overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-neutral-900"
      >
        <img
          data-wipe-bg
          src={project.heroImage2}
          alt={`${project.title} showcase`}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  </section>
);
