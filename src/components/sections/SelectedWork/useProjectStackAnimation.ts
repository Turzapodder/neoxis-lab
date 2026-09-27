import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface UseProjectStackAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  row1Ref: RefObject<HTMLDivElement | null>;
  row2Ref: RefObject<HTMLDivElement | null>;
}

/**
 * 3D Stacking Deck Animation matching unusually.webflow.io:
 * Row 1 sticks in place. As Row 2 scrolls into view to stack over Row 1,
 * Row 1 recedes into 3D space (z: -250px, scale: 0.93, translateY) with perspective depth.
 */
export const useProjectStackAnimation = ({
  containerRef,
  row1Ref,
  row2Ref,
}: UseProjectStackAnimationProps) => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    if (!container || !row1 || !row2) return;

    const mm = gsap.matchMedia();

    // Desktop/Tablet (> 768px)
    mm.add('(min-width: 768px)', () => {
      // Set initial 3D transform origin
      gsap.set(row1, {
        transformPerspective: 1200,
        transformOrigin: 'center 40%',
        willChange: 'transform, opacity',
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

    return () => mm.revert();
  }, [containerRef, row1Ref, row2Ref]);
};
