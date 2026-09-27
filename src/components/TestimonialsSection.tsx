import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Globe, Quote, Star } from 'lucide-react';

import kateImg from '../assets/images/team/kate.jpg';
import leoImg from '../assets/images/team/leo.jpg';
import tobiasImg from '../assets/images/team/tobias.jpg';
import elenaImg from '../assets/images/team/elena.jpg';
import randalImg from '../assets/images/team/randal.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: string;
  lead: string;
  rest: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'liam-chen',
    lead: 'We were struggling to create a unified design experience until we worked with Ezendo.',
    rest: 'The team not only brought consistency but elevated every screen with thoughtful detail.',
    name: 'Liam Chen',
    role: 'Product Manager, NovaStack',
    image: leoImg,
    rating: 5,
  },
  {
    id: 'marco-diaz',
    lead: 'Ezendo turned a scattered brand into one clear, confident voice.',
    rest: 'Our launch landed better than any campaign we have run before.',
    name: 'Marco Diaz',
    role: 'Founder, Crona Labs',
    image: tobiasImg,
    rating: 5,
  },
  {
    id: 'sofia-reyes',
    lead: 'They listened first, then designed something we could never have imagined.',
    rest: 'Every workshop felt like a step forward, never a detour.',
    name: 'Sofia Reyes',
    role: 'Head of Growth, Mercury',
    image: elenaImg,
    rating: 5,
  },
  {
    id: 'hannah-lee',
    lead: 'Our conversion rate doubled within weeks of the redesign going live.',
    rest: 'The attention to detail across mobile and desktop is remarkable.',
    name: 'Hannah Lee',
    role: 'CMO, BookStore',
    image: kateImg,
    rating: 5,
  },
];

const StatDot: React.FC = () => (
  <span className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-neutral-200" />
);

// Monochrome partner marks
const ZanticMark = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M3 4h6l12 16h-6zM15 4h6l-5 6.5-3-4zM3 20l5-6.5 3 4-2 2.5z" />
  </svg>
);
const BookStoreMark = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2 3 7v10l9 5V12l9-5zM13 13.2V22l8-4.5V8.7z" opacity=".55" />
    <path d="M12 2 3 7v10l9 5V12l9-5z" />
  </svg>
);
const WagerMark = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <circle cx="12" cy="7" r="4.2" />
    <circle cx="7" cy="14" r="4.2" />
    <circle cx="17" cy="14" r="4.2" />
    <path d="M11 14h2l1.5 8h-5z" />
  </svg>
);
const CronaMark = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2 22 9v2L12 4 2 11V9zM12 8l10 7v2l-10-7-10 7v-2zM12 14l8 5.6L12 22l-8-2.4z" />
  </svg>
);
const MercuryMark = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
    <path d="M2 19 8 6l4 8 4-8 6 13" />
  </svg>
);

const PARTNERS: { name: string; mark: React.ReactNode; className: string }[] = [
  { name: 'zantic', mark: <ZanticMark />, className: 'text-xl font-semibold lowercase' },
  { name: 'BookStore', mark: <BookStoreMark />, className: 'text-lg font-medium' },
  { name: 'Wager', mark: <WagerMark />, className: 'text-base font-semibold' },
  { name: 'Wager', mark: <WagerMark />, className: 'text-base font-semibold' },
  { name: 'Crona', mark: <CronaMark />, className: 'text-base font-semibold' },
  { name: 'Mercury', mark: <MercuryMark />, className: 'text-base font-semibold' },
  { name: 'Crona', mark: <CronaMark />, className: 'text-base font-semibold' },
];

