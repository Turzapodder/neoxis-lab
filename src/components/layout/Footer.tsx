import React from 'react';
import { ChevronUp } from 'lucide-react';

import footerImg from '@/assets/images/meet-minds-team.jpg';
import { CONTACT_EMAIL } from '@/data/company';
import { FOOTER_NAV_LINKS, FOOTER_SOCIAL_LINKS } from '@/data/navigation';
import type { NavLink } from '@/types/content';
import { scrollToSection, scrollToTop } from '@/utils/scroll';

const LINK_CLASS = 'font-neue text-xl sm:text-2xl font-medium hover:text-neutral-500 transition-colors cursor-pointer text-left';
const GRID_CLASS = 'grid grid-cols-2 lg:grid-cols-[1.4fr_0.5fr_0.5fr] gap-x-6';

interface FooterProps {
  onNavigateHome?: (sectionId?: string) => void;
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateTerms,
  onNavigatePrivacy,
}) => {
  const isHomePage =
    typeof window !== 'undefined' &&
    (window.location.pathname === '/' || window.location.pathname === '') &&
    !window.location.pathname.startsWith('/terms') &&
    !window.location.pathname.startsWith('/privacy') &&
    !window.location.pathname.startsWith('/project') &&
    !window.location.hash.startsWith('#terms') &&
    !window.location.hash.startsWith('#privacy') &&
    !window.location.hash.startsWith('#project');

  const handleGoHome = (sectionId?: string) => {
    if (onNavigateHome) {
      onNavigateHome(sectionId);
    } else {
      if (sectionId) {
        if (!isHomePage) {
          window.history.pushState({}, '', `/#${sectionId}`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
          window.history.replaceState(null, '', `#${sectionId}`);
        }
        setTimeout(() => scrollToSection(sectionId), 60);
      } else {
        if (!isHomePage) {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          scrollToTop();
        }
      }
    }
  };

  const handleNavClick = (link: NavLink) => {
    if (link.target === 'top') {
      handleGoHome();
    } else {
      handleGoHome(link.target);
    }
  };

  const handleGoTerms = () => {
    if (onNavigateTerms) {
      onNavigateTerms();
    } else {
      window.history.pushState({}, '', '/terms-and-conditions');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleGoPrivacy = () => {
    if (onNavigatePrivacy) {
      onNavigatePrivacy();
    } else {
      window.history.pushState({}, '', '/privacy-policy');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
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
                    <button
                      type="button"
                      onClick={() => handleNavClick(link)}
                      className={LINK_CLASS}
                    >
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
          <div className="mt-14 sm:mt-16 pt-5 border-t border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] sm:text-xs text-neutral-800">
            <span>©{new Date().getFullYear()} neoxis Studio. Built with obsession. All rights reserved.</span>

            <div className="flex items-center gap-5 sm:gap-7">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleGoHome();
                }}
                className="hover:text-neutral-500 transition-colors cursor-pointer select-none font-medium"
              >
                Home
              </a>
              <a
                href="/terms-and-conditions"
                onClick={(e) => {
                  e.preventDefault();
                  handleGoTerms();
                }}
                className="hover:text-neutral-500 transition-colors cursor-pointer select-none font-medium"
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  handleGoPrivacy();
                }}
                className="hover:text-neutral-500 transition-colors cursor-pointer select-none font-medium"
              >
                Privacy Policy
              </a>
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
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleGoHome();
            }}
            aria-label="neoxis Home"
            className="relative flex items-start justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 select-none group cursor-pointer transition-opacity hover:opacity-85"
          >
            <span className="font-clash font-bold tracking-[-0.04em] leading-[0.78] text-[27vw] xl:text-[340px] text-neutral-950">
              neoxis
            </span>
            <span className="font-clash font-bold leading-none text-[9vw] xl:text-[110px] ml-1 sm:ml-2 -mt-[1vw]">®</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
