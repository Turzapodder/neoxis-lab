import React from 'react';
import type { ProcessStep } from '@/types/content';
import { padNumber } from '@/utils/format';

const EASE_CLASS = 'duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]';
const NUMBER_CLASS = 'font-neue font-medium text-6xl sm:text-7xl lg:text-8xl leading-[0.8] tracking-tight';

interface ProcessCardProps {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}

/**
 * Process step card. The active card grows (width on desktop, height on mobile)
 * and cross-fades from a white text card to a photo card.
 */
export const ProcessCard: React.FC<ProcessCardProps> = ({ step, index, isActive, onActivate }) => {
  const number = `.${padNumber(index + 1)}`;

  return (
    <div
      data-reveal
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      tabIndex={0}
      aria-expanded={isActive}
      className={`flex flex-col gap-3 min-w-0 outline-none cursor-pointer transition-[flex-grow] ${EASE_CLASS} ${
        isActive ? 'md:grow-[2.1]' : 'md:grow'
      } md:basis-0`}
    >
      <div
        className={`relative overflow-hidden rounded-[20px] sm:rounded-[22px] bg-white transition-[height] ${EASE_CLASS} md:h-[440px] ${
          isActive ? 'h-[380px]' : 'h-[180px]'
        }`}
      >
        {/* Expanded layer: photo, bottom caption, number */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <img
            src={step.image}
            alt={step.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-[1200ms] ease-out ${isActive ? 'scale-100' : 'scale-110'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-white/20" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
            <div
              className={`text-white transition-all duration-700 delay-150 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="block text-[11px] text-white/75 mb-1">{step.label}</span>
              <h3 className="font-neue text-xl sm:text-2xl leading-tight max-w-[240px]">{step.title}</h3>
            </div>
            <span className={`${NUMBER_CLASS} text-white`}>{number}</span>
          </div>
        </div>

        {/* Collapsed layer: top label/title, faded number */}
        <div
          className={`absolute inset-0 flex flex-col justify-between p-5 sm:p-6 transition-opacity duration-500 ${
            isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'
          }`}
        >
          <div>
            <span className="block text-[11px] text-neutral-600 mb-1.5">{step.label}</span>
            <h3 className="font-neue font-medium text-lg sm:text-xl leading-tight max-w-[200px]">{step.title}</h3>
          </div>
          <span className={`self-end ${NUMBER_CLASS} text-neutral-200`}>{number}</span>
        </div>
      </div>

      {/* Progress rail */}
      <div className="h-[2px] w-full bg-neutral-200 overflow-hidden">
        <div className={`h-full bg-neutral-950 origin-left transition-transform duration-700 ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
      </div>
    </div>
  );
};
