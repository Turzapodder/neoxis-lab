import React, { useRef } from 'react';
import smokeBg from '@/assets/images/headr-bg.png';
import { SectionTag } from '@/components/ui/SectionTag';
import { SERVICES } from '@/data/services';
import { useAccordion } from '@/hooks/useAccordion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ServiceItem } from './ServiceItem';
import { TeamShowcase } from './TeamShowcase';

interface ServicesSectionProps {
  onExploreClick?: (serviceId: string) => void;
  onTeamContactClick?: () => void;
}

/** Dark framed section: services accordion followed by the team spotlight. */
export const ServicesSection: React.FC<ServicesSectionProps> = ({ onExploreClick, onTeamContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { openId, toggle } = useAccordion(SERVICES[0].id);

  useScrollReveal(sectionRef, { y: 48 });

  return (
    <section ref={sectionRef} className="relative w-full bg-white p-1.5 sm:p-2">
      <div data-wipe className="relative w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-black text-white">
        {/* Grayscale smoke backdrop */}
        <div data-wipe-bg className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={smokeBg}
            alt=""
            className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[160%] max-w-none sm:w-[120%] opacity-40 grayscale mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-20 sm:pt-28">
          <div className="flex items-start justify-between gap-6 pb-8 sm:pb-10">
            <div className="flex flex-col items-start">
              <SectionTag tone="light" className="text-white mb-3 sm:mb-5">
                Superpowers unlocked.
              </SectionTag>
              <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-bold tracking-tight leading-[0.95] select-none">
                Capabilities
              </h2>
            </div>
            <span className="font-neue text-xl sm:text-2xl text-neutral-500 mt-10 sm:mt-16">04</span>
          </div>

          <div className="flex flex-col gap-2">
            {SERVICES.map((service, index) => (
              <ServiceItem
                key={service.id}
                service={service}
                index={index}
                isOpen={openId === service.id}
                onToggle={toggle}
                onExplore={onExploreClick}
              />
            ))}
          </div>

          <TeamShowcase onContactClick={onTeamContactClick} />
        </div>
      </div>
    </section>
  );
};
