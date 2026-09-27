import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { heroProjectCardId } from '@/constants/sections';

type ElRef = RefObject<HTMLDivElement | null>;

export interface StudioAnimationRefs {
  section: RefObject<HTMLElement | null>;
  pinContainer: ElRef;
  /** Flying clones of the three hero cards. */
  cards: [ElRef, ElRef, ElRef];
  /** Base (light) layer slots that receive the cards, plus the arrow and CTA. */
  imagesRow: ElRef;
  arrow: ElRef;
  buttonSlot: ElRef;
  /** Dark overlay that wipes up over the base layer. */
  overlay: ElRef;
  overlayImagesRow: ElRef;
  overlayArrow: ElRef;
  overlayButtonSlot: ElRef;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const MOBILE_BREAKPOINT = 768;
const HERO_CARD_COUNT = 3;

/** Position of `el` relative to the pinned container, with a fallback size when it is not laid out. */
const measureRelativeTo = (container: HTMLElement, el: Element | null, defaultW: number, defaultH: number): Box => {
  const pinRect = container.getBoundingClientRect();
  if (!el) {
    return { x: pinRect.width / 2 - defaultW / 2, y: -defaultH, w: defaultW, h: defaultH };
  }
  const r = el.getBoundingClientRect();
  const w = r.width > 10 ? r.width : defaultW;
  const h = r.height > 10 ? r.height : defaultH;
  const maxX = Math.max(0, pinRect.width - w);
  return {
    x: Math.max(0, Math.min(maxX, r.left - pinRect.left)),
    y: r.top - pinRect.top,
    w,
    h,
  };
};

const getHeroCards = () =>
  Array.from({ length: HERO_CARD_COUNT }, (_, i) => document.getElementById(heroProjectCardId(i)));

/**
 * Two-stage scroll animation for the studio statement:
 * 1. Hero cards "fly" into the inline slots of line 1.
 * 2. The section pins while a dark overlay wipes up and the inline slots, arrow and CTA collapse.
 */
export function useStudioScrollAnimation(refs: StudioAnimationRefs) {
  useLayoutEffect(() => {
    const section = refs.section.current;
    const pinContainer = refs.pinContainer.current;
    const imagesRow = refs.imagesRow.current;
    const overlay = refs.overlay.current;
    const overlayImagesRow = refs.overlayImagesRow.current;
    const cards = refs.cards.map((ref) => ref.current);

    if (
      !section ||
      !pinContainer ||
      !imagesRow ||
      !overlay ||
      !overlayImagesRow ||
      !refs.overlayArrow.current ||
      !refs.overlayButtonSlot.current ||
      cards.some((card) => !card)
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // ── 1. Coordinates of hero cards (start) and inline slots (end) ──
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const defaultCardW = isMobile ? Math.min(280, window.innerWidth * 0.75) : 290;
      const defaultCardH = defaultCardW * 0.75;
      const defaultSlotSize = isMobile ? 32 : 64;

      const heroCards = getHeroCards();
      const slots = Array.from(imagesRow.children);
      const starts = heroCards.map((el) => measureRelativeTo(pinContainer, el, defaultCardW, defaultCardH));
      const targets = [0, 1, 2].map((i) =>
        measureRelativeTo(pinContainer, slots[i] ?? null, defaultSlotSize, defaultSlotSize),
      );

      // Floating clones start invisible so they don't cover the hero slider
      cards.forEach((card, i) => {
        gsap.set(card, {
          left: starts[i].x,
          top: starts[i].y,
          width: starts[i].w,
          height: starts[i].h,
          opacity: 0,
          scale: 1,
          borderRadius: '24px',
        });
      });

      gsap.set(overlay, { clipPath: 'inset(100% 0 0 0)' });

      // ── 2. STAGE 1: Flight from hero to line 1 (top 85% → top top) ──
      const flightTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Fade in the floating clones as flight begins
      flightTl.to(cards, { opacity: 1, duration: 0.15, ease: 'power1.out' }, 0);

      // Fade out static hero cards as clones lift off
      const visibleHeroCards = heroCards.filter((el): el is HTMLElement => el !== null);
      if (visibleHeroCards.length > 0) {
        flightTl.to(visibleHeroCards, { opacity: 0, duration: 0.15, ease: 'power1.out' }, 0.1);
      }

      const flightStyles = [
        { rot: -3, shadowGlow: 'rgba(168, 85, 247, 0.35)' },
        { rot: 2, shadowGlow: 'rgba(0, 0, 0, 0.7)' },
        { rot: -1.5, shadowGlow: 'rgba(0, 0, 0, 0.6)' },
      ];

      cards.forEach((card, i) => {
        const target = targets[i];
        const { rot, shadowGlow } = flightStyles[i];

        flightTl.to(
          card,
          {
            left: target.x,
            top: target.y,
            width: target.w,
            height: target.h,
            borderRadius: '1rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            ease: 'power2.inOut',
            duration: 1.0,
          },
          0,
        );
        flightTl.to(
          card,
          {
            scale: 1.04,
            rotate: rot,
            boxShadow: `0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 25px ${shadowGlow}`,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.05,
        );
        flightTl.to(card, { scale: 1.0, rotate: 0, duration: 0.6, ease: 'power2.inOut' }, 0.4);
      });

      // ── 3. STAGE 2: Pinned overlay & sequential collapse ──
      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pinContainer,
          start: 'top top',
          end: () => (window.innerWidth < MOBILE_BREAKPOINT ? '+=1300' : '+=2200'),
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Hold in docked state initially
      pinnedTl.to({}, { duration: 0.2 });

      // Overlay rises from bottom (100%) to top (0%)
      pinnedTl.to(overlay, { clipPath: 'inset(0% 0 0 0)', ease: 'none', duration: 1.0 }, 0.1);

      // Timed to the rising curtain: bottom line collapses first, top line last
      const collapseSequence = [
        {
          targets: [refs.buttonSlot.current, refs.overlayButtonSlot.current],
          props: { width: 0, marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0, opacity: 0 },
          start: 0.32,
          duration: 0.32,
        },
        {
          targets: [refs.arrow.current, refs.overlayArrow.current],
          props: { width: 0, marginLeft: 0, marginRight: 0, opacity: 0 },
          start: 0.5,
          duration: 0.32,
        },
        {
          targets: [...slots, ...Array.from(overlayImagesRow.children)],
          props: { width: 0 },
          start: 0.68,
          duration: 0.32,
        },
        {
          targets: [imagesRow, overlayImagesRow],
          props: { gap: 0, marginLeft: 0, marginRight: 0 },
          start: 0.68,
          duration: 0.32,
        },
        // Floating cards glide & fade as line 1 collapses
        {
          targets: cards,
          props: { opacity: 0, scale: 0.92, x: 50 },
          start: 0.66,
          duration: 0.3,
        },
      ];

      collapseSequence.forEach(({ targets: tweenTargets, props, start, duration }) => {
        const validTargets = tweenTargets.filter(Boolean);
        if (validTargets.length > 0) {
          pinnedTl.to(validTargets, { ...props, ease: 'power2.inOut', duration }, start);
        }
      });

      // Brief final rest hold
      pinnedTl.to({}, { duration: 0.3 });
    }, section);

    return () => ctx.revert();
    // Refs are stable objects; the timeline is built once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
