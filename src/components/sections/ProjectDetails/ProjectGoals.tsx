import React from 'react';
import type { ProjectDetail } from '@/types/content';
import { padNumber } from '@/utils/format';
import { BODY_CLASS, CONTAINER_CLASS, SECTION_HEADING_CLASS } from './styles';

interface ProjectGoalsProps {
  project: ProjectDetail;
}

/** What the project achieved: each goal inks in and draws its rule as it reaches the middle of the screen. */
export const ProjectGoals: React.FC<ProjectGoalsProps> = ({ project }) => {
  const { heading, description, points } = project.goals;
  const [intro, outro] = description;

  return (
    <section className="w-full pb-24 sm:pb-32 lg:pb-40">
      <div className={`${CONTAINER_CLASS} grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16`}>
        <div className="lg:col-span-4">
          <h2 className={SECTION_HEADING_CLASS}>{heading}</h2>
          <p className={`mt-6 sm:mt-8 ${BODY_CLASS}`}>{intro}</p>
        </div>

        <div className="lg:col-span-8">
          <ol className="border-t border-neutral-200">
            {points.map((point, index) => (
              <li
                key={point}
                data-goal-row
                className="relative grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 py-6 sm:py-8"
              >
                <span data-goal-text className="pt-1.5 font-clash text-sm sm:text-base tabular-nums text-neutral-500">
                  {padNumber(index + 1)}
                </span>
                <p
                  data-goal-text
                  className="font-clash text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-950"
                >
                  {point}
                </p>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-neutral-200" />
                <span aria-hidden data-goal-line className="absolute inset-x-0 bottom-0 h-px origin-left bg-neutral-950" />
              </li>
            ))}
          </ol>

          {outro && <p className={`mt-10 max-w-2xl ${BODY_CLASS}`}>{outro}</p>}
        </div>
      </div>
    </section>
  );
};
