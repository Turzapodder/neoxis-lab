/** DOM ids of landing page sections, used for anchors and scroll navigation. */
export const SECTION_IDS = {
  hero: 'hero-section',
  studio: 'creative-studio-section',
  meetTheMinds: 'meet-the-minds-section',
  selectedWork: 'selected-work-section',
  services: 'services-section',
  process: 'process-section',
  team: 'team-section',
  testimonials: 'testimonials-section',
  pricing: 'pricing-section',
  faq: 'faq-section',
  contact: 'contact-section',
  footer: 'footer-section',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** Hero slider cards are looked up by id so the studio section can animate them. */
export const heroProjectCardId = (index: number) => `hero-project-card-${index}`;
