import React from 'react';
import { SparkleIcon } from '@/components/icons/UiIcons';
import { NAV_TABS } from '@/data/navigation';
import type { NavTab } from '@/types/content';

interface NavbarProps {
  activeTab: string;
  onSelectTab?: (tab: NavTab) => void;
  onOpenMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenMenu }) => (
  <header className="w-full relative z-40 px-6 sm:px-10 lg:px-16 pt-6 sm:pt-7 pb-4">
    <nav className="max-w-[1440px] mx-auto flex items-center justify-between">
      {/* Brand Logo: neoxis® */}
      <a
        href="#"
        className="group flex items-baseline gap-0.5 text-white tracking-[-0.03em] select-none transition-colors duration-300"
      >
        <span className="font-clash text-2xl sm:text-[28px] font-bold tracking-tight">neoxis</span>
        <span className="font-clash text-[13px] sm:text-[14px] font-medium leading-none ml-0.5 text-white/90">®</span>
      </a>

      {/* Center Floating Pill Navigation (Desktop/Tablet) */}
      <div className="hidden md:flex items-center">
        <div className="bg-black/50 backdrop-blur-xl border border-white/15 p-1.5 rounded-full flex items-center gap-1 shadow-2xl">
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab?.(tab)}
                className={`relative px-5 py-2 rounded-full text-[13.5px] font-clash transition-all duration-300 cursor-pointer flex items-center gap-1 select-none ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-white/70 hover:text-white font-normal hover:bg-white/10'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[12px] ml-0.5 transition-colors ${isActive ? 'text-black/70' : 'text-white/60'}`}>
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
          onClick={onOpenMenu}
          className="bg-black/50 backdrop-blur-xl border border-white/15 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-clash font-medium flex items-center gap-2.5 hover:bg-black/70 hover:border-white/30 active:scale-95 transition-all duration-200 cursor-pointer select-none group shadow-lg"
          aria-label="Open navigation menu"
        >
          <span>Menu</span>
          <SparkleIcon className="w-4 h-4 text-white/90 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
    </nav>
  </header>
);
