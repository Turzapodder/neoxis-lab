import React from 'react';
import { AsteriskIcon, StarIcon } from '@/components/icons/UiIcons';
import { Link } from '@/components/ui/Link';
import { RollingLinkLabel, RollingText } from '@/components/ui/RollingText';
import { projectPath, sectionPath } from '@/constants/routes';
import { SECTION_IDS } from '@/constants/sections';
import type { ProjectDetail } from '@/types/content';

/** Copies of the ticker label; the marquee scrolls half its width, so this must stay even. */
const TICKER_COPIES = 6;

interface NextProjectBannerProps {
  project: ProjectDetail;
}

/** Dark closing banner with a "Next Project" ticker, a link to the next case study and one back to all work. */
export const NextProjectBanner: React.FC<NextProjectBannerProps> = ({ project }) => (
  <section className="relative w-full bg-[var(--color-canvas-bg)] pt-12 sm:pt-16 md:pt-20 transition-colors duration-500">
    <div className="p-1.5 sm:p-2">
      <div className="relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-neutral-950 text-white overflow-hidden shadow-2xl">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 py-14 sm:py-20 lg:py-24 flex flex-col items-center justify-center text-center">
          <div aria-hidden className="relative z-10 inline-flex items-center gap-2.5 w-56 sm:w-64 mb-6 select-none overflow-hidden">
            <AsteriskIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-neutral-400" />
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_15%,black_85%,transparent_100%)]">
              <div className="flex whitespace-nowrap animate-[marquee_12s_linear_infinite] will-change-transform text-[11px] sm:text-xs font-neue font-medium tracking-[0.18em] text-neutral-400 uppercase">
                {Array.from({ length: TICKER_COPIES }, (_, index) => (
                  <span key={index}>Next Project —&nbsp;</span>
                ))}
              </div>
            </div>
          </div>

          <h2 className="relative z-10 font-clash text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95] mb-8 sm:mb-12 select-none">
            <span className="text-white">Explore</span> <span className="text-neutral-500">Next</span>
          </h2>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            <Link
              to={projectPath(project.nextProject.id)}
              className="group/roll relative inline-flex items-center gap-3.5 bg-white hover:bg-neutral-100 text-neutral-950 pl-7 pr-2.5 py-2.5 rounded-full font-clash font-semibold text-sm sm:text-base transition-all duration-300 shadow-xl active:scale-95 cursor-pointer"
            >
              <RollingText hoverClassName="text-neutral-600">{project.nextProject.title}</RollingText>
              <span className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover/roll:rotate-90 transition-transform duration-500 shadow-sm">
                <StarIcon className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to={sectionPath(SECTION_IDS.selectedWork)}
              className="group/roll relative inline-flex items-center gap-2 font-clash font-semibold text-sm sm:text-base text-white select-none cursor-pointer py-2"
            >
              <RollingLinkLabel label="All Projects" hoverClassName="text-neutral-400" underlineClassName="bottom-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
