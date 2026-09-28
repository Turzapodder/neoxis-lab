import React from 'react';

interface ChipGroupProps {
  legend: string;
  hint?: string;
  options: readonly string[];
  isSelected: (option: string) => boolean;
  onToggle: (option: string) => void;
}

/** Labeled set of toggle chips for dark backgrounds. */
export const ChipGroup: React.FC<ChipGroupProps> = ({ legend, hint, options, isSelected, onToggle }) => (
  <fieldset>
    <legend className="flex items-baseline gap-2 text-sm text-white mb-3">
      {legend}
      {hint && <span className="text-xs text-neutral-500">{hint}</span>}
    </legend>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = isSelected(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onToggle(option)}
            className={`rounded-full border px-4 py-2 text-xs sm:text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
              selected
                ? 'bg-white border-white text-neutral-950'
                : 'border-white/15 text-neutral-300 hover:border-white/40 hover:text-white'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  </fieldset>
);
