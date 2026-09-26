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
    <section id="hero-section" className="relative w-full max-w-full overflow-hidden z-20 px-4 sm:px-8 lg:px-12 xl:px-16 pt-2 sm:pt-4 md:pt-6 pb-6 sm:pb-8">
      <div className="max-w-[1440px] mx-auto relative">
        
        {/* Giant Main Display Title: neoxis® */}
        <div className="w-full relative select-none">
          <div className="flex items-start">
            <h1 className="font-clash font-bold text-white tracking-[-0.04em] leading-[0.88] text-[clamp(3.5rem,14vw,14rem)] drop-shadow-2xl">
              neoxis
            </h1>
            <div className="ml-2 sm:ml-4 mt-2 sm:mt-4 md:mt-6 lg:mt-8 flex items-center justify-center">
              <span className="w-7 h-7 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-18 lg:h-18 rounded-full border-2 sm:border-3 lg:border-4 border-white flex items-center justify-center font-clash font-bold text-white text-xs sm:text-lg md:text-xl lg:text-2xl leading-none shadow-md shrink-0">
                R
              </span>
            </div>
          </div>
        </div>

        {/* Hero Bottom Split Content: Left Information & Right Project Showcase Cards */}
        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Subtitle, Description & Action Buttons */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start gap-5 sm:gap-6 z-20">
            {/* Tagline / Badge: — DESIGN AGENCY */}
            <div className="flex items-center gap-2.5">
              <span className="w-6 sm:w-8 h-[2px] bg-white/70"></span>
              <span className="font-clash text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-white/90">
                DESIGN AGENCY
              </span>
            </div>

            {/* Description Text matching reference screenshot */}
            <div className="flex items-start gap-3 max-w-[440px]">
              <span className="font-neue text-lg sm:text-xl text-white/60 font-light select-none">/</span>
              <p className="font-neue text-sm sm:text-base md:text-[17px] text-white/85 font-normal leading-relaxed">
                We craft futuristic experiences where technology, emotion, and visual storytelling merge into one seamless flow.
              </p>
            </div>

            {/* CTA Buttons matching reference image */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* View My Works Button */}
              <button
                onClick={onViewWorksClick}
                className="bg-black/50 hover:bg-black/70 border border-white/15 text-white px-6 sm:px-7 py-3 rounded-full text-sm sm:text-[15px] font-clash font-medium flex items-center gap-2.5 backdrop-blur-md active:scale-95 transition-all duration-200 cursor-pointer shadow-lg select-none group"
              >
                <span>View My Works</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
              </button>

              {/* Connect Us Button (White pill with black text and circular arrow icon) */}
              <button
                onClick={onConnectClick}
                className="bg-white hover:bg-neutral-100 text-neutral-950 pl-6 sm:pl-7 pr-2 py-2 rounded-full text-sm sm:text-[15px] font-clash font-semibold flex items-center gap-3 active:scale-95 transition-all duration-200 cursor-pointer shadow-xl select-none group"
              >
                <span>Connect Us</span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:scale-105 transition-all">
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
          <div className="lg:col-span-6 xl:col-span-7 flex justify-start lg:justify-end z-20 overflow-hidden max-w-full">
            <ProjectCards />
          </div>

        </div>

      </div>
    </section>
  );
};
