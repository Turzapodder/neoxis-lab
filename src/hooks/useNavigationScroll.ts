import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getLenis } from '@/lib/lenis';
import { jumpToTop, scrollToSection } from '@/utils/scroll';

/**
 * Positions the window after a page change: at the section named by the URL hash,
 * otherwise at the top. Both jump without animating, and go through Lenis so its
 * scroll position stays in sync with the page Next.js just rendered.
 */
export function useNavigationScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = window.location.hash.slice(1);

    // Wait a frame for the new page to lay out, and let Lenis measure its height before scrolling
    const frame = requestAnimationFrame(() => {
      getLenis()?.resize();
      if (sectionId) scrollToSection(sectionId, { instant: true });
      else jumpToTop();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
}
