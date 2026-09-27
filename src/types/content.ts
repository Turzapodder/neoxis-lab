import type { SectionId } from '@/constants/sections';

// ── Navigation ────────────────────────────────────────────────────────────────

export interface NavTab {
  id: string;
  label: string;
  badge?: string;
  target?: SectionId;
}

export interface NavLink {
  label: string;
  /** Section to scroll to; 'top' scrolls to the start of the page. */
  target: SectionId | 'top';
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface MenuItem {
  number: string;
  title: string;
  desc: string;
}

// ── Hero & stats ──────────────────────────────────────────────────────────────

export type HeroProjectLogo = 'aurea' | 'aura';

export interface HeroProject {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  image: string;
  logo?: HeroProjectLogo;
}

export type StatIconName = 'starburst' | 'users' | 'rocket' | 'globe';

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: StatIconName;
}

export interface FloatingCard {
  src: string;
  alt: string;
  z: number;
}

// ── Work & services ───────────────────────────────────────────────────────────

export interface SelectedProject {
  id: string;
  num: string;
  title: string;
  year: string;
  category: string;
  image: string;
  colSpanClass?: string;
}

export interface Service {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
}

export interface ProcessStep {
  id: string;
  label: string;
  title: string;
  image: string;
}

// ── People ────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  image: string;
  rating: number;
  quote: string;
  bio: string;
  accentColor?: string;
  socials: {
    x?: string;
    linkedin?: string;
  };
}

export interface Mind {
  id: string;
  name: string;
  role: string;
  hashtag: string;
  image: string;
  /** Vertical offset class that staggers the cards on desktop. */
  offset: string;
}

export interface Testimonial {
  id: string;
  lead: string;
  rest: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

export interface ClientStat {
  id: string;
  label: string;
  value: string;
  caption?: string;
  avatars?: readonly string[];
}

export type BrandMarkName = 'zantic' | 'bookstore' | 'wager' | 'crona' | 'mercury';

export interface Partner {
  name: string;
  mark: BrandMarkName;
  className: string;
}

// ── Pricing, FAQ, contact ─────────────────────────────────────────────────────

export type PricingTier = 'Standard' | 'Premium';

export interface PricingPlan {
  id: string;
  name: string;
  duration: string;
  price: Record<PricingTier, string>;
  unit?: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}
