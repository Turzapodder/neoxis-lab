import React from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { useCarousel } from '@/hooks/useCarousel';
import { padNumber } from '@/utils/format';

/** How long each quote stays before auto-advancing. Drives the progress line's CSS animation. */
const AUTOPLAY_MS = 7000;

const NAV_BUTTON_CLASS =
  'w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/40';

/**
 * Large editorial quote with a client switcher.
 * The progress line's animationend advances to the next quote, so pausing the animation
 * (hover, keyboard focus) pauses autoplay, and reduced motion disables it entirely.
 */
export const FeaturedQuote: React.FC = () => {
  const { index, next, prev, goTo } = useCarousel(TESTIMONIALS.length);

  return (
    <div data-reveal className="group/quote rounded-[28px] sm:rounded-[32px] bg-white p-6 sm:p-10 lg:p-14">
      <Quote aria-hidden className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-200 fill-neutral-200 rotate-180" />

      {/* All quotes share one grid cell so the card height fits the longest and never jumps */}
      <div className="grid mt-6 sm:mt-8" aria-live="polite">
        {TESTIMONIALS.map((t, i) => {
          const isActive = i === index;
          return (
            <blockquote
              key={t.id}
              aria-hidden={!isActive}
              className={`[grid-area:1/1] max-w-[1040px] transition-opacity duration-500 ${
                isActive ? 'opacity-100' : 'opacity-0 invisible'
              }`}
            >
              <p
                key={isActive ? `${t.id}-active` : t.id}
                className={`font-neue text-2xl sm:text-3xl lg:text-[40px] leading-[1.3] tracking-[-0.01em] ${
                  isActive ? 'animate-[fade-up_0.6s_ease-out] motion-reduce:animate-none' : ''
                }`}
              >
                <span className="text-neutral-950">{t.lead}</span> <span className="text-[#8B8B8B]">{t.rest}</span>
              </p>
            </blockquote>
          );
        })}
      </div>

      {/* Autoplay progress */}
      <div className="relative h-px bg-neutral-200 mt-10 sm:mt-14 overflow-hidden">
        <span
          key={index}
          onAnimationEnd={next}
          className="absolute inset-0 bg-neutral-950 origin-left scale-x-0 motion-reduce:hidden group-hover/quote:[animation-play-state:paused] group-focus-within/quote:[animation-play-state:paused]"
          // Longhands on purpose: the `animation` shorthand would also reset play-state and block the pause classes
          style={{
            animationName: 'quote-progress',
            animationDuration: `${AUTOPLAY_MS}ms`,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
          }}
        />
      </div>

      {/* Client switcher and controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Choose a testimonial">
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === index;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => goTo(i)}
                aria-pressed={isActive}
                aria-label={`${t.name}, ${t.role}`}
                className={`flex items-center gap-3 rounded-full p-1 transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/40 ${
                  isActive ? 'bg-neutral-100 pr-5' : 'hover:bg-neutral-100'
                }`}
              >
                <img
                  src={t.image}
                  alt=""
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover transition-[filter,opacity] duration-500 ${
                    isActive ? '' : 'grayscale opacity-60'
                  }`}
                />
                {isActive && (
                  <span className="text-left leading-tight animate-[fade-up_0.4s_ease-out] motion-reduce:animate-none">
                    <span className="block text-sm font-medium text-neutral-950">{t.name}</span>
                    <span className="block text-xs text-neutral-500">{t.role}</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 self-start lg:self-auto">
          <span className="text-sm text-neutral-500 tabular-nums">
            {padNumber(index + 1)} / {padNumber(TESTIMONIALS.length)}
          </span>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className={`${NAV_BUTTON_CLASS} border border-neutral-300 text-neutral-900 hover:border-neutral-950`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className={`${NAV_BUTTON_CLASS} bg-neutral-950 text-white hover:bg-neutral-800`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
