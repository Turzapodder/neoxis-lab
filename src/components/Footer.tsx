import React from 'react';
import { ChevronUp } from 'lucide-react';
import type Lenis from 'lenis';

import footerImg from '../assets/images/meet-minds-team.jpg';

// Scroll through Lenis when it is running so smooth scroll stays in sync
const scrollToTarget = (target: HTMLElement | number) => {
  // useSmoothScroll stores the running instance on window.lenis
  const lenis = (window as unknown as { lenis?: Lenis | null }).lenis;
  if (lenis) {
    lenis.scrollTo(target);
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

const NAV_LINKS = [
  { label: 'Home', target: 'top' },
  { label: 'Studio', target: 'creative-studio-section' },
  { label: 'Projects', target: 'selected-work-section' },
  { label: 'Blog', target: 'testimonials-section' },
];

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
];

export const Footer: React.FC = () => {
  const handleNav = (target: string) => {
    if (target === 'top') {
      scrollToTarget(0);
      return;
    }
    const el = document.getElementById(target);
    if (el) scrollToTarget(el);
  };

  return (
    <footer className="relative w-full bg-[var(--color-canvas-bg)] p-1.5 sm:p-2 pt-16 sm:pt-24 transition-colors duration-500">
      <div className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-white text-neutral-950 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-12 sm:pt-16">
          {/* ========================================================================= */}
          {/* 1. TOP ROW: image + email, navigation, social                             */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_0.5fr_0.5fr] gap-x-6 gap-y-12">
            <div className="col-span-2 lg:col-span-1 max-w-[400px]">
              <div className="aspect-[16/9] rounded-[18px] overflow-hidden bg-neutral-100">
                <img
                  src={footerImg}
                  alt="neoxis studio team at work"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="flex items-center justify-between gap-4 mt-5">
                <span className="flex items-center gap-2 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  Stay connected
                </span>
                <a
                  href="mailto:hello@neoxis.design"
                  className="text-sm sm:text-base font-medium underline underline-offset-4 decoration-1 hover:decoration-2 transition-all"
                >
                  hello@neoxis.design
                </a>
              </div>
            </div>

            <nav aria-label="Footer navigation">
              <p className="text-xs font-medium mb-5">Navigation</p>
              <ul className="flex flex-col gap-1.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => handleNav(link.target)}
                      className="font-neue text-xl sm:text-2xl font-medium hover:text-neutral-500 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-medium mb-5">Social media</p>
              <ul className="flex flex-col gap-1.5">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-neue text-xl sm:text-2xl font-medium hover:text-neutral-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. LEGAL ROW                                                              */}
          {/* ========================================================================= */}
          <div className="mt-14 sm:mt-16 pt-5 border-t border-neutral-200 grid grid-cols-2 lg:grid-cols-[1.4fr_0.5fr_0.5fr] gap-x-6 gap-y-3 items-center text-[11px] sm:text-xs text-neutral-800">
            <span className="col-span-2 lg:col-span-1">
              ©{new Date().getFullYear()} neoxis Studio. All Rights Reserved
            </span>
            <a href="#" className="hover:text-neutral-500 transition-colors">Terms of Use</a>
            <div className="flex items-center justify-between">
              <a href="#" className="hover:text-neutral-500 transition-colors">Privacy Policy</a>
              <button
                type="button"
                onClick={() => scrollToTarget(0)}
                aria-label="Back to top"
                className="w-7 h-7 -mr-1.5 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. GIANT WORDMARK                                                         */}
          {/* ========================================================================= */}
          <div aria-hidden className="relative flex items-start justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 select-none">
            <span className="font-clash font-bold tracking-[-0.04em] leading-[0.78] text-[27vw] xl:text-[340px] text-neutral-950">
              neoxis
            </span>
            <span className="font-clash font-bold leading-none text-[9vw] xl:text-[110px] ml-1 sm:ml-2 -mt-[1vw]">
              ®
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
