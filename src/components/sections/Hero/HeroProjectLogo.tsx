import React from 'react';
import type { HeroProjectLogo as LogoName } from '@/types/content';

export const HeroProjectLogo: React.FC<{ name: LogoName }> = ({ name }) => {
  if (name === 'aurea') {
    return (
      <div className="flex items-center gap-2.5 text-white">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
        </svg>
        <span className="font-clash text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white">Aurea Studio</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-white">
      <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse"></span>
      <span className="font-clash text-base sm:text-lg font-bold tracking-wider text-white">AURA SPATIAL</span>
    </div>
  );
};
