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

export const scrollToElement = (element: HTMLElement) => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(element);
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) scrollToElement(element);
};
