import React from 'react';
import { DribbbleIcon, LinkedInIcon, XIcon } from '@/components/icons/SocialIcons';
import { SOCIAL_PROFILES } from '@/data/company';
import type { Mind } from '@/types/content';

const CORNER_POSITIONS = [
  'top-0 left-0 border-t border-l',
  'top-0 right-0 border-t border-r',
  'bottom-0 left-0 border-b border-l',
  'bottom-0 right-0 border-b border-r',
] as const;

const DARK_SOCIAL_CLASS =
  'w-7 h-7 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors';

interface MindCardProps {
  mind: Mind;
  isActive: boolean;
  onActivate: () => void;
}

/** Dark team member card; the active card shows corner brackets and full-color photo. */
export const MindCard: React.FC<MindCardProps> = ({ mind, isActive, onActivate }) => (
  <article
    data-reveal
    onMouseEnter={onActivate}
    onFocus={onActivate}
    tabIndex={0}
    className={`relative ${mind.offset} rounded-[20px] bg-neutral-900/95 p-5 sm:p-6 outline-none transition-transform duration-500 hover:-translate-y-1.5`}
  >
    {CORNER_POSITIONS.map((pos) => (
      <span
        key={pos}
        className={`absolute ${pos} w-3 h-3 -m-1.5 border-white/60 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
    ))}

    <div className="flex items-center justify-between">
      <span className="text-xs text-neutral-400">{mind.role}</span>
      <div className="flex items-center gap-1.5">
        <a href={SOCIAL_PROFILES.x} target="_blank" rel="noopener noreferrer" aria-label={`${mind.name} on X`} className={DARK_SOCIAL_CLASS}>
          <XIcon className="w-3 h-3" />
        </a>
        <a
          href={SOCIAL_PROFILES.dribbble}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${mind.name} on Dribbble`}
          className="w-7 h-7 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:bg-neutral-200 transition-colors"
        >
          <DribbbleIcon className="w-3.5 h-3.5" />
        </a>
        <a
          href={SOCIAL_PROFILES.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${mind.name} on LinkedIn`}
          className={DARK_SOCIAL_CLASS}
        >
          <LinkedInIcon className="w-3 h-3" />
        </a>
      </div>
    </div>

    <div className="flex justify-center py-6 sm:py-8">
      <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-neutral-800">
        <img
          src={mind.image}
          alt={mind.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'scale-105 grayscale-0' : 'grayscale-[30%]'}`}
        />
      </div>
    </div>

    <span className="block text-[11px] text-neutral-500">{mind.hashtag}</span>
    <h3 className="font-neue text-lg font-medium text-white mt-1">{mind.name}</h3>
  </article>
);
