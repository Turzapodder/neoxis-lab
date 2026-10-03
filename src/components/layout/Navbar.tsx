import React from 'react';
import { SparkleIcon } from '@/components/icons/UiIcons';
import { Link } from '@/components/ui/Link';
import { ROUTES } from '@/constants/routes';
import { NAV_TABS } from '@/data/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import type { NavTab } from '@/types/content';

/** Scroll distance (px) after which the bar compacts into frosted glass. */
const SCROLL_THRESHOLD = 24;

const GLASS_CLASS =
  'h-[var(--navbar-height-compact)] bg-white/65 backdrop-blur-xl backdrop-saturate-150 border-black/[0.06] shadow-[0_12px_40px_-16px_rgba(0,0,0,0.25)]';

interface NavbarProps {
  activeTab?: string;
  onSelectTab?: (tab: NavTab) => void;
  onOpenMenu?: () => void;
  /**
   * Look at the top of the page: 'dark' for light text over the hero artwork, 'light' for plain
   * backgrounds. Once the page scrolls, the bar is always light glass.
   */
  variant?: 'dark' | 'light';
}

/** Fixed site header with brand, section tabs and menu button; compacts into a frosted bar on scroll. */
export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenMenu, variant = 'dark' }) => {
  const isScrolled = useScrolled(SCROLL_THRESHOLD);
  const isLight = variant === 'light' || isScrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-[var(--navbar-inset)]">
      <div
        className={`flex items-center px-6 sm:px-10 lg:px-16 rounded-[20px] sm:rounded-[24px] border transition-[height,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? GLASS_CLASS : 'h-[var(--navbar-height)] border-transparent'
        }`}
      >
        <nav className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Brand Logo: neoxis® */}
          <Link
            to={ROUTES.home}
            aria-label="neoxis — home"
            className={`group flex items-baseline gap-0.5 ${
              isLight ? 'text-neutral-950' : 'text-white'
            } tracking-[-0.03em] select-none transition-colors duration-300 cursor-pointer`}
          >
            <span className="font-clash text-2xl sm:text-[28px] font-bold tracking-tight">neoxis</span>
            <span
              className={`font-clash text-[13px] sm:text-[14px] font-medium leading-none ml-0.5 ${
                isLight ? 'text-neutral-600' : 'text-white/90'
              }`}
            >
              ®
            </span>
          </Link>

          {/* Center Floating Pill Navigation (Desktop/Tablet) */}
          <div className="hidden md:flex items-center">
            <div
              className={`${
                isLight ? 'bg-neutral-950/90 border-black/10' : 'bg-black/50 border-white/15'
              } backdrop-blur-xl border p-1.5 rounded-full flex items-center gap-1 shadow-2xl transition-colors duration-300`}
            >
              {NAV_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectTab?.(tab)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative px-5 py-2 rounded-full text-[13.5px] font-clash transition-all duration-300 cursor-pointer flex items-center gap-1 select-none ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-md'
                        : 'text-white/70 hover:text-white font-normal hover:bg-white/10'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[12px] ml-0.5 transition-colors ${isActive ? 'text-black/70' : 'text-white/60'}`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Actions: Menu Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onOpenMenu}
              className={`${
                isLight
                  ? 'bg-neutral-950/90 border-black/10 hover:bg-neutral-900'
                  : 'bg-black/50 border-white/15 hover:bg-black/70 hover:border-white/30'
              } backdrop-blur-xl border text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-clash font-medium flex items-center gap-2.5 active:scale-95 transition-all duration-200 cursor-pointer select-none group shadow-lg`}
              aria-label="Open navigation menu"
            >
              <span>Menu</span>
              <SparkleIcon className="w-4 h-4 text-white/90 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
