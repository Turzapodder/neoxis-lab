import React, { useState } from 'react';
import heroBg from './assets/images/header.png';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { CreativeStudioSection } from './components/CreativeStudioSection';
import { TeamSection } from './components/TeamSection';
import { MenuModal } from './components/MenuModal';
import { ConnectModal } from './components/ConnectModal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ThemeProvider } from './context';

const AgencyLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Studio');

  useSmoothScroll(true);

  return (
    <div className="relative w-full max-w-full overflow-x-clip bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] selection:bg-purple-500/25 selection:text-current transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HERO WRAPPER WITH WHITE FRAME & ROUNDED EDGES (Matching Reference)    */}
      {/* ========================================================================= */}
      <div className="w-full max-w-full overflow-x-clip bg-white p-1.5 sm:p-2 transition-colors duration-500">
        <div className="relative min-h-[calc(100vh-1.25rem)] sm:min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-2.5rem)] w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[44px] overflow-hidden flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)] border border-neutral-200/80 z-20">
          
          {/* Full-width liquid chrome background image with dark overlay */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
            <img
              src={heroBg}
              alt="Neoxis Liquid Chrome Background"
              className="w-full h-full object-cover object-center scale-[1.01]"
            />
            {/* Dark overlay for optimal text contrast and readability */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/65" />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />
          </div>

          {/* Top Navbar */}
          <Navbar
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              if (tab === 'Team') {
                const el = document.getElementById('team-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else if (tab === 'Studio') {
                const el = document.getElementById('creative-studio-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onOpenMenu={() => setIsMenuOpen(true)}
          />

          {/* Main Hero Section */}
          <main className="flex-1 flex flex-col justify-center relative z-20 my-auto py-2 sm:py-4">
            <Hero
              onConnectClick={() => setIsConnectOpen(true)}
              onViewWorksClick={() => {
                const el = document.getElementById('creative-studio-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </main>

        </div>
      </div>

      {/* Bottom Floating Stats Dock */}
      <div className="relative z-30 w-full pt-4 pb-2">
        <StatsBar />
      </div>

      {/* ========================================= */}
      {/* 2. GSAP SCROLL-TRIGGERED STATEMENT SECTION */}
      {/* ========================================= */}
      <div id="creative-studio-section" className="relative w-full z-40">
        <CreativeStudioSection
          onWorkWithUsClick={() => setIsConnectOpen(true)}
        />
      </div>

      {/* ========================================= */}
      {/* 3. MEET OUR TEAM SECTION                  */}
      {/* ========================================= */}
      <div id="team-section" className="relative w-full z-30">
        <TeamSection
          onMoreAboutUsClick={() => setIsConnectOpen(true)}
          onSelectMember={() => setIsConnectOpen(true)}
        />
      </div>

      {/* ========================================= */}
      {/* 4. INTERACTIVE MODALS                     */}
      {/* ========================================= */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <ConnectModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AgencyLanding />
    </ThemeProvider>
  );
};

export default App;
