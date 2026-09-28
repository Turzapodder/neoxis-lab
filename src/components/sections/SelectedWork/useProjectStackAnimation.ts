import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface UseProjectStackAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  row1Ref: RefObject<HTMLDivElement | null>;
  row2Ref: RefObject<HTMLDivElement | null>;
  mobileCardsRef: RefObject<(HTMLDivElement | null)[]>;
  progressBarsRef?: RefObject<(HTMLDivElement | null)[]>;
}

/**
 * 3D Stacking Deck Animation matching unusually.webflow.io:
 * - Desktop: Row 1 sticks in place. As Row 2 scrolls into view, Row 1 recedes into 3D space.
 * - Mobile: 1 card per row. Card pins in place directly under the sticky header.
 *   Next card glides up tightly from below to take its place, while previous card slowly fades away by increasing size.
 */
export const useProjectStackAnimation = ({
  containerRef,
  row1Ref,
  row2Ref,
  mobileCardsRef,
  progressBarsRef,
}: UseProjectStackAnimationProps) => {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // 1. Desktop & Tablet (>= 768px): 2-Row 3D Deck Stacking
    mm.add('(min-width: 768px)', () => {
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (!row1 || !row2) return;

      gsap.set(row1, {
        transformPerspective: 1200,
        transformOrigin: 'center 40%',
        willChange: 'transform, opacity, filter',
      });

      const st = ScrollTrigger.create({
        trigger: row2,
        start: 'top 85%',
        end: 'top 22%',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(row1, {
            yPercent: p * 16,
            z: -p * 240,
            scale: 1 - p * 0.07,
            opacity: 1 - p * 0.25,
            filter: `brightness(${1 - p * 0.12})`,
          });
        },
      });

      return () => {
        st.kill();
        gsap.set(row1, { clearProps: 'all' });
      };
    });

    // 2. Mobile (< 768px): 1-Card-per-row Continuous Deck Stacking
    mm.add('(max-width: 767px)', () => {
      const cards = mobileCardsRef.current?.filter(Boolean) || [];
      const bars = progressBarsRef?.current?.filter(Boolean) || [];
      if (cards.length < 2) return;

      const triggers: ScrollTrigger[] = [];

      // Initial progress bar state: bar 0 full, others 0
      if (bars.length > 0) {
        gsap.set(bars[0], { scaleX: 1 });
        bars.slice(1).forEach((bar) => gsap.set(bar, { scaleX: 0 }));
      }

      cards.forEach((card, i) => {
        if (i >= cards.length - 1) return;
        const nextCard = cards[i + 1];
        if (!card || !nextCard) return;

        gsap.set(card, {
          transformOrigin: 'center center',
          willChange: 'transform, opacity, filter',
        });

        const st = ScrollTrigger.create({
          trigger: nextCard,
          start: 'top 75%',
          end: 'top 78px',
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(card, {
              scale: 1 + p * 0.06, // slowly fades away by increasing its size
              opacity: Math.max(0, 1 - p * 1.15), // smoothly fades away
              filter: `blur(${p * 4}px)`,
              pointerEvents: p > 0.5 ? 'none' : 'auto',
            });

            // Smoothly fill current progress bar segment
            if (bars[i + 1]) {
              gsap.set(bars[i + 1], { scaleX: p });
            }
          },
        });

        triggers.push(st);
      });

      return () => {
        triggers.forEach((t) => t.kill());
        cards.forEach((card) => {
          if (card) gsap.set(card, { clearProps: 'all' });
        });
        bars.forEach((bar) => {
          if (bar) gsap.set(bar, { clearProps: 'all' });
        });
      };
    });

    return () => mm.revert();
  }, [containerRef, row1Ref, row2Ref, mobileCardsRef, progressBarsRef]);
};
