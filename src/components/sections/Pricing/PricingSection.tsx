import React, { useRef, useState } from 'react';
import silkBg from '@/assets/images/pricing.jpg';
import { SectionTag } from '@/components/ui/SectionTag';
import { PRICING_PLANS, PRICING_TIERS } from '@/data/pricing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { PricingTier } from '@/types/content';
import { PlanCard } from './PlanCard';
import { TierToggle } from './TierToggle';

interface PricingSectionProps {
  onChoosePlan?: (planId: string, tier: PricingTier) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onChoosePlan }) => {
  const [tier, setTier] = useState<PricingTier>(PRICING_TIERS[0]);
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, { y: 50, stagger: 0.12, start: 'top 85%', trigger: 'first-item' });

  return (
    <section ref={sectionRef} className="relative w-full bg-white p-1.5 sm:p-2">
      <div data-wipe className="relative w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#0b0f17] text-white">
        {/* Blue-tinted silk backdrop */}
        <div data-wipe-bg className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={silkBg}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260%] sm:w-[170%] max-w-none rotate-[-18deg] grayscale opacity-60 blur-[1.5px]"
          />
          <div className="absolute inset-0 bg-[#1b2a4a] mix-blend-color" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/40 via-[#0b0f17]/30 to-[#0b0f17]/80" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-20 sm:pb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 sm:pb-10">
            <div className="flex flex-col items-start">
              <SectionTag tone="light" className="mb-3 sm:mb-5">
                Our Pricing
              </SectionTag>
              <h2 className="font-clash text-6xl sm:text-8xl lg:text-[112px] font-bold tracking-tight leading-[0.95] select-none">
                Pricing
                <sup className="font-neue font-normal text-lg sm:text-2xl text-white/70 align-top ml-1">({PRICING_PLANS.length})</sup>
              </h2>
            </div>

            <TierToggle value={tier} onChange={setTier} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2.5 items-start">
            {PRICING_PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} tier={tier} onChoose={onChoosePlan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
