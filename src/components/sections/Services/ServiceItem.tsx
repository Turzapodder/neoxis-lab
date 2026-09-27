import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Collapse } from '@/components/ui/Collapse';
import type { Service } from '@/types/content';
import { padNumber } from '@/utils/format';
import { ServiceShowcase } from './ServiceShowcase';

interface ServiceItemProps {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onExplore?: (id: string) => void;
}

/** One numbered accordion row of the services list. */
export const ServiceItem: React.FC<ServiceItemProps> = ({ service, index, isOpen, onToggle, onExplore }) => {
  const panelId = `${service.id}-panel`;

  return (
    <div data-reveal className="rounded-[20px] sm:rounded-[24px] bg-neutral-900/90 backdrop-blur-md border border-white/[0.04]">
      <button
        type="button"
        onClick={() => onToggle(service.id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_3fr_auto] items-start gap-4 sm:gap-6 p-5 sm:p-7 text-left"
      >
        <span
          className={`font-clash font-bold leading-none tracking-tight text-5xl sm:text-7xl md:text-8xl transition-colors duration-500 ${
            isOpen ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-400'
          }`}
        >
          {padNumber(index + 1)}.
        </span>

        <span className="flex flex-col gap-3 sm:gap-4 pt-1">
          <span
            className={`font-neue text-xl sm:text-2xl md:text-[26px] transition-colors duration-500 ${
              isOpen ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
            }`}
          >
            {service.title}
          </span>
          <span className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs transition-colors duration-500 ${
                  isOpen ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-800/60 text-neutral-500'
                }`}
              >
                {tag}
              </span>
            ))}
          </span>
        </span>

        <span
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${
            isOpen ? 'border-white/40 text-white' : 'border-white/15 text-neutral-400 group-hover:border-white/40 group-hover:text-white'
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <Collapse open={isOpen} id={panelId}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 px-5 sm:px-7 pb-6 sm:pb-7">
          <div className="hidden md:block" />
          <ServiceShowcase service={service} isOpen={isOpen} onExplore={onExplore} />
        </div>
      </Collapse>
    </div>
  );
};
