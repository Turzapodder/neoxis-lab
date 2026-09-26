import React, { useState } from 'react';

interface NavbarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onOpenMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'Studio',
  onSelectTab,
  onOpenMenu,
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const tabs = [
    { id: 'Studio', label: 'Studio' },
    { id: 'Project', label: 'Project', badge: '(12)' },
    { id: 'Service', label: 'Service' },
    { id: 'Team', label: 'Team' },
    { id: 'Blog', label: 'Blog' },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (onSelectTab) {
      onSelectTab(tabId);
    }
  };

  return (
    <header className="w-full relative z-40 px-6 sm:px-10 lg:px-16 pt-6 sm:pt-7 pb-4">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Brand Logo: neoxis® */}
        <a
          href="#"
          className="group flex items-baseline gap-0.5 text-white tracking-[-0.03em] select-none transition-colors duration-300"
        >
          <span className="font-clash text-2xl sm:text-[28px] font-bold tracking-tight">
            neoxis
          </span>
          <span className="font-clash text-[13px] sm:text-[14px] font-medium leading-none ml-0.5 text-white/90">
            ®
          </span>
        </a>

        {/* Center Floating Pill Navigation (Desktop/Tablet) */}
        <div className="hidden md:flex items-center">
          <div className="bg-black/50 backdrop-blur-xl border border-white/15 p-1.5 rounded-full flex items-center gap-1 shadow-2xl">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative px-5 py-2 rounded-full text-[13.5px] font-clash transition-all duration-300 cursor-pointer flex items-center gap-1 select-none ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-white/70 hover:text-white font-normal hover:bg-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[12px] ml-0.5 transition-colors ${
                        isActive ? 'text-black/70' : 'text-white/60'
                      }`}
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
          {/* Menu Button */}
          <button
            onClick={onOpenMenu}
            className="bg-black/50 backdrop-blur-xl border border-white/15 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-clash font-medium flex items-center gap-2.5 hover:bg-black/70 hover:border-white/30 active:scale-95 transition-all duration-200 cursor-pointer select-none group shadow-lg"
            aria-label="Open navigation menu"
          >
            <span>Menu</span>
            {/* Sparkle 4-point Icon */}
            <svg
              className="w-4 h-4 text-white/90 group-hover:rotate-45 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};
