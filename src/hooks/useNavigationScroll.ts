import { useEffect } from 'react';
import { getLenis } from '@/lib/lenis';
import type { RouterLocation } from '@/lib/router';
import { jumpToTop, scrollToSection } from '@/utils/scroll';

/**
 * Positions the window when the location changes: at the section named by the hash,
 * otherwise at the top of the new page. Both jump without animating, so arriving on a
 * page never plays every scroll effect between its top and the target.
 */
export function useNavigationScroll({ pathname, hash }: RouterLocation) {
  useEffect(() => {
    // The browser restores old offsets after back/forward, which would override the position set below
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    const sectionId = hash.slice(1);
    if (!sectionId) {
      jumpToTop();
      return;
    }

    // Wait a frame for the new page to lay out, and let Lenis measure its height before scrolling
    const frame = requestAnimationFrame(() => {
      getLenis()?.resize();
      scrollToSection(sectionId, { instant: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
}
