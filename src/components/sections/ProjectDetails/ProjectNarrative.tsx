import React from 'react';
import { padNumber } from '@/utils/format';
import type { ProjectDetail } from '@/types/content';
import { ShowcaseImage } from './ShowcaseImage';

const HEADING_CLASS =
  'font-clash text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-neutral-950 leading-[1.05]';
const BODY_CLASS = 'mt-6 sm:mt-8 text-neutral-600 font-neue text-base sm:text-lg leading-relaxed';
const DIVIDER_CLASS = 'w-full h-px bg-neutral-200/90 my-16 sm:my-24 md:my-32';
const IMAGE_FRAME_CLASS = 'bg-neutral-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)]';

interface ProjectNarrativeProps {
  project: ProjectDetail;
}

/**
 * Case study story: a sticky purpose column beside gallery images, the achieved goals,
 * and the client testimonial beside a detail image.
 */
export const ProjectNarrative: React.FC<ProjectNarrativeProps> = ({ project }) => {
  const { purpose, goals, testimonial } = project;
  const [purposeIntro, purposeOutro] = purpose.description;
  const [goalsIntro, goalsOutro] = goals.description;

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Purpose: sticky copy beside stacked gallery images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--navbar-clearance)+2rem)] lg:self-start">
            <h2 className={HEADING_CLASS}>{purpose.heading}</h2>

            <div className={`${BODY_CLASS} space-y-5`}>
              <p>{purposeIntro}</p>

              <ul className="my-6 space-y-3.5 pl-1">
                {purpose.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-base">
                    <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0 mt-2" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {purposeOutro && <p>{purposeOutro}</p>}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {project.purposeImages.map((src, index) => (
              <ShowcaseImage
                key={index}
                src={src}
                alt={`${project.title} Detail ${index + 1}`}
                className={`aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[32px] ${IMAGE_FRAME_CLASS}`}
              />
            ))}
          </div>
        </div>

        <div className={DIVIDER_CLASS} />

        {/* Achieved goals */}
        <div className="max-w-4xl">
          <h2 className={HEADING_CLASS}>{goals.heading}</h2>

          <div className={`${BODY_CLASS} space-y-6`}>
            <p>{goalsIntro}</p>

            <ol className="my-8 space-y-4">
              {goals.points.map((point, index) => (
                <li key={point} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-neutral-950 text-white font-clash text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {padNumber(index + 1)}
                  </span>
                  <span className="text-neutral-900 font-medium text-base sm:text-lg pt-0.5">{point}</span>
                </li>
              ))}
            </ol>

            {goalsOutro && <p>{goalsOutro}</p>}
          </div>
        </div>

        <div className={DIVIDER_CLASS} />

        {/* Client testimonial beside a detail image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          <figure className="rounded-[28px] sm:rounded-[36px] bg-white/85 backdrop-blur-2xl border border-black/[0.08] p-7 sm:p-10 lg:p-12 flex flex-col justify-between shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] hover:border-black/15 transition-all duration-300">
            <figcaption className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-100 border border-black/[0.08] shrink-0 shadow-md">
                <img src={testimonial.clientImage} alt={testimonial.clientName} className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center gap-3">
                <span className="font-clash text-lg sm:text-xl font-bold text-neutral-950">{testimonial.clientName}</span>
                <span className="w-0.5 h-4 bg-neutral-300" />
                <span className="font-neue text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {testimonial.clientRole}
                </span>
              </div>
            </figcaption>

            <div className="w-full h-px bg-neutral-200/90 my-6 sm:my-8" />

            <blockquote className="font-neue text-lg sm:text-xl md:text-2xl italic font-normal text-neutral-800 leading-snug">
              {testimonial.quote}
            </blockquote>
          </figure>

          <ShowcaseImage
            src={project.showcaseImage}
            alt={`${project.title} Showcase`}
            className={`min-h-[360px] sm:min-h-[440px] rounded-[28px] sm:rounded-[36px] ${IMAGE_FRAME_CLASS}`}
          />
        </div>
      </div>
    </section>
  );
};
