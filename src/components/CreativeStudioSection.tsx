import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingImage } from './FloatingImage';
import { Lottie } from 'lottie-react';
import bouncyArrowData from '../assets/bouncy-arrow.json';

import cardMobileImg from '../assets/images/card-mobile.jpg';
import cardAureaImg from '../assets/images/card-aurea.jpg';
import cardSpatialImg from '../assets/images/card-spatial.jpg';

gsap.registerPlugin(ScrollTrigger);

interface CreativeStudioSectionProps {
  onWorkWithUsClick?: () => void;
}

const FLOATING_CARDS = [
  { src: cardMobileImg, alt: 'Track. Analyze. Optimize. Fintech UI', bg: '#14151B', z: 30 },
  { src: cardAureaImg, alt: 'Aurea Studio Brand Identity', bg: '#14151B', z: 20 },
  { src: cardSpatialImg, alt: 'Aura Spatial Hardware Interface', bg: '#14151B', z: 10 },
] as const;

export const CreativeStudioSection: React.FC<CreativeStudioSectionProps> = ({
  onWorkWithUsClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  // Floating Card Refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Base Layer Elements (Dark Canvas)
  const imagesRowRef = useRef<HTMLDivElement>(null);
  const arrowBtnRef = useRef<HTMLDivElement>(null);
  const workBtnWrapperRef = useRef<HTMLDivElement>(null);
  const workBtnRef = useRef<HTMLButtonElement>(null);

  // White Overlay Elements (Light Canvas)
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const whiteImagesRowRef = useRef<HTMLDivElement>(null);
  const whiteArrowSpacerRef = useRef<HTMLDivElement>(null);
  const whiteBtnSpacerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !pinContainerRef.current ||
      !imagesRowRef.current ||
      !card1Ref.current ||
      !card2Ref.current ||
      !card3Ref.current ||
      !whiteOverlayRef.current ||
      !whiteImagesRowRef.current ||
      !whiteArrowSpacerRef.current ||
      !whiteBtnSpacerRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // ── 1. Measure Hero Card Positions & Line 1 Target Slots ──
      const pinEl = pinContainerRef.current!;
      const pinRect = pinEl.getBoundingClientRect();

      const getPinPos = (el: Element | null) => {
        if (!el) return { x: 0, y: 0, w: 100, h: 100 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - pinRect.left,
          y: r.top - pinRect.top,
          w: r.width,
          h: r.height,
        };
      };

      const hero0 = document.getElementById('hero-project-card-0');
      const hero1 = document.getElementById('hero-project-card-1');
      const hero2 = document.getElementById('hero-project-card-2');

      const hero0Pos = getPinPos(hero0);
      const hero1Pos = getPinPos(hero1);
      const hero2Pos = getPinPos(hero2);

      const spacers = imagesRowRef.current!.children;
      const target0Pos = getPinPos(spacers[0]);
      const target1Pos = getPinPos(spacers[1]);
      const target2Pos = getPinPos(spacers[2]);

      // ── Initial State Setup ──
      const initialCards = [
        { ref: card1Ref.current, pos: hero0Pos, opacity: 1, scale: 1 },
        { ref: card2Ref.current, pos: hero1Pos, opacity: 1, scale: 1 },
        { ref: card3Ref.current, pos: hero2Pos, opacity: 0.6, scale: 0.95 },
      ];

      initialCards.forEach(({ ref, pos, opacity, scale }) => {
        if (!ref) return;
        gsap.set(ref, {
          left: pos.x,
          top: pos.y,
          width: pos.w,
          height: pos.h,
          opacity,
          scale,
          borderRadius: '24px',
        });
      });

      gsap.set(whiteOverlayRef.current, {
        clipPath: 'inset(100% 0 0 0)',
      });

      // ── 2. STAGE 1: 3D Flight Transition from Hero to Line 1 (top 75% → top top) ──
      const flightTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Fade out static hero cards on flight start
      flightTl.to(
        ['#hero-project-card-0', '#hero-project-card-1', '#hero-project-card-2'],
        { opacity: 0, duration: 0.15, ease: 'power1.out' },
        0
      );

      const flightConfigs = [
        { ref: card1Ref.current, target: target0Pos, rot: -4, shadowGlow: 'rgba(168, 85, 247, 0.35)' },
        { ref: card2Ref.current, target: target1Pos, rot: 3, shadowGlow: 'rgba(0, 0, 0, 0.7)' },
        { ref: card3Ref.current, target: target2Pos, rot: -2, shadowGlow: 'rgba(0, 0, 0, 0.6)' },
      ];

      flightConfigs.forEach(({ ref, target, rot, shadowGlow }) => {
        if (!ref) return;
        flightTl.to(
          ref,
          {
            left: target.x,
            top: target.y,
            width: target.w,
            height: target.h,
            borderRadius: '1.25rem',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
            ease: 'power2.inOut',
            duration: 1.0,
          },
          0
        );
        flightTl.to(
          ref,
          {
            scale: 1.05,
            rotate: rot,
            opacity: 1,
            boxShadow: `0 35px 70px -12px rgba(0, 0, 0, 0.85), 0 0 35px ${shadowGlow}`,
            duration: 0.3,
            ease: 'power2.out',
          },
          0
        );
        flightTl.to(
          ref,
          { scale: 1.0, rotate: 0, duration: 0.7, ease: 'power2.inOut' },
          0.3
        );
      });

      // ── 3. STAGE 2: Pinned Overlay & Sequential Scroll Collapse ──
      // Clean, data-driven approach inspired by GSAP---01
      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinContainerRef.current,
          start: 'top top',
          end: '+=2400',
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Hold in docked state initially
      pinnedTl.to({}, { duration: 0.2 });

      // White overlay rises from bottom (100%) to top (0%)
      pinnedTl.to(
        whiteOverlayRef.current,
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          duration: 1.0,
        },
        0.1
      );

      // Data-driven collapse list (timed to sequential arrival of rising curtain)
      const baseSpacerChildren = imagesRowRef.current ? Array.from(imagesRowRef.current.children) : [];
      const whiteSpacerChildren = whiteImagesRowRef.current ? Array.from(whiteImagesRowRef.current.children) : [];

      const collapseSequence = [
        // 1. Line 3 Button (Bottom - reached first by rising curtain)
        {
          targets: [workBtnWrapperRef.current, whiteBtnSpacerRef.current],
          props: { width: 0, marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0, opacity: 0 },
          start: 0.32,
          duration: 0.32,
        },
        // 2. Line 2 Arrow (Middle - reached next)
        {
          targets: [arrowBtnRef.current, whiteArrowSpacerRef.current],
          props: { width: 0, marginLeft: 0, marginRight: 0, opacity: 0 },
          start: 0.50,
          duration: 0.32,
        },
        // 3. Line 1 Image Slots & Rows (Top - reached last)
        {
          targets: [...baseSpacerChildren, ...whiteSpacerChildren],
          props: { width: 0 },
          start: 0.68,
          duration: 0.32,
        },
        {
          targets: [imagesRowRef.current, whiteImagesRowRef.current],
          props: { gap: 0, marginLeft: 0, marginRight: 0 },
          start: 0.68,
          duration: 0.32,
        },
        // 4. Floating Cards glide & fade smoothly as Line 1 collapses
        {
          targets: [card1Ref.current, card2Ref.current, card3Ref.current],
          props: { opacity: 0, scale: 0.92, x: 50 },
          start: 0.66,
          duration: 0.30,
        },
      ];

      collapseSequence.forEach(({ targets, props, start, duration }) => {
        const validTargets = targets.filter(Boolean);
        if (validTargets.length > 0) {
          pinnedTl.to(
            validTargets,
            {
              ...props,
              ease: 'power2.inOut',
              duration,
            },
            start
          );
        }
      });

      // Brief final rest hold to admire the statement in pure white
      pinnedTl.to({}, { duration: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="creative-studio-section"
      className="relative w-full bg-[#090A0F] select-none"
      style={{ overflow: 'visible' }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen flex items-center justify-center overflow-visible"
      >
        {/* ================================================================= */}
        {/* 1. BASE LAYER: Deep Rich Black canvas with Pure White typography  */}
        {/* ================================================================= */}
        <div className="absolute inset-0 bg-[#090A0F] flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 z-10 overflow-hidden">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-violet-900/10 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-red-900/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-[1400px] w-full mx-auto text-center">
            <h2 className="font-clash font-bold text-white text-[36px] sm:text-[56px] md:text-[76px] lg:text-[96px] xl:text-[110px] leading-[1.18] tracking-[-0.035em]">
              {/* LINE 1: We [images] are a creative */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none">
                <span>We</span>

                {/* Inline Image Row Target Spacers — Receiving the flying project cards */}
                <div
                  ref={imagesRowRef}
                  id="creative-studio-inline-spacers"
                  className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mx-3 sm:mx-5 shrink-0 align-middle py-1 overflow-hidden"
                >
                  <div
                    id="hero-target-slot-0"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl bg-transparent shrink-0 overflow-hidden"
                  />
                  <div
                    id="hero-target-slot-1"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl bg-transparent shrink-0 overflow-hidden"
                  />
                  <div
                    id="hero-target-slot-2"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl bg-transparent shrink-0 overflow-hidden"
                  />
                </div>

                <span>&nbsp;are a creative</span>
              </div>

              {/* LINE 2: studio ➔ dedicated */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none mt-3 sm:mt-4 md:mt-5">
                <span>studio</span>

                {/* Interactive Bouncy Arrow Lottie */}
                <div
                  ref={arrowBtnRef}
                  className="relative inline-flex items-center justify-center w-12 sm:w-16 md:w-24 lg:w-28 h-10 sm:h-14 md:h-20 lg:h-24 mx-2 sm:mx-4 shrink-0 align-middle transition-transform duration-300 hover:scale-110 cursor-pointer overflow-hidden group"
                >
                  <div className="w-full h-full -rotate-90 flex items-center justify-center pointer-events-none scale-[1.7] sm:scale-[1.9] md:scale-[2.2]">
                    <Lottie
                      src={bouncyArrowData}
                      loop={true}
                      autoplay={true}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <span>&nbsp;dedicated</span>
              </div>

              {/* LINE 3: to craft a [WORK WITH US] solution */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none mt-3 sm:mt-4 md:mt-5">
                <span>to craft a</span>

                {/* CTA Button */}
                <div
                  ref={workBtnWrapperRef}
                  className="relative inline-flex items-center shrink-0 mx-3 sm:mx-5 overflow-hidden"
                >
                  <button
                    ref={workBtnRef}
                    onClick={onWorkWithUsClick}
                    className="relative inline-flex items-center justify-center px-5 sm:px-7 md:px-9 h-11 sm:h-14 md:h-16 rounded-full bg-gradient-to-r from-[#D73827] to-[#E34E39] text-white text-xs sm:text-sm md:text-base font-neue font-bold uppercase tracking-wider shrink-0 align-middle hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap overflow-hidden border border-white/25 shadow-lg"
                  >
                    WORK WITH US
                  </button>
                </div>

                <span>&nbsp;</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                    solution
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-2xl -z-10 pointer-events-none" />
                </span>
              </div>
            </h2>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. FLOATING PROJECT CARDS: GSAP controls flight/dimensions        */}
        {/* ================================================================= */}
        {FLOATING_CARDS.map((card, i) => (
          <FloatingImage
            key={card.src}
            ref={[card1Ref, card2Ref, card3Ref][i]}
            src={card.src}
            alt={card.alt}
            bgColor={card.bg}
            zIndex={card.z + 15}
          />
        ))}

        {/* ================================================================= */}
        {/* 3. WHITE OVERLAY LAYER: Pristine White canvas + Rich Black text   */}
        {/* ================================================================= */}
        <div
          ref={whiteOverlayRef}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 z-20 pointer-events-none bg-[#F7F7F9]"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          {/* Subtle Ambient Radial Glows in White Layer */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-200/40 blur-[130px] pointer-events-none z-0" />
          <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-pink-200/30 blur-[140px] pointer-events-none z-0" />

          {/* Ambient fluid wavy contour border at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 md:h-72 pointer-events-none overflow-hidden z-0 opacity-70">
            <svg
              viewBox="0 0 1440 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-cover object-bottom"
              preserveAspectRatio="none"
            >
              <path
                d="M-50 180 C 280 80, 520 250, 820 130 C 1120 10, 1320 170, 1500 90 L 1500 280 L -50 280 Z"
                fill="url(#wave-gradient)"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#F1F1F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E9E9F2" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 max-w-[1400px] w-full mx-auto text-center">
            <h2 className="font-clash font-bold text-[#111111] text-[36px] sm:text-[56px] md:text-[76px] lg:text-[96px] xl:text-[110px] leading-[1.18] tracking-[-0.035em]">
              {/* LINE 1 */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none">
                <span>We</span>

                {/* Collapsing Spacers in White Layer */}
                <div
                  ref={whiteImagesRowRef}
                  className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mx-3 sm:mx-5 shrink-0 overflow-hidden align-middle py-1"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl shrink-0 overflow-hidden" />
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl shrink-0 overflow-hidden" />
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl shrink-0 overflow-hidden" />
                </div>

                <span>&nbsp;are a creative</span>
              </div>

              {/* LINE 2 */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none mt-3 sm:mt-4 md:mt-5">
                <span>studio</span>

                <div
                  ref={whiteArrowSpacerRef}
                  className="w-12 sm:w-16 md:w-24 lg:w-28 h-10 sm:h-14 md:h-20 lg:h-24 mx-2 sm:mx-4 shrink-0 overflow-hidden align-middle inline-flex"
                />

                <span>&nbsp;dedicated</span>
              </div>

              {/* LINE 3 */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none mt-3 sm:mt-4 md:mt-5">
                <span>to craft a</span>

                <div
                  ref={whiteBtnSpacerRef}
                  className="h-11 sm:h-14 md:h-16 mx-3 sm:mx-5 shrink-0 overflow-hidden align-middle inline-flex"
                />

                <span>&nbsp;</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#14151E] via-[#7B2CBF] to-[#D946EF] bg-clip-text text-transparent">
                    solution
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400/25 to-pink-400/25 blur-2xl -z-10 pointer-events-none" />
                </span>
              </div>
            </h2>
          </div>
        </div>

        {/* Floating Quick Action Icons on Right Edge */}
        <div className="fixed right-5 bottom-8 z-30 flex flex-col gap-2.5 pointer-events-auto">
          <button
            onClick={onWorkWithUsClick}
            className="w-10 h-10 rounded-xl bg-white text-black shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-black/10"
            aria-label="Shop / Work inquiry"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
          <button
            className="w-10 h-10 rounded-xl bg-[#1C1D24] text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-white/10"
            aria-label="Grid view"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 12h18M12 3v18" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
