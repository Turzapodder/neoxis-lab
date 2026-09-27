import React from 'react';
import { ArrowIcon } from '@/components/icons/UiIcons';
import { heroProjectCardId } from '@/constants/sections';
import { HERO_PROJECTS } from '@/data/hero';
import { HeroProjectLogo } from './HeroProjectLogo';
import { useProjectSlider } from './useProjectSlider';

const NAV_BUTTON_CLASS =
  'absolute top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-30 group';

const LAST_PROJECT_NUMBER = HERO_PROJECTS[HERO_PROJECTS.length - 1].number;

/** Hero project showcase slider. */
export const ProjectSlider: React.FC = () => {
  const { pos, maxPos, trackTransform, moveLeft, moveRight, focusCard, toggle } = useProjectSlider();

  return (
    <div className="w-full max-w-[560px] md:max-w-[600px] xl:max-w-[640px] flex flex-col gap-3 sm:gap-3.5 select-none relative z-20">
      {/* Slider Container with strict overflow-hidden */}
      <div className="relative w-full overflow-hidden rounded-[22px] sm:rounded-[26px] p-0.5">
        {/* Animated Cards Track */}
        <div
          className="flex items-center gap-3 sm:gap-4 transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: trackTransform }}
        >
          {HERO_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              id={heroProjectCardId(idx)}
              onClick={() => focusCard(idx)}
              className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/15 bg-[#14151B] aspect-[16/11] w-[82vw] sm:w-[calc(50%-8px)] shrink-0 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/35 cursor-pointer will-change-transform"
            >
              <img
                src={project.image}
                alt={project.title}
                draggable={false}
                className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 group-hover:scale-105"
              />

              {/* Logo or Title Overlay */}
              {project.logo ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-center justify-center p-4 pointer-events-none">
                  <HeroProjectLogo name={project.logo} />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-5 pointer-events-none">
                  <span className="font-clash text-white text-sm sm:text-base font-semibold">{project.title}</span>
                </div>
              )}

              {/* Subtle Active Glow Border */}
              <div
                className={`absolute inset-0 rounded-[20px] sm:rounded-[24px] pointer-events-none transition-opacity duration-300 border-2 ${
                  idx === pos ? 'border-white/40 opacity-100' : 'border-transparent opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {pos < maxPos && (
          <button onClick={moveRight} className={`${NAV_BUTTON_CLASS} right-2.5 sm:right-3.5`} aria-label="Move slider right">
            <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}

        {pos > 0 && (
          <button onClick={moveLeft} className={`${NAV_BUTTON_CLASS} left-2.5 sm:left-3.5`} aria-label="Move slider left">
            <ArrowIcon direction="left" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Slider Progress Indicator Track */}
      <div className="flex items-center gap-3 sm:gap-4 px-1 pt-1.5 transition-opacity duration-300">
        <button
          onClick={moveLeft}
          className={`font-clash text-xs sm:text-sm font-semibold transition-colors cursor-pointer w-6 text-left ${
            pos > 0 ? 'text-white hover:text-white/80' : 'text-white/90'
          }`}
          aria-label="Previous project"
        >
          {HERO_PROJECTS[pos].number}
        </button>

        <div
          onClick={toggle}
          className="flex-1 h-[2px] bg-white/20 rounded-full relative cursor-pointer overflow-hidden py-1.5 -my-1.5"
        >
          <div className="h-[2px] bg-white/20 w-full relative">
            <div
              className="absolute top-0 h-full bg-white transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{
                width: `${100 / (maxPos + 1)}%`,
                left: `${(pos * 100) / (maxPos + 1)}%`,
              }}
            />
          </div>
        </div>

        <button
          onClick={moveRight}
          className={`font-clash text-xs sm:text-sm font-semibold transition-colors cursor-pointer w-6 text-right ${
            pos < maxPos ? 'text-white/60 hover:text-white' : 'text-white'
          }`}
          aria-label="Next project"
        >
          {LAST_PROJECT_NUMBER}
        </button>
      </div>
    </div>
  );
};
