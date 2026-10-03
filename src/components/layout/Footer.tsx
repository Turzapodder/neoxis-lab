import React from 'react';
import { ChevronUp } from 'lucide-react';

import footerImg from '@/assets/images/meet-minds-team.jpg';
import { Link } from '@/components/ui/Link';
import { ROUTES } from '@/constants/routes';
import { SECTION_IDS } from '@/constants/sections';
import { CONTACT_EMAIL } from '@/data/company';
import { FOOTER_LEGAL_LINKS, FOOTER_NAV_LINKS, FOOTER_SOCIAL_LINKS } from '@/data/navigation';
import { scrollToTop } from '@/utils/scroll';

const LINK_CLASS = 'font-neue text-xl sm:text-2xl font-medium hover:text-neutral-500 transition-colors cursor-pointer text-left';
const GRID_CLASS = 'grid grid-cols-2 lg:grid-cols-[1.4fr_0.5fr_0.5fr] gap-x-6';

/** Site footer shared by every page: contact, navigation, socials, legal links and the giant wordmark. */
export const Footer: React.FC = () => (
  <footer id={SECTION_IDS.footer} className="relative z-30 w-full bg-[var(--color-canvas-bg)] p-1.5 sm:p-2 pt-16 sm:pt-24 transition-colors duration-500">
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
                  <Link to={link.to} className={LINK_CLASS}>
                    {link.label}
                  </Link>
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

        {/* 2. LEGAL ROW: layered above the wordmark, whose tall glyph box overlaps it */}
        <div className="relative z-10 mt-14 sm:mt-16 pt-5 border-t border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] sm:text-xs text-neutral-800">
          <span>©{new Date().getFullYear()} neoxis Studio. Built with obsession. All rights reserved.</span>

          <div className="flex items-center gap-5 sm:gap-7">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-neutral-500 transition-colors cursor-pointer select-none font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* 3. GIANT WORDMARK */}
        <Link
          to={ROUTES.home}
          aria-label="neoxis Home"
          className="relative flex items-start justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 select-none group cursor-pointer transition-opacity hover:opacity-85"
        >
          <span className="font-clash font-bold tracking-[-0.04em] leading-[0.78] text-[27vw] xl:text-[340px] text-neutral-950">
            neoxis
          </span>
          <span className="font-clash font-bold leading-none text-[9vw] xl:text-[110px] ml-1 sm:ml-2 -mt-[1vw]">®</span>
        </Link>
      </div>
    </div>
  </footer>
);
