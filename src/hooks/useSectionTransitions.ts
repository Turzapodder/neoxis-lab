import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';

/** Decorative scroll motion only runs for users who have not asked for reduced motion. */
const MOTION_OK_QUERY = '(prefers-reduced-motion: no-preference)';

/** Where the rounded window starts, and how far through the viewport it finishes opening. */
const WIPE = { from: 'inset(12% 9% 12% 9% round 56px)', end: 'top 25%' } as const;

/**
 * Rounded wipe reveals, opted into with data attributes:
 * - `data-wipe`: framed sections open from an inset rounded window to full size.
 * - `data-wipe-bg`: background artwork inside a `data-wipe` frame settles from a slight zoom.
 *
 * Every effect is scrubbed to scroll, so it reverses when scrolling back up.
 */
export function useSectionTransitions<T extends HTMLElement>(scopeRef: RefObject<T | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia(scope);

    mm.add(MOTION_OK_QUERY, () => {
      gsap.utils.toArray<HTMLElement>('[data-wipe]').forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top bottom', end: WIPE.end, scrub: 0.8 },
        });

        tl.fromTo(el, { clipPath: WIPE.from }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.inOut' }, 0);

        const bg = el.querySelector<HTMLElement>('[data-wipe-bg]');
        if (bg) tl.fromTo(bg, { scale: 1.12 }, { scale: 1, ease: 'power1.inOut' }, 0);
      });
    });

    return () => mm.revert();
  }, [scopeRef]);
}
