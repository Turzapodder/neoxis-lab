import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToSection, scrollToTop } from '@/utils/scroll';

/**
 * Navigation for in-app paths. A link into the current page scrolls there smoothly
 * instead of re-navigating; a link to another page goes through the Next.js router.
 */
export function useSiteNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (to: string) => {
      const url = new URL(to, window.location.href);

      if (url.pathname === pathname) {
        const sectionId = url.hash.slice(1);
        if (sectionId) scrollToSection(sectionId);
        else scrollToTop();
        return;
      }

      router.push(`${url.pathname}${url.search}${url.hash}`);
    },
    [pathname, router],
  );
}
