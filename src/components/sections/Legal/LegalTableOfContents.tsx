import React from 'react';
import type { LegalSection } from '@/types/content';
import { scrollToSection } from '@/utils/scroll';

interface LegalTableOfContentsProps {
  title: string;
  /** Count badge, e.g. "12 Clauses". */
  countLabel: string;
  sections: LegalSection[];
  activeId: string;
}

/** Sidebar list of sections that scrolls to each one and highlights the section in view. */
export const LegalTableOfContents: React.FC<LegalTableOfContentsProps> = ({ title, countLabel, sections, activeId }) => (
  <div className="rounded-[24px] sm:rounded-[28px] bg-white/85 backdrop-blur-xl border border-black/[0.08] p-6 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.04)]">
    <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06]">
      <h3 className="font-clash text-base font-semibold text-neutral-950 uppercase tracking-wide">{title}</h3>
      <span className="font-clash text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
        {countLabel}
      </span>
    </div>

    {/* Scrolls natively instead of through Lenis */}
    <nav data-lenis-prevent className="max-h-[380px] overflow-y-auto pr-1 space-y-1 text-xs sm:text-sm font-neue">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            aria-current={isActive ? 'location' : undefined}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-neutral-950 text-white font-medium shadow-sm'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-black/[0.03]'
            }`}
          >
            <span className="truncate pr-2">{section.title}</span>
            <span className={`font-clash text-xs shrink-0 ${isActive ? 'text-white/80' : 'text-neutral-400'}`}>
              {section.number}
            </span>
          </button>
        );
      })}
    </nav>
  </div>
);
