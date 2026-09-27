import React from 'react';
import { Clock, Globe } from 'lucide-react';
import { SectionTag } from '@/components/ui/SectionTag';
import { TEAM_AVATARS } from '@/data/team';
import { ContactForm } from './ContactForm';

const MARQUEE_COPIES = 2;
const MARQUEE_REPEATS = 4;

/** Endless "Contact Us ·" band; two identical halves loop via a -50% translate. */
const ContactMarquee: React.FC = () => (
  <div aria-hidden className="relative overflow-hidden select-none pointer-events-none pb-10 sm:pb-16">
    <div className="flex w-max animate-[contact-marquee_28s_linear_infinite]">
      {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
        <div key={copy} className="flex shrink-0">
          {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
            <span
              key={i}
              className="font-clash font-bold whitespace-nowrap text-6xl sm:text-8xl lg:text-[120px] leading-none tracking-tight pr-8 sm:pr-12 bg-gradient-to-b from-neutral-300 to-neutral-100 bg-clip-text text-transparent"
            >
              Contact Us ·
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const ContactSection: React.FC = () => (
  <section className="relative w-full bg-[var(--color-canvas-bg)] pt-10 sm:pt-16 transition-colors duration-500">
    <ContactMarquee />

    <div className="p-1.5 sm:p-2">
      <div className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-[#161616] text-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="flex flex-col justify-between gap-12">
            <div>
              <SectionTag tone="light" className="mb-4">
                Let's connect with Us
              </SectionTag>
              <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                Have A Project
                <br />
                In Mind?
              </h2>
              <p className="text-xs sm:text-sm text-white/65 max-w-[260px] mt-5 leading-relaxed">
                Tell us about your project whether it's a website, SEO, or marketing.
              </p>

              <ul className="mt-10 max-w-[280px] text-xs sm:text-sm font-medium">
                <li className="flex items-center gap-2.5 pb-4 border-b border-dashed border-white/10">
                  <Clock className="w-4 h-4" />
                  24/7 Full Time Support
                </li>
                <li className="flex items-center gap-2.5 pt-4">
                  <Globe className="w-4 h-4" />
                  Clients Across 12 Countries
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.04] p-4 max-w-[300px]">
              <div className="flex items-center gap-3 pb-3 border-b border-dashed border-white/10">
                <div className="flex -space-x-2.5">
                  {TEAM_AVATARS.contact.map((src) => (
                    <img key={src} src={src} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-[#1d1d1d]" />
                  ))}
                </div>
                <div>
                  <p className="text-sm">Our team</p>
                  <p className="text-[10px] text-white/50">#Creative Squad</p>
                </div>
              </div>
              <p className="flex items-center gap-2 pt-3 text-xs">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
                  <span className="relative w-2 h-2 rounded-full bg-green-500" />
                </span>
                Available for work
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);
