import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

import silkBg from '../assets/images/header.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Tier = 'Standard' | 'Premium';

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: Record<Tier, string>;
  unit?: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

const PLANS: Plan[] = [
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

const TIERS: Tier[] = ['Standard', 'Premium'];

interface PricingSectionProps {
  onChoosePlan?: (planId: string, tier: Tier) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onChoosePlan }) => {
  const [tier, setTier] = useState<Tier>('Standard');
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered staggered reveal for plan cards
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '[data-reveal]',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white p-1.5 sm:p-2">
      <div className="relative w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#0b0f17] text-white">
        {/* Blue-tinted silk backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={silkBg}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260%] sm:w-[170%] max-w-none rotate-[-18deg] grayscale opacity-60 blur-[1.5px]"
          />
          <div className="absolute inset-0 bg-[#1b2a4a] mix-blend-color" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/40 via-[#0b0f17]/30 to-[#0b0f17]/80" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-20 sm:pb-28">
          {/* ========================================================================= */}
          {/* 1. HEADER: "• Our Pricing", Pricing(3), tier toggle                       */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 sm:pb-10">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-3 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                <span className="tracking-wide">Our Pricing</span>
              </div>
              <h2 className="font-clash text-6xl sm:text-8xl lg:text-[112px] font-bold tracking-tight leading-[0.95] select-none">
                Pricing
                <sup className="font-neue font-normal text-lg sm:text-2xl text-white/70 align-top ml-1">(3)</sup>
              </h2>
            </div>

            <div role="tablist" aria-label="Pricing tier" className="relative flex self-start sm:self-end rounded-full bg-black/80 border border-white/10 p-1">
              <span
                aria-hidden
                className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-neutral-800 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  tier === 'Premium' ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
              {TIERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tier === t}
                  onClick={() => setTier(t)}
                  className={`relative z-10 w-24 py-2 text-xs sm:text-sm rounded-full transition-colors ${
                    tier === t ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. PLAN CARDS                                                             */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2.5 items-start">
            {PLANS.map((plan) => (
              <article
                key={plan.id}
                data-reveal
                className="rounded-[20px] sm:rounded-[22px] bg-[#141414]/95 backdrop-blur-md border border-white/[0.04] p-2.5"
              >
                <div className={`rounded-[16px] p-4 sm:p-5 ${plan.featured ? 'bg-white/[0.06]' : ''}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {plan.name}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/70">
                      {plan.duration}
                    </span>
                  </div>

                  <p className="mt-10 sm:mt-12 flex items-baseline">
                    <span
                      key={`${plan.id}-${tier}`}
                      className="font-neue font-medium text-4xl sm:text-5xl tracking-tight animate-[role-fade-in_0.45s_ease-out]"
                    >
                      {plan.price[tier]}
                    </span>
                    {plan.unit && <span className="text-xs text-white/80 ml-0.5">{plan.unit}</span>}
                  </p>
                  <p className="text-[11px] text-white/55 mt-2">{plan.tagline}</p>

                  <button
                    type="button"
                    onClick={() => onChoosePlan?.(plan.id, tier)}
                    className={`mt-6 w-full rounded-full py-3 text-xs sm:text-sm font-medium active:scale-[0.98] transition-all ${
                      plan.featured
                        ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                        : 'bg-white/[0.07] text-white hover:bg-white/[0.12]'
                    }`}
                  >
                    Choose Plan
                  </button>
                </div>

                <div className="mx-4 sm:mx-5 mt-2 border-t border-white/[0.06]" />

                <div className="p-4 sm:p-5 pb-6">
                  <p className="text-sm text-white/85">What's included:</p>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-xs sm:text-[13px] text-white/75">
                        <span className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white/80" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
