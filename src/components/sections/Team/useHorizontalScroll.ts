import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { scrollToPosition } from '@/utils/scroll';

interface HorizontalScrollRefs {
  section: RefObject<HTMLElement | null>;
  pinContainer: RefObject<HTMLDivElement | null>;
  track: RefObject<HTMLDivElement | null>;
  viewport: RefObject<HTMLDivElement | null>;
}

/** Extra px scrolled past the last card so it clears the right edge. */
const TRAILING_SPACE = 60;
/** Minimum distance a card keeps from the viewport edges after `revealCard`. */
const EDGE_PADDING = 24;
/** Delay before measuring, so the card's expand transition has started. */
const REVEAL_DELAY_MS = 60;

/**
 * Pins the carousel and translates the card track horizontally as the page scrolls vertically.
 * `revealCard` scrolls the page so a given card sits fully inside the viewport.
 */
export function useHorizontalScroll({ section, pinContainer, track, viewport }: HorizontalScrollRefs) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getScrollDistance = useCallback(() => {
    if (!track.current || !viewport.current) return 0;
    const overflow = track.current.scrollWidth - viewport.current.clientWidth;
    return Math.max(0, overflow + TRAILING_SPACE);
  }, [track, viewport]);

  useLayoutEffect(() => {
    if (!section.current || !pinContainer.current || !track.current || !viewport.current) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track.current, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainer.current,
          // Pin once the container nears the top (after the header scrolls out of view)
          start: 'top top+=20',
          end: () => `+=${Math.max(900, getScrollDistance() * 1.25)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      scrollTriggerRef.current = tween.scrollTrigger ?? null;

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        tween.kill();
        scrollTriggerRef.current = null;
      };
    }, section);

    return () => ctx.revert();
  }, [section, pinContainer, track, viewport, getScrollDistance]);

  useEffect(
    () => () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    },
    [],
  );

  const revealCard = useCallback(
    (card: HTMLElement | null) => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);

      revealTimerRef.current = setTimeout(() => {
        const st = scrollTriggerRef.current;
        const viewportEl = viewport.current;
        const maxDist = getScrollDistance();
        if (!card || !viewportEl || !st || maxDist <= 0) return;

        const cardRect = card.getBoundingClientRect();
        const viewportRect = viewportEl.getBoundingClientRect();

        // Positive when overflowing right, negative when overflowing left
        let overflow = 0;
        if (cardRect.right > viewportRect.right - EDGE_PADDING) {
          overflow = cardRect.right - (viewportRect.right - EDGE_PADDING);
        } else if (cardRect.left < viewportRect.left + EDGE_PADDING) {
          overflow = cardRect.left - (viewportRect.left + EDGE_PADDING);
        }
        if (overflow === 0) return;

        const targetProgress = Math.min(1, Math.max(0, (st.progress ?? 0) + overflow / maxDist));
        scrollToPosition(st.start + targetProgress * (st.end - st.start), 0.6);
      }, REVEAL_DELAY_MS);
    },
    [viewport, getScrollDistance],
  );

  return { revealCard };
}
