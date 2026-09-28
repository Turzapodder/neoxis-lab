import React from 'react';
import { ArrowLeft, Calendar, Lock, Mail, ShieldCheck } from 'lucide-react';
import { SectionTag } from '@/components/ui/SectionTag';
import { PRIVACY_META } from '@/data/privacyData';

interface PrivacyHeaderProps {
  onNavigateHome: () => void;
}

export const PrivacyHeader: React.FC<PrivacyHeaderProps> = ({ onNavigateHome }) => {
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
            {PRIVACY_META.eyebrow}
          </SectionTag>
        </div>

        {/* Main Grid: Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-bold tracking-tight text-neutral-950 uppercase leading-[0.92] select-none">
              {PRIVACY_META.title}
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="font-neue text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              How NeoXis Studio safeguards confidential project assets, protects user privacy,
              and maintains zero data broker monetization across our digital ecosystem.
            </p>
          </div>
        </div>

        {/* Dividing Line */}
        <div className="w-full h-px bg-neutral-200/90 my-8 sm:my-10" />

        {/* 4-COLUMN META DOCK */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Item 1: Effective Date */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-neue text-xs font-medium uppercase tracking-wider">
                Updated
              </span>
            </div>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">
              {PRIVACY_META.lastUpdated}
            </span>
          </div>

          {/* Item 2: Standards */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-neue text-xs font-medium uppercase tracking-wider">
                Standards
              </span>
            </div>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">
              GDPR & CCPA Compliant
            </span>
          </div>

          {/* Item 3: Security Protocol */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Lock className="w-3.5 h-3.5" />
              <span className="font-neue text-xs font-medium uppercase tracking-wider">
                Encryption
              </span>
            </div>
            <span className="font-clash text-sm sm:text-base font-semibold text-neutral-950">
              TLS 1.3 & AES-256
            </span>
          </div>

          {/* Item 4: Data Protection Officer */}
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-black/15 transition-all duration-300">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Mail className="w-3.5 h-3.5" />
              <span className="font-neue text-xs font-medium uppercase tracking-wider">
                DPO Direct
              </span>
            </div>
            <a
              href={`mailto:${PRIVACY_META.dpoEmail}`}
              className="font-clash text-sm sm:text-base font-semibold text-neutral-950 hover:text-neutral-600 underline underline-offset-2 transition-colors truncate"
            >
              {PRIVACY_META.dpoEmail}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
