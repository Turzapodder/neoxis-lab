import React from 'react';
import { ChevronUp } from 'lucide-react';

import { meetMindsTeamImg as footerImg } from '@/lib/images';
import { CONTACT_EMAIL } from '@/data/company';
import { FOOTER_NAV_LINKS, FOOTER_SOCIAL_LINKS } from '@/data/navigation';
import type { NavLink } from '@/types/content';
import { scrollToSection, scrollToTop } from '@/utils/scroll';

const handleNav = ({ target }: NavLink) => {
  if (target === 'top') scrollToTop();
  else scrollToSection(target);
};

const LINK_CLASS = 'font-neue text-xl sm:text-2xl font-medium hover:text-neutral-500 transition-colors';
const GRID_CLASS = 'grid grid-cols-2 lg:grid-cols-[1.4fr_0.5fr_0.5fr] gap-x-6';

export const Footer: React.FC = () => (
  <footer className="relative w-full bg-[var(--color-canvas-bg)] p-1.5 sm:p-2 pt-16 sm:pt-24 transition-colors duration-500">
    <div className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-white text-neutral-950 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-12 sm:pt-16">
        {/* 1. TOP ROW: image + email, navigation, social */}
        <div className={`${GRID_CLASS} gap-y-12`}>
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
                Stay in the loop
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm sm:text-base font-medium underline underline-offset-4 decoration-1 hover:decoration-2 transition-all"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-xs font-medium mb-5">Explore</p>
            <ul className="flex flex-col gap-1.5">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button type="button" onClick={() => handleNav(link)} className={LINK_CLASS}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium mb-5">Socials</p>
            <ul className="flex flex-col gap-1.5">
              {FOOTER_SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. LEGAL ROW */}
        <div className={`mt-14 sm:mt-16 pt-5 border-t border-neutral-200 ${GRID_CLASS} gap-y-3 items-center text-[11px] sm:text-xs text-neutral-800`}>
          <span className="col-span-2 lg:col-span-1">©{new Date().getFullYear()} neoxis Studio. Built with obsession. All rights reserved.</span>
          <a href="#" className="hover:text-neutral-500 transition-colors">Terms of Use</a>
          <div className="flex items-center justify-between">
            <a href="#" className="hover:text-neutral-500 transition-colors">Privacy Policy</a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-7 h-7 -mr-1.5 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. GIANT WORDMARK */}
        <div aria-hidden className="relative flex items-start justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 select-none">
          <span className="font-clash font-bold tracking-[-0.04em] leading-[0.78] text-[27vw] xl:text-[340px] text-neutral-950">
            neoxis
          </span>
          <span className="font-clash font-bold leading-none text-[9vw] xl:text-[110px] ml-1 sm:ml-2 -mt-[1vw]">®</span>
        </div>
      </div>
    </div>
  </footer>
);
