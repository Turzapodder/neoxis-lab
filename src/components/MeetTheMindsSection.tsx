import React from 'react';
import { Globe } from 'lucide-react';

import meetMindsImg from '../assets/images/meet-minds-team.jpg';
import studioFactImg from '../assets/images/studio-fact-work.jpg';
import kateImg from '../assets/images/team/kate.jpg';
import leoImg from '../assets/images/team/leo.jpg';
import tobiasImg from '../assets/images/team/tobias.jpg';

// Social circular SVG icons
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DribbbleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

interface MeetTheMindsSectionProps {
  onBookCallClick?: () => void;
}

export const MeetTheMindsSection: React.FC<MeetTheMindsSectionProps> = ({
  onBookCallClick,
}) => {
  return (
    <section
      id="meet-the-minds-section"
      className="relative w-full bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] py-16 sm:py-20 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* ========================================================================= */}
        {/* 1. SECTION TOP BAR: "• Why choose us", Headline & Social Buttons          */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 md:pb-14">
          {/* Left Title Area */}
          <div className="flex flex-col items-start">
            {/* Tag / Badge: • Why choose us */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
              <span className="tracking-wide">Why choose us</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.05] select-none">
              Meet The Minds
              <br />
              Behind The Work
            </h2>
          </div>

          {/* Right Social Circular Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 self-start md:self-end">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200/90 bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-950 active:scale-95 transition-all shadow-xs"
            >
              <XIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble Profile"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200/90 bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-950 active:scale-95 transition-all shadow-xs"
            >
              <DribbbleIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200/90 bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-950 active:scale-95 transition-all shadow-xs"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN TWO-COLUMN CONTENT GRID                                           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: Large Team Portrait Card                                    */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] lg:h-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-neutral-100 border border-neutral-200/70 shadow-sm group">
              <img
                src={meetMindsImg}
                alt="Neoxis Team Gathering"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              {/* Subtle architectural horizontal line detail matching image */}
              <div className="absolute bottom-8 left-6 right-6 h-[1.5px] bg-white/40 backdrop-blur-xs pointer-events-none" />
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Statement, Stats Bar, and Two Bottom Cards                 */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8 lg:gap-10">
            {/* Top: Large Agency Philosophy Statement */}
            <div className="pt-1 sm:pt-2">
              <p className="font-neue text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] leading-[1.28] tracking-[-0.015em]">
                <span className="font-bold text-neutral-950">
                  At Ezando® Studio, we bring
                </span>{' '}
                <span className="font-bold text-neutral-950">
                  together designers, strategists,
                </span>{' '}
                <span className="text-neutral-500 font-normal">
                  and makers to craft bold, thoughtful digital experiences made with care and curiosity.
                </span>
              </p>
            </div>

            {/* Middle: Stats & Global Reach Avatar Bar */}
            <div className="pt-6 pb-2 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
              {/* Globe Icon + Over 100 Fields / 12 Countries */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-neutral-200/80 bg-white flex items-center justify-center text-neutral-800 shadow-2xs">
                  <Globe className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-neue text-sm sm:text-[15px] font-semibold text-neutral-900 leading-tight">
                    Over 100 Fields
                  </span>
                  <span className="font-neue text-xs sm:text-[13px] text-neutral-500 mt-0.5">
                    12 Countries Over World
                  </span>
                </div>
              </div>

              {/* Overlapping Avatar Stack + 12 Badge */}
              <div className="flex items-center -space-x-2.5">
                <img
                  src={kateImg}
                  alt="Team Specialist 1"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <img
                  src={leoImg}
                  alt="Team Specialist 2"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <img
                  src={tobiasImg}
                  alt="Team Specialist 3"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-950 text-white font-mono text-xs font-semibold flex items-center justify-center border-2 border-white shadow-xs">
                  12
                </div>
              </div>
            </div>

            {/* Bottom: Two Feature Cards Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              {/* Card 1: 400+ Trusted Partner + Logos + Book a call */}
              <div className="bg-white rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 border border-neutral-200/80 shadow-[0_10px_35px_-12px_rgba(0,0,0,0.06)] flex flex-col justify-between min-h-[330px] sm:min-h-[350px]">
                {/* Stat Header */}
                <div>
                  <h3 className="font-clash text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-none">
                    400+
                  </h3>
                  <p className="font-neue text-xs sm:text-sm text-neutral-500 font-medium mt-1.5">
                    Trusted Partner
                  </p>
                </div>

                {/* 6 Minimalist Client Logos */}
                <div className="grid grid-cols-3 gap-y-5 gap-x-2 items-center my-6 py-1 select-none">
                  {/* thea */}
                  <div className="flex items-center justify-center text-neutral-600 hover:text-neutral-950 transition-colors">
                    <span className="font-serif italic text-lg sm:text-xl font-bold tracking-wider">
                      thea
                    </span>
                  </div>

                  {/* Leafe */}
                  <div className="flex items-center justify-center gap-1 text-neutral-700 hover:text-neutral-950 transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                    </svg>
                    <span className="font-neue font-bold text-xs sm:text-sm tracking-tight">
                      Leafe
                    </span>
                  </div>

                  {/* hues */}
                  <div className="flex items-center justify-center gap-1 text-neutral-700 hover:text-neutral-950 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    <span className="font-neue font-bold text-xs sm:text-sm lowercase tracking-wider">
                      hues
                    </span>
                  </div>

                  {/* ZUMAR CONS */}
                  <div className="flex items-center justify-center gap-1.5 text-neutral-600 hover:text-neutral-950 transition-colors">
                    <svg
                      className="w-3.5 h-3.5 stroke-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <div className="flex flex-col text-[8px] sm:text-[9px] font-mono font-bold uppercase leading-[1.1] tracking-wider">
                      <span>ZUMAR</span>
                      <span>CONS</span>
                    </div>
                  </div>

                  {/* Crona */}
                  <div className="flex items-center justify-center gap-1 text-neutral-700 hover:text-neutral-950 transition-colors">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
                    </svg>
                    <span className="font-neue font-bold text-xs sm:text-sm tracking-tight">
                      Crona
                    </span>
                  </div>

                  {/* Mercury */}
                  <div className="flex items-center justify-center gap-1 text-neutral-700 hover:text-neutral-950 transition-colors">
                    <svg
                      className="w-3.5 h-3.5 stroke-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M4 18V9a4 4 0 0 1 8 0v9M12 9a4 4 0 0 1 8 0v9" />
                    </svg>
                    <span className="font-neue font-bold text-xs sm:text-sm tracking-tight">
                      Mercury
                    </span>
                  </div>
                </div>

                {/* Book a call Pill Button */}
                <button
                  onClick={onBookCallClick}
                  className="w-full py-3.5 px-6 rounded-full bg-neutral-950 text-white font-neue text-sm font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all text-center flex items-center justify-center shadow-xs cursor-pointer"
                >
                  Book a call
                </button>
              </div>

              {/* Card 2: Fact Card with Real Office Workplace Image */}
              <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden min-h-[330px] sm:min-h-[350px] p-6 sm:p-7 flex flex-col justify-between text-white shadow-[0_12px_36px_-12px_rgba(0,0,0,0.12)] group">
                {/* Background Image */}
                <img
                  src={studioFactImg}
                  alt="Ezando Studio Workplace"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Dark gradient overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/35" />

                {/* Top Row: Fact title + 01/04 */}
                <div className="relative z-10 flex items-center justify-between text-xs font-medium">
                  <span className="text-white/95 font-neue tracking-wide font-semibold">
                    Ezando Fact
                  </span>
                  <span className="font-mono text-white/70 tracking-widest text-[11px]">
                    01/04
                  </span>
                </div>

                {/* Bottom Stat Content */}
                <div className="relative z-10 pt-8">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-clash text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
                      230+
                    </h3>
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
};

export default MeetTheMindsSection;
