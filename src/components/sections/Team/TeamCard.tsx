import React from 'react';
import { Star } from 'lucide-react';
import { LinkedInIcon, XIcon } from '@/components/icons/SocialIcons';
import type { TeamMember } from '@/types/content';

const DEFAULT_ACCENT = '#EA580C';

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

interface SocialLinksProps {
  member: TeamMember;
  linkClass: string;
  xIconClass: string;
  linkedInIconClass: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ member, linkClass, xIconClass, linkedInIconClass }) => (
  <>
    <a href={member.socials.x} target="_blank" rel="noopener noreferrer" onClick={stopPropagation} className={linkClass} aria-label="X Profile">
      <XIcon className={xIconClass} />
    </a>
    <a
      href={member.socials.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      onClick={stopPropagation}
      className={linkClass}
      aria-label="LinkedIn Profile"
    >
      <LinkedInIcon className={linkedInIconClass} />
    </a>
  </>
);

/** Expanded state: color portrait beside rating, quote and identity. */
const ExpandedContent: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="w-full flex flex-col sm:flex-row items-stretch gap-3.5 sm:gap-5 min-h-[440px] sm:min-h-0 sm:h-[420px] md:h-[450px]">
    <div className="relative w-full sm:w-[220px] md:w-[240px] lg:w-[260px] h-[190px] sm:h-full rounded-xl overflow-hidden shrink-0 shadow-sm">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover grayscale-0 contrast-100 brightness-100 transition-all duration-500 scale-[1.02]"
      />
      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white">
        {member.category}
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-between py-1 sm:py-2 pr-1 sm:pr-2">
      <div className="flex flex-col gap-2.5 sm:gap-3">
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: member.rating }, (_, i) => (
            <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
          ))}
        </div>
        <p className="font-neue text-xs sm:text-sm md:text-[15px] leading-relaxed text-[#525463] font-normal pt-0.5">"{member.quote}"</p>
        <div
          className="w-10 sm:w-12 h-[3px] rounded-full my-0.5 sm:my-1 transition-all duration-300"
          style={{ backgroundColor: member.accentColor || DEFAULT_ACCENT }}
        />
      </div>

      <div className="pt-2 sm:pt-3">
        <h4 className="font-neue text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-neutral-950">{member.name}</h4>
        <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mt-0.5">{member.role}</p>

        <div className="flex items-center justify-between mt-2.5 pt-1">
          <div className="flex items-center gap-2">
            <SocialLinks
              member={member}
              linkClass="w-7 h-7 rounded-md border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:border-neutral-950 transition-colors"
              xIconClass="w-3 h-3"
              linkedInIconClass="w-3.5 h-3.5"
            />
          </div>
          <span className="text-xs font-neue text-neutral-400 hover:text-neutral-950 flex items-center gap-1 transition-colors">
            View bio &rarr;
          </span>
        </div>
      </div>
    </div>
  </div>
);

/** Default state: grayscale portrait with name, role and socials below. */
const CollapsedContent: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="w-full flex flex-col">
    <div className="relative w-full h-[320px] xs:h-[340px] sm:h-[370px] md:h-[400px] lg:h-[420px] rounded-2xl overflow-hidden bg-neutral-200 transition-all duration-300 group-hover:shadow-md">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover grayscale contrast-[1.05] brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
      />
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1">
        <span>Hover to expand</span>
      </div>
    </div>

    <div className="pt-3 pb-1 flex items-start justify-between">
      <div className="flex flex-col">
        <h4 className="font-neue text-sm sm:text-[15px] font-bold text-neutral-950 tracking-tight leading-snug">{member.name}</h4>
        <p className="font-mono text-xs text-neutral-500 tracking-wide mt-0.5">{member.role}</p>
      </div>
      <div className="flex items-center gap-2 pt-0.5">
        <SocialLinks
          member={member}
          linkClass="text-neutral-400 hover:text-neutral-950 transition-colors"
          xIconClass="w-3.5 h-3.5"
          linkedInIconClass="w-3.5 h-3.5"
        />
      </div>
    </div>
  </div>
);

interface TeamCardProps {
  member: TeamMember;
  isExpanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (card: HTMLDivElement) => void;
}

const OUTLINE_RESET = 'outline-none focus:outline-none focus-visible:outline-none ring-0 border-0';

export const TeamCard: React.FC<TeamCardProps> = ({ member, isExpanded, onMouseEnter, onMouseLeave, onClick }) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={(e) => onClick(e.currentTarget)}
    className={`group relative rounded-2xl cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${OUTLINE_RESET} ${
      isExpanded
        ? 'w-[calc(100vw-3rem)] max-w-[340px] sm:max-w-none sm:w-[480px] md:w-[520px] lg:w-[550px]'
        : 'w-[230px] xs:w-[250px] sm:w-[270px] md:w-[290px] lg:w-[310px]'
    }`}
    style={{ zIndex: isExpanded ? 30 : 10 }}
  >
    <div
      className={`w-full rounded-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between ${OUTLINE_RESET} ${
        isExpanded ? 'bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] p-3 sm:p-4' : 'bg-transparent'
      }`}
    >
      {isExpanded ? <ExpandedContent member={member} /> : <CollapsedContent member={member} />}
    </div>
  </div>
);
