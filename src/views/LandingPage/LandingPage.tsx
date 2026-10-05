'use client';

import React, { useRef } from 'react';
import { ConnectModal } from '@/components/modals/ConnectModal';
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
  TestimonialsSection,
} from '@/components/sections';
import { projectPath } from '@/constants/routes';
import { SECTION_IDS } from '@/constants/sections';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useScrollTriggerAutoRefresh } from '@/hooks/useScrollTriggerAutoRefresh';
import { useSectionTransitions } from '@/hooks/useSectionTransitions';
import { useSiteNavigation } from '@/hooks/useSiteNavigation';
import type { SelectedProject } from '@/types/content';
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
  const navigate = useSiteNavigation();
  const connect = useDisclosure();
  const pageRef = useRef<HTMLDivElement>(null);

  useSectionTransitions(pageRef);
  useScrollTriggerAutoRefresh(pageRef);

  const openProject = (project: SelectedProject) => navigate(projectPath(project.id));

  return (
    <div ref={pageRef} className="relative w-full">
      <HeroSection
        onConnectClick={() => scrollToSection(SECTION_IDS.contact)}
        onViewWorksClick={() => scrollToSection(SECTION_IDS.selectedWork)}
      />

      <div className="relative z-30 w-full pt-4 pb-2">
        <StatsBar />
      </div>

      <Anchor id={SECTION_IDS.studio} zClass="z-40">
        <CreativeStudioSection onWorkWithUsClick={() => scrollToSection(SECTION_IDS.contact)} />
      </Anchor>

      <Anchor id={SECTION_IDS.meetTheMinds} zClass="z-35">
        <MeetTheMindsSection onBookCallClick={() => scrollToSection(SECTION_IDS.contact)} />
      </Anchor>

      <Anchor id={SECTION_IDS.selectedWork} zClass="z-35">
        <SelectedWorkSection onSelectProject={openProject} />
      </Anchor>

      <Anchor id={SECTION_IDS.services} zClass="z-35">
        <ServicesSection
          onExploreClick={() => scrollToSection(SECTION_IDS.contact)}
          onTeamContactClick={() => scrollToSection(SECTION_IDS.contact)}
        />
      </Anchor>

      <Anchor id={SECTION_IDS.process}>
        <ProcessSection />
      </Anchor>

      <Anchor id={SECTION_IDS.testimonials}>
        <TestimonialsSection />
      </Anchor>

      <Anchor id={SECTION_IDS.pricing}>
        <PricingSection onChoosePlan={() => scrollToSection(SECTION_IDS.contact)} />
      </Anchor>

      <Anchor id={SECTION_IDS.faq}>
        <FaqSection />
      </Anchor>

      <Anchor id={SECTION_IDS.contact}>
        <ContactSection onBookCallClick={() => scrollToSection(SECTION_IDS.contact)} />
      </Anchor>

      <ConnectModal isOpen={connect.isOpen} onClose={connect.close} />
    </div>
  );
};
