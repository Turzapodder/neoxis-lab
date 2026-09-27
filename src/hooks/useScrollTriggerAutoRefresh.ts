import { useEffect, type RefObject } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

/** Wait for height transitions (accordions, expanding cards) to finish before re-measuring. */
const SETTLE_MS = 300;

/**
 * Re-measures every ScrollTrigger when the page height changes.
 * ScrollTrigger positions are computed once, so content that grows or shrinks above
 * a trigger (opening an accordion, expanding a card) would otherwise leave it misaligned.
 */
export function useScrollTriggerAutoRefresh<T extends HTMLElement>(scopeRef: RefObject<T | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let measuredHeight = scope.offsetHeight;

    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const height = scope.offsetHeight;
        // Pin spacing is stable after a refresh, so this only fires on real content changes
        if (height !== measuredHeight) {
          ScrollTrigger.refresh();
          measuredHeight = scope.offsetHeight;
        }
      }, SETTLE_MS);
    });

    observer.observe(scope);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [scopeRef]);
}
