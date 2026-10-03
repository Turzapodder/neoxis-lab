import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { LegalHighlights } from '@/types/content';

interface LegalHighlightsCardProps {
  highlights: LegalHighlights;
  /** Optional icon before the eyebrow. */
  icon?: React.ReactNode;
  /** Tint of the corner glow, e.g. `bg-purple-500/10`. */
  glowClassName?: string;
}

/** Dark sidebar card summarizing the key promises of a legal document. */
export const LegalHighlightsCard: React.FC<LegalHighlightsCardProps> = ({
  highlights,
  icon,
  glowClassName = 'bg-purple-500/10',
}) => (
  <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-6 shadow-xl relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none ${glowClassName}`} />

    <div className="flex items-center gap-2 mb-4 text-xs font-clash font-semibold text-neutral-300 uppercase tracking-wider">
      {icon}
      <span>{highlights.eyebrow}</span>
    </div>

    <h4 className="font-clash text-lg font-bold mb-3 tracking-tight">{highlights.title}</h4>

    <ul className="space-y-2.5 text-xs text-neutral-300 font-neue">
      {highlights.items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
