import React, { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ConnectModal } from '@/components/modals/ConnectModal';
import { MenuModal } from '@/components/modals/MenuModal';
import {
  ContactSection,
  CreativeStudioSection,
  FaqSection,
  HeroSection,
  MeetTheMindsSection,
  PricingSection,
  ProcessSection,
  SelectedWorkSection,
  ServicesSection,
  StatsBar,
  TeamSection,
  TestimonialsSection,
} from '@/components/sections';
import { SECTION_IDS } from '@/constants/sections';
import { DEFAULT_NAV_TAB } from '@/data/navigation';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import type { NavTab } from '@/types/content';
import { scrollToSection } from '@/utils/scroll';

interface AnchorProps {
  id: string;
  /** Stacking order; the studio section sits above the hero so flying cards overlap it. */
  zClass?: string;
  children: React.ReactNode;
}

/** Positioned wrapper that carries a section's scroll-target id. */
const Anchor: React.FC<AnchorProps> = ({ id, zClass = 'z-30', children }) => (
  <div id={id} className={`relative w-full ${zClass}`}>
    {children}
  </div>
);

export const LandingPage: React.FC = () => {
  const menu = useDisclosure();
  const connect = useDisclosure();
  const [activeTab, setActiveTab] = useState(DEFAULT_NAV_TAB);

  useSmoothScroll();

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab.id);
    if (tab.target) scrollToSection(tab.target);
  };

  return (
    <div className="relative w-full max-w-full overflow-x-clip bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] selection:bg-purple-500/25 selection:text-current transition-colors duration-300">
      <HeroSection
        header={<Navbar activeTab={activeTab} onSelectTab={handleSelectTab} onOpenMenu={menu.open} />}
        onConnectClick={connect.open}
        onViewWorksClick={() => scrollToSection(SECTION_IDS.selectedWork)}
      />

      <div className="relative z-30 w-full pt-4 pb-2">
        <StatsBar />
      </div>

      <Anchor id={SECTION_IDS.studio} zClass="z-40">
        <CreativeStudioSection onWorkWithUsClick={connect.open} />
      </Anchor>

      <Anchor id={SECTION_IDS.meetTheMinds} zClass="z-35">
        <MeetTheMindsSection onBookCallClick={connect.open} />
      </Anchor>

      <Anchor id={SECTION_IDS.selectedWork} zClass="z-35">
        <SelectedWorkSection onSelectProject={connect.open} />
      </Anchor>

      <Anchor id={SECTION_IDS.services} zClass="z-35">
        <ServicesSection onExploreClick={connect.open} />
      </Anchor>

      <Anchor id={SECTION_IDS.process}>
        <ProcessSection />
      </Anchor>

      <Anchor id={SECTION_IDS.team}>
        <TeamSection onMoreAboutUsClick={connect.open} onSelectMember={connect.open} />
      </Anchor>

      <Anchor id={SECTION_IDS.testimonials}>
        <TestimonialsSection />
      </Anchor>

      <Anchor id={SECTION_IDS.pricing}>
        <PricingSection onChoosePlan={connect.open} />
      </Anchor>

      <Anchor id={SECTION_IDS.faq}>
        <FaqSection />
      </Anchor>

      <Anchor id={SECTION_IDS.contact}>
        <ContactSection />
      </Anchor>

      <Anchor id={SECTION_IDS.footer}>
        <Footer />
      </Anchor>

      <MenuModal isOpen={menu.isOpen} onClose={menu.close} />
      <ConnectModal isOpen={connect.isOpen} onClose={connect.close} />
    </div>
  );
};
