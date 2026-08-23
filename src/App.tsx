import React, { useState } from 'react';
import headerBg from './assets/images/headr-bg.png';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { CreativeStudioSection } from './components/CreativeStudioSection';
import { MenuModal } from './components/MenuModal';
import { ConnectModal } from './components/ConnectModal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Studio');

  useSmoothScroll(true);

  return (
    <div className="relative w-full bg-[#090A0F] text-white selection:bg-white/20 selection:text-white">
      
      {/* ========================================= */}
      {/* 1. HERO & STATS CONTAINER                 */}
      {/* ========================================= */}
      <div className="relative min-h-screen w-full flex flex-col justify-between overflow-visible">
        {/* Ambient Radial Background Glows matching the 3D ribbon */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-purple-900/20 blur-[130px] pointer-events-none z-0" />
        <div className="absolute top-[20%] right-[10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-950/25 blur-[100px] pointer-events-none z-0" />

        {/* 3D Iridescent Torus Ribbon Background Image */}
        <div className="absolute -right-20 sm:-right-24 md:-right-16 lg:right-[-2%] xl:right-[1%] top-[-2%] sm:top-[-4%] md:top-[-2%] lg:top-[0%] w-[480px] sm:w-[700px] md:w-[850px] lg:w-[1020px] xl:w-[1180px] pointer-events-none select-none z-10">
          <img
            src={headerBg}
            alt="3D Iridescent Glass Structure"
            className="w-full h-auto object-contain opacity-95 animate-float transition-all duration-1000"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))',
            }}
          />
        </div>

        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
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

        {/* Bottom Floating Stats Dock */}
        <div className="relative z-30 w-full">
          <StatsBar />
        </div>
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
      {/* 3. INTERACTIVE MODALS                     */}
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

export default App;
