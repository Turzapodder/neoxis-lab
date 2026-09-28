import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { TeamMember } from '@/types/content';

interface TeamMemberRowProps {
  member: TeamMember;
  isActive: boolean;
  onSelect: () => void;
}

/** Roster row. The active row brightens and slides a round thumbnail in beside the name. */
export const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ member, isActive, onSelect }) => (
  <li className={`border-b transition-colors duration-500 ${isActive ? 'border-white/40' : 'border-white/10'}`}>
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      aria-pressed={isActive}
      className="group w-full flex items-center gap-4 py-5 sm:py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-lg"
    >
      <span
        className={`shrink-0 h-12 sm:h-14 rounded-full overflow-hidden transition-[width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isActive ? 'w-12 sm:w-14 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <img src={member.image} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-cover" />
      </span>

      <span className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
        <span
          className={`font-clash text-2xl sm:text-4xl font-bold tracking-tight truncate transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-400'
          }`}
        >
          {member.name}
        </span>
        <span className={`text-sm shrink-0 transition-colors duration-500 ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
          {member.role}
        </span>
      </span>

      <span
        className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 ${
          isActive ? 'bg-white border-white text-neutral-950 rotate-45' : 'border-white/15 text-neutral-500'
        }`}
      >
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </button>
  </li>
);
