import type { PricingPlan, PricingTier } from '@/types/content';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'low-budget',
    name: 'Sprint MVP',
    duration: '4-7 Days',
    price: { Standard: '$500', Premium: '$900' },
    unit: '/Project',
    tagline: 'Tight deadline or wireframes ready to go? Fast-track your launch.',
    features: [
      'Wireframe or clear brief ready to build',
      'High-fidelity UI in Figma or Framer',
      'Async collaboration via Slack & Loom',
      'Rapid 4–7 business day turnaround',
      'Production-ready Figma asset export',
    ],
  },
  {
    id: 'standard-plan',
    name: 'Growth Scale',
    duration: '15 Days',
    price: { Standard: '$5,000', Premium: '$8,500' },
    unit: '/Project',
    tagline: 'Full-scale design overhaul for startups ready to dominate their category.',
    features: [
      'End-to-end UX flow & wireframing',
      'Bespoke Figma UI system & motion polish',
      'Direct Slack channel & tight review loops',
      'Unlimited iterations within active sprint',
      'Tokenized design system & dev handoff',
    ],
    featured: true,
  },
  {
    id: 'advanced-project',
    name: 'Full Ecosystem',
    duration: '3-6 Month',
    price: { Standard: 'Custom', Premium: 'Custom' },
    tagline: 'Dedicated elite design firepower embedded directly with your core product crew.',
    features: [
      'Strategic roadmapping & custom scoping',
      'Multi-platform apps & design systems',
      'Embedded alongside your engineering squad',
      'Milestone-based agile sprint deployments',
      'Continuous 3D, motion, and web integration',
    ],
  },
];

export const PRICING_TIERS: PricingTier[] = ['Standard', 'Premium'];
