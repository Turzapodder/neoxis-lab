import React from 'react';

interface SectionTagProps {
  children: React.ReactNode;
  /** 'light' renders a white dot for dark backgrounds. */
  tone?: 'dark' | 'light';
  /** Extra classes for color, spacing and alignment. */
  className?: string;
}

/** Small "• Label" eyebrow shown above section headlines. */
export const SectionTag: React.FC<SectionTagProps> = ({ children, tone = 'dark', className = '' }) => (
  <div className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${className}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${tone === 'light' ? 'bg-white' : 'bg-neutral-900'} inline-block`} />
    <span className="tracking-wide">{children}</span>
  </div>
);
