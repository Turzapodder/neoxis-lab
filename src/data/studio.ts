import { Layers, PackageCheck, UserCheck } from 'lucide-react';
import type { StudioReason } from '@/types/content';

/** "Why choose us" reasons shown under the studio images. */
export const STUDIO_REASONS: StudioReason[] = [
  {
    id: 'senior-team',
    icon: UserCheck,
    title: 'Senior people on every project',
    text: 'The designers you meet in the first call are the ones doing the work.',
  },
  {
    id: 'one-team',
    icon: Layers,
    title: 'Strategy, design and build in one team',
    text: 'No hand-offs between agencies, so nothing gets lost between stages.',
  },
  {
    id: 'handover',
    icon: PackageCheck,
    title: 'Made to be handed over',
    text: 'Clean files, documented systems and code your team can extend.',
  },
];

/**
 * Studio-wide numbers. Keep them honest and in step with the stats bar
 * (CMS "heroStats"); the specialist count comes from the CMS team list.
 */
export const STUDIO_FACTS = {
  countries: 5,
  projects: '20+',
  partners: '15+',
} as const;
