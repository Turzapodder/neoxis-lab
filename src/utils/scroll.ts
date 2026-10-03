import { getLenis } from '@/lib/lenis';

/** Smoothly scrolls to a vertical offset, through Lenis when it is running. */
export const scrollToPosition = (top: number, duration?: number) => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(top, duration === undefined ? undefined : { duration });
  } else {
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export const scrollToTop = () => scrollToPosition(0);

/** Moves to the top without animating, e.g. when a new page is shown. */
export const jumpToTop = () => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
};

interface ElementScrollOptions {
  /** Jump without animating, e.g. when arriving at a section from another page. */
  instant?: boolean;
}

export const scrollToElement = (element: HTMLElement, { instant = false }: ElementScrollOptions = {}) => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(element, { immediate: instant });
  } else {
    element.scrollIntoView({ behavior: instant ? 'instant' : 'smooth' });
  }
};

export const scrollToSection = (id: string, options?: ElementScrollOptions) => {
  const element = document.getElementById(id);
  if (element) scrollToElement(element, options);
};
