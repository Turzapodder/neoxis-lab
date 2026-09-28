import React, { useRef } from 'react';
import { Star } from 'lucide-react';
import { SectionTag } from '@/components/ui/SectionTag';
import { CLIENT_STATS, TESTIMONIAL_RATING } from '@/data/testimonials';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FeaturedQuote } from './FeaturedQuote';

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--color-canvas-bg)] text-neutral-950 py-16 sm:py-20 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        {/* Header: title and rating summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 sm:pb-14">
          <div>
            <SectionTag className="text-neutral-900 mb-3 sm:mb-4">What our clients say</SectionTag>
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] select-none">
              In their words.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-clash text-5xl font-bold tracking-tight leading-none">{TESTIMONIAL_RATING.score}</span>
            <div>
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-neutral-950 text-neutral-950" />
                ))}
              </div>
              <p className="text-sm text-neutral-500 mt-1">Average from {TESTIMONIAL_RATING.reviews} project reviews</p>
            </div>
          </div>
        </div>

        <FeaturedQuote />

        {/* Outcomes */}
        <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 mt-10 sm:mt-14">
          {CLIENT_STATS.map((stat) => (
            <div
              key={stat.id}
              className="flex items-baseline gap-5 py-6 sm:py-2 sm:px-8 sm:first:pl-0 border-t sm:border-t-0 sm:border-l sm:first:border-l-0 border-neutral-200"
            >
              <span className="font-clash text-5xl sm:text-6xl font-bold tracking-tight leading-none">{stat.value}</span>
              <p className="text-sm sm:text-base text-neutral-500 leading-snug max-w-[260px]">{stat.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
