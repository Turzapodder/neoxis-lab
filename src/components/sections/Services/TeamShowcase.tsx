import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionTag } from '@/components/ui/SectionTag';
import { SECTION_IDS } from '@/constants/sections';
import { TEAM_MEMBERS } from '@/data/team';
import { TeamMemberRow } from './TeamMemberRow';
import { TeamPortrait } from './TeamPortrait';

interface TeamShowcaseProps {
  onContactClick?: () => void;
}

/** Team spotlight: selecting a name in the roster swaps the large portrait beside it. */
export const TeamShowcase: React.FC<TeamShowcaseProps> = ({ onContactClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id={SECTION_IDS.team} className="pt-28 sm:pt-40 pb-16 sm:pb-24 scroll-mt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14">
        <div className="flex flex-col items-start">
          <SectionTag tone="light" className="text-white mb-3 sm:mb-5">
            Our people
          </SectionTag>
          <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.02] select-none">
            The minds behind
            <br />
            every launch.
          </h2>
        </div>
        <p className="font-neue text-sm text-neutral-400 leading-relaxed max-w-[320px]">
          A small senior team. You work directly with the people designing and building your product.
        </p>
      </div>

      <div data-reveal className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-14 items-start">
        <TeamPortrait members={TEAM_MEMBERS} activeIndex={activeIndex} />

        <div className="flex flex-col lg:pt-2">
          <ul className="border-t border-white/10">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamMemberRow
                key={member.id}
                member={member}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-8">
            <p className="text-sm text-neutral-400 max-w-[280px]">
              {TEAM_MEMBERS.length} specialists across design, motion and engineering.
            </p>
            <button
              type="button"
              onClick={onContactClick}
              className="group/btn self-start sm:self-auto flex items-center gap-3 rounded-full bg-white pl-5 pr-1 py-1 text-sm font-medium text-neutral-950 hover:bg-neutral-200 active:scale-95 transition-all"
            >
              Work with our team
              <span className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
