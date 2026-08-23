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
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg glass-panel rounded-[28px] p-6 sm:p-8 border border-white/20 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="font-clash text-2xl font-bold text-white">Let&apos;s Connect</h3>
            <p className="font-neue text-xs text-[#9E9E9E] mt-0.5">
              Tell us about your project vision
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl">
              ✓
            </div>
            <h4 className="font-clash text-xl font-semibold text-white">Message Received</h4>
            <p className="font-neue text-xs text-[#9E9E9E]">We will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block font-neue text-xs text-[#9E9E9E] mb-1.5">Your Name</label>
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40 font-neue"
              />
            </div>
            <div>
              <label className="block font-neue text-xs text-[#9E9E9E] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40 font-neue"
              />
            </div>
            <div>
              <label className="block font-neue text-xs text-[#9E9E9E] mb-1.5">Project Scope</label>
              <textarea
                rows={3}
                required
                placeholder="We're looking to build a new brand identity and digital experience..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40 font-neue resize-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-white text-black py-3 rounded-full font-clash font-semibold text-sm hover:bg-white/90 transition-all cursor-pointer shadow-lg"
            >
              Send Inquiry →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
