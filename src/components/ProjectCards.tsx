import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cardMobileImg from '../assets/images/card-mobile.jpg';
import cardAureaImg from '../assets/images/card-aurea.jpg';
import cardSpatialImg from '../assets/images/card-spatial.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  image: string;
  isLightBg?: boolean;
  hasArrowBtn?: boolean;
  logoElement?: React.ReactNode;
}

export const ProjectCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const arrowBtnRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: '01',
      number: '01',
      title: 'Track. Analyze. Optimize.',
      subtitle: 'Fintech Mobile Experience',
      image: cardMobileImg,
      isLightBg: true,
      hasArrowBtn: true,
    },
    {
      id: '02',
      number: '02',
      title: 'Aurea Studio',
      subtitle: 'Brand Identity & 3D Experience',
      image: cardAureaImg,
      isLightBg: false,
      logoElement: (
        <div className="flex items-center gap-2.5 text-white">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
          </svg>
          <span className="font-clash text-lg sm:text-xl font-bold tracking-tight text-white">
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
      isLightBg: false,
      logoElement: (
        <div className="flex items-center gap-2 text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse"></span>
          <span className="font-clash text-lg font-bold tracking-wider">AURA SPATIAL</span>
        </div>
      ),
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out trackbar and arrow on initial scroll down from Hero
      gsap.to(trackRef.current, {
        scrollTrigger: {
          trigger: cardsWrapperRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
        },
        opacity: 0,
        y: 20,
        ease: 'power1.out',
      });

      if (arrowBtnRef.current) {
        gsap.to(arrowBtnRef.current, {
          scrollTrigger: {
            trigger: cardsWrapperRef.current,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 1,
          },
          opacity: 0,
          scale: 0.6,
          ease: 'power1.out',
        });
      }
    }, cardsWrapperRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getVisibleProjects = () => {
    const first = projects[activeIndex];
    const second = projects[(activeIndex + 1) % projects.length];
    const third = projects[(activeIndex + 2) % projects.length];
    return [first, second, third];
  };

  const visible = getVisibleProjects();

  return (
    <div
      ref={cardsWrapperRef}
      className="w-full max-w-[620px] xl:max-w-[680px] flex flex-col gap-3.5 select-none relative z-20"
      style={{ overflow: 'visible' }}
    >
      {/* Cards Container */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-stretch relative"
        style={{ overflow: 'visible' }}
      >
        {/* Card 1 (Hero Slot 0) */}
        <div
          id="hero-project-card-0"
          onClick={handleNext}
          className="group relative rounded-[22px] sm:rounded-[24px] overflow-hidden border border-white/15 bg-[#14151B] aspect-[4/3] shadow-2xl cursor-pointer transition-colors duration-300 hover:border-white/30 z-30"
          style={{
            transformOrigin: 'center center',
          }}
        >
          {/* Card Image */}
          <img
            src={visible[0].image}
            alt={visible[0].title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Optional Overlay Logo/Title */}
          {visible[0].logoElement && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center p-4">
              {visible[0].logoElement}
            </div>
          )}

          {/* Floating Circle Arrow Button on Right Edge */}
          {visible[0].hasArrowBtn && (
            <div
              ref={arrowBtnRef}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 pointer-events-none"
            >
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
          )}
        </div>

        {/* Card 2 (Hero Slot 1) */}
        <div
          id="hero-project-card-1"
          onClick={handleNext}
          className="relative rounded-[22px] sm:rounded-[24px] overflow-hidden border border-white/15 bg-[#14151B] aspect-[4/3] shadow-2xl cursor-pointer group transition-colors duration-300 hover:border-white/30 z-20"
          style={{
            transformOrigin: 'center center',
          }}
        >
          {/* Card Image */}
          <img
            src={visible[1].image}
            alt={visible[1].title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Center Logo & Title */}
          {visible[1].logoElement ? (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-center justify-center p-4">
              {visible[1].logoElement}
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
              <span className="font-clash text-white text-base font-semibold">
                {visible[1].title}
              </span>
            </div>
          )}
        </div>

        {/* Card 3 (Hero Slot 2 — stacked behind Card 2) */}
        <div
          id="hero-project-card-2"
          onClick={handleNext}
          className="absolute right-0 top-0 w-full sm:w-[calc(50%-0.5rem)] rounded-[22px] sm:rounded-[24px] overflow-hidden border border-white/10 bg-[#14151B] aspect-[4/3] shadow-xl cursor-pointer pointer-events-none z-10 hidden sm:block opacity-60 scale-95 translate-x-2 -translate-y-2"
          style={{
            transformOrigin: 'center center',
          }}
        >
          <img
            src={visible[2].image}
            alt={visible[2].title}
            className="w-full h-full object-cover object-center"
          />
          {visible[2].logoElement && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-center justify-center p-4">
              {visible[2].logoElement}
            </div>
          )}
        </div>
      </div>

      {/* Slider Progress Indicator Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-3 sm:gap-4 px-1 transition-opacity duration-300"
      >
        {/* Current Number */}
        <button
          onClick={handlePrev}
          className="font-clash text-xs sm:text-sm font-medium text-white/90 w-5 text-left hover:text-white transition-colors cursor-pointer"
          aria-label="Previous project"
        >
          {projects[activeIndex].number}
        </button>

        {/* Horizontal Track with Active Progress Fill */}
        <div
          onClick={handleNext}
          className="flex-1 h-[2px] bg-white/20 rounded-full relative cursor-pointer overflow-hidden group py-1 -my-1"
        >
          <div className="h-[2px] bg-white/20 w-full relative">
            <div
              className="absolute top-0 h-full bg-white transition-all duration-500 ease-out rounded-full"
              style={{
                width: `${100 / projects.length}%`,
                left: `${(activeIndex * 100) / projects.length}%`,
              }}
            />
          </div>
        </div>

        {/* Max Count */}
        <button
          onClick={handleNext}
          className="font-clash text-xs sm:text-sm font-medium text-white/50 w-5 text-right hover:text-white transition-colors cursor-pointer"
          aria-label="Next project"
        >
          03
        </button>
      </div>
    </div>
  );
};
