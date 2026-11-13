import React from 'react';
import { StatIcon } from '@/components/icons/UiIcons';
import { useHeroStats } from '@/components/content/ContentProvider';

/**
 * Floating glass dock of headline numbers under the hero.
 * Every column has the same padding, and dividers sit on the square column edge
 * (not the rounded hover pill), so all four stats line up evenly.
 */
export const StatsBar: React.FC = () => {
  const stats = useHeroStats();

  return (
    <div className="w-full relative z-30 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 mt-6 lg:mt-8 pb-10">
      <div className="glass-panel rounded-[24px] sm:rounded-[28px] p-3 sm:p-4 lg:px-6 lg:py-5 shadow-xl transition-all duration-300 hover:border-black/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 md:divide-x md:divide-black/10">
          {stats.map((stat) => (
            <div key={stat.id} className="px-1 sm:px-2 lg:px-4">
              <div className="group flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl transition-colors duration-300 hover:bg-black/[0.03]">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/[0.04] border border-black/10 flex items-center justify-center shrink-0 text-neutral-900 group-hover:scale-110 group-hover:bg-black/[0.08] group-hover:border-black/20 transition-all duration-300 shadow-inner">
                  <StatIcon name={stat.icon} />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="font-clash text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 transition-colors leading-tight">
                    {stat.value}
                  </span>
                  <span className="font-neue text-xs sm:text-[13.5px] font-normal text-neutral-500 group-hover:text-neutral-900 transition-colors whitespace-nowrap mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
