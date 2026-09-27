import React from 'react';
import { Check } from 'lucide-react';
import type { PricingPlan, PricingTier } from '@/types/content';

interface PlanCardProps {
  plan: PricingPlan;
  tier: PricingTier;
  onChoose?: (planId: string, tier: PricingTier) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, tier, onChoose }) => (
  <article
    data-reveal
    className="rounded-[20px] sm:rounded-[22px] bg-[#141414]/95 backdrop-blur-md border border-white/[0.04] p-2.5"
  >
    <div className={`rounded-[16px] p-4 sm:p-5 ${plan.featured ? 'bg-white/[0.06]' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          {plan.name}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/70">{plan.duration}</span>
      </div>

      <p className="mt-10 sm:mt-12 flex items-baseline">
        <span
          key={`${plan.id}-${tier}`}
          className="font-neue font-medium text-4xl sm:text-5xl tracking-tight animate-[fade-up_0.45s_ease-out]"
        >
          {plan.price[tier]}
        </span>
        {plan.unit && <span className="text-xs text-white/80 ml-0.5">{plan.unit}</span>}
      </p>
      <p className="text-[11px] text-white/55 mt-2">{plan.tagline}</p>

      <button
        type="button"
        onClick={() => onChoose?.(plan.id, tier)}
        className={`mt-6 w-full rounded-full py-3 text-xs sm:text-sm font-medium active:scale-[0.98] transition-all ${
          plan.featured ? 'bg-white text-neutral-950 hover:bg-neutral-200' : 'bg-white/[0.07] text-white hover:bg-white/[0.12]'
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
);
