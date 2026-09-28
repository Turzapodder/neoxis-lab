import React, { useRef } from 'react';
import { chromeBg } from '@/lib/images';
import { FLOATING_CARDS } from '@/data/hero';
import { FloatingImage } from './FloatingImage';
import { StudioFrameDetails } from './StudioFrameDetails';
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
      {/* Pinned viewport container */}
      <div
        ref={pinContainerRef}
        className="relative w-full max-w-full h-screen flex items-center justify-center overflow-x-clip overflow-y-visible"
      >
        {/* 1. BASE LAYER: light canvas */}
        <div className={`${LAYER_CLASS} z-10 overflow-hidden bg-[var(--color-canvas-bg)]`}>
          <StudioFrameDetails variant="base" />
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

        {/* 3. OVERLAY: framed dark card that rises over the base layer (decorative duplicate) */}
        <div
          ref={overlayRef}
          aria-hidden
          className={`${LAYER_CLASS} z-20 pointer-events-none bg-black`}
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <img
              src={chromeBg}
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] sm:w-[130%] max-w-none grayscale opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>

          <StudioFrameDetails variant="overlay" />
          <StudioStatement
            variant="overlay"
            imagesRowRef={overlayImagesRowRef}
            arrowRef={overlayArrowRef}
            buttonSlotRef={overlayButtonSlotRef}
          />
        </div>
      </div>
    </section>
  );
};
