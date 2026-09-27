import React, { useRef, useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { TEAM_MEMBERS } from '@/data/team';
import type { TeamMember } from '@/types/content';
import { TeamCard } from './TeamCard';
import { useHorizontalScroll } from './useHorizontalScroll';

interface TeamSectionProps {
  onMoreAboutUsClick?: () => void;
  onSelectMember?: (member: TeamMember) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onMoreAboutUsClick, onSelectMember }) => {
  // Hover expands a card; a tap locks it open (for touch devices)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const expandedId = hoveredId || activeId;

  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const { revealCard } = useHorizontalScroll({
    section: sectionRef,
    pinContainer: pinContainerRef,
    track: trackRef,
    viewport: viewportRef,
  });

  const handleCardClick = (member: TeamMember, card: HTMLDivElement) => {
    const opening = activeId !== member.id;
    setActiveId(opening ? member.id : null);
    onSelectMember?.(member);
    if (opening) revealCard(card);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] transition-colors duration-500 selection:bg-neutral-800 selection:text-white"
    >
      {/* 1. Vertical dashed grid dividers */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="border-r border-dashed border-neutral-300/60 h-full" />
        ))}
      </div>

      {/* 2. Header (scrolls out of view before horizontal scroll engages) */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <div className="flex items-center gap-1.5 text-xs sm:text-[13px] tracking-[0.18em] uppercase font-semibold text-neutral-500">
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>TEAM</span>
            </div>
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-[-0.03em] select-none">
              <span className="block font-bold text-neutral-400 transition-colors">Small team.</span>
              <span className="block font-bold text-neutral-950 transition-colors">Big standards.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-end">
            <p className="font-neue text-base sm:text-lg md:text-xl text-[#525463] font-normal leading-relaxed max-w-[420px] transition-colors">
              Specialists working closely to transform ideas into meaningful, measurable outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Pinned carousel stage (horizontally driven by ScrollTrigger) */}
      <div
        ref={pinContainerRef}
        className="relative z-10 w-full min-h-[580px] sm:min-h-[620px] md:min-h-[660px] flex flex-col justify-between py-2 sm:py-4"
      >
        {/* Watermark */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-full select-none pointer-events-none text-center overflow-hidden z-0">
          <span className="font-clash text-[18vw] font-black uppercase tracking-[-0.04em] text-neutral-900/[0.035] leading-none inline-block">
            NEOXIS
          </span>
        </div>

        {/* Viewport: vertical padding so shadows and expanded cards never clip */}
        <div ref={viewportRef} className="relative z-10 w-full overflow-hidden py-6 sm:py-8 -my-4 sm:-my-6">
          <div
            ref={trackRef}
            className="flex items-end gap-4 sm:gap-6 pl-6 sm:pl-10 lg:pl-16 pr-28 sm:pr-40 lg:pr-60 will-change-transform"
          >
            {TEAM_MEMBERS.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                isExpanded={expandedId === member.id}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(card) => handleCardClick(member, card)}
              />
            ))}
          </div>
        </div>

        {/* 4. Section footer */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-dashed border-neutral-300/80 pt-6">
            <div className="font-neue text-base sm:text-lg md:text-xl text-neutral-600 font-normal">
              Behind every result is <strong className="font-bold text-neutral-950">a team that cares.</strong>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <span className="font-mono text-[11px] sm:text-xs text-neutral-400 uppercase tracking-widest">Built by specialists</span>
              <button
                onClick={onMoreAboutUsClick}
                className="group relative inline-flex items-center justify-between gap-4 px-5 py-2.5 rounded-lg border border-neutral-300/90 bg-white/70 backdrop-blur-md text-neutral-900 font-neue text-sm font-medium hover:border-neutral-950 active:scale-98 transition-all cursor-pointer shadow-sm"
              >
                {/* CAD corner markers */}
                <span className="absolute -top-1 -left-1 text-[9px] text-neutral-400 font-mono select-none">+</span>
                <span className="absolute -top-1 -right-1 text-[9px] text-neutral-400 font-mono select-none">+</span>
                <span className="absolute -bottom-1 -left-1 text-[9px] text-neutral-400 font-mono select-none">+</span>
                <span className="absolute -bottom-1 -right-1 text-[9px] text-neutral-400 font-mono select-none">+</span>
                <span>More about us</span>
                <MoreVertical className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
