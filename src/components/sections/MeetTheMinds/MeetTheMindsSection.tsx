import React from 'react';
import { ArrowRight } from 'lucide-react';

import { meetMindsTeamImg, studioFactImg } from '@/lib/images';
import { SectionTag } from '@/components/ui/SectionTag';
import { STUDIO_FACTS, STUDIO_REASONS } from '@/data/studio';
import { TEAM_AVATARS } from '@/data/team';
import { ClientLogos } from './ClientLogos';

interface MeetTheMindsSectionProps {
  onBookCallClick?: () => void;
}

/** "Why choose us": statement, a wide image row, three reasons and a client strip. */
export const MeetTheMindsSection: React.FC<MeetTheMindsSectionProps> = ({ onBookCallClick }) => (
  <section className="relative w-full bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] py-16 sm:py-20 md:py-24 transition-colors duration-500">
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      {/* 1. Headline + statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-10 sm:pb-14">
        <div className="lg:col-span-6">
          <SectionTag className="text-neutral-600 mb-3 sm:mb-4">Why choose us</SectionTag>
          <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.05] select-none">
            Why teams
            <br />
            choose neoxis.
          </h2>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-start gap-6">
          <p className="font-neue text-lg sm:text-xl leading-relaxed">
            <span className="text-neutral-950">
              We bring together designers, strategists and makers in one small studio.
            </span>{' '}
            <span className="text-neutral-500">
              You get bold, considered digital work without the layers of a big agency.
            </span>
          </p>
          <button
            type="button"
            onClick={onBookCallClick}
            className="group/btn flex items-center gap-3 rounded-full bg-neutral-950 pl-5 pr-1 py-1 text-sm font-medium text-white hover:bg-neutral-800 active:scale-95 transition-all"
          >
            Book a call
            <span className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* 2. Image row: wide team photo + narrow studio photo */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        <div className="md:col-span-8 relative h-[340px] sm:h-[440px] lg:h-[520px] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-neutral-200 group">
          <img
            src={meetMindsTeamImg}
            alt="The neoxis team together in the studio"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
          <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 flex items-center gap-3 rounded-full bg-white/90 backdrop-blur-md pl-1.5 pr-5 py-1.5 shadow-sm">
            <div className="flex -space-x-2.5">
              {TEAM_AVATARS.meetTheMinds.map((src) => (
                <img key={src} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-neutral-950">{STUDIO_FACTS.specialists} specialists</p>
              <p className="text-xs text-neutral-500">Working across {STUDIO_FACTS.countries} countries</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 relative h-[280px] md:h-auto rounded-[28px] sm:rounded-[32px] overflow-hidden bg-neutral-900 text-white group">
          <img
            src={studioFactImg}
            alt="Designers reviewing work at a desk"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="font-clash text-5xl sm:text-6xl font-bold tracking-tight leading-none">{STUDIO_FACTS.projects}</p>
            <p className="text-sm text-white/80 mt-2 max-w-[200px]">Projects launched for clients worldwide</p>
          </div>
        </div>
      </div>

      {/* 3. Reasons */}
      <ul className="grid grid-cols-1 md:grid-cols-3 border-t border-neutral-200 mt-12 sm:mt-16">
        {STUDIO_REASONS.map(({ id, icon: Icon, title, text }) => (
          <li
            key={id}
            className="flex gap-4 py-8 md:py-10 md:px-8 md:first:pl-0 md:last:pr-0 border-b md:border-b-0 md:border-l md:first:border-l-0 border-neutral-200"
          >
            <span className="w-10 h-10 shrink-0 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-800">
              <Icon className="w-[18px] h-[18px] stroke-[1.6]" />
            </span>
            <div>
              <h3 className="font-neue text-base sm:text-lg font-medium text-neutral-950 leading-snug">{title}</h3>
              <p className="font-neue text-sm text-neutral-500 leading-relaxed mt-2 max-w-[300px]">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* 4. Client strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 border-t border-neutral-200 pt-8">
        <p className="text-sm text-neutral-500 shrink-0">
          Trusted by <span className="text-neutral-950 font-medium">{STUDIO_FACTS.partners}</span> teams
        </p>
        <ClientLogos className="flex flex-wrap items-center gap-x-10 gap-y-5" />
      </div>
    </div>
  </section>
);
