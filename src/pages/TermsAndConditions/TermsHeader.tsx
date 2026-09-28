import React from 'react';
import { ArrowLeft, Calendar, FileText, Globe, Mail } from 'lucide-react';
import { SectionTag } from '@/components/ui/SectionTag';
import { TERMS_META } from '@/data/termsData';

interface TermsHeaderProps {
  onNavigateHome: () => void;
}

export const TermsHeader: React.FC<TermsHeaderProps> = ({ onNavigateHome }) => {
  return (
    <header className="relative w-full pt-8 sm:pt-12 md:pt-16 pb-10 sm:pb-14">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Back link */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={onNavigateHome}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-clash font-medium text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Return to Studio Home</span>
          </button>
        </div>

        {/* Section tag eyebrow */}
        <div className="mb-4">
          <SectionTag className="text-neutral-500">
            {TERMS_META.eyebrow}
          </SectionTag>
        </div>

        {/* Main Grid: Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-bold tracking-tight text-neutral-950 uppercase leading-[0.92] select-none">
              {TERMS_META.title}
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="font-neue text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Clear, transparent, and fair commercial terms governing all bespoke web design,
              product engineering, and creative deliverables developed by NeoXis Studio.
            </p>
          </div>
        </div>

        {/* Dividing Line */}
        <div className="w-full h-px bg-neutral-200/90 my-8 sm:my-10" />

        {/* 4-COLUMN META DOCK (matches project details aesthetic) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Item 1: Effective Date */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-neue text-xs font-medium uppercase tracking-wider">
                Effective
              </span>
            </div>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">
              {TERMS_META.effectiveDate}
            </span>
          </div>

          {/* Item 2: Version */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <FileText className="w-3.5 h-3.5" />
              <span className="font-neue text-xs font-medium uppercase tracking-wider">
                Edition
              </span>
            </div>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950 truncate">
              {TERMS_META.version}
            </span>
          </div>

          {/* Item 3: Jurisdiction */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Globe className="w-3.5 h-3.5" />
              <span className="font-neue text-xs font-medium uppercase tracking-wider">
                Jurisdiction
              </span>
            </div>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">
              {TERMS_META.jurisdiction}
            </span>
          </div>

          {/* Item 4: Legal Direct Line */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Mail className="w-3.5 h-3.5" />
              <span className="font-neue text-xs font-medium uppercase tracking-wider">
                Legal Desk
              </span>
            </div>
            <a
              href={`mailto:${TERMS_META.legalContact}`}
              className="font-clash text-sm sm:text-base font-semibold text-neutral-950 hover:text-neutral-600 underline underline-offset-2 transition-colors truncate"
            >
              {TERMS_META.legalContact}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
