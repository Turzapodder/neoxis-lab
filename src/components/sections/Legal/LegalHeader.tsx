import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/components/ui/Link';
import { SectionTag } from '@/components/ui/SectionTag';
import { ROUTES } from '@/constants/routes';
import type { LegalFact } from '@/types/content';

/** Glass card for one key fact, e.g. the effective date. */
const FactCard: React.FC<{ fact: LegalFact }> = ({ fact: { icon: Icon, label, value, href } }) => (
  <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
    <div className="flex items-center gap-1.5 text-neutral-400">
      <Icon className="w-3.5 h-3.5" />
      <span className="font-neue text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
    {href ? (
      <a
        href={href}
        className="font-clash text-sm sm:text-base font-semibold text-neutral-950 hover:text-neutral-600 underline underline-offset-2 transition-colors truncate"
      >
        {value}
      </a>
    ) : (
      <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">{value}</span>
    )}
  </div>
);

interface LegalHeaderProps {
  eyebrow: string;
  title: string;
  intro: string;
  facts: LegalFact[];
}

/** Legal page opener: back link, title with intro, and a row of key facts. */
export const LegalHeader: React.FC<LegalHeaderProps> = ({ eyebrow, title, intro, facts }) => (
  <header className="relative w-full pt-8 sm:pt-12 md:pt-16 pb-10 sm:pb-14">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
      <Link
        to={ROUTES.home}
        className="group inline-flex items-center gap-2 mb-6 sm:mb-8 text-xs sm:text-sm font-clash font-medium text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer select-none"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Return to Studio Home</span>
      </Link>

      <SectionTag className="mb-4 text-neutral-500">{eyebrow}</SectionTag>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
        <h1 className="lg:col-span-8 font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-bold tracking-tight text-neutral-950 uppercase leading-[0.92] select-none">
          {title}
        </h1>
        <p className="lg:col-span-4 font-neue text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
          {intro}
        </p>
      </div>

      <div className="w-full h-px bg-neutral-200/90 my-8 sm:my-10" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {facts.map((fact) => (
          <FactCard key={fact.label} fact={fact} />
        ))}
      </div>
    </div>
  </header>
);
