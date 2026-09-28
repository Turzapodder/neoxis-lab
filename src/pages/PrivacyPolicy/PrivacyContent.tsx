import React, { useState, useEffect } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Info,
  Printer,
  Search,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import {
  PRIVACY_SECTIONS,
  PRIVACY_META,
  SUB_PROCESSORS,
} from '@/data/privacyData';

interface PrivacyContentProps {
  onOpenConnectModal?: () => void;
}

export const PrivacyContent: React.FC<PrivacyContentProps> = ({ onOpenConnectModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState(PRIVACY_SECTIONS[0].id);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter sections based on search query
  const filteredSections = PRIVACY_SECTIONS.filter((section) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(q) ||
      section.tldr.toLowerCase().includes(q) ||
      section.content.some((p) => p.toLowerCase().includes(q)) ||
      section.bullets?.some((b) => b.toLowerCase().includes(q))
    );
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = PRIVACY_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(PRIVACY_SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSectionId(PRIVACY_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSectionId(id);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section className="relative w-full pb-20 sm:pb-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Interactive Tools Bar: Search + Print + Copy */}
        <div className="rounded-[24px] bg-white/90 backdrop-blur-xl border border-black/[0.08] p-4 sm:p-5 mb-10 sm:mb-14 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04)]">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search policy (e.g., cookies, GDPR, sub-processors)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-neutral-100/80 border border-transparent focus:border-black/20 focus:bg-white text-xs sm:text-sm font-neue text-neutral-900 placeholder:text-neutral-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-clash"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:border-black/25 bg-white text-neutral-700 hover:text-neutral-950 text-xs sm:text-sm font-clash font-medium transition-all shadow-sm cursor-pointer select-none"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Policy</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:border-black/25 bg-white text-neutral-700 hover:text-neutral-950 text-xs sm:text-sm font-clash font-medium transition-all shadow-sm cursor-pointer select-none"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Share Policy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Split: Sticky Sidebar (Left) + Content Clauses (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT SIDEBAR: Table of Contents & Privacy Highlights */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* Table of Contents Card */}
            <div className="rounded-[24px] sm:rounded-[28px] bg-white/85 backdrop-blur-xl border border-black/[0.08] p-6 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06]">
                <h3 className="font-clash text-base font-semibold text-neutral-950 uppercase tracking-wide">
                  Policy Sections
                </h3>
                <span className="font-clash text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  {PRIVACY_SECTIONS.length} Sections
                </span>
              </div>

              <nav className="max-h-[380px] overflow-y-auto pr-1 space-y-1 text-xs sm:text-sm font-neue">
                {PRIVACY_SECTIONS.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-neutral-950 text-white font-medium shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-black/[0.03]'
                      }`}
                    >
                      <span className="truncate pr-2">{sec.title}</span>
                      <span
                        className={`font-clash text-xs shrink-0 ${
                          isActive ? 'text-white/80' : 'text-neutral-400'
                        }`}
                      >
                        {sec.number}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Privacy Highlights Card */}
            <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-4 text-xs font-clash font-semibold text-neutral-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Our Privacy Standard</span>
              </div>

              <h4 className="font-clash text-lg font-bold mb-3 tracking-tight">
                Data Protection by Architecture
              </h4>

              <ul className="space-y-2.5 text-xs text-neutral-300 font-neue">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Never sold, rented, or brokered to advertising third-parties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Private encrypted GitHub repos & isolated client staging.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Full GDPR, CCPA/CPRA rights fulfilled within 30 days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Mandatory MFA on all internal studio software & clouds.</span>
                </li>
              </ul>
            </div>

            {/* Direct Data Officer Card */}
            <div className="rounded-[24px] sm:rounded-[28px] bg-white/80 backdrop-blur-xl border border-black/[0.08] p-5 shadow-sm text-xs space-y-2">
              <span className="font-clash font-semibold text-neutral-900 uppercase tracking-wide">
                Need a Data Processing Addendum (DPA)?
              </span>
              <p className="font-neue text-neutral-600">
                We provide countersigned EU Standard Contractual Clauses and DPAs for corporate clients.
              </p>
              <a
                href={`mailto:${PRIVACY_META.dpoEmail}?subject=Data%20Processing%20Addendum%20Request`}
                className="inline-block font-clash font-medium text-neutral-950 underline underline-offset-4 hover:text-neutral-600 transition-colors pt-1"
              >
                Request DPA Agreement →
              </a>
            </div>
          </aside>

          {/* RIGHT COLUMN: Policy Content */}
          <main className="lg:col-span-8 space-y-8 sm:space-y-10">
            {filteredSections.length === 0 ? (
              <div className="rounded-[28px] bg-white border border-black/[0.08] p-12 text-center">
                <p className="font-clash text-lg text-neutral-700 font-medium">
                  No policy sections match "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-5 py-2 rounded-full bg-neutral-950 text-white font-clash text-xs font-semibold"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              filteredSections.map((sec) => (
                <article
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 rounded-[28px] sm:rounded-[36px] bg-white/90 backdrop-blur-xl border border-black/[0.08] p-6 sm:p-10 lg:p-12 shadow-[0_15px_45px_-12px_rgba(0,0,0,0.04)] hover:border-black/15 transition-all duration-300"
                >
                  {/* Section Top Bar: Number + TL;DR */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <span className="font-clash text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-neutral-950 text-white tracking-wider">
                      SECTION {sec.number}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100/90 px-3.5 py-1 rounded-full font-neue">
                      <span className="font-semibold text-neutral-900">TL;DR:</span>
                      <span className="truncate max-w-[280px] sm:max-w-md">{sec.tldr}</span>
                    </div>
                  </div>

                  {/* Section Title */}
                  <h2 className="font-clash text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-neutral-950 mb-6">
                    {sec.title}
                  </h2>

                  {/* Main Paragraphs */}
                  <div className="space-y-4 text-neutral-600 font-neue text-base sm:text-lg leading-relaxed">
                    {sec.content.map((p, idx) => (
                      <p key={idx} className="whitespace-pre-line">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Bullet Points */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="my-6 space-y-3 pl-1">
                      {sec.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-base font-neue leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Subsections */}
                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-black/[0.06] space-y-6">
                      {sec.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                          <h4 className="font-clash text-base sm:text-lg font-semibold text-neutral-950">
                            {sub.title}
                          </h4>
                          <p className="font-neue text-sm sm:text-base text-neutral-600 leading-relaxed">
                            {sub.description}
                          </p>
                          {sub.list && (
                            <ul className="pl-3 mt-2 space-y-2">
                              {sub.list.map((item, lIdx) => (
                                <li key={lIdx} className="text-xs sm:text-sm text-neutral-700 font-neue list-disc leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SPECIAL SECTION: Sub-processors Table (rendered for Section 06) */}
                  {sec.id === 'subprocessors' && (
                    <div className="mt-8 space-y-4">
                      <h4 className="font-clash text-base font-semibold text-neutral-950 uppercase tracking-wide">
                        Verified Studio Sub-processors
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SUB_PROCESSORS.map((sp) => (
                          <div
                            key={sp.name}
                            className="rounded-[20px] bg-neutral-50/80 border border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between gap-3 hover:bg-neutral-50 transition-colors"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-clash text-base font-bold text-neutral-950">
                                  {sp.name}
                                </span>
                                <span className="text-[11px] font-clash px-2 py-0.5 rounded-full bg-neutral-200/80 text-neutral-700">
                                  {sp.category}
                                </span>
                              </div>
                              <p className="font-neue text-xs text-neutral-600 leading-relaxed mt-2">
                                {sp.purpose}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] text-[11px] font-neue text-neutral-500">
                              <span>Location: {sp.location}</span>
                              <a
                                href={sp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-clash font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                              >
                                <span>Policy</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Callout Box */}
                  {sec.callout && (
                    <div className="mt-8 rounded-[20px] bg-neutral-50 border border-black/[0.08] p-5 sm:p-6 flex items-start gap-4">
                      {sec.callout.type === 'important' && (
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      {sec.callout.type === 'highlight' && (
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {sec.callout.type === 'info' && (
                        <Info className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
                      )}

                      <div className="space-y-1 text-xs sm:text-sm">
                        <p className="font-clash font-bold text-neutral-950 uppercase tracking-wide">
                          {sec.callout.title}
                        </p>
                        <p className="font-neue text-neutral-600 leading-relaxed">
                          {sec.callout.message}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              ))
            )}

            {/* Bottom Collaborative Banner */}
            <div className="rounded-[28px] sm:rounded-[36px] bg-neutral-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="space-y-2 max-w-xl">
                <span className="font-clash text-xs uppercase tracking-widest text-neutral-400">
                  Data Subject Rights & Audits
                </span>
                <h3 className="font-clash text-2xl sm:text-3xl font-bold tracking-tight">
                  Have questions about our data or security standards?
                </h3>
                <p className="font-neue text-sm sm:text-base text-neutral-400 leading-relaxed">
                  Our Data Protection Officer is available for compliance questions, security reviews, and client audit questionnaires.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={`mailto:${PRIVACY_META.dpoEmail}`}
                  className="px-7 py-3.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 font-clash text-sm font-semibold tracking-wide transition-all shadow-lg active:scale-95 text-center select-none"
                >
                  Contact DPO
                </a>
                {onOpenConnectModal && (
                  <button
                    type="button"
                    onClick={onOpenConnectModal}
                    className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-clash text-sm font-semibold tracking-wide transition-all active:scale-95 cursor-pointer select-none"
                  >
                    Start a Conversation
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
