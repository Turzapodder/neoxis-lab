import React from 'react';
import type { StatIconName } from '@/types/content';

interface IconProps {
  className?: string;
}

const strokeProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

interface ArrowIconProps extends IconProps {
  direction?: 'left' | 'right';
  strokeWidth?: number | string;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ className, direction = 'right', strokeWidth = 2.5 }) => (
  <svg className={className} {...strokeProps} strokeWidth={strokeWidth}>
    <path d={direction === 'right' ? 'M5 12h14M12 5l7 7-7 7' : 'M19 12H5M12 19l-7-7 7-7'} />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} {...strokeProps} strokeWidth="2">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} {...strokeProps} strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// ── Hero stat icons ───────────────────────────────────────────────────────────

const STAT_ICON_PATHS: Record<StatIconName, React.ReactNode> = {
  starburst: <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" />,
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
      <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
};

export const StatIcon: React.FC<IconProps & { name: StatIconName }> = ({ name, className = 'w-5 h-5 text-current' }) => (
  <svg className={className} {...strokeProps} strokeWidth="1.8">
    {STAT_ICON_PATHS[name]}
  </svg>
);
