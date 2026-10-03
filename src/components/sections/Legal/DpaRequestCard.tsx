import React from 'react';
import { PRIVACY_META } from '@/data/privacy';

const DPA_REQUEST_HREF = `mailto:${PRIVACY_META.dpoEmail}?subject=${encodeURIComponent('Data Processing Addendum Request')}`;

/** Sidebar card offering corporate clients a Data Processing Addendum. */
export const DpaRequestCard: React.FC = () => (
  <div className="rounded-[24px] sm:rounded-[28px] bg-white/80 backdrop-blur-xl border border-black/[0.08] p-5 shadow-sm text-xs space-y-2">
    <span className="font-clash font-semibold text-neutral-900 uppercase tracking-wide">
      Need a Data Processing Addendum (DPA)?
    </span>
    <p className="font-neue text-neutral-600">
      We provide countersigned EU Standard Contractual Clauses and DPAs for corporate clients.
    </p>
    <a
      href={DPA_REQUEST_HREF}
      className="inline-block font-clash font-medium text-neutral-950 underline underline-offset-4 hover:text-neutral-600 transition-colors pt-1"
    >
      Request DPA Agreement →
    </a>
  </div>
);
