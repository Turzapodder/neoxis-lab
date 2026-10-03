import React from 'react';
import type { LegalCta } from '@/types/content';

const BUTTON_CLASS =
  'px-7 py-3.5 rounded-full font-clash text-sm font-semibold tracking-wide text-center transition-all active:scale-95 cursor-pointer select-none';
const PRIMARY_CLASS = `${BUTTON_CLASS} bg-white text-neutral-950 hover:bg-neutral-200 shadow-lg`;
const SECONDARY_CLASS = `${BUTTON_CLASS} bg-white/10 hover:bg-white/20 text-white`;

interface CtaAction {
  label: string;
  /** Link target; when omitted the action renders as a button. */
  href?: string;
  onClick?: () => void;
}

const CtaButton: React.FC<{ action: CtaAction; className: string }> = ({ action, className }) =>
  action.href ? (
    <a href={action.href} className={className}>
      {action.label}
    </a>
  ) : (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  );

interface LegalCtaBannerProps {
  copy: LegalCta;
  primary: CtaAction;
  secondary?: CtaAction;
}

/** Dark closing banner under a legal document, pointing readers to a person they can talk to. */
export const LegalCtaBanner: React.FC<LegalCtaBannerProps> = ({ copy, primary, secondary }) => (
  <div className="rounded-[28px] sm:rounded-[36px] bg-neutral-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
    <div className="space-y-2 max-w-xl">
      <span className="font-clash text-xs uppercase tracking-widest text-neutral-400">{copy.eyebrow}</span>
      <h3 className="font-clash text-2xl sm:text-3xl font-bold tracking-tight">{copy.title}</h3>
      <p className="font-neue text-sm sm:text-base text-neutral-400 leading-relaxed">{copy.text}</p>
    </div>

    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
      <CtaButton action={primary} className={PRIMARY_CLASS} />
      {secondary && <CtaButton action={secondary} className={SECONDARY_CLASS} />}
    </div>
  </div>
);
