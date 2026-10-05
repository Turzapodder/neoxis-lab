import React from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { SectionTag } from '@/components/ui/SectionTag';
import { AVAILABILITY, CONTACT_EMAIL } from '@/data/company';
import { TEAM_AVATARS } from '@/data/team';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { ContactForm } from './ContactForm';

interface ContactSectionProps {
  onBookCallClick?: () => void;
}

const CHANNEL_CLASS = 'group w-full flex items-center justify-between gap-4 py-5 border-b border-white/10 text-left';
const CHANNEL_ICON_CLASS =
  'w-10 h-10 shrink-0 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-neutral-950 transition-colors';

/** Dark framed contact card: headline and direct channels on the left, guided form on the right. */
export const ContactSection: React.FC<ContactSectionProps> = ({ onBookCallClick }) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section className="relative w-full bg-[var(--color-canvas-bg)] pt-16 sm:pt-24 transition-colors duration-500">
      <div className="p-1.5 sm:p-2">
        <div data-wipe className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-neutral-950 text-white">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 py-14 sm:py-20 lg:py-24">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-12 sm:pb-16">
              <SectionTag tone="light" className="text-white">
                Let&apos;s make history
              </SectionTag>
              {/* <p className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60 motion-reduce:animate-none" />
                  <span className="relative w-2 h-2 rounded-full bg-green-500" />
                </span>
                {AVAILABILITY.status}
              </p> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
              {/* Left: headline and direct channels */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-12">
                <div>
                  <h2 className="font-clash text-[2.5rem] sm:text-6xl lg:text-[2.625rem] xl:text-6xl 2xl:text-7xl font-bold tracking-tight leading-[1.02]">
                    Got a vision?
                    <br />
                    Let&apos;s build it.
                  </h2>
                  <p className="font-neue text-base text-neutral-400 leading-relaxed mt-6 max-w-[360px]">
                    Tell us what you&apos;re cooking up. We&apos;ll get back to you with an honest breakdown and action plan within 24 hours.
                  </p>

                  <div className="mt-10 border-t border-white/10">
                    <button type="button" onClick={() => copy(CONTACT_EMAIL)} className={CHANNEL_CLASS}>
                      <span>
                        <span className="block text-xs text-neutral-500">Direct line</span>
                        <span className="block text-lg sm:text-xl mt-1">{CONTACT_EMAIL}</span>
                      </span>
                      <span className={CHANNEL_ICON_CLASS} aria-hidden>
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </span>
                      <span className="sr-only" aria-live="polite">
                        {copied ? 'Email address copied' : 'Copy email address'}
                      </span>
                    </button>

                    <button type="button" onClick={onBookCallClick} className={CHANNEL_CLASS}>
                      <span>
                        <span className="block text-xs text-neutral-500">Prefer face-to-face?</span>
                        <span className="block text-lg sm:text-xl mt-1">Grab a 15-minute vibe check</span>
                      </span>
                      <span className={CHANNEL_ICON_CLASS} aria-hidden>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {TEAM_AVATARS.contact.map((src) => (
                      <img key={src} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-neutral-950" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-400 leading-tight">
                    <span className="block text-white">Real designers, zero automated bots.</span>
                    {AVAILABILITY.responseTime}
                  </p>
                </div>
              </div>

              {/* Right: guided form */}
              <div className="lg:col-span-7 rounded-[20px] sm:rounded-[24px] bg-white/[0.04] border border-white/[0.06] p-5 sm:p-8 lg:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
