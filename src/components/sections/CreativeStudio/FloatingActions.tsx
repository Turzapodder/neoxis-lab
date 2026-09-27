import React from 'react';
import { GridIcon, ShopIcon } from '@/components/icons/UiIcons';

const BUTTON_CLASS =
  'w-10 h-10 rounded-xl shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border';

/** Quick action buttons fixed to the bottom-right edge of the viewport. */
export const FloatingActions: React.FC<{ onInquiryClick?: () => void }> = ({ onInquiryClick }) => (
  <div className="fixed right-5 bottom-8 z-30 flex flex-col gap-2.5 pointer-events-auto">
    <button
      onClick={onInquiryClick}
      className={`${BUTTON_CLASS} bg-neutral-900 text-white border-white/10`}
      aria-label="Shop / Work inquiry"
    >
      <ShopIcon className="w-5 h-5" />
    </button>
    <button className={`${BUTTON_CLASS} bg-white text-neutral-900 border-black/10`} aria-label="Grid view">
      <GridIcon className="w-5 h-5" />
    </button>
  </div>
);
