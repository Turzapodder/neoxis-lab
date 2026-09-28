'use client';

import React, { createContext, useContext } from 'react';
import type {
  Faq,
  HeroProject,
  PricingPlan,
  StatItem,
  SelectedProject,
  Service,
  TeamMember,
  Testimonial,
} from '@/types/content';
import { SELECTED_PROJECTS } from '@/data/projects';
import { SERVICES } from '@/data/services';
import { PRICING_PLANS } from '@/data/pricing';
import { TEAM_MEMBERS } from '@/data/team';
import { TESTIMONIALS } from '@/data/testimonials';
import { FAQS } from '@/data/support';
import { HERO_PROJECTS, HERO_STATS } from '@/data/hero';

/**
 * CMS content bridge.
 * The root server layout loads db-backed content and passes it here; public
 * components keep consuming the same view models. Any missing section falls
 * back to the bundled static data, so the site always renders.
 */

export interface SiteContent {
  projects: SelectedProject[];
  services: Service[];
  pricing: PricingPlan[];
  team: TeamMember[];
  testimonials: Testimonial[];
  faqs: Faq[];
  hero: HeroProject[];
  heroStats: StatItem[];
}

const FALLBACK: SiteContent = {
  projects: SELECTED_PROJECTS,
  services: SERVICES,
  pricing: PRICING_PLANS,
  team: TEAM_MEMBERS,
  testimonials: TESTIMONIALS,
  faqs: FAQS,
  hero: HERO_PROJECTS,
  heroStats: HERO_STATS,
};

const ContentContext = createContext<SiteContent>(FALLBACK);

export const ContentProvider: React.FC<{ content: SiteContent; children: React.ReactNode }> = ({
  content,
  children,
}) => <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;

/** Section-aware accessor: useContent('projects') with static fallback. */
export function useContent(): SiteContent {
  return useContext(ContentContext);
}

/* ── Convenient per-section hooks ───────────────────────────────────────── */

export const useProjects = () => useContent().projects;
export const useServices = () => useContent().services;
export const usePricing = () => useContent().pricing;
export const useTeam = () => useContent().team;
export const useTestimonials = () => useContent().testimonials;
export const useFaqs = () => useContent().faqs;
export const useHeroProjects = () => useContent().hero;
export const useHeroStats = () => useContent().heroStats;
