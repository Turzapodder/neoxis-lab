import React, { useState } from 'react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Frosted Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#FAFBFD]/95 dark:bg-[#0E0F16]/95 backdrop-blur-2xl rounded-[28px] p-6 sm:p-8 border border-black/10 dark:border-white/20 shadow-2xl z-10 transition-colors duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
          <div>
            <h3 className="font-clash text-2xl font-bold text-neutral-950 dark:text-white">Let&apos;s Connect</h3>
            <p className="font-neue text-xs text-neutral-500 dark:text-[#9E9E9E] mt-0.5">
              Tell us about your project vision
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-neutral-700 dark:text-white transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl">
              ✓
            </div>
            <h4 className="font-clash text-xl font-semibold text-neutral-950 dark:text-white">Message Received</h4>
            <p className="font-neue text-xs text-neutral-500 dark:text-[#9E9E9E]">We will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block font-neue text-xs text-neutral-600 dark:text-[#9E9E9E] mb-1.5">Your Name</label>
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                className="w-full bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900/40 dark:focus:border-white/40 font-neue transition-colors"
              />
            </div>
            <div>
              <label className="block font-neue text-xs text-neutral-600 dark:text-[#9E9E9E] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                className="w-full bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900/40 dark:focus:border-white/40 font-neue transition-colors"
              />
            </div>
            <div>
              <label className="block font-neue text-xs text-neutral-600 dark:text-[#9E9E9E] mb-1.5">Project Scope</label>
              <textarea
                rows={3}
                required
                placeholder="We're looking to build a new brand identity and digital experience..."
                className="w-full bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900/40 dark:focus:border-white/40 font-neue resize-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-neutral-950 dark:bg-white text-white dark:text-black py-3 rounded-full font-clash font-semibold text-sm hover:bg-neutral-850 dark:hover:bg-white/90 transition-all cursor-pointer shadow-lg"
            >
              Send Inquiry →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
