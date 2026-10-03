import React, { useMemo, useState } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import type { LegalDocumentLabels, LegalSection } from '@/types/content';
import { LegalArticle } from './LegalArticle';
import { LegalTableOfContents } from './LegalTableOfContents';
import { LegalToolbar } from './LegalToolbar';

const matchesQuery = (section: LegalSection, query: string) =>
  [section.title, section.tldr, ...section.content, ...(section.bullets ?? [])].some((text) =>
    text.toLowerCase().includes(query),
  );

interface LegalDocumentProps {
  sections: LegalSection[];
  labels: LegalDocumentLabels;
  /** Cards stacked under the table of contents. */
  sidebar: React.ReactNode;
  /** Closing banner under the sections. */
  cta: React.ReactNode;
  /** Extra content placed inside specific sections, keyed by section id. */
  sectionExtras?: Record<string, React.ReactNode>;
  /** Replaces the default icon on 'highlight' callouts. */
  highlightIcon?: React.ReactNode;
}

/** Searchable legal document: toolbar, sticky table of contents with sidebar cards, and section cards. */
export const LegalDocument: React.FC<LegalDocumentProps> = ({
  sections,
  labels,
  sidebar,
  cta,
  sectionExtras = {},
  highlightIcon,
}) => {
  const [query, setQuery] = useState('');
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const activeId = useActiveSection(sectionIds);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleSections = normalizedQuery
    ? sections.filter((section) => matchesQuery(section, normalizedQuery))
    : sections;
  const pluralLabel = `${labels.sectionLabel}s`;

  return (
    <section className="relative w-full pb-20 sm:pb-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <LegalToolbar
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder={labels.searchPlaceholder}
          documentLabel={labels.documentLabel}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <aside className="lg:col-span-4 lg:sticky lg:top-[calc(var(--navbar-clearance)+1rem)] space-y-6">
            <LegalTableOfContents
              title={labels.tocTitle}
              countLabel={`${sections.length} ${pluralLabel}`}
              sections={sections}
              activeId={activeId}
            />
            {sidebar}
          </aside>

          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {visibleSections.length === 0 ? (
              <div className="rounded-[28px] bg-white border border-black/[0.08] p-12 text-center">
                <p className="font-clash text-lg text-neutral-700 font-medium">
                  No {pluralLabel.toLowerCase()} match "{query}".
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-4 px-5 py-2 rounded-full bg-neutral-950 text-white font-clash text-xs font-semibold cursor-pointer"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              visibleSections.map((section) => (
                <LegalArticle
                  key={section.id}
                  section={section}
                  sectionLabel={labels.sectionLabel}
                  highlightIcon={highlightIcon}
                >
                  {sectionExtras[section.id]}
                </LegalArticle>
              ))
            )}

            {cta}
          </div>
        </div>
      </div>
    </section>
  );
};
