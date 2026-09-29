import type { LucideIcon } from 'lucide-react';
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
  logoType?: 'infinity' | 'speed' | 'wordmark' | 'monogram';
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  service: string;
  industry: string;
  year: string;
  liveUrl?: string;
  liveLabel?: string;
  heroImage1: string;
  heroImage2: string;
  purpose: {
    heading: string;
    description: string[];
    bullets: string[];
  };
  purposeImages: string[];
  goals: {
    heading: string;
    description: string[];
    points: string[];
  };
  testimonial: {
    quote: string;
    clientName: string;
    clientRole: string;
    clientImage: string;
  };
  showcaseImage: string;
  nextProject: {
    id: string;
    title: string;
  };
}

export interface ServiceSlide {
  id: string;
  /** Short name shown on the stacked card. */
  label: string;
  title: string;
  description: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  tags: string[];
  /** Examples that cycle through the card stack when the row is open. */
  slides: ServiceSlide[];
}

export interface StudioReason {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
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
  location: string;
  bio: string;
  image: string;
  portfolio?: string;
  github?: string;
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
  value: string;
  caption: string;
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
