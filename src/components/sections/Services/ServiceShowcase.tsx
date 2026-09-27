import React, { useCallback, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import { useInterval } from '@/hooks/useInterval';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { Service } from '@/types/content';
import { padNumber } from '@/utils/format';
import { ServiceSlideStack } from './ServiceSlideStack';

/** Time each example stays in front before the stack shuffles. */
const AUTOPLAY_MS = 3200;

interface ServiceShowcaseProps {
  service: Service;
  /** Autoplay only runs while the accordion row is open. */
  isOpen: boolean;
  onExplore?: (id: string) => void;
}

/** Expanded service content: a shuffling card stack with matching title and description. */
export const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({ service, isOpen, onExplore }) => {
  const { slides } = service;
  const { index, next, goTo } = useCarousel(slides.length);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const advance = useCallback(() => {
    setLeavingIndex(index);
    next();
  }, [index, next]);

  const jumpTo = (target: number) => {
    setLeavingIndex(null);
    goTo(target);
  };

  useInterval(advance, isOpen && !isPaused && !prefersReducedMotion ? AUTOPLAY_MS : null);

  const slide = slides[index];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <ServiceSlideStack slides={slides} activeIndex={index} leavingIndex={leavingIndex} onAdvance={advance} />

      <div className="flex flex-col justify-between gap-8 h-full py-1">
        <div key={slide.id} aria-live="polite" className="animate-[fade-up_0.5s_ease-out] motion-reduce:animate-none">
          <span className="text-xs text-neutral-500">
            {padNumber(index + 1)} / {padNumber(slides.length)}
          </span>
          <h4 className="font-clash text-2xl sm:text-3xl font-bold tracking-tight mt-2">{slide.title}</h4>
          <p className="font-neue text-sm leading-relaxed text-neutral-300 max-w-[320px] mt-3">{slide.description}</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-1.5" role="group" aria-label="Choose example">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Show ${s.title}`}
                aria-current={i === index}
                className="py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    i === index ? 'w-10 bg-white' : 'w-5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onExplore?.(service.id)}
            className="group/btn self-start flex items-center gap-3 rounded-full bg-white pl-5 pr-1 py-1 text-sm font-medium text-neutral-950 hover:bg-neutral-200 active:scale-95 transition-all"
          >
            Explore Now
            <span className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center">
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
