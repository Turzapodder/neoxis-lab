import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';

interface ScrollRevealOptions {
  /** Starting vertical offset in px. */
  y?: number;
  duration?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /**
   * When set, all items animate together off one trigger with this stagger.
   * When omitted, each item gets its own trigger.
   */
  stagger?: number;
  /** Batch trigger: the scope element itself, or the first revealed item. */
  trigger?: 'scope' | 'first-item';
}

const REVEAL_SELECTOR = '[data-reveal]';

/** Fades `[data-reveal]` descendants of `scopeRef` up as they scroll into view. */
export function useScrollReveal<T extends HTMLElement>(
  scopeRef: RefObject<T | null>,
  { y = 40, duration = 0.9, start = 'top 88%', stagger, trigger = 'scope' }: ScrollRevealOptions = {},
) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const tween = { y, opacity: 0, duration, ease: 'power3.out' };
      const toggleActions = 'play none none reverse';

      if (stagger === undefined) {
        gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
          gsap.from(el, { ...tween, scrollTrigger: { trigger: el, start, toggleActions } });
        });
        return;
      }

      gsap.from(REVEAL_SELECTOR, {
        ...tween,
        stagger,
        scrollTrigger: {
          trigger: trigger === 'scope' ? scope : REVEAL_SELECTOR,
          start,
          toggleActions,
        },
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, y, duration, start, stagger, trigger]);
}
