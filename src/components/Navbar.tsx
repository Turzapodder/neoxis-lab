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
    { id: 'Blog', label: 'Blog' },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (onSelectTab) {
      onSelectTab(tabId);
    }
  };

  return (
    <header className="w-full relative z-40 px-6 sm:px-10 lg:px-16 pt-7 pb-4">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-baseline gap-0.5 text-white tracking-[-0.03em] select-none"
        >
          <span className="font-clash text-2xl sm:text-[28px] font-bold tracking-tight">
            luvron
          </span>
          <span className="font-clash text-[13px] sm:text-[14px] font-medium leading-none ml-0.5 text-white/90">
            ®
          </span>
        </a>

        {/* Center Floating Pill Navigation (Desktop/Tablet) */}
        <div className="hidden md:flex items-center">
          <div className="glass-pill p-1.5 rounded-full flex items-center gap-1 shadow-2xl">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative px-5 py-2 rounded-full text-[13.5px] font-clash transition-all duration-300 cursor-pointer flex items-center gap-1 select-none ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-[#8E8E93] hover:text-white font-normal hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[12px] ml-0.5 transition-colors ${
                        isActive ? 'text-black/70' : 'text-[#8E8E93]'
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

        {/* Right Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            className="glass-pill text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-clash font-medium flex items-center gap-2.5 hover:bg-white/15 active:scale-95 transition-all duration-200 cursor-pointer select-none group"
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
