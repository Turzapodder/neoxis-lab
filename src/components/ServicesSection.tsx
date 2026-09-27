import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Minus, Plus } from 'lucide-react';

import smokeBg from '../assets/images/headr-bg.png';
import brandingImg from '../assets/images/studio-fact-work.jpg';
import digitalImg from '../assets/images/card-aurea.jpg';
import webImg from '../assets/images/card-spatial.jpg';
import uiuxImg from '../assets/images/card-mobile.jpg';
import siennaImg from '../assets/images/team/sienna.jpg';
import leoImg from '../assets/images/team/leo.jpg';
import marcusImg from '../assets/images/team/marcus.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Social circular SVG icons
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DribbbleIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
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

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

interface Service {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    id: 'branding-design',
    title: 'Branding Design',
    tags: ['Brand Strategy', 'Visual Identity'],
    description:
      'Distinctive brand systems, from strategy to visual identity, built to make your business instantly recognizable.',
    image: brandingImg,
  },
  {
    id: 'digital-design',
    title: 'Digital Design',
    tags: ['Motion Design', 'Accessibility'],
    description:
      'Expressive digital assets and motion that feel alive, inclusive, and consistent across every touchpoint.',
    image: digitalImg,
  },
  {
    id: 'web-design',
    title: 'Web Design',
    tags: ['Landing Pages', 'Portfolio Sites'],
    description:
      'Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.',
    image: webImg,
  },
  {
    id: 'ui-ux-design',
    title: 'UI,UX design',
    tags: ['User Research', 'Wireframing'],
    description:
      'Research-led interfaces and flows that turn complex products into intuitive, delightful experiences.',
    image: uiuxImg,
  },
];

interface Mind {
  id: string;
  name: string;
  role: string;
  hashtag: string;
  image: string;
  offset: string;
}

const MINDS: Mind[] = [
  { id: 'jame-nolan', name: 'Jame Nolan', role: 'Web Designer', hashtag: '#theleader', image: siennaImg, offset: 'lg:mt-0' },
  { id: 'jame-obsbon', name: 'Jame Obsbon', role: 'UI Designer', hashtag: '#dynamic', image: leoImg, offset: 'lg:mt-20' },
  { id: 'bruno-santost', name: 'Bruno Santost', role: 'Art Director', hashtag: '#thecreative', image: marcusImg, offset: 'lg:mt-32' },
];

interface ServicesSectionProps {
  onExploreClick?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onExploreClick }) => {
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);
  const [activeMind, setActiveMind] = useState(MINDS.length - 1);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered reveal for service rows and team cards
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white p-1.5 sm:p-2">
      <div className="relative w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-black text-white">
        {/* Grayscale smoke backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={smokeBg}
            alt=""
            className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[160%] max-w-none sm:w-[120%] opacity-40 grayscale mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-10">
          {/* ========================================================================= */}
          {/* 1. OUR SERVICES HEADER                                                    */}
          {/* ========================================================================= */}
          <div className="flex items-start justify-between gap-6 pb-8 sm:pb-10">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white mb-3 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                <span className="tracking-wide">Shape what's next.</span>
              </div>
              <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-bold tracking-tight leading-[0.95] select-none">
                Our Services
              </h2>
            </div>
            <span className="font-neue text-xl sm:text-2xl text-neutral-500 mt-10 sm:mt-16">04</span>
          </div>

          {/* ========================================================================= */}
          {/* 2. SERVICES ACCORDION                                                     */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-2">
            {SERVICES.map((service, index) => {
              const isOpen = openId === service.id;
              return (
                <div
                  key={service.id}
                  data-reveal
                  className="rounded-[20px] sm:rounded-[24px] bg-neutral-900/90 backdrop-blur-md border border-white/[0.04]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : service.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${service.id}-panel`}
                    className="group w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_3fr_auto] items-start gap-4 sm:gap-6 p-5 sm:p-7 text-left"
                  >
                    <span
                      className={`font-clash font-bold leading-none tracking-tight text-5xl sm:text-7xl md:text-8xl transition-colors duration-500 ${
                        isOpen ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-400'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}.
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

                  {/* Collapsible panel: grid-rows trick animates height */}
                  <div
                    id={`${service.id}-panel`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 px-5 sm:px-7 pb-6 sm:pb-7">
                        <div className="hidden md:block" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                          <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-800">
                            <img
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                            />
                          </div>
                          <div className="flex flex-col justify-between gap-6">
                            <p className="font-neue text-sm leading-relaxed text-neutral-300 max-w-[300px]">
                              {service.description}
                            </p>
                            <button
                              type="button"
                              onClick={() => onExploreClick?.(service.id)}
                              className="group/btn self-start flex items-center gap-3 rounded-full bg-white pl-5 pr-1 py-1 text-sm font-medium text-neutral-950 hover:bg-neutral-200 active:scale-95 transition-all"
                            >
                              Explore Now
                              <span className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 3. MEET THE MINDS HEADER                                                  */}
          {/* ========================================================================= */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-28 sm:pt-40 pb-12 sm:pb-16">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              <span className="tracking-wide">Our member</span>
            </div>
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.02] md:text-right select-none">
              Meet The Minds
              <br />
              Behind The Work
            </h2>
          </div>

          {/* ========================================================================= */}
          {/* 4. STAGGERED TEAM CARDS + GIANT ROLE TEXT                                 */}
          {/* ========================================================================= */}
          <div className="relative pb-24 sm:pb-40">
            {/* Giant role word follows the active card */}
            <div
              aria-hidden
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[140%] text-center pointer-events-none select-none"
            >
              <span
                key={MINDS[activeMind].role}
                className="inline-block font-clash font-bold uppercase whitespace-nowrap leading-none text-[22vw] lg:text-[240px] bg-gradient-to-b from-white/25 to-transparent bg-clip-text text-transparent animate-[role-fade-in_0.6s_ease-out]"
              >
                {MINDS[activeMind].role}
              </span>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-5 lg:gap-6">
              {MINDS.map((mind, index) => {
                const isActive = activeMind === index;
                return (
                  <article
                    key={mind.id}
                    data-reveal
                    onMouseEnter={() => setActiveMind(index)}
                    onFocus={() => setActiveMind(index)}
                    tabIndex={0}
                    className={`relative ${mind.offset} rounded-[20px] bg-neutral-900/95 p-5 sm:p-6 outline-none transition-transform duration-500 hover:-translate-y-1.5`}
                  >
                    {/* Corner brackets on active card */}
                    {(['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'] as const).map((pos) => (
                      <span
                        key={pos}
                        className={`absolute ${pos} w-3 h-3 -m-1.5 border-white/60 transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-400">{mind.role}</span>
                      <div className="flex items-center gap-1.5">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label={`${mind.name} on X`} className="w-7 h-7 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors">
                          <XIcon />
                        </a>
                        <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label={`${mind.name} on Dribbble`} className="w-7 h-7 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:bg-neutral-200 transition-colors">
                          <DribbbleIcon />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label={`${mind.name} on LinkedIn`} className="w-7 h-7 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors">
                          <LinkedInIcon />
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-center py-6 sm:py-8">
                      <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-neutral-800">
                        <img
                          src={mind.image}
                          alt={mind.name}
                          loading="lazy"
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            isActive ? 'scale-105 grayscale-0' : 'grayscale-[30%]'
                          }`}
                        />
                      </div>
                    </div>

                    <span className="block text-[11px] text-neutral-500">{mind.hashtag}</span>
                    <h3 className="font-neue text-lg font-medium text-white mt-1">{mind.name}</h3>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
