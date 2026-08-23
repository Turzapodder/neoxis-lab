import React from 'react';
import { ProjectCards } from './ProjectCards';

interface HeroProps {
  onConnectClick?: () => void;
  onViewWorksClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onConnectClick,
  onViewWorksClick,
}) => {
  return (
    <section id="hero-section" className="relative w-full z-20 px-6 sm:px-10 lg:px-16 pt-2 sm:pt-4 md:pt-6">
      <div className="max-w-[1440px] mx-auto relative">
        
        {/* Giant Main Display Title: luvron® */}
        <div className="w-full relative select-none">
          <div className="flex items-start">
            <h1 className="font-clash font-bold text-white tracking-[-0.04em] leading-[0.88] text-[76px] sm:text-[120px] md:text-[170px] lg:text-[220px] xl:text-[255px] drop-shadow-2xl">
              luvron
            </h1>
            <div className="ml-2 sm:ml-4 mt-2 sm:mt-4 md:mt-6 lg:mt-8 flex items-center justify-center">
              <span className="w-7 h-7 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 sm:border-3 lg:border-4 border-white flex items-center justify-center font-clash font-bold text-white text-xs sm:text-xl md:text-2xl lg:text-3xl leading-none shadow-lg">
                R
              </span>
            </div>
          </div>
        </div>

        {/* Hero Bottom Split Content: Left Information & Right Project Showcase Cards */}
        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Subtitle, Description & Action Buttons */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start gap-5 sm:gap-6 z-20">
            {/* Tagline / Badge */}
            <div className="flex items-center gap-3">
              <span className="w-8 sm:w-10 h-[1.5px] bg-white/70"></span>
              <span className="font-clash text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-white/95">
                DESIGN AGENCY
              </span>
            </div>

            {/* Description Text in Neue Montreal */}
            <p className="font-neue text-base sm:text-lg md:text-[19px] text-[#A6A6AC] font-normal leading-relaxed max-w-[420px]">
              We create digital experiences that are beautiful, functional, and
              built to make an impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* View My Works Button */}
              <button
                onClick={onViewWorksClick}
                className="glass-pill text-white px-6 sm:px-7 py-3 rounded-full text-sm sm:text-[15px] font-clash font-medium flex items-center gap-2.5 hover:bg-white/15 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg select-none group"
              >
                <span>View My Works</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 group-hover:scale-125 transition-transform" />
              </button>

              {/* Connect Us Button */}
              <button
                onClick={onConnectClick}
                className="bg-white text-black pl-6 sm:pl-7 pr-2 py-2 rounded-full text-sm sm:text-[15px] font-clash font-semibold flex items-center gap-3 hover:bg-white/90 active:scale-95 transition-all duration-200 cursor-pointer shadow-2xl select-none group"
              >
                <span>Connect Us</span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:scale-105 group-hover:bg-black transition-all">
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Showcase Cards */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-start lg:justify-end z-20">
            <ProjectCards />
          </div>

        </div>

      </div>

      {/* Right-Side Vertical "Scroll Down" Indicator */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 select-none pointer-events-none">
        <span className="font-neue text-xs font-medium tracking-[0.2em] text-[#8E8E93] uppercase [writing-mode:vertical-rl] rotate-180">
          Scroll Down
        </span>
        <div className="w-[1.5px] h-14 bg-white/20 rounded-full overflow-hidden">
          <div className="w-full h-full bg-white/80 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};
