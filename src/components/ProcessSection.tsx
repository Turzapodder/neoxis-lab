import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import artDirectionImg from '../assets/images/studio-fact-work.jpg';
import prototypeImg from '../assets/images/meet-minds-team.jpg';
import testingImg from '../assets/images/card-mobile.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStep {
  id: string;
  label: string;
  title: string;
  image: string;
}

const STEPS: ProcessStep[] = [
  { id: 'art-direction', label: 'Project Kick-off', title: 'Art Direction and Wireframing', image: artDirectionImg },
  { id: 'design-prototype', label: 'Design Process', title: 'Design and Prototype Process', image: prototypeImg },
  { id: 'testing', label: 'Testing', title: 'Product Testing, Quality Control', image: testingImg },
];

export const ProcessSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered reveal for header and cards
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--color-canvas-bg)] text-neutral-950 py-16 sm:py-20 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        {/* ========================================================================= */}
        {/* 1. HEADER: "• Our Process" + From Vision To Measurable Value              */}
        {/* ========================================================================= */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-10 sm:pb-14">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-900 self-start md:pt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="tracking-wide">Our Process</span>
          </div>
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

        {/* ========================================================================= */}
        {/* 2. EXPANDING PROCESS CARDS                                                */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-2.5">
          {STEPS.map((step, index) => {
            const isActive = active === index;
            const number = `.${String(index + 1).padStart(2, '0')}`;
            return (
              <div
                key={step.id}
                data-reveal
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                tabIndex={0}
                aria-expanded={isActive}
                className={`flex flex-col gap-3 min-w-0 outline-none cursor-pointer transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? 'md:grow-[2.1]' : 'md:grow'
                } md:basis-0`}
              >
                <div
                  className={`relative overflow-hidden rounded-[20px] sm:rounded-[22px] bg-white transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[440px] ${
                    isActive ? 'h-[380px]' : 'h-[180px]'
                  }`}
                >
                  {/* Expanded layer: photo, bottom caption, dark number */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-[1200ms] ease-out ${
                        isActive ? 'scale-100' : 'scale-110'
                      }`}
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
                      <span className="font-neue font-medium text-6xl sm:text-7xl lg:text-8xl leading-[0.8] tracking-tight text-white">
                        {number}
                      </span>
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
                      <h3 className="font-neue font-medium text-lg sm:text-xl leading-tight max-w-[200px]">
                        {step.title}
                      </h3>
                    </div>
                    <span className="self-end font-neue font-medium text-6xl sm:text-7xl lg:text-8xl leading-[0.8] tracking-tight text-neutral-200">
                      {number}
                    </span>
                  </div>
                </div>

                {/* Progress rail */}
                <div className="h-[2px] w-full bg-neutral-200 overflow-hidden">
                  <div
                    className={`h-full bg-neutral-950 origin-left transition-transform duration-700 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
