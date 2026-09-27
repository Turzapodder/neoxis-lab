import React, { useState } from 'react';
import { SectionTag } from '@/components/ui/SectionTag';
import { MINDS } from '@/data/team';
import { MindCard } from './MindCard';

/** "Meet The Minds" header, staggered cards and a giant role word that follows the active card. */
export const MindsShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(MINDS.length - 1);
  const activeRole = MINDS[activeIndex].role;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-28 sm:pt-40 pb-12 sm:pb-16">
        <SectionTag tone="light" className="text-white">
          Our member
        </SectionTag>
        <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.02] md:text-right select-none">
          Meet The Minds
          <br />
          Behind The Work
        </h2>
      </div>

      <div className="relative pb-24 sm:pb-40">
        <div aria-hidden className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[140%] text-center pointer-events-none select-none">
          <span
            key={activeRole}
            className="inline-block font-clash font-bold uppercase whitespace-nowrap leading-none text-[22vw] lg:text-[240px] bg-gradient-to-b from-white/25 to-transparent bg-clip-text text-transparent animate-[fade-up_0.6s_ease-out]"
          >
            {activeRole}
          </span>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-5 lg:gap-6">
          {MINDS.map((mind, index) => (
            <MindCard key={mind.id} mind={mind} isActive={activeIndex === index} onActivate={() => setActiveIndex(index)} />
          ))}
        </div>
      </div>
    </>
  );
};
