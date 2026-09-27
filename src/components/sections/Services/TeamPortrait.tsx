import React from 'react';
import { DribbbleIcon, LinkedInIcon, XIcon } from '@/components/icons/SocialIcons';
import { SOCIAL_PROFILES } from '@/data/company';
import type { TeamMember } from '@/types/content';

const SOCIAL_LINKS = [
  { key: 'x', href: SOCIAL_PROFILES.x, label: 'X', icon: <XIcon className="w-3.5 h-3.5" /> },
  { key: 'dribbble', href: SOCIAL_PROFILES.dribbble, label: 'Dribbble', icon: <DribbbleIcon className="w-4 h-4" /> },
  { key: 'linkedin', href: SOCIAL_PROFILES.linkedin, label: 'LinkedIn', icon: <LinkedInIcon className="w-3.5 h-3.5" /> },
];

interface TeamPortraitProps {
  members: TeamMember[];
  activeIndex: number;
}

/** Large portrait of the selected person; all photos are stacked and cross-fade on change. */
export const TeamPortrait: React.FC<TeamPortraitProps> = ({ members, activeIndex }) => {
  const member = members[activeIndex];

  return (
    <div className="relative aspect-[4/5] max-h-[620px] w-full rounded-[24px] overflow-hidden bg-neutral-900">
      {members.map((m, i) => (
        <img
          key={m.id}
          src={m.image}
          alt={i === activeIndex ? m.name : ''}
          aria-hidden={i !== activeIndex}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            i === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
        <span className="rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-1.5 text-xs">{member.role}</span>
        <span className="text-xs text-white/70">{member.location}</span>
      </div>

      <div aria-live="polite" className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div key={member.id} className="animate-[fade-up_0.5s_ease-out] motion-reduce:animate-none">
          <h3 className="font-clash text-3xl sm:text-4xl font-bold tracking-tight">{member.name}</h3>
          <p className="font-neue text-sm text-white/70 leading-relaxed mt-2 max-w-[320px]">{member.bio}</p>
        </div>

        <div className="flex items-center gap-2 mt-5">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${link.label}`}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-neutral-950 transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
