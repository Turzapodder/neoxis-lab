import React from 'react';

const LOGO_CLASS = 'flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-colors';

/** Six minimalist client wordmarks; the container layout comes from `className`. */
export const ClientLogos: React.FC<{ className?: string }> = ({ className = 'grid grid-cols-3 gap-y-5 gap-x-2 items-center' }) => (
  <div className={`select-none ${className}`}>
    <div className="flex items-center justify-center text-neutral-600 hover:text-neutral-950 transition-colors">
      <span className="font-serif italic text-lg sm:text-xl font-bold tracking-wider">thea</span>
    </div>

    <div className={`${LOGO_CLASS} gap-1`}>
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
      </svg>
      <span className="font-neue font-bold text-xs sm:text-sm tracking-tight">Leafe</span>
    </div>

    <div className={`${LOGO_CLASS} gap-1`}>
      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
      <span className="font-neue font-bold text-xs sm:text-sm lowercase tracking-wider">hues</span>
    </div>

    <div className="flex items-center justify-center gap-1.5 text-neutral-600 hover:text-neutral-950 transition-colors">
      <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <div className="flex flex-col text-[8px] sm:text-[9px] font-mono font-bold uppercase leading-[1.1] tracking-wider">
        <span>ZUMAR</span>
        <span>CONS</span>
      </div>
    </div>

    <div className={`${LOGO_CLASS} gap-1`}>
      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
      </svg>
      <span className="font-neue font-bold text-xs sm:text-sm tracking-tight">Crona</span>
    </div>

    <div className={`${LOGO_CLASS} gap-1`}>
      <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 18V9a4 4 0 0 1 8 0v9M12 9a4 4 0 0 1 8 0v9" />
      </svg>
      <span className="font-neue font-bold text-xs sm:text-sm tracking-tight">Mercury</span>
    </div>
  </div>
);
