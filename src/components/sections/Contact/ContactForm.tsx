import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { BUDGET_OPTIONS, PROJECT_TYPES } from '@/data/support';
import { ChipGroup } from './ChipGroup';
import { useContactForm } from './useContactForm';

const LABEL_CLASS = 'flex flex-col gap-2 text-sm text-white';
const FIELD_CLASS =
  'bg-transparent border-b border-white/15 pb-3 text-base font-normal text-white outline-none placeholder:text-neutral-500 focus:border-white transition-colors';

export const ContactForm: React.FC = () => {
  const { projectTypes, toggleProjectType, budget, toggleBudget, submitted, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9">
      <ChipGroup
        legend="What do you need?"
        hint="Pick any"
        options={PROJECT_TYPES}
        isSelected={(type) => projectTypes.includes(type)}
        onToggle={toggleProjectType}
      />

      <ChipGroup legend="Budget" options={BUDGET_OPTIONS} isSelected={(option) => budget === option} onToggle={toggleBudget} />

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
        About the project
        <textarea
          name="message"
          rows={3}
          placeholder="What are you building, and when do you need it?"
          className={`${FIELD_CLASS} resize-none`}
        />
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-neutral-500 max-w-[260px]">We only use your details to reply to this message.</p>
        <button
          type="submit"
          className="group/btn self-start sm:self-auto flex items-center gap-3 rounded-full bg-white pl-6 pr-1.5 py-1.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 active:scale-95 transition-all"
        >
          {submitted ? 'Message sent' : 'Send message'}
          <span className="w-9 h-9 rounded-full bg-neutral-950 text-white flex items-center justify-center">
            {submitted ? (
              <Check className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            )}
          </span>
        </button>
      </div>
    </form>
  );
};
