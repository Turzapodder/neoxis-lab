import React from 'react';
import type { ProjectDetail } from '@/types/content';

interface ProjectNarrativeProps {
  project: ProjectDetail;
}

/**
 * Project Content & Case Study Narrative Section matching:
 * https://unusually.webflow.io/project/space
 * - Split grid 1: Sticky Project Purpose sidebar + 2 stacked gallery images on the right
 * - Dividing line
 * - Max-width Achieved Goals section with numbered points
 * - Dividing line
 * - Split grid 2: Frosted glass Client Testimonial card + Detail Showcase Image
 */
export const ProjectNarrative: React.FC<ProjectNarrativeProps> = ({ project }) => {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* 1. SPLIT GRID 1: STICKY PURPOSE + STACKED GALLERY IMAGES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Sticky Editorial Sidebar */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-clash text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-neutral-950 leading-[1.05]">
              {project.purpose.heading}
            </h2>

            <div className="mt-6 sm:mt-8 space-y-5 text-neutral-600 font-neue text-base sm:text-lg leading-relaxed">
              <p>{project.purpose.description[0]}</p>

              {/* Bullet list with custom design markers */}
              <ul className="my-6 space-y-3.5 pl-1">
                {project.purpose.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-base">
                    <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0 mt-2" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {project.purpose.description[1] && (
                <p>{project.purpose.description[1]}</p>
              )}
            </div>
          </div>

          {/* Right Column: 2 Stacked Showcase Visuals */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {project.purposeImages.map((imgSrc, idx) => (
              <div
                key={idx}
                className="group relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-100 border border-black/[0.08] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)]"
              >
                <img
                  src={imgSrc}
                  alt={`${project.title} Detail ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 2. DIVIDING LINE */}
        <div className="w-full h-px bg-neutral-200/90 my-16 sm:my-24 md:my-32" />

        {/* 3. ACHIEVED GOALS SECTION (max-width-xlarge) */}
        <div className="max-w-4xl">
          <h2 className="font-clash text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-neutral-950 leading-[1.05]">
            {project.goals.heading}
          </h2>

          <div className="mt-6 sm:mt-8 space-y-6 text-neutral-600 font-neue text-base sm:text-lg leading-relaxed">
            <p>{project.goals.description[0]}</p>

            {/* Numbered List */}
            <ol className="my-8 space-y-4">
              {project.goals.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-neutral-950 text-white font-clash text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-neutral-900 font-medium text-base sm:text-lg pt-0.5">
                    {point}
                  </span>
                </li>
              ))}
            </ol>

            {project.goals.description[1] && (
              <p>{project.goals.description[1]}</p>
            )}
          </div>
        </div>

        {/* 4. DIVIDING LINE */}
        <div className="w-full h-px bg-neutral-200/90 my-16 sm:my-24 md:my-32" />

        {/* 5. SPLIT GRID 2: TESTIMONIAL CARD + DETAIL IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Client Testimonial Card */}
          <div className="rounded-[28px] sm:rounded-[36px] bg-white/85 backdrop-blur-2xl border border-black/[0.08] p-7 sm:p-10 lg:p-12 flex flex-col justify-between shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] hover:border-black/15 transition-all duration-300">
            {/* Top: Client Identity */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-100 border border-black/[0.08] shrink-0 shadow-md">
                <img
                  src={project.testimonial.clientImage}
                  alt={project.testimonial.clientName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="font-clash text-lg sm:text-xl font-bold text-neutral-950">
                  {project.testimonial.clientName}
                </div>
                <div className="w-0.5 h-4 bg-neutral-300" />
                <div className="font-neue text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {project.testimonial.clientRole}
                </div>
              </div>
            </div>

            {/* Middle Divider */}
            <div className="w-full h-px bg-neutral-200/90 my-6 sm:my-8" />

            {/* Bottom: Quote */}
            <div>
              <blockquote className="font-neue text-lg sm:text-xl md:text-2xl italic font-normal text-neutral-800 leading-snug">
                {project.testimonial.quote}
              </blockquote>
            </div>
          </div>

          {/* Right Column: Showcase Detail Image 5 */}
          <div className="group relative w-full min-h-[360px] sm:min-h-[440px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-neutral-100 border border-black/[0.08] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)]">
            <img
              src={project.showcaseImage}
              alt={`${project.title} Showcase`}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
