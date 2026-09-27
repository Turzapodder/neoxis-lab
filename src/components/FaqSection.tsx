import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface Faq {
  id: string;
  question: string;
  answer: string;
}

const FAQS: Faq[] = [
  {
    id: 'progress',
    question: 'What’s the Ezando® progress like?',
    answer: 'I specialize in UX/UI design, web development, and branding for individuals and businesses.',
  },
  {
    id: 'delivery',
    question: 'Design delivery time estimate?',
    answer: 'Small projects ship in 4–7 days, standard projects in about 15 days, and larger engagements are scoped in phases over 3–6 months.',
  },
  {
    id: 'services',
    question: 'What services do you offer?',
    answer: 'Branding, digital and motion design, web design, and end-to-end UI/UX, from research and wireframes to production-ready files.',
  },
  {
    id: 'dislike',
    question: 'What if I don’t like design?',
    answer: 'Every plan includes review rounds. We iterate with you until the direction feels right before moving on.',
  },
  {
    id: 'refund',
    question: 'Are there any refund?',
    answer: 'If we have not started work, you get a full refund. After kickoff, refunds are prorated to the work delivered.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  return (
    <section className="relative w-full bg-[var(--color-canvas-bg)] text-neutral-950 py-16 sm:py-20 md:py-28 transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16">
        {/* Left: tag + headline */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-900 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="tracking-wide">Find your answer in seconds.</span>
          </div>
          <h2 className="font-clash text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none select-none">
            FAQS
          </h2>
        </div>

        {/* Right: accordion */}
        <div className="flex flex-col gap-1.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="rounded-2xl bg-white border border-neutral-100">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${faq.id}`}
                  className="group w-full flex items-center justify-between gap-6 px-4 sm:px-5 py-5 text-left aria-expanded:pb-3 transition-[padding] duration-500"
                >
                  <span className="font-neue text-base sm:text-lg font-medium">{faq.question}</span>
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'border-neutral-400 text-neutral-900' : 'border-neutral-200 text-neutral-600 group-hover:border-neutral-900 group-hover:text-neutral-900'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </span>
                </button>
                <div
                  id={`faq-${faq.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-[480px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
