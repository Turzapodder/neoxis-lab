import type { SectionId } from '@/constants/sections';

/** Canonical page paths. The short forms `/terms` and `/privacy` also resolve (see `lib/router`). */
export const ROUTES = {
  home: '/',
  project: '/project',
  terms: '/terms-and-conditions',
  privacy: '/privacy-policy',
} as const;

export const projectPath = (id: string) => `${ROUTES.project}/${id}`;

/** Link to a landing page section that works from any page. */
export const sectionPath = (id: SectionId) => `${ROUTES.home}#${id}`;
