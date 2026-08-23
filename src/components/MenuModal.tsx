import React from 'react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    { number: '01', title: 'Studio', desc: 'About our design philosophy & culture' },
    { number: '02', title: 'Projects', desc: 'Selected works, digital products & case studies' },
    { number: '03', title: 'Services', desc: 'Brand identity, 3D & UI/UX engineering' },
    { number: '04', title: 'Articles / Blog', desc: 'Insights, design perspectives & updates' },
    { number: '05', title: 'Contact', desc: 'Start a new project or say hello' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Dark Frosted Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-xl h-full bg-[#0C0D13]/95 border-l border-white/10 p-8 sm:p-12 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div className="flex items-baseline gap-1">
            <span className="font-clash text-2xl font-bold tracking-tight text-white">
              luvron
            </span>
            <span className="font-clash text-xs font-semibold text-white/80">
              ®
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Navigation Links */}
        <div className="py-10 flex flex-col gap-6">
          {menuItems.map((item) => (
            <a
              key={item.number}
              href="#"
              onClick={onClose}
              className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-clash text-xs text-[#797979] group-hover:text-white transition-colors">
                  {item.number}
                </span>
                <span className="font-clash text-2xl sm:text-3xl font-semibold text-white group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </span>
              </div>
              <span className="hidden sm:inline font-neue text-xs text-[#797979] group-hover:text-white/80 transition-colors">
                {item.desc}
              </span>
            </a>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs font-neue text-[#797979]">
          <div>
            <p className="text-white font-medium">Get in touch</p>
            <p className="mt-1">hello@luvron.design</p>
          </div>
          <div>
            <p className="text-white font-medium">Follow us</p>
            <div className="flex gap-3 mt-1 text-white/70">
              <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
