import { SECTIONS } from './sections';
import type { CmsData } from './db';

/**
 * Builds the initial database state from the section registry.
 * Admin users start empty and are seeded from env by ensureAdminUser().
 */
export function buildSeed(): CmsData {
  return {
    version: 1,
    users: [],
    sessions: [],
    inquiries: [],
    content: Object.fromEntries(SECTIONS.map((s) => [s.key, { items: s.seed }])),
  };
}
