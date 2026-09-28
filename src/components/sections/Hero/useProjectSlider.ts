import { useCallback, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/** Below Tailwind's `sm` breakpoint the slider shows one card per step. */
const MOBILE_QUERY = '(max-width: 639px)';

/**
 * Slider position for the hero project cards.
 * Mobile steps one card at a time (3 positions); desktop shows two cards (2 positions).
 * The track offset is pure CSS, so it stays correct across resizes without measuring.
 */
export function useProjectSlider() {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const maxPos = isMobile ? 2 : 1;

  const [rawPos, setRawPos] = useState(0);
  const pos = Math.min(maxPos, rawPos);

  // Mobile: one 82vw card + 12px gap per step.
  // Desktop: half the track + 10px, which lands exactly on the second card pair.
  let trackTransform = 'translateX(0px)';
  if (pos > 0) {
    trackTransform = isMobile ? `translateX(calc(${pos} * (-82vw - 12px)))` : 'translateX(calc(-50% - 10px))';
  }

  const moveRight = useCallback(() => setRawPos(Math.min(maxPos, pos + 1)), [maxPos, pos]);
  const moveLeft = useCallback(() => setRawPos(Math.max(0, pos - 1)), [pos]);

  /** Clicking a peeking card moves the slider toward it. */
  const focusCard = (index: number) => {
    if (index > pos && pos < maxPos) moveRight();
    else if (index < pos && pos > 0) moveLeft();
  };

  const toggle = () => (pos === 0 ? moveRight() : moveLeft());

  return { pos, maxPos, trackTransform, moveLeft, moveRight, focusCard, toggle };
}
