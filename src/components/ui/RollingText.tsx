import React from 'react';
import { ArrowUpRightIcon } from '@/components/icons/UiIcons';

// Hover effects below are driven by the nearest ancestor with the `group/roll` class
const EASE = 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]';
const ROLL_CLASS = `${EASE} group-hover/roll:-translate-y-full`;
const ARROW_SLOT_CLASS = `absolute inset-0 flex items-center justify-center ${EASE}`;

interface RollingTextProps {
  children: string;
  /** Color of the copy that rolls in on hover. */
  hoverClassName?: string;
}

/** Text that rolls up to a second copy on hover. */
export const RollingText: React.FC<RollingTextProps> = ({ children, hoverClassName = '' }) => (
  <span className="relative h-5 overflow-hidden flex flex-col justify-start">
    <span className={ROLL_CLASS}>{children}</span>
    <span aria-hidden className={`${ROLL_CLASS} ${hoverClassName}`}>
      {children}
    </span>
  </span>
);

interface RollingLinkLabelProps {
  label: string;
  hoverClassName?: string;
  /** Vertical position of the underline drawn on hover. */
  underlineClassName?: string;
}

/**
 * Link label with rolling text, an up-right arrow that slides out as a copy slides in,
 * and an underline drawn on hover. Place inside a `relative` element with `group/roll`.
 */
export const RollingLinkLabel: React.FC<RollingLinkLabelProps> = ({
  label,
  hoverClassName,
  underlineClassName = 'bottom-0',
}) => (
  <>
    <RollingText hoverClassName={hoverClassName}>{label}</RollingText>

    <span aria-hidden className="relative w-4 h-4 overflow-hidden shrink-0">
      <span className={`${ARROW_SLOT_CLASS} group-hover/roll:translate-x-full group-hover/roll:-translate-y-full`}>
        <ArrowUpRightIcon className="w-3.5 h-3.5" />
      </span>
      <span
        className={`${ARROW_SLOT_CLASS} -translate-x-full translate-y-full group-hover/roll:translate-x-0 group-hover/roll:translate-y-0`}
      >
        <ArrowUpRightIcon className="w-3.5 h-3.5" />
      </span>
    </span>

    <span
      aria-hidden
      className={`absolute left-0 w-full h-[1.5px] bg-current scale-x-0 origin-left ${EASE} group-hover/roll:scale-x-100 ${underlineClassName}`}
    />
  </>
);
