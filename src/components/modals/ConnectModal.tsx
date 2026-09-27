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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showConfirmation(onClose);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Frosted Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#FAFBFD]/95 backdrop-blur-2xl rounded-[28px] p-6 sm:p-8 border border-black/10 shadow-2xl z-10 transition-colors duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div>
            <h3 className="font-clash text-2xl font-bold text-neutral-950">Let&apos;s Connect</h3>
            <p className="font-neue text-xs text-neutral-500 mt-0.5">Tell us about your project vision</p>
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
            <h4 className="font-clash text-xl font-semibold text-neutral-950">Message Received</h4>
            <p className="font-neue text-xs text-neutral-500">We will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className={LABEL_CLASS}>Your Name</label>
              <input type="text" required placeholder="Alex Morgan" className={FIELD_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Email Address</label>
              <input type="email" required placeholder="alex@example.com" className={FIELD_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Project Scope</label>
              <textarea
                rows={3}
                required
                placeholder="We're looking to build a new brand identity and digital experience..."
                className={`${FIELD_CLASS} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-neutral-950 text-white py-3 rounded-full font-clash font-semibold text-sm hover:bg-neutral-850 transition-all cursor-pointer shadow-lg"
            >
              Send Inquiry →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
