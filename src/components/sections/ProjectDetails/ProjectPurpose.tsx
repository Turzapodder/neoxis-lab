import React from 'react';
import type { ProjectDetail } from '@/types/content';
import { RevealImage } from './RevealImage';
import { BODY_CLASS, CONTAINER_CLASS, SECTION_HEADING_CLASS } from './styles';

interface ProjectPurposeProps {
  project: ProjectDetail;
}

/** Why the project exists: copy pinned beside gallery images that wipe open as they scroll in. */
export const ProjectPurpose: React.FC<ProjectPurposeProps> = ({ project }) => {
  const { heading, description, bullets } = project.purpose;
  const [intro, outro] = description;

  return (
    <section className="w-full py-24 sm:py-32 lg:py-40">
      <div className={`${CONTAINER_CLASS} grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start`}>
        <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--navbar-clearance)+2rem)]">
          <h2 className={SECTION_HEADING_CLASS}>{heading}</h2>
          <p className={`mt-6 sm:mt-8 ${BODY_CLASS}`}>{intro}</p>

          <ul className="mt-8 border-t border-neutral-200">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-4 border-b border-neutral-200 py-4 font-neue text-sm sm:text-base text-neutral-900"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-950" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {outro && <p className={`mt-8 ${BODY_CLASS}`}>{outro}</p>}
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 lg:gap-10">
          {project.purposeImages.map((src, index) => (
            <RevealImage
              key={index}
              src={src}
              alt={`${project.title} detail ${index + 1}`}
              className="aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[32px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
