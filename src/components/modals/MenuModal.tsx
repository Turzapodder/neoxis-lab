import React from 'react';
import { CloseIcon } from '@/components/icons/UiIcons';
import { Link } from '@/components/ui/Link';
import { sectionPath } from '@/constants/routes';
import { CONTACT_EMAIL } from '@/data/company';
import { MENU_ITEMS, MENU_LEGAL_LINKS, MENU_SOCIAL_LINKS } from '@/data/navigation';
import type { MenuItem } from '@/types/content';

const ITEM_CLASS =
  'group flex items-baseline justify-between py-2 border-b border-black/5 hover:border-black/20 transition-colors text-left cursor-pointer';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Numbered menu row; opens its landing section, or only closes the menu when it has none. */
const MenuRow: React.FC<{ item: MenuItem; onClose: () => void }> = ({ item, onClose }) => {
  const content = (
    <>
      <div className="flex items-baseline gap-4">
        <span className="font-clash text-xs text-neutral-400 group-hover:text-neutral-900 transition-colors">
          {item.number}
        </span>
        <span className="font-clash text-2xl sm:text-3xl font-semibold text-neutral-900 group-hover:translate-x-2 transition-transform duration-300">
          {item.title}
        </span>
      </div>
      <span className="hidden sm:inline font-neue text-xs text-neutral-500 group-hover:text-neutral-900 transition-colors">
        {item.desc}
      </span>
    </>
  );

  return item.target ? (
    <Link to={sectionPath(item.target)} onClick={onClose} className={ITEM_CLASS}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClose} className={ITEM_CLASS}>
      {content}
    </button>
  );
};

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Frosted Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Slide-over Drawer Panel; scrolls natively instead of through Lenis */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-xl h-full bg-[#FAFBFD]/95 border-l border-black/10 p-8 sm:p-12 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-black/10">
          <div className="flex items-baseline gap-1">
            <span className="font-clash text-2xl font-bold tracking-tight text-neutral-900">neoxis</span>
            <span className="font-clash text-xs font-semibold text-neutral-500">®</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center text-neutral-800 transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Navigation Links */}
        <nav className="py-10 flex flex-col gap-6">
          {MENU_ITEMS.map((item) => (
            <MenuRow key={item.number} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* Footer info */}
        <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between gap-4 text-xs font-neue text-neutral-500">
          <div>
            <p className="text-neutral-900 font-medium">Direct line</p>
            <p className="mt-1">{CONTACT_EMAIL}</p>
          </div>
          <div>
            <p className="text-neutral-900 font-medium">Legal</p>
            <div className="flex gap-2.5 mt-1 text-neutral-700">
              {MENU_LEGAL_LINKS.map((link, index) => (
                <React.Fragment key={link.label}>
                  {index > 0 && <span>•</span>}
                  <Link to={link.to} onClick={onClose} className="hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <p className="text-neutral-900 font-medium">Socials</p>
            <div className="flex gap-3 mt-1 text-neutral-700">
              {MENU_SOCIAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-black transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
