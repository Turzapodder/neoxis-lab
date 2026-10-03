import { useEffect, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';

/** Only for mouse-like pointers, and only when the visitor has not asked for reduced motion. */
const MAGNETIC_QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)';

/**
 * Pulls `targetRef` toward the pointer while it moves over `areaRef`, springing back on leave.
 * The area should stay still (a wrapper), so its bounds don't shift as the target moves.
 */
export function useMagnetic<A extends HTMLElement, T extends HTMLElement>(
  areaRef: RefObject<A | null>,
  targetRef: RefObject<T | null>,
  strength = 0.3,
) {
  useEffect(() => {
    const area = areaRef.current;
    const target = targetRef.current;
    if (!area || !target || !window.matchMedia(MAGNETIC_QUERY).matches) return;

    const xTo = gsap.quickTo(target, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(target, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

    const handleMove = (event: PointerEvent) => {
      const rect = area.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    area.addEventListener('pointermove', handleMove);
    area.addEventListener('pointerleave', handleLeave);
    return () => {
      area.removeEventListener('pointermove', handleMove);
      area.removeEventListener('pointerleave', handleLeave);
      gsap.killTweensOf(target);
      gsap.set(target, { x: 0, y: 0 });
    };
  }, [areaRef, targetRef, strength]);
}
