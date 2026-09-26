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
  { src: cardMobileImg, alt: 'Track. Analyze. Optimize. Fintech UI', z: 30 },
  { src: cardAureaImg, alt: 'Aurea Studio Brand Identity', z: 20 },
  { src: cardSpatialImg, alt: 'Aura Spatial Hardware Interface', z: 10 },
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
      // ── 1. Dynamic Coordinate Calculation with Responsive Fallbacks ──
      const getPinPos = (el: Element | null, defaultW = 280, defaultH = 210) => {
        if (!pinContainerRef.current) return { x: 0, y: 0, w: defaultW, h: defaultH };
        const pinRect = pinContainerRef.current.getBoundingClientRect();
        if (!el) {
          return { x: pinRect.width / 2 - defaultW / 2, y: -defaultH, w: defaultW, h: defaultH };
        }
        const r = el.getBoundingClientRect();
        const w = r.width > 10 ? r.width : defaultW;
        const h = r.height > 10 ? r.height : defaultH;
        const maxX = Math.max(0, pinRect.width - w);
        const clampedX = Math.max(0, Math.min(maxX, r.left - pinRect.left));
        return {
          x: clampedX,
          y: r.top - pinRect.top,
          w,
          h,
        };
      };

      const calculateCoordinates = () => {
        const hero0 = document.getElementById('hero-project-card-0');
        const hero1 = document.getElementById('hero-project-card-1');
        const hero2 = document.getElementById('hero-project-card-2');

        const spacers = imagesRowRef.current?.children;
        const target0 = spacers?.[0] || null;
        const target1 = spacers?.[1] || null;
        const target2 = spacers?.[2] || null;

        const isMobile = window.innerWidth < 768;
        const defaultCardW = isMobile ? Math.min(280, window.innerWidth * 0.75) : 290;
        const defaultCardH = defaultCardW * 0.75;
        const defaultSlotSize = isMobile ? 32 : 64;

        return {
          h0: getPinPos(hero0, defaultCardW, defaultCardH),
          h1: getPinPos(hero1, defaultCardW, defaultCardH),
          h2: getPinPos(hero2, defaultCardW, defaultCardH),
          t0: getPinPos(target0, defaultSlotSize, defaultSlotSize),
          t1: getPinPos(target1, defaultSlotSize, defaultSlotSize),
          t2: getPinPos(target2, defaultSlotSize, defaultSlotSize),
        };
      };

      const coords = calculateCoordinates();

      // ── Initial State Setup: Floating cards start with opacity 0 so they don't cover the hero slider ──
      const initialCards = [
        { ref: card1Ref.current, pos: coords.h0 },
        { ref: card2Ref.current, pos: coords.h1 },
        { ref: card3Ref.current, pos: coords.h2 },
      ];

      initialCards.forEach(({ ref, pos }) => {
        if (!ref) return;
        gsap.set(ref, {
          left: pos.x,
          top: pos.y,
          width: pos.w,
          height: pos.h,
          opacity: 0,
          scale: 1,
          borderRadius: '24px',
        });
      });

      gsap.set(whiteOverlayRef.current, {
        clipPath: 'inset(100% 0 0 0)',
      });

      // ── 2. STAGE 1: 3D Flight Transition from Hero to Line 1 (top 85% → top top) ──
      const flightTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Smoothly fade in the floating clones as flight begins
      flightTl.to(
        [card1Ref.current, card2Ref.current, card3Ref.current],
        { opacity: 1, duration: 0.15, ease: 'power1.out' },
        0
      );

      // Fade out static hero cards as clones lift off
      flightTl.to(
        ['#hero-project-card-0', '#hero-project-card-1', '#hero-project-card-2'],
        { opacity: 0, duration: 0.15, ease: 'power1.out' },
        0.1
      );

      const flightConfigs = [
        { ref: card1Ref.current, target: coords.t0, rot: -3, shadowGlow: 'rgba(168, 85, 247, 0.35)' },
        { ref: card2Ref.current, target: coords.t1, rot: 2, shadowGlow: 'rgba(0, 0, 0, 0.7)' },
        { ref: card3Ref.current, target: coords.t2, rot: -1.5, shadowGlow: 'rgba(0, 0, 0, 0.6)' },
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
            borderRadius: '1rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            ease: 'power2.inOut',
            duration: 1.0,
          },
          0
        );

        flightTl.to(
          ref,
          {
            scale: 1.04,
            rotate: rot,
            boxShadow: `0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 25px ${shadowGlow}`,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.05
        );

        flightTl.to(
          ref,
          { scale: 1.0, rotate: 0, duration: 0.6, ease: 'power2.inOut' },
          0.4
        );
      });

      // ── 3. STAGE 2: Pinned Overlay & Sequential Scroll Collapse ──
      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinContainerRef.current,
          start: 'top top',
          end: () => (window.innerWidth < 768 ? '+=1300' : '+=2200'),
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
      className="relative w-full max-w-full bg-[var(--color-canvas-bg)] select-none transition-colors duration-300"
      style={{ overflowX: 'clip', overflowY: 'visible' }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="relative w-full max-w-full h-screen flex items-center justify-center overflow-x-clip overflow-y-visible"
      >
        {/* ================================================================= */}
        {/* 1. BASE LAYER: Light Mode Canvas                                  */}
        {/* ================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 z-10 overflow-hidden bg-[#F8F9FC]">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none bg-violet-300/30" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none bg-pink-300/25" />

          <div className="relative z-10 max-w-[1400px] w-full mx-auto text-center">
            <h2 className="font-clash font-bold text-[22px] sm:text-[34px] md:text-[52px] lg:text-[76px] xl:text-[98px] leading-[1.2] tracking-[-0.035em] text-[#111111]">
              {/* LINE 1: We [images] are a creative */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none">
                <span>We</span>

                {/* Inline Image Row Target Spacers — Receiving the flying project cards */}
                <div
                  ref={imagesRowRef}
                  id="creative-studio-inline-spacers"
                  className="inline-flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5 mx-2 sm:mx-3 md:mx-4 shrink-0 align-middle py-1 overflow-hidden"
                >
                  <div
                    id="hero-target-slot-0"
                    className="w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22 rounded-xl sm:rounded-2xl md:rounded-3xl bg-transparent shrink-0 overflow-hidden"
                  />
                  <div
                    id="hero-target-slot-1"
                    className="w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22 rounded-xl sm:rounded-2xl md:rounded-3xl bg-transparent shrink-0 overflow-hidden"
                  />
                  <div
                    id="hero-target-slot-2"
                    className="w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22 rounded-xl sm:rounded-2xl md:rounded-3xl bg-transparent shrink-0 overflow-hidden"
                  />
                </div>

                <span>&nbsp;are a creative</span>
              </div>

              {/* LINE 2: studio ➔ dedicated */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none mt-2.5 sm:mt-3.5 md:mt-5">
                <span>studio</span>

                {/* Interactive Bouncy Arrow Lottie */}
                <div
                  ref={arrowBtnRef}
                  className="relative inline-flex items-center justify-center w-9 sm:w-14 md:w-20 lg:w-26 h-7 sm:h-11 md:h-16 lg:h-22 mx-1.5 sm:mx-3 shrink-0 align-middle transition-transform duration-300 hover:scale-110 cursor-pointer overflow-hidden group"
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
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none mt-2.5 sm:mt-3.5 md:mt-5">
                <span>to craft a</span>

                {/* CTA Button */}
                <div
                  ref={workBtnWrapperRef}
                  className="relative inline-flex items-center shrink-0 mx-2 sm:mx-3 md:mx-4 overflow-hidden"
                >
                  <button
                    ref={workBtnRef}
                    onClick={onWorkWithUsClick}
                    className="relative inline-flex items-center justify-center px-4 sm:px-6 md:px-8 h-8 sm:h-11 md:h-14 lg:h-16 rounded-full bg-gradient-to-r from-[#D73827] to-[#E34E39] text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-neue font-bold uppercase tracking-wider shrink-0 align-middle hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap overflow-hidden border border-white/25 shadow-lg"
                  >
                    WORK WITH US
                  </button>
                </div>

                <span>&nbsp;</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r bg-clip-text text-transparent from-[#14151E] via-[#7B2CBF] to-[#D946EF]">
                    solution
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r blur-2xl -z-10 pointer-events-none from-purple-400/25 to-pink-400/25" />
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
            bgColor="#FFFFFF"
            zIndex={card.z + 15}
          />
        ))}

        {/* ================================================================= */}
        {/* 3. REVEAL OVERLAY LAYER: Inverted contrast canvas revealed on scroll */}
        {/* ================================================================= */}
        <div
          ref={whiteOverlayRef}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 z-20 pointer-events-none bg-[#090A0F]"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          {/* Subtle Ambient Radial Glows in Overlay Layer */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 bg-violet-900/20" />
          <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none z-0 bg-red-900/15" />

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
                stroke="rgba(30, 32, 45, 0.95)"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F1018" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#141520" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#090A0F" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 max-w-[1400px] w-full mx-auto text-center">
            <h2 className="font-clash font-bold text-[22px] sm:text-[34px] md:text-[52px] lg:text-[76px] xl:text-[98px] leading-[1.2] tracking-[-0.035em] text-white">
              {/* LINE 1 */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none">
                <span>We</span>

                {/* Collapsing Spacers in Overlay Layer */}
                <div
                  ref={whiteImagesRowRef}
                  className="inline-flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5 mx-2 sm:mx-3 md:mx-4 shrink-0 overflow-hidden align-middle py-1"
                >
                  <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22 rounded-xl sm:rounded-2xl md:rounded-3xl shrink-0 overflow-hidden" />
                  <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22 rounded-xl sm:rounded-2xl md:rounded-3xl shrink-0 overflow-hidden" />
                  <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22 rounded-xl sm:rounded-2xl md:rounded-3xl shrink-0 overflow-hidden" />
                </div>

                <span>&nbsp;are a creative</span>
              </div>

              {/* LINE 2 */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none mt-2.5 sm:mt-3.5 md:mt-5">
                <span>studio</span>

                <div
                  ref={whiteArrowSpacerRef}
                  className="w-9 sm:w-14 md:w-20 lg:w-26 h-7 sm:h-11 md:h-16 lg:h-22 mx-1.5 sm:mx-3 shrink-0 overflow-hidden align-middle inline-flex"
                />

                <span>&nbsp;dedicated</span>
              </div>

              {/* LINE 3 */}
              <div className="flex flex-nowrap whitespace-nowrap items-center justify-center leading-none mt-2.5 sm:mt-3.5 md:mt-5">
                <span>to craft a</span>

                <div
                  ref={whiteBtnSpacerRef}
                  className="h-8 sm:h-11 md:h-14 lg:h-16 mx-2 sm:mx-3 md:mx-4 shrink-0 overflow-hidden align-middle inline-flex"
                />

                <span>&nbsp;</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r bg-clip-text text-transparent from-violet-300 via-fuchsia-300 to-pink-400">
                    solution
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r blur-2xl -z-10 pointer-events-none from-violet-500/30 to-fuchsia-500/30" />
                </span>
              </div>
            </h2>
          </div>
        </div>

        {/* Floating Quick Action Icons on Right Edge */}
        <div className="fixed right-5 bottom-8 z-30 flex flex-col gap-2.5 pointer-events-auto">
          <button
            onClick={onWorkWithUsClick}
            className="w-10 h-10 rounded-xl shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border bg-neutral-900 text-white border-white/10"
            aria-label="Shop / Work inquiry"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
          <button
            className="w-10 h-10 rounded-xl shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border bg-white text-neutral-900 border-black/10"
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
