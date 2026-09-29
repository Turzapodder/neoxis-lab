import { readDb } from './db';

/**
 * Typed content accessors for the public site.
 * Each getter maps a raw db section to the view model the UI expects,
 * falling back to safe defaults when fields are missing.
 */

/* ── View models (mirror src/types/content.ts) ──────────────────────────── */

export interface SelectedProjectView {
  id: string;
  num: string;
  title: string;
  year: string;
  category: string;
  image: string;
  colSpanClass?: string;
  logoType?: 'infinity' | 'speed' | 'wordmark' | 'monogram';
}

export interface ServiceSlideView {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiceView {
  id: string;
  title: string;
  tags: string[];
  slides: ServiceSlideView[];
}

export interface PricingPlanView {
  id: string;
  name: string;
  duration: string;
  price: { Standard: string; Premium: string };
  unit?: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

export interface TeamMemberView {
  id: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  image: string;
  portfolio?: string;
  github?: string;
  social?: { x?: string; dribbble?: string; linkedin?: string };
}

export interface TestimonialView {
  id: string;
  lead: string;
  rest: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

export interface FaqView {
  id: string;
  question: string;
  answer: string;
}

export interface HeroProjectView {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  image: string;
  logo?: 'aurea' | 'aura';
}

export interface HeroStatView {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface CmsContent {
  projects: SelectedProjectView[];
  services: ServiceView[];
  pricing: PricingPlanView[];
  team: TeamMemberView[];
  testimonials: TestimonialView[];
  faqs: FaqView[];
  hero: HeroProjectView[];
  heroStats: HeroStatView[];
}

const str = (value: unknown, fallback = ''): string =>
  typeof value === 'string' && value.length > 0 ? value : fallback;

const arr = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const itemsOf = (content: Record<string, unknown>, key: string): Record<string, unknown>[] =>
  arr((content[key] as Record<string, unknown> | undefined)?.items) as Record<string, unknown>[];

/* ── Mappers ────────────────────────────────────────────────────────────── */

const LOGO_TYPES = ['infinity', 'speed', 'wordmark', 'monogram'] as const;

function mapProjects(content: Record<string, unknown>): SelectedProjectView[] {
  return itemsOf(content, 'projects').map((raw, i) => ({
    id: str(raw.id, `project-${i + 1}`),
    num: str(raw.num, `${String(i + 1).padStart(2, '0')}.`),
    title: str(raw.title, 'Untitled project'),
    year: str(raw.year),
    category: str(raw.category),
    image: str(raw.image, '/images/work/neon-frame.jpg'),
    colSpanClass: str(raw.colSpanClass) || undefined,
    logoType: LOGO_TYPES.includes(raw.logoType as (typeof LOGO_TYPES)[number])
      ? (raw.logoType as SelectedProjectView['logoType'])
      : undefined,
  }));
}

function mapServices(content: Record<string, unknown>): ServiceView[] {
  return itemsOf(content, 'services').map((raw, i) => ({
    id: str(raw.id, `service-${i + 1}`),
    title: str(raw.title, 'Untitled service'),
    tags: arr(raw.tags).map((t) => String(t)).filter(Boolean),
    slides: arr(raw.slides).map((slideRaw, j) => {
      const slide = slideRaw as Record<string, unknown>;
      return {
        id: str(slide.id, `slide-${i + 1}-${j + 1}`),
        label: str(slide.label, ''),
        title: str(slide.title, ''),
        description: str(slide.description, ''),
        image: str(slide.image, '/images/ui/studio-fact-work.jpg'),
      };
    }),
  }));
}

function mapPricing(content: Record<string, unknown>): PricingPlanView[] {
  return itemsOf(content, 'pricing').map((raw, i) => ({
    id: str(raw.id, `plan-${i + 1}`),
    name: str(raw.name, 'Plan'),
    duration: str(raw.duration),
    price: {
      Standard: str(raw.priceStandard, 'Custom'),
      Premium: str(raw.pricePremium, 'Custom'),
    },
    unit: str(raw.unit) || undefined,
    tagline: str(raw.tagline),
    features: arr(raw.features).map((f) => String(f)).filter(Boolean),
    featured: raw.featured === true || raw.featured === 'true',
  }));
}

function mapTeam(content: Record<string, unknown>): TeamMemberView[] {
  return itemsOf(content, 'team').map((raw, i) => ({
    id: str(raw.id, `member-${i + 1}`),
    name: str(raw.name, 'Team member'),
    role: str(raw.role),
    location: str(raw.location),
    bio: str(raw.bio),
    image: str(raw.image, '/images/team/sienna.jpg'),
    portfolio: str(raw.portfolio) || undefined,
    github: str(raw.github) || undefined,
    social: {
      x: str(raw.socialX) || undefined,
      dribbble: str(raw.socialDribbble) || undefined,
      linkedin: str(raw.socialLinkedin) || undefined,
    },
  }));
}

function mapTestimonials(content: Record<string, unknown>): TestimonialView[] {
  return itemsOf(content, 'testimonials').map((raw, i) => {
    const rating = Number(raw.rating);
    return {
      id: str(raw.id, `testimonial-${i + 1}`),
      lead: str(raw.lead),
      rest: str(raw.rest),
      name: str(raw.name, 'Client'),
      role: str(raw.role),
      image: str(raw.image, '/images/team/kate.jpg'),
      rating: Number.isFinite(rating) ? Math.min(5, Math.max(1, Math.round(rating))) : 5,
    };
  });
}

function mapFaqs(content: Record<string, unknown>): FaqView[] {
  return itemsOf(content, 'faqs').map((raw, i) => ({
    id: str(raw.id, `faq-${i + 1}`),
    question: str(raw.question, 'Question'),
    answer: str(raw.answer, ''),
  }));
}

function mapHero(content: Record<string, unknown>): HeroProjectView[] {
  return itemsOf(content, 'hero').map((raw, i) => ({
    id: str(raw.id, String(i + 1).padStart(2, '0')),
    number: str(raw.number, String(i + 1).padStart(2, '0')),
    title: str(raw.title, 'Project'),
    subtitle: str(raw.subtitle) || undefined,
    image: str(raw.image, '/images/ui/card-mobile.jpg'),
    logo: raw.logo === 'aurea' || raw.logo === 'aura' ? raw.logo : undefined,
  }));
}

/* ── Public API ─────────────────────────────────────────────────────────── */

function mapHeroStats(content: Record<string, unknown>): HeroStatView[] {
  const seedIcons = ['starburst', 'users', 'rocket', 'globe'];
  return itemsOf(content, 'heroStats').map((raw, i) => ({
    id: str(raw.id, `stat-${i + 1}`),
    value: str(raw.value, ''),
    label: str(raw.label, ''),
    icon: str(raw.icon, seedIcons[i % seedIcons.length]),
  }));
}

export async function getCmsContent(): Promise<CmsContent> {
  const db = await readDb();
  const content = db.content;
  return {
    projects: mapProjects(content),
    services: mapServices(content),
    pricing: mapPricing(content),
    team: mapTeam(content),
    testimonials: mapTestimonials(content),
    faqs: mapFaqs(content),
    hero: mapHero(content),
    heroStats: mapHeroStats(content),
  };
}
