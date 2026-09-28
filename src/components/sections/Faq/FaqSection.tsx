import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Collapse } from '@/components/ui/Collapse';
import { SectionTag } from '@/components/ui/SectionTag';
import { useFaqs } from '@/components/content/ContentProvider';
import { useAccordion } from '@/hooks/useAccordion';

export const FaqSection: React.FC = () => {
  const faqs = useFaqs();
  const { openId, toggle } = useAccordion(faqs[0]?.id ?? null);

  return (
    <section className="relative w-full bg-[var(--color-canvas-bg)] text-neutral-950 py-16 sm:py-20 md:py-28 transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16">
        <div className="flex flex-col items-start">
          <SectionTag className="text-neutral-900 mb-3 sm:mb-4">Straight answers, zero runaround.</SectionTag>
          <h2 className="font-clash text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none select-none">FAQS</h2>
        </div>

        <div className="flex flex-col gap-1.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-${faq.id}`;
            return (
              <div key={faq.id} className="rounded-2xl bg-white border border-neutral-100">
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group w-full flex items-center justify-between gap-6 px-4 sm:px-5 py-5 text-left aria-expanded:pb-3 transition-[padding] duration-500"
                >
                  <span className="font-neue text-base sm:text-lg font-medium">{faq.question}</span>
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'border-neutral-400 text-neutral-900'
                        : 'border-neutral-200 text-neutral-600 group-hover:border-neutral-900 group-hover:text-neutral-900'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </span>
                </button>
                <Collapse open={isOpen} id={panelId}>
                  <p className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-[480px]">{faq.answer}</p>
                </Collapse>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
