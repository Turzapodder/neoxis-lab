import React from 'react';
import { Check, Copy, Printer, Search } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

/** How long the "Link Copied!" confirmation shows. */
const COPIED_FEEDBACK_MS = 2200;

const ACTION_CLASS =
  'inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:border-black/25 bg-white text-neutral-700 hover:text-neutral-950 text-xs sm:text-sm font-clash font-medium transition-all shadow-sm cursor-pointer select-none';

interface LegalToolbarProps {
  query: string;
  onQueryChange: (query: string) => void;
  searchPlaceholder: string;
  /** Short document name for the action buttons, e.g. "Terms". */
  documentLabel: string;
}

/** Search field plus print and share-link actions for a legal document. */
export const LegalToolbar: React.FC<LegalToolbarProps> = ({
  query,
  onQueryChange,
  searchPlaceholder,
  documentLabel,
}) => {
  const { copied, copy } = useCopyToClipboard(COPIED_FEEDBACK_MS);

  return (
    <div className="rounded-[24px] bg-white/90 backdrop-blur-xl border border-black/[0.08] p-4 sm:p-5 mb-10 sm:mb-14 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04)]">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={`Search ${documentLabel}`}
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-neutral-100/80 border border-transparent focus:border-black/20 focus:bg-white text-xs sm:text-sm font-neue text-neutral-900 placeholder:text-neutral-400 outline-none transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-clash"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-end">
        <button type="button" onClick={() => window.print()} className={ACTION_CLASS}>
          <Printer className="w-3.5 h-3.5" />
          <span>Print {documentLabel}</span>
        </button>

        <button type="button" onClick={() => copy(window.location.href)} className={ACTION_CLASS}>
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Share {documentLabel}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
