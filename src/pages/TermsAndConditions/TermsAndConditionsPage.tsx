import React, { useEffect, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ConnectModal } from '@/components/modals/ConnectModal';
import { MenuModal } from '@/components/modals/MenuModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { TermsHeader } from './TermsHeader';
import { TermsContent } from './TermsContent';

interface TermsAndConditionsPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
}

export const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({
  onNavigateHome,
  onNavigateTerms,
  onNavigatePrivacy,
}) => {
  const menu = useDisclosure();
  const connect = useDisclosure();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const originalTitle = document.title;
    document.title = 'Terms & Conditions — NeoXis Studio | Legal Framework';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-screen bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] selection:bg-purple-500/25 selection:text-current transition-colors duration-300 overflow-x-clip"
    >
      {/* Light-mode Sticky Navbar */}
      <Navbar
        activeTab="Legal"
        variant="light"
        onSelectTab={(tab) => {
          if (tab.target) onNavigateHome(tab.target);
          else onNavigateHome();
        }}
        onLogoClick={() => onNavigateHome()}
        onOpenMenu={menu.open}
        className="sticky top-0 z-50 bg-[var(--color-canvas-bg)]/85 backdrop-blur-md transition-all duration-300 border-b border-black/[0.04]"
      />

      {/* Main Legal Content Container */}
      <main className="w-full">
        <TermsHeader onNavigateHome={() => onNavigateHome()} />
        <TermsContent onOpenConnectModal={connect.open} />
      </main>

      {/* Global Footer */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateTerms={onNavigateTerms}
        onNavigatePrivacy={onNavigatePrivacy}
      />

      {/* Modals */}
      <ConnectModal isOpen={connect.isOpen} onClose={connect.close} />
      <MenuModal isOpen={menu.isOpen} onClose={menu.close} />
    </div>
  );
};
