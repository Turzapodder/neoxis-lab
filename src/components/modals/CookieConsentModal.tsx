"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

/**
 * First-visit cookie consent modal.
 * Shows once until the visitor makes a choice; the decision is stored in
 * localStorage so returning visitors never see it again. Clear the
 * `neoxis-cookie-consent` key to see it again during development.
 */

const STORAGE_KEY = 'neoxis-cookie-consent';

interface StoredConsent {
  choice: 'accepted' | 'declined';
  date: string;
}

const readConsent = (): StoredConsent | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredConsent) : null;
  } catch {
    return null;
  }
};

export const CookieConsentModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Show once for first-time visitors (deferred past hydration).
  useEffect(() => {
    if (readConsent()) return;
    const timer = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback((choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, date: new Date().toISOString() } satisfies StoredConsent),
      );
    } catch {
      /* storage unavailable — just hide */
    }
    setLeaving(true);
    setTimeout(() => setVisible(false), 320);
  }, []);

  // Stable ref so the keydown handler always sees the latest close.
  const closeRef = useRef(close);
  closeRef.current = close;

  // Focus management + Escape-to-close while visible.
  useEffect(() => {
    if (!visible) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => {
      cardRef.current?.querySelector<HTMLElement>('button')?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeRef.current('declined');
        return;
      }
      if (event.key !== 'Tab' || !cardRef.current) return;
      const focusables = cardRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none"
    >
      {/* Dim backdrop (click = decline) */}
      <div
        onClick={() => close('declined')}
        className={`pointer-events-auto absolute inset-0 bg-black/55 backdrop-blur-md transition-opacity duration-300 ${
          leaving ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Card */}
      <div
        ref={cardRef}
        className={`pointer-events-auto relative w-full max-w-md rounded-[24px] bg-white/95 backdrop-blur-2xl border border-black/10 shadow-2xl p-6 sm:p-7 transition-all duration-300 ${
          leaving ? 'opacity-0 translate-y-6 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        {/* Icon badge */}
        <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shadow-lg mb-4">
          <Cookie className="w-6 h-6" strokeWidth={1.8} />
        </div>

        <h3 className="font-clash text-xl font-bold text-neutral-950 tracking-tight">
          We use cookies
        </h3>
        <p className="font-neue text-sm text-neutral-600 leading-relaxed mt-2">
          We use cookies to analyze traffic, remember your preferences, and make the site feel
          effortless. You can change your mind anytime.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-5">
          <button
            type="button"
            onClick={() => close('accepted')}
            className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white py-2.5 px-5 rounded-full font-clash font-semibold text-sm shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => close('declined')}
            className="flex-1 bg-black/[0.05] hover:bg-black/10 border border-black/10 text-neutral-900 py-2.5 px-5 rounded-full font-clash font-medium text-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            Decline
          </button>
        </div>

        <p className="font-neue text-[11px] text-neutral-400 mt-4 text-center">
          By continuing you agree to our{' '}
          <Link href="/" className="underline underline-offset-2 hover:text-neutral-700">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
