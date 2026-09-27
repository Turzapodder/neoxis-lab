import React from 'react';
import { ArrowLeft, ArrowRight, Globe, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { useCarousel } from '@/hooks/useCarousel';
import { padNumber } from '@/utils/format';

/** Quote, main portrait and a preview of the next testimonial with prev/next controls. */
export const TestimonialCarousel: React.FC = () => {
  const { index, next, prev, peek } = useCarousel(TESTIMONIALS.length);
  const current = TESTIMONIALS[index];
  const upcoming = TESTIMONIALS[peek(1)];

  return (
    <div
      data-reveal
      className="relative rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr_0.6fr] gap-6 lg:gap-8"
    >
      {/* Left: quote, rating, reach */}
      <div className="flex flex-col justify-between gap-8 sm:p-2">
        <div key={current.id} className="animate-[fade-up_0.5s_ease-out]">
          <Quote className="w-8 h-8 text-neutral-300 fill-neutral-300 rotate-180 mb-2" />
          <p className="font-neue text-lg sm:text-xl leading-[1.45] indent-8">
            <span className="font-medium text-neutral-950">{current.lead}</span>{' '}
            <span className="text-neutral-500">{current.rest}</span>
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="flex gap-1" aria-label={`${current.rating} out of 5 stars`}>
              {Array.from({ length: current.rating }, (_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="flex-1 h-px bg-neutral-100" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-neutral-700 stroke-[1.4]" />
          <span className="w-px h-8 bg-neutral-200" />
          <span className="text-[11px] leading-snug text-neutral-600 max-w-[130px]">Ezendo® support peoples from all over the world</span>
        </div>
      </div>

      {/* Middle: main portrait */}
      <div className="relative aspect-[4/3.5] lg:aspect-auto lg:min-h-[400px] rounded-[20px] overflow-hidden bg-neutral-200">
        <img
          key={current.id}
          src={current.image}
          alt={current.name}
          className="absolute inset-0 w-full h-full object-cover animate-[fade-up_0.6s_ease-out]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-5 bottom-5 text-white">
          <p className="font-neue text-base font-medium">{current.name}</p>
          <p className="font-neue text-xs text-white/75 mt-1">{current.role}</p>
        </div>
      </div>

      {/* Right: next preview + controls */}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={next}
          aria-label={`Show testimonial from ${upcoming.name}`}
          className="hidden lg:block aspect-[5/4] rounded-[18px] overflow-hidden bg-neutral-200 group"
        >
          <img src={upcoming.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </button>
        <div className="flex items-center justify-between pt-3 pb-3 border-b border-neutral-100">
          <span className="text-xs font-medium text-neutral-900">Testimonial</span>
          <span className="text-xs text-neutral-500">
            {padNumber(index + 1)}/{padNumber(TESTIMONIALS.length)}
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 pt-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-neutral-300 text-neutral-900 flex items-center justify-center hover:border-neutral-950 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full bg-neutral-950 text-white flex items-center justify-center hover:bg-neutral-800 active:scale-95 transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="hidden lg:flex justify-between mt-auto px-1">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};
