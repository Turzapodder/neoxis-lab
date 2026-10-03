import React from 'react';
import type { ProjectDetail } from '@/types/content';
import { stripQuotes } from '@/utils/format';
import { RevealImage } from './RevealImage';
import { CONTAINER_CLASS } from './styles';

interface ProjectTestimonialProps {
  project: ProjectDetail;
}

/** The client's words on a dark card that inks in word by word, beside a detail image. */
export const ProjectTestimonial: React.FC<ProjectTestimonialProps> = ({ project }) => {
  const { quote, clientName, clientRole, clientImage } = project.testimonial;

  return (
    <section className="w-full">
      <div className={`${CONTAINER_CLASS} grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch`}>
        <figure className="lg:col-span-7 relative flex flex-col justify-between gap-10 overflow-hidden rounded-[28px] sm:rounded-[36px] bg-neutral-950 p-8 sm:p-12 lg:p-14 text-white">
          <span
            aria-hidden
            className="select-none font-clash text-[7rem] sm:text-[10rem] font-bold leading-[0.6] text-white/10"
          >
            “
          </span>

          <blockquote
            data-scrub-words
            className="font-clash text-2xl sm:text-3xl lg:text-[2.5rem] font-medium leading-[1.15] tracking-[-0.015em]"
          >
            {stripQuotes(quote)}
          </blockquote>

          <figcaption className="flex items-center gap-4">
            <img
              data-pop
              src={clientImage}
              alt=""
              loading="lazy"
              className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-full object-cover"
            />
            <span>
              <span className="block font-clash text-lg sm:text-xl font-semibold">{clientName}</span>
              <span className="block font-neue text-sm text-white/60">{clientRole}</span>
            </span>
          </figcaption>
        </figure>

        <RevealImage
          src={project.showcaseImage}
          alt={`${project.title} in use`}
          className="lg:col-span-5 min-h-[360px] sm:min-h-[460px] rounded-[28px] sm:rounded-[36px]"
        />
      </div>
    </section>
  );
};
