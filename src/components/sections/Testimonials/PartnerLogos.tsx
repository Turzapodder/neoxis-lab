import React from 'react';
import { BrandMark } from '@/components/icons/BrandMarks';
import { SectionTag } from '@/components/ui/SectionTag';
import { PARTNERS } from '@/data/testimonials';

export const PartnerLogos: React.FC = () => (
  <div data-reveal className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
    <div className="flex flex-col gap-8">
      <SectionTag className="text-neutral-900">Our Ezendo® relationships</SectionTag>
      <p className="text-xs sm:text-sm text-neutral-500 max-w-[200px] leading-relaxed">Trusted by over 1000+ companies around the world</p>
    </div>

    <ul className="flex flex-wrap items-center justify-start md:justify-end gap-x-10 sm:gap-x-14 gap-y-8 md:max-w-[560px] md:ml-auto">
      {PARTNERS.map((partner, i) => (
        <li key={`${partner.name}-${i}`} className="flex items-center gap-1.5 text-neutral-900 opacity-80 hover:opacity-100 transition-opacity">
          <BrandMark name={partner.mark} />
          <span className={`font-neue tracking-tight ${partner.className}`}>{partner.name}</span>
        </li>
      ))}
    </ul>
  </div>
);
