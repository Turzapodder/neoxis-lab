import { useLayoutEffect, type RefObject } from 'react';
import { gsap, SplitText } from '@/lib/gsap';

const QUERIES = {
  motionOk: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 768px)',
} as const;

const EASE_OUT = 'expo.out';

/** ScrollTrigger whose animation progress follows the scrollbar between `start` and `end`. */
const scrubTrigger = (trigger: HTMLElement, start: string, end: string) => ({ trigger, start, end, scrub: true });

/** Tween settings for a scroll-scrubbed effect. */
const scrubbed = (trigger: HTMLElement, start: string, end: string) => ({
  ease: 'none',
  scrollTrigger: scrubTrigger(trigger, start, end),
});

/**
 * Motion for the case study page, opted into with data attributes inside `scopeRef`:
 * - `data-hero-media`, `data-hero-title`, `data-hero-facts`: page-load intro. The image settles
 *   from a zoom, title lines rise out of masks, then the facts follow. Elements also marked
 *   `data-intro` are hidden by CSS until this runs.
 * - `data-scrub-words`: words ink in from faint to full as the text scrolls through view.
 * - `data-reveal-frame`: image frames wipe open from the bottom.
 * - `data-parallax`: images drift inside their frames (desktop only).
 * - `data-goal-row`: the row's `data-goal-line` draws across and its `data-goal-text` inks in.
 * - `data-pop`: scales in once when scrolled to.
 * - `data-split-chars`: characters rise in one after another when scrolled to.
 *
 * Scroll effects are scrubbed, so they reverse when scrolling back up. Nothing runs for visitors
 * who prefer reduced motion: the page then renders in its final, static state.
 */
export function useProjectPageAnimation<T extends HTMLElement>(scopeRef: RefObject<T | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia(scope);

    mm.add(QUERIES, (context) => {
      const { motionOk, desktop } = context.conditions ?? {};
      if (!motionOk) return;

      const q = (selector: string) => Array.from(scope.querySelectorAll<HTMLElement>(selector));

      // Page-load intro
      gsap.set(q('[data-intro]'), { opacity: 1 });
      gsap.from(q('[data-hero-media]'), { scale: 1.18, duration: 1.8, ease: EASE_OUT });
      q('[data-hero-title]').forEach((title) => {
        SplitText.create(title, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          // Returned so a re-split (resize, font load) keeps the animation's progress
          onSplit: (split) =>
            gsap.from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.12, delay: 0.15, ease: EASE_OUT }),
        });
      });
      gsap.from(q('[data-hero-facts] > *'), {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        delay: 0.6,
        ease: EASE_OUT,
      });

      // Hero image drifts down as the page scrolls away from it
      if (desktop) {
        q('[data-hero-media]').forEach((media) => {
          gsap.to(media.querySelector('img'), { yPercent: 12, ...scrubbed(media, 'top top', 'bottom top') });
        });
      }

      q('[data-scrub-words]').forEach((text) => {
        const split = SplitText.create(text, { type: 'words' });
        gsap.fromTo(split.words, { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ...scrubbed(text, 'top 85%', 'bottom 55%') });
      });

      q('[data-reveal-frame]').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(35% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ...scrubbed(frame, 'top 95%', 'top 50%') },
        );
      });

      if (desktop) {
        q('[data-parallax]').forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -6 },
            { yPercent: 6, ...scrubbed(image.parentElement ?? image, 'top bottom', 'bottom top') },
          );
        });
      }

      q('[data-goal-row]').forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: scrubTrigger(row, 'top 80%', 'top 50%') });
        tl.fromTo(row.querySelector('[data-goal-line]'), { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
        tl.fromTo(row.querySelectorAll('[data-goal-text]'), { opacity: 0.25 }, { opacity: 1, ease: 'none' }, 0);
      });

      q('[data-pop]').forEach((el) => {
        gsap.from(el, {
          scale: 0.6,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });

      q('[data-split-chars]').forEach((heading) => {
        const split = SplitText.create(heading, { type: 'chars', mask: 'chars' });
        gsap.from(split.chars, {
          yPercent: 100,
          duration: 0.9,
          stagger: 0.03,
          ease: EASE_OUT,
          scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
    });

    return () => mm.revert();
  }, [scopeRef]);
}
