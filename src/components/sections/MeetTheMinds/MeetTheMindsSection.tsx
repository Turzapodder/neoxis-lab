import React from 'react';
import { Globe } from 'lucide-react';

import meetMindsImg from '@/assets/images/meet-minds-team.jpg';
import studioFactImg from '@/assets/images/studio-fact-work.jpg';
import { DribbbleIcon, LinkedInIcon, XIcon } from '@/components/icons/SocialIcons';
import { SectionTag } from '@/components/ui/SectionTag';
import { SOCIAL_PROFILES } from '@/data/company';
import { TEAM_AVATARS } from '@/data/team';
import { ClientLogos } from './ClientLogos';

const SOCIAL_BUTTONS = [
  { href: SOCIAL_PROFILES.x, label: 'X Profile', icon: <XIcon className="w-3.5 h-3.5" /> },
  { href: SOCIAL_PROFILES.dribbble, label: 'Dribbble Profile', icon: <DribbbleIcon className="w-4 h-4" /> },
  { href: SOCIAL_PROFILES.linkedin, label: 'LinkedIn Profile', icon: <LinkedInIcon className="w-3.5 h-3.5" /> },
];

const AVATAR_CLASS = 'w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-xs';

interface MeetTheMindsSectionProps {
  onBookCallClick?: () => void;
}

export const MeetTheMindsSection: React.FC<MeetTheMindsSectionProps> = ({ onBookCallClick }) => (
  <section className="relative w-full bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] py-16 sm:py-20 md:py-24 transition-colors duration-500">
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      {/* 1. SECTION TOP BAR: tag, headline & social buttons */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 md:pb-14">
        <div className="flex flex-col items-start">
          <SectionTag className="text-neutral-600 mb-3 sm:mb-4">Why choose us</SectionTag>
          <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.05] select-none">
            Meet The Minds
            <br />
            Behind The Work
          </h2>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 self-start md:self-end">
          {SOCIAL_BUTTONS.map((button) => (
            <a
              key={button.label}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={button.label}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200/90 bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-950 active:scale-95 transition-all shadow-xs"
            >
              {button.icon}
            </a>
          ))}
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* LEFT: Large team portrait */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] lg:h-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-neutral-100 border border-neutral-200/70 shadow-sm group">
            <img
              src={meetMindsImg}
              alt="Neoxis Team Gathering"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute bottom-8 left-6 right-6 h-[1.5px] bg-white/40 backdrop-blur-xs pointer-events-none" />
          </div>
        </div>

        {/* RIGHT: Statement, stats bar and two cards */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-8 lg:gap-10">
          <div className="pt-1 sm:pt-2">
            <p className="font-neue text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] leading-[1.28] tracking-[-0.015em]">
              <span className="font-bold text-neutral-950">At Ezando® Studio, we bring</span>{' '}
              <span className="font-bold text-neutral-950">together designers, strategists,</span>{' '}
              <span className="text-neutral-500 font-normal">
                and makers to craft bold, thoughtful digital experiences made with care and curiosity.
              </span>
            </p>
          </div>

          {/* Stats & global reach */}
          <div className="pt-6 pb-2 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-neutral-200/80 bg-white flex items-center justify-center text-neutral-800 shadow-2xs">
                <Globe className="w-5 h-5 stroke-[1.6]" />
              </div>
              <div className="flex flex-col">
                <span className="font-neue text-sm sm:text-[15px] font-semibold text-neutral-900 leading-tight">Over 100 Fields</span>
                <span className="font-neue text-xs sm:text-[13px] text-neutral-500 mt-0.5">12 Countries Over World</span>
              </div>
            </div>

            <div className="flex items-center -space-x-2.5">
              {TEAM_AVATARS.meetTheMinds.map((src, i) => (
                <img key={src} src={src} alt={`Team Specialist ${i + 1}`} className={`${AVATAR_CLASS} object-cover`} />
              ))}
              <div className={`${AVATAR_CLASS} bg-neutral-950 text-white font-mono text-xs font-semibold flex items-center justify-center`}>
                12
              </div>
            </div>
          </div>

          {/* Two feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {/* Card 1: 400+ trusted partners + logos + book a call */}
            <div className="bg-white rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 border border-neutral-200/80 shadow-[0_10px_35px_-12px_rgba(0,0,0,0.06)] flex flex-col justify-between min-h-[330px] sm:min-h-[350px]">
              <div>
                <h3 className="font-clash text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-none">400+</h3>
                <p className="font-neue text-xs sm:text-sm text-neutral-500 font-medium mt-1.5">Trusted Partner</p>
              </div>

              <ClientLogos />

              <button
                onClick={onBookCallClick}
                className="w-full py-3.5 px-6 rounded-full bg-neutral-950 text-white font-neue text-sm font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all text-center flex items-center justify-center shadow-xs cursor-pointer"
              >
                Book a call
              </button>
            </div>

            {/* Card 2: Fact card with office image */}
            <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden min-h-[330px] sm:min-h-[350px] p-6 sm:p-7 flex flex-col justify-between text-white shadow-[0_12px_36px_-12px_rgba(0,0,0,0.12)] group">
              <img
                src={studioFactImg}
                alt="Ezando Studio Workplace"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/35" />

              <div className="relative z-10 flex items-center justify-between text-xs font-medium">
                <span className="text-white/95 font-neue tracking-wide font-semibold">Ezando Fact</span>
                <span className="font-mono text-white/70 tracking-widest text-[11px]">01/04</span>
              </div>

              <div className="relative z-10 pt-8">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-clash text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">230+</h3>
                  <div className="flex flex-col text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-widest text-white/85 leading-tight">
                    <span>EMPLOYEE</span>
                    <span>ENGAGEMENT</span>
                  </div>
                </div>
                <p className="font-neue text-xs sm:text-sm text-white/90 leading-snug mt-2.5 max-w-[240px]">
                  Projects successfully launched worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
