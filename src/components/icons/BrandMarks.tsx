import React from 'react';
import type { BrandMarkName } from '@/types/content';

// Monochrome partner marks
const MARK_CLASS = 'w-5 h-5';

const BRAND_MARKS: Record<BrandMarkName, React.ReactNode> = {
  zantic: (
    <svg viewBox="0 0 24 24" className={MARK_CLASS} fill="currentColor">
      <path d="M3 4h6l12 16h-6zM15 4h6l-5 6.5-3-4zM3 20l5-6.5 3 4-2 2.5z" />
    </svg>
  ),
  bookstore: (
    <svg viewBox="0 0 24 24" className={MARK_CLASS} fill="currentColor">
      <path d="M12 2 3 7v10l9 5V12l9-5zM13 13.2V22l8-4.5V8.7z" opacity=".55" />
      <path d="M12 2 3 7v10l9 5V12l9-5z" />
    </svg>
  ),
  wager: (
    <svg viewBox="0 0 24 24" className={MARK_CLASS} fill="currentColor">
      <circle cx="12" cy="7" r="4.2" />
      <circle cx="7" cy="14" r="4.2" />
      <circle cx="17" cy="14" r="4.2" />
      <path d="M11 14h2l1.5 8h-5z" />
    </svg>
  ),
  crona: (
    <svg viewBox="0 0 24 24" className={MARK_CLASS} fill="currentColor">
      <path d="M12 2 22 9v2L12 4 2 11V9zM12 8l10 7v2l-10-7-10 7v-2zM12 14l8 5.6L12 22l-8-2.4z" />
    </svg>
  ),
  mercury: (
    <svg viewBox="0 0 24 24" className={MARK_CLASS} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
      <path d="M2 19 8 6l4 8 4-8 6 13" />
    </svg>
  ),
};

export const BrandMark: React.FC<{ name: BrandMarkName }> = ({ name }) => <>{BRAND_MARKS[name]}</>;
