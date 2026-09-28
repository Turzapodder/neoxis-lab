import React from 'react';
import { PRICING_TIERS } from '@/data/pricing';
import type { PricingTier } from '@/types/content';

interface TierToggleProps {
  value: PricingTier;
  onChange: (tier: PricingTier) => void;
}

/** Two-option segmented control with a sliding highlight. */
export const TierToggle: React.FC<TierToggleProps> = ({ value, onChange }) => (
  <div role="tablist" aria-label="Pricing tier" className="relative flex self-start sm:self-end rounded-full bg-black/80 border border-white/10 p-1">
    <span
      aria-hidden
      className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-neutral-800 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        value === 'Premium' ? 'translate-x-full' : 'translate-x-0'
      }`}
    />
    {PRICING_TIERS.map((tier) => (
      <button
        key={tier}
        type="button"
        role="tab"
        aria-selected={value === tier}
        onClick={() => onChange(tier)}
        className={`relative z-10 w-24 py-2 text-xs sm:text-sm rounded-full transition-colors ${
          value === tier ? 'text-white' : 'text-white/80 hover:text-white'
        }`}
      >
        {tier}
      </button>
    ))}
  </div>
);
