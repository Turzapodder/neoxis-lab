import React, { useRef } from 'react';
import { FLOATING_CARDS } from '@/data/hero';
import { FloatingActions } from './FloatingActions';
import { FloatingImage } from './FloatingImage';
import { StudioStatement } from './StudioStatement';
import { useStudioScrollAnimation } from './useStudioScrollAnimation';

interface CreativeStudioSectionProps {
  onWorkWithUsClick?: () => void;
}

const LAYER_CLASS = 'absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16';

export const CreativeStudioSection: React.FC<CreativeStudioSectionProps> = ({ onWorkWithUsClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const imagesRowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const buttonSlotRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayImagesRowRef = useRef<HTMLDivElement>(null);
  const overlayArrowRef = useRef<HTMLDivElement>(null);
  const overlayButtonSlotRef = useRef<HTMLDivElement>(null);

  const cardRefs = [card1Ref, card2Ref, card3Ref] as const;

  useStudioScrollAnimation({
    section: sectionRef,
    pinContainer: pinContainerRef,
    cards: [card1Ref, card2Ref, card3Ref],
    imagesRow: imagesRowRef,
    arrow: arrowRef,
    buttonSlot: buttonSlotRef,
    overlay: overlayRef,
    overlayImagesRow: overlayImagesRowRef,
    overlayArrow: overlayArrowRef,
    overlayButtonSlot: overlayButtonSlotRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-full bg-[var(--color-canvas-bg)] select-none transition-colors duration-300"
      style={{ overflowX: 'clip', overflowY: 'visible' }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="relative w-full max-w-full h-screen flex items-center justify-center overflow-x-clip overflow-y-visible"
      >
        {/* 1. BASE LAYER: Light canvas */}
        <div className={`${LAYER_CLASS} z-10 overflow-hidden bg-[#F8F9FC]`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none bg-violet-300/30" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none bg-pink-300/25" />

          <StudioStatement
            variant="base"
            imagesRowRef={imagesRowRef}
            arrowRef={arrowRef}
            buttonSlotRef={buttonSlotRef}
            onWorkWithUsClick={onWorkWithUsClick}
          />
        </div>

        {/* 2. FLOATING PROJECT CARDS: GSAP controls flight/dimensions */}
        {FLOATING_CARDS.map((card, i) => (
          <FloatingImage
            key={card.src}
            ref={cardRefs[i]}
            src={card.src}
            alt={card.alt}
            bgColor="#FFFFFF"
            zIndex={card.z + 15}
          />
        ))}

        {/* 3. REVEAL OVERLAY LAYER: Dark canvas revealed on scroll */}
        <div
          ref={overlayRef}
          className={`${LAYER_CLASS} z-20 pointer-events-none bg-[#090A0F]`}
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 bg-violet-900/20" />
          <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none z-0 bg-red-900/15" />

          {/* Ambient fluid wavy contour at bottom */}
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

          <StudioStatement
            variant="overlay"
            imagesRowRef={overlayImagesRowRef}
            arrowRef={overlayArrowRef}
            buttonSlotRef={overlayButtonSlotRef}
          />
        </div>

        <FloatingActions onInquiryClick={onWorkWithUsClick} />
      </div>
    </section>
  );
};
