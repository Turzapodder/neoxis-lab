import React, { useState, useRef, useEffect, useCallback } from 'react';
import cardMobileImg from '../assets/images/card-mobile.jpg';
import cardAureaImg from '../assets/images/card-aurea.jpg';
import cardSpatialImg from '../assets/images/card-spatial.jpg';

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  image: string;
  logoElement?: React.ReactNode;
}

export const ProjectCards: React.FC = () => {
  const [pos, setPos] = useState(0);
  const [shift, setShift] = useState(0);
  const [maxPos, setMaxPos] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: '01',
      number: '01',
      title: 'Track. Analyze. Optimize.',
      subtitle: 'Fintech Mobile Experience',
      image: cardMobileImg,
    },
    {
      id: '02',
      number: '02',
      title: 'Aurea Studio',
      subtitle: 'Brand Identity & 3D Experience',
      image: cardAureaImg,
      logoElement: (
        <div className="flex items-center gap-2.5 text-white">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
          </svg>
          <span className="font-clash text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white">
            Aurea Studio
          </span>
        </div>
      ),
    },
    {
      id: '03',
      number: '03',
      title: 'Aura Spatial',
      subtitle: 'Spatial Hardware Interface',
      image: cardSpatialImg,
      logoElement: (
        <div className="flex items-center gap-2 text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse"></span>
          <span className="font-clash text-base sm:text-lg font-bold tracking-wider text-white">
            AURA SPATIAL
          </span>
        </div>
      ),
    },
  ];

  const calculateShift = useCallback((targetPos: number) => {
    if (!containerRef.current) return 0;
    const isMobile = window.innerWidth < 640;
    const effectiveMaxPos = isMobile ? 2 : 1;
    if (targetPos <= 0) return 0;

    const containerW = containerRef.current.clientWidth;
    if (isMobile) {
      const card0 = document.getElementById('hero-project-card-0');
      const step = card0 ? card0.offsetWidth + 12 : containerW * 0.82;
      return targetPos * step;
    } else {
      // Exactly 1 card width + 1 gap so cards fill 100% with no peek/sliver
      const step = (containerW - 16) / 2 + 16;
      return targetPos >= effectiveMaxPos ? step : 0;
    }
  }, []);

  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const isMobile = window.innerWidth < 640;
    const newMaxPos = isMobile ? 2 : 1;
    setMaxPos(newMaxPos);

    const clampedPos = Math.min(newMaxPos, pos);
    if (clampedPos !== pos) {
      setPos(clampedPos);
    }
    setShift(calculateShift(clampedPos));
  }, [calculateShift, pos]);

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [updatePositions]);

  const handleMoveRight = () => {
    const nextPos = Math.min(maxPos, pos + 1);
    setPos(nextPos);
    setShift(calculateShift(nextPos));
  };

  const handleMoveLeft = () => {
    const prevPos = Math.max(0, pos - 1);
    setPos(prevPos);
    setShift(calculateShift(prevPos));
  };

  return (
    <div className="w-full max-w-[560px] md:max-w-[600px] xl:max-w-[640px] flex flex-col gap-3 sm:gap-3.5 select-none relative z-20">
      {/* Slider Container with strict overflow-hidden */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-[22px] sm:rounded-[26px] p-0.5"
      >
        {/* Animated Cards Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-3 sm:gap-4 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translateX(-${shift}px)`,
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              id={`hero-project-card-${idx}`}
              onClick={() => {
                if (idx > pos && pos < maxPos) {
                  handleMoveRight();
                } else if (idx < pos && pos > 0) {
                  handleMoveLeft();
                }
              }}
              className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/15 bg-[#14151B] aspect-[16/11] w-[82vw] sm:w-[calc(50%-8px)] shrink-0 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/35 cursor-pointer will-change-transform"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                draggable={false}
                className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 group-hover:scale-105"
              />

              {/* Logo or Title Overlay */}
              {project.logoElement ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-center justify-center p-4 pointer-events-none">
                  {project.logoElement}
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-5 pointer-events-none">
                  <span className="font-clash text-white text-sm sm:text-base font-semibold">
                    {project.title}
                  </span>
                </div>
              )}

              {/* Subtle Active Glow Border */}
              <div
                className={`absolute inset-0 rounded-[20px] sm:rounded-[24px] pointer-events-none transition-opacity duration-300 border-2 ${
                  idx === pos
                    ? 'border-white/40 opacity-100'
                    : 'border-transparent opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* High-Contrast Button at Right: moves slider right */}
        {pos < maxPos && (
          <button
            onClick={handleMoveRight}
            className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-30 group"
            aria-label="Move slider right"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* High-Contrast Button at Left: shown when slider is on the right, moves carousel to left */}
        {pos > 0 && (
          <button
            onClick={handleMoveLeft}
            className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-30 group"
            aria-label="Move slider left"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Slider Progress Indicator Track */}
      <div className="flex items-center gap-3 sm:gap-4 px-1 pt-1.5 transition-opacity duration-300">
        {/* Left Number */}
        <button
          onClick={handleMoveLeft}
          className={`font-clash text-xs sm:text-sm font-semibold transition-colors cursor-pointer w-6 text-left ${
            pos > 0 ? 'text-white hover:text-white/80' : 'text-white/90'
          }`}
          aria-label="Previous project"
        >
          {projects[pos].number}
        </button>

        {/* Horizontal Track with Active Progress Fill */}
        <div
          onClick={() => {
            if (pos === 0) handleMoveRight();
            else handleMoveLeft();
          }}
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

        {/* Right Number */}
        <button
          onClick={handleMoveRight}
          className={`font-clash text-xs sm:text-sm font-semibold transition-colors cursor-pointer w-6 text-right ${
            pos < maxPos ? 'text-white/60 hover:text-white' : 'text-white'
          }`}
          aria-label="Next project"
        >
          03
        </button>
      </div>
    </div>
  );
};
