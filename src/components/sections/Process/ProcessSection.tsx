import React, { useRef, useState } from 'react';
import { SectionTag } from '@/components/ui/SectionTag';
import { PROCESS_STEPS } from '@/data/services';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ProcessCard } from './ProcessCard';

export const ProcessSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, { stagger: 0.12, start: 'top 75%' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--color-canvas-bg)] text-neutral-950 py-16 sm:py-20 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-10 sm:pb-14">
          <SectionTag className="text-neutral-900 self-start md:pt-3">Our Process</SectionTag>
          <div>
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] select-none">
              From Vision To
              <br />
              Measurable Value
            </h2>
            <p className="font-neue text-sm text-neutral-500 max-w-[320px] mt-5 sm:mt-6 leading-relaxed">
              From breakthrough portfolios to performance-driven platforms — our numbers speak louder than words.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-2.5">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessCard
              key={step.id}
              step={step}
              index={index}
              isActive={activeIndex === index}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
