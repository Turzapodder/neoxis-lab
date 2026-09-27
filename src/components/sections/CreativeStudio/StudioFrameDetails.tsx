import React from 'react';
import { SectionTag } from '@/components/ui/SectionTag';

interface StudioFrameDetailsProps {
  variant: 'base' | 'overlay';
}

/** Small label and meta line around the statement; drawn in both layers so they carry through the wipe. */
export const StudioFrameDetails: React.FC<StudioFrameDetailsProps> = ({ variant }) => {
  const isBase = variant === 'base';
  const muted = isBase ? 'text-neutral-500' : 'text-neutral-400';
  const line = isBase ? 'bg-neutral-300' : 'bg-white/20';

  return (
    <div className="absolute inset-0 pointer-events-none px-6 sm:px-10 lg:px-16 py-8 sm:py-10 flex flex-col justify-between">
      <SectionTag tone={isBase ? 'dark' : 'light'} className={isBase ? 'text-neutral-900' : 'text-white'}>
        The Ethos
      </SectionTag>

      <div className={`flex items-end justify-between gap-6 text-xs sm:text-sm ${muted}`}>
        <p className="max-w-[250px] leading-relaxed">High-voltage branding, digital systems, and interfaces for founders building what&apos;s next.</p>
        <div className="hidden sm:flex items-center gap-3">
          <span>Scroll to dive in</span>
          <span className={`relative block w-12 h-px overflow-hidden ${line}`}>
            <span
              className={`absolute inset-y-0 left-0 w-1/2 animate-[scroll-hint_2.2s_ease-in-out_infinite] motion-reduce:animate-none ${
                isBase ? 'bg-neutral-900' : 'bg-white'
              }`}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
