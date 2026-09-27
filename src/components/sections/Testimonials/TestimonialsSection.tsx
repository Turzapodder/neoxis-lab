import React, { useRef } from 'react';
import { SectionTag } from '@/components/ui/SectionTag';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ClientStats } from './ClientStats';
import { PartnerLogos } from './PartnerLogos';
import { TestimonialCarousel } from './TestimonialCarousel';

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--color-canvas-bg)] text-neutral-950 py-16 sm:py-20 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 pb-10 sm:pb-14">
          <SectionTag className="text-neutral-900 md:pt-4 self-start">What Our Clients Says</SectionTag>
          <div>
            <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-bold tracking-tight leading-[0.95] select-none">
              Testimonials.
            </h2>
            <p className="font-neue text-sm text-neutral-500 max-w-[300px] mt-6 sm:mt-10 leading-relaxed">
              We've helped businesses across industries achieve their goals. Here are some of our recent projects.
            </p>
          </div>
        </div>

        <TestimonialCarousel />
        <ClientStats />
        <PartnerLogos />
      </div>
    </section>
  );
};
