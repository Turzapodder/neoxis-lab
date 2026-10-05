import React from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { BUDGET_OPTIONS, PROJECT_TYPES } from '@/data/support';
import { ChipGroup } from './ChipGroup';
import { useContactForm } from './useContactForm';

const LABEL_CLASS = 'flex flex-col gap-2 text-sm text-white';
const FIELD_CLASS =
  'contact-input bg-transparent border-b border-white/15 pb-3 text-base font-normal text-white outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-neutral-500 focus:border-white transition-colors';

export const ContactForm: React.FC = () => {
  const {
    projectTypes,
    toggleProjectType,
    budget,
    toggleBudget,
    submitting,
    submitted,
    error,
    handleSubmit,
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9">
      <ChipGroup
        legend="What are we building?"
        hint="Select any"
        options={PROJECT_TYPES}
        isSelected={(type) => projectTypes.includes(type)}
        onToggle={toggleProjectType}
      />

      <ChipGroup legend="Target budget" options={BUDGET_OPTIONS} isSelected={(option) => budget === option} onToggle={toggleBudget} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <label className={LABEL_CLASS}>
          Your name
          <input type="text" name="name" required autoComplete="name" placeholder="Alex Morgan" className={FIELD_CLASS} />
        </label>
        <label className={LABEL_CLASS}>
          Email
          <input type="email" name="email" required autoComplete="email" placeholder="alex@company.com" className={FIELD_CLASS} />
        </label>
      </div>

      <label className={LABEL_CLASS}>
        Project brief &amp; vision
        <textarea
          name="message"
          rows={3}
          required
          placeholder="Give us the TL;DR — what are you building, your dream launch date, and what does success look like?"
          className={`${FIELD_CLASS} resize-none`}
        />
      </label>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {submitted && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          ✓ Inquiry received! We will review your brief and get in touch with you shortly.
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-neutral-500 max-w-[260px]">No spam or pushy sales reps. Straight to a lead designer.</p>
        <button
          type="submit"
          disabled={submitting}
          className="group/btn self-start sm:self-auto flex items-center gap-3 rounded-full bg-white pl-6 pr-1.5 py-1.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none"
        >
          {submitting ? 'Sending Brief...' : submitted ? 'Brief Received!' : 'Launch Inquiry'}
          <span className="w-9 h-9 rounded-full bg-neutral-950 text-white flex items-center justify-center">
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : submitted ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            )}
          </span>
        </button>
      </div>
    </form>
  );
};
