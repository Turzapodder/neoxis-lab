import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StudioStatementProps {
  /**
   * 'base' is the light layer; 'overlay' is the dark layer that wipes up over it.
   * Both render the same elements at the same sizes so the text lines up throughout the wipe.
   */
  variant: 'base' | 'overlay';
  imagesRowRef: React.Ref<HTMLDivElement>;
  arrowRef: React.Ref<HTMLDivElement>;
  buttonSlotRef: React.Ref<HTMLDivElement>;
  onWorkWithUsClick?: () => void;
}

const LINE_CLASS = 'flex flex-nowrap whitespace-nowrap items-center justify-center leading-none';
const NEXT_LINE_CLASS = `${LINE_CLASS} mt-2.5 sm:mt-3.5 md:mt-5`;
/** Square size shared by the card slots and the arrow circle. */
const SQUARE_CLASS = 'w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22';
const SLOT_CLASS = `${SQUARE_CLASS} rounded-xl sm:rounded-2xl md:rounded-3xl shrink-0 overflow-hidden`;
/** Gap before each inline object equals one word space, so both sides of it look even. */
const INLINE_GAP = 'ml-[0.26em]';

const VARIANT_STYLES = {
  base: {
    text: 'text-neutral-950',
    // ~3.4:1 on the light canvas, above the 3:1 minimum for large text
    muted: 'text-[#8B8B8B]',
    arrow: 'border-neutral-950 text-neutral-950',
    button: 'bg-neutral-950 text-white hover:bg-neutral-800',
    buttonIcon: 'bg-white text-neutral-950',
  },
  overlay: {
    text: 'text-white',
    muted: 'text-neutral-400',
    arrow: 'border-white text-white',
    button: 'bg-white text-neutral-950',
    buttonIcon: 'bg-neutral-950 text-white',
  },
} as const;

/** "We [cards] are a creative / studio (→) dedicated / to craft a [Work with us] solution". */
export const StudioStatement: React.FC<StudioStatementProps> = ({
  variant,
  imagesRowRef,
  arrowRef,
  buttonSlotRef,
  onWorkWithUsClick,
}) => {
  const styles = VARIANT_STYLES[variant];
  const isBase = variant === 'base';

  return (
    <div className="relative z-10 max-w-[1400px] w-full mx-auto text-center">
      <h2
        className={`font-clash font-bold text-[22px] sm:text-[34px] md:text-[clamp(40px,5.6vw,56px)] lg:text-[clamp(56px,5.7vw,76px)] xl:text-[clamp(80px,6.6vw,98px)] leading-[1.2] tracking-[-0.015em] [word-spacing:0.14em] ${styles.text}`}
      >
        {/* LINE 1: We [cards] build iconic */}
        <div className={LINE_CLASS}>
          <span>We</span>
          {/* Slots that receive the flying project cards */}
          <div
            ref={imagesRowRef}
            className={`inline-flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5 ${INLINE_GAP} shrink-0 align-middle py-1 overflow-hidden`}
          >
            <div className={SLOT_CLASS} />
            <div className={SLOT_CLASS} />
            <div className={SLOT_CLASS} />
          </div>
          <span>&nbsp;build iconic</span>
        </div>

        {/* LINE 2: digital (→) experiences */}
        <div className={NEXT_LINE_CLASS}>
          <span>digital</span>
          <div
            ref={arrowRef}
            className={`relative inline-flex items-center justify-center ${SQUARE_CLASS} ${INLINE_GAP} shrink-0 align-middle rounded-full border-2 overflow-hidden ${styles.arrow}`}
          >
            <ArrowRight
              aria-hidden
              strokeWidth={2.25}
              className="w-[42%] h-[42%] animate-[arrow-nudge_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
            />
          </div>
          <span className={styles.muted}>&nbsp;experiences</span>
        </div>

        {/* LINE 3: engineered for [Build with us] scale */}
        <div className={NEXT_LINE_CLASS}>
          <span className={styles.muted}>engineered for</span>
          <div ref={buttonSlotRef} className={`relative inline-flex items-center shrink-0 ${INLINE_GAP} overflow-hidden`}>
            <button
              type="button"
              onClick={isBase ? onWorkWithUsClick : undefined}
              tabIndex={isBase ? undefined : -1}
              className={`group/cta inline-flex items-center gap-2 sm:gap-3 h-8 sm:h-11 md:h-14 lg:h-16 pl-3 sm:pl-5 md:pl-6 pr-1 sm:pr-1.5 rounded-full font-neue font-medium text-[10px] sm:text-xs md:text-sm lg:text-base tracking-normal [word-spacing:normal] whitespace-nowrap transition-colors active:scale-95 ${styles.button}`}
            >
              Build with us
              <span className={`h-6 sm:h-8 md:h-11 lg:h-13 aspect-square rounded-full flex items-center justify-center ${styles.buttonIcon}`}>
                <ArrowRight aria-hidden className="w-[45%] h-[45%] transition-transform group-hover/cta:translate-x-0.5" />
              </span>
            </button>
          </div>
          <span className={styles.muted}>&nbsp;scale</span>
        </div>
      </h2>
    </div>
  );
};
