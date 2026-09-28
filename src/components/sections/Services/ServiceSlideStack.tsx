import React from 'react';
import type { ServiceSlide } from '@/types/content';
import { padNumber } from '@/utils/format';

/** Offset in px between stacked cards (up and to the right). */
const STACK_OFFSET = 16;
/** Cards visible behind the front one. */
const VISIBLE_BEHIND = 3;

interface ServiceSlideStackProps {
  slides: ServiceSlide[];
  activeIndex: number;
  /** Card that just left the front; it plays the drop-and-tuck animation. */
  leavingIndex: number | null;
  onAdvance: () => void;
}

/** Deck of example cards. The front card shows the active slide; the rest fan out behind it. */
export const ServiceSlideStack: React.FC<ServiceSlideStackProps> = ({ slides, activeIndex, leavingIndex, onAdvance }) => {
  const count = slides.length;
  const inset = STACK_OFFSET * VISIBLE_BEHIND;

  return (
    <button
      type="button"
      onClick={onAdvance}
      aria-label="Show next example"
      className="relative block w-full aspect-[5/4] text-left rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <div className="absolute left-0 bottom-0" style={{ top: inset, right: inset }}>
        {slides.map((slide, i) => {
          // Depth in the stack: 0 is the front card
          const depth = (i - activeIndex + count) % count;
          const isLeaving = i === leavingIndex && depth === count - 1;

          return (
            <div
              key={slide.id}
              aria-hidden={depth !== 0}
              className={`absolute inset-0 flex flex-col gap-3 rounded-[18px] bg-neutral-100 text-neutral-950 p-3 sm:p-4 shadow-[-10px_16px_36px_rgba(0,0,0,0.5)] transition-[transform,filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isLeaving ? 'animate-[stack-shuffle_0.9s_cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none' : ''
              }`}
              style={
                {
                  '--tx': `${depth * STACK_OFFSET}px`,
                  '--ty': `${-depth * STACK_OFFSET}px`,
                  '--s': 1 - depth * 0.03,
                  transform: 'translate(var(--tx), var(--ty)) scale(var(--s))',
                  zIndex: count - depth,
                  opacity: depth > VISIBLE_BEHIND ? 0 : 1,
                  filter: `brightness(${1 - depth * 0.12})`,
                } as React.CSSProperties
              }
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-neue text-base sm:text-lg">{padNumber(i + 1)}.</span>
                <span className="text-xs text-neutral-500">{slide.label}</span>
              </div>
              <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-neutral-300">
                <img src={slide.image} alt={depth === 0 ? slide.title : ''} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>
          );
        })}
      </div>
    </button>
  );
};
