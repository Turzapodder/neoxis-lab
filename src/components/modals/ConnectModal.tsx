import React from 'react';
import { useTransientFlag } from '@/hooks/useTransientFlag';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** How long the "Message Received" confirmation shows before the modal closes. */
const CONFIRMATION_MS = 2000;

const FIELD_CLASS =
  'w-full bg-black/[0.04] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900/40 font-neue transition-colors';
const LABEL_CLASS = 'block font-neue text-xs text-neutral-600 mb-1.5';

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [submitted, showConfirmation] = useTransientFlag(CONFIRMATION_MS);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          source: 'connect_modal',
        }),
      });

      const data = (await res.json().catch(() => null)) as { success?: boolean; error?: string } | null;
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to submit inquiry.');
      }

      showConfirmation(onClose);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Frosted Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#FAFBFD]/95 backdrop-blur-2xl rounded-[28px] p-6 sm:p-8 border border-black/10 shadow-2xl z-10 transition-colors duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div>
            <h3 className="font-clash text-2xl font-bold text-neutral-950">Start A Collab</h3>
            <p className="font-neue text-xs text-neutral-500 mt-0.5">Tell us what you&apos;re cooking up and how we can elevate it</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-neutral-700 transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center text-xl">
              ✓
            </div>
            <h4 className="font-clash text-xl font-semibold text-neutral-950">Inquiry Locked In!</h4>
            <p className="font-neue text-xs text-neutral-500">We&apos;ll review your brief and ping you back within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {error && (
              <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-600 font-neue">
                {error}
              </p>
            )}
            <div>
              <label className={LABEL_CLASS}>Your Name</label>
              <input type="text" name="name" required placeholder="Alex Morgan" className={FIELD_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Email Address</label>
              <input type="email" name="email" required placeholder="alex@example.com" className={FIELD_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Project Scope</label>
              <textarea
                name="message"
                rows={3}
                required
                placeholder="Give us the lowdown — what are you building, your dream launch date, and your target goals?"
                className={`${FIELD_CLASS} resize-none`}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-neutral-950 text-white py-3 rounded-full font-clash font-semibold text-sm hover:bg-neutral-850 transition-all cursor-pointer shadow-lg disabled:opacity-50"
            >
              {submitting ? 'Sending Brief...' : 'Launch Project Inquiry →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
