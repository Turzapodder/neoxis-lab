import React from 'react';
import { Info, ShieldAlert, Sparkles } from 'lucide-react';
import type { LegalCalloutType, LegalSection } from '@/types/content';

const CALLOUT_ICON_CLASS = 'w-5 h-5 shrink-0 mt-0.5';

const CALLOUT_ICONS: Record<LegalCalloutType, React.ReactNode> = {
  important: <ShieldAlert className={`${CALLOUT_ICON_CLASS} text-amber-600`} />,
  highlight: <Sparkles className={`${CALLOUT_ICON_CLASS} text-purple-600`} />,
  info: <Info className={`${CALLOUT_ICON_CLASS} text-neutral-700`} />,
};

interface LegalArticleProps {
  section: LegalSection;
  /** Badge word before the number, e.g. "Clause". */
  sectionLabel: string;
  /** Replaces the default icon on 'highlight' callouts. */
  highlightIcon?: React.ReactNode;
  /** Extra content shown after the section copy, before its callout. */
  children?: React.ReactNode;
}

/** One legal section card: number and TL;DR, title, copy, bullets, subsections and an optional callout. */
export const LegalArticle: React.FC<LegalArticleProps> = ({ section, sectionLabel, highlightIcon, children }) => {
  const { callout } = section;
  const calloutIcon = callout?.type === 'highlight' && highlightIcon ? highlightIcon : callout && CALLOUT_ICONS[callout.type];

  return (
    <article
      id={section.id}
      className="scroll-mt-6 rounded-[28px] sm:rounded-[36px] bg-white/90 backdrop-blur-xl border border-black/[0.08] p-6 sm:p-10 lg:p-12 shadow-[0_15px_45px_-12px_rgba(0,0,0,0.04)] hover:border-black/15 transition-all duration-300"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <span className="font-clash text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-neutral-950 text-white tracking-wider uppercase">
          {sectionLabel} {section.number}
        </span>

        <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100/90 px-3.5 py-1 rounded-full font-neue">
          <span className="font-semibold text-neutral-900">TL;DR:</span>
          <span className="truncate max-w-[280px] sm:max-w-md">{section.tldr}</span>
        </div>
      </div>

      <h2 className="font-clash text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-neutral-950 mb-6">
        {section.title}
      </h2>

      <div className="space-y-4 text-neutral-600 font-neue text-base sm:text-lg leading-relaxed">
        {section.content.map((paragraph) => (
          <p key={paragraph} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {section.bullets && section.bullets.length > 0 && (
        <ul className="my-6 space-y-3 pl-1">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-base font-neue leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0 mt-2" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-8 pt-6 border-t border-black/[0.06] space-y-6">
          {section.subsections.map((sub) => (
            <div key={sub.title} className="space-y-2">
              <h4 className="font-clash text-base sm:text-lg font-semibold text-neutral-950">{sub.title}</h4>
              <p className="font-neue text-sm sm:text-base text-neutral-600 leading-relaxed">{sub.description}</p>
              {sub.list && (
                <ul className="pl-3 mt-2 space-y-2">
                  {sub.list.map((item) => (
                    <li key={item} className="text-xs sm:text-sm text-neutral-700 font-neue list-disc leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {children}

      {callout && (
        <div className="mt-8 rounded-[20px] bg-neutral-50 border border-black/[0.08] p-5 sm:p-6 flex items-start gap-4">
          {calloutIcon}
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-clash font-bold text-neutral-950 uppercase tracking-wide">{callout.title}</p>
            <p className="font-neue text-neutral-600 leading-relaxed">{callout.message}</p>
          </div>
        </div>
      )}
    </article>
  );
};