export const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const current = TESTIMONIALS[index];
  const next = TESTIMONIALS[(index + 1) % TESTIMONIALS.length];
  const go = (step: number) =>
    setIndex((i) => (i + step + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Scroll-triggered reveal for cards and partner row
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
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
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--color-canvas-bg)] text-neutral-950 py-16 sm:py-20 md:py-24 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        {/* ========================================================================= */}
        {/* 1. HEADER: "• What Our Clients Says" + Testimonials.                      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 pb-10 sm:pb-14">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-900 md:pt-4 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="tracking-wide">What Our Clients Says</span>
          </div>
          <div>
            <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-bold tracking-tight leading-[0.95] select-none">
              Testimonials.
            </h2>
            <p className="font-neue text-sm text-neutral-500 max-w-[300px] mt-6 sm:mt-10 leading-relaxed">
              We've helped businesses across industries achieve their goals. Here are some of our recent projects.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TESTIMONIAL CAROUSEL CARD                                              */}
        {/* ========================================================================= */}
        <div
          data-reveal
          className="relative rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr_0.6fr] gap-6 lg:gap-8"
        >
          {/* Left: quote, rating, reach */}
          <div className="flex flex-col justify-between gap-8 sm:p-2">
            <div key={current.id} className="animate-[role-fade-in_0.5s_ease-out]">
              <Quote className="w-8 h-8 text-neutral-300 fill-neutral-300 rotate-180 mb-2" />
              <p className="font-neue text-lg sm:text-xl leading-[1.45] indent-8">
                <span className="font-medium text-neutral-950">{current.lead}</span>{' '}
                <span className="text-neutral-500">{current.rest}</span>
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="flex gap-1" aria-label={`${current.rating} out of 5 stars`}>
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="flex-1 h-px bg-neutral-100" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-neutral-700 stroke-[1.4]" />
              <span className="w-px h-8 bg-neutral-200" />
              <span className="text-[11px] leading-snug text-neutral-600 max-w-[130px]">
                Ezendo® support peoples from all over the world
              </span>
            </div>
          </div>

          {/* Middle: main portrait */}
          <div className="relative aspect-[4/3.5] lg:aspect-auto lg:min-h-[400px] rounded-[20px] overflow-hidden bg-neutral-200">
            <img
              key={current.id}
              src={current.image}
              alt={current.name}
              className="absolute inset-0 w-full h-full object-cover animate-[role-fade-in_0.6s_ease-out]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute left-5 bottom-5 text-white">
              <p className="font-neue text-base font-medium">{current.name}</p>
              <p className="font-neue text-xs text-white/75 mt-1">{current.role}</p>
            </div>
          </div>

          {/* Right: next preview + controls */}
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={`Show testimonial from ${next.name}`}
              className="hidden lg:block aspect-[5/4] rounded-[18px] overflow-hidden bg-neutral-200 group"
            >
              <img
                src={next.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </button>
            <div className="flex items-center justify-between pt-3 pb-3 border-b border-neutral-100">
              <span className="text-xs font-medium text-neutral-900">Testimonial</span>
              <span className="text-xs text-neutral-500">
                {String(index + 1).padStart(2, '0')}/{String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 pt-5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full border border-neutral-300 text-neutral-900 flex items-center justify-center hover:border-neutral-950 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full bg-neutral-950 text-white flex items-center justify-center hover:bg-neutral-800 active:scale-95 transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="hidden lg:flex justify-between mt-auto px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. STATS CARDS                                                            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
          <div data-reveal className="relative rounded-[24px] bg-white p-5 sm:p-6 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between">
            <StatDot />
            <span className="text-sm font-medium">Happy people</span>
            <div className="flex items-end justify-between gap-4">
              <span className="font-clash font-bold text-6xl sm:text-7xl leading-none tracking-tight">3M+</span>
              <div className="flex -space-x-2 pb-1">
                {[kateImg, randalImg, tobiasImg].map((src) => (
                  <img key={src} src={src} alt="" className="w-7 h-7 rounded-full object-cover border-2 border-white" />
                ))}
              </div>
            </div>
          </div>

          <div data-reveal className="relative rounded-[24px] bg-white p-5 sm:p-6 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between">
            <StatDot />
            <span className="text-sm font-medium">ROI Improvement</span>
            <div className="flex items-end gap-4">
              <span className="font-clash font-bold text-6xl sm:text-7xl leading-none tracking-tight">95%</span>
              <span className="text-[11px] leading-snug text-neutral-500 max-w-[130px] pb-1">
                Clients reported better ROI within 1 month.
              </span>
            </div>
          </div>

          <div data-reveal className="relative rounded-[24px] bg-white p-5 sm:p-6 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between">
            <StatDot />
            <span className="text-sm font-medium">Client Retention</span>
            <div className="flex items-end gap-4">
              <span className="font-clash font-bold text-6xl sm:text-7xl leading-none tracking-tight">88%</span>
              <span className="text-[11px] leading-snug text-neutral-500 max-w-[130px] pb-1">
                Come back for second or third projects.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. PARTNER RELATIONSHIPS                                                  */}
        {/* ========================================================================= */}
        <div data-reveal className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-900">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
              <span className="tracking-wide">Our Ezendo® relationships</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-[200px] leading-relaxed">
              Trusted by over 1000+ companies around the world
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-start md:justify-end gap-x-10 sm:gap-x-14 gap-y-8 md:max-w-[560px] md:ml-auto">
            {PARTNERS.map((partner, i) => (
              <li
                key={`${partner.name}-${i}`}
                className="flex items-center gap-1.5 text-neutral-900 opacity-80 hover:opacity-100 transition-opacity"
              >
                {partner.mark}
                <span className={`font-neue tracking-tight ${partner.className}`}>{partner.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
