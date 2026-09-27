import React from 'react';
import { Check } from 'lucide-react';
import { BUDGET_OPTIONS } from '@/data/support';
import { useContactForm } from './useContactForm';

const FIELD_CLASS =
  'mt-3 pb-3 border-b border-neutral-200 text-sm font-normal outline-none focus:border-neutral-900 transition-colors';
const INPUT_CLASS = `${FIELD_CLASS} placeholder:text-neutral-400`;

export const ContactForm: React.FC = () => {
  const { budget, toggleBudget, submitted, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="rounded-[20px] bg-white text-neutral-950 p-5 sm:p-6 flex flex-col">
      <label className="flex flex-col text-xs font-medium">
        Your Email*
        <input type="email" name="email" required placeholder="Enter the Email" className={INPUT_CLASS} />
      </label>
      <label className="flex flex-col text-xs font-medium mt-6">
        Your Phone*
        <input type="tel" name="phone" required placeholder="Enter your phone number" className={INPUT_CLASS} />
      </label>
      <label className="flex flex-col text-xs font-medium mt-6">
        Message
        <textarea name="message" rows={4} className={`${FIELD_CLASS} resize-none`} />
      </label>

      <fieldset className="mt-8">
        <legend className="sr-only">Project budget</legend>
        <div className="flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={budget === option}
              onClick={() => toggleBudget(option)}
              className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                budget === option
                  ? 'bg-neutral-950 border-neutral-950 text-white'
                  : 'border-neutral-200 text-neutral-800 hover:border-neutral-900'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-10 w-full rounded-full bg-neutral-950 text-white py-3.5 text-sm font-medium hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        {submitted ? (
          <>
            <Check className="w-4 h-4" /> Message sent
          </>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  );
};
