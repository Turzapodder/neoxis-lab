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

export const STUDIO_FACTS = {
  specialists: 12,
  countries: 12,
  projects: '230+',
  partners: '400+',
} as const;
