import React, { useState } from 'react';
import { Clock, Globe, Check } from 'lucide-react';

import kateImg from '../assets/images/team/kate.jpg';
import leoImg from '../assets/images/team/leo.jpg';
import siennaImg from '../assets/images/team/sienna.jpg';
import marcusImg from '../assets/images/team/marcus.jpg';

const BUDGETS = ['< $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '> $20,000'];

export const ContactSection: React.FC = () => {
  const [budget, setBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
    setBudget(null);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section className="relative w-full bg-[var(--color-canvas-bg)] pt-10 sm:pt-16 transition-colors duration-500">
      {/* ========================================================================= */}
      {/* 1. "Contact Us ·" MARQUEE                                                 */}
      {/* ========================================================================= */}
      <div aria-hidden className="relative overflow-hidden select-none pointer-events-none pb-10 sm:pb-16">
        <div className="flex w-max animate-[contact-marquee_28s_linear_infinite]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {Array.from({ length: 4 }).map((_, i) => (
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

      {/* ========================================================================= */}
      {/* 2. DARK CONTACT CARD                                                      */}
      {/* ========================================================================= */}
      <div className="p-1.5 sm:p-2">
        <div className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-[#161616] text-white">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column */}
            <div className="flex flex-col justify-between gap-12">
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  <span className="tracking-wide">Let's connect with Us</span>
                </div>
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
                    {[kateImg, leoImg, siennaImg, marcusImg].map((src) => (
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

            {/* Right column: form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[20px] bg-white text-neutral-950 p-5 sm:p-6 flex flex-col"
            >
              <label className="flex flex-col text-xs font-medium">
                Your Email*
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter the Email"
                  className="mt-3 pb-3 border-b border-neutral-200 text-sm font-normal outline-none placeholder:text-neutral-400 focus:border-neutral-900 transition-colors"
                />
              </label>
              <label className="flex flex-col text-xs font-medium mt-6">
                Your Phone*
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Enter your phone number"
                  className="mt-3 pb-3 border-b border-neutral-200 text-sm font-normal outline-none placeholder:text-neutral-400 focus:border-neutral-900 transition-colors"
                />
              </label>
              <label className="flex flex-col text-xs font-medium mt-6">
                Message
                <textarea
                  name="message"
                  rows={4}
                  className="mt-3 pb-3 border-b border-neutral-200 text-sm font-normal outline-none resize-none focus:border-neutral-900 transition-colors"
                />
              </label>

              <fieldset className="mt-8">
                <legend className="sr-only">Project budget</legend>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={budget === b}
                      onClick={() => setBudget(budget === b ? null : b)}
                      className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                        budget === b
                          ? 'bg-neutral-950 border-neutral-950 text-white'
                          : 'border-neutral-200 text-neutral-800 hover:border-neutral-900'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                className="mt-10 w-full rounded-full bg-neutral-950 text-white py-3.5 text-sm font-medium hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" /> Message sent
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
