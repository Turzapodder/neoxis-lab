import type { PricingPlan, PricingTier } from '@/types/content';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'low-budget',
    name: 'Low-budget',
    duration: '4-7 Days',
    price: { Standard: '$500', Premium: '$900' },
    unit: '/Project',
    tagline: 'Have design ready to build? Or small budget?',
    features: [
      'Wireframe-ready project required',
      'UI design using Figma or Framer',
      'Online/remote collaboration',
      '4-7 day turnaround',
      'Weekday delivery only',
    ],
  },
  {
    id: 'standard-plan',
    name: 'Standard Plan',
    duration: '15 Days',
    price: { Standard: '$5.000', Premium: '$8.500' },
    unit: '/Project',
    tagline: 'For growing brands ready to scale',
    features: [
      'Wireframe assistance optional',
      'Design in Figma or Framer',
      'Flexible remote delivery',
      'Detailed iteration & review flow',
      'Weekday-only execution',
    ],
    featured: true,
  },
  {
    id: 'advanced-project',
    name: 'For Advanced Project',
    duration: '3-6 Month',
    price: { Standard: 'Contact', Premium: 'Contact' },
    tagline: 'For enterprises and complex design systems',
    features: [
      'Consultation-based scoping',
      'Custom UX/UI, design system creation',
      'Deep collaboration with your team',
      'Phased delivery model',
      'Full-stack design integration',
    ],
  },
];

export const PRICING_TIERS: PricingTier[] = ['Standard', 'Premium'];
