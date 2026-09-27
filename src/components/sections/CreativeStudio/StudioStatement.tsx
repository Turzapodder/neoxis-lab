import React from 'react';
import { Lottie } from 'lottie-react';
import bouncyArrowData from '@/assets/bouncy-arrow.json';

interface StudioStatementProps {
  /**
   * 'base' is the light layer with the live arrow and CTA.
   * 'overlay' is the dark layer that uses empty spacers in the same positions.
   */
  variant: 'base' | 'overlay';
  imagesRowRef: React.Ref<HTMLDivElement>;
  arrowRef: React.Ref<HTMLDivElement>;
  buttonSlotRef: React.Ref<HTMLDivElement>;
  onWorkWithUsClick?: () => void;
}

const LINE_CLASS = 'flex flex-nowrap whitespace-nowrap items-center justify-center leading-none';
const NEXT_LINE_CLASS = `${LINE_CLASS} mt-2.5 sm:mt-3.5 md:mt-5`;
const SLOT_CLASS =
  'w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22 rounded-xl sm:rounded-2xl md:rounded-3xl bg-transparent shrink-0 overflow-hidden';
const ARROW_SIZE_CLASS = 'w-9 sm:w-14 md:w-20 lg:w-26 h-7 sm:h-11 md:h-16 lg:h-22 mx-1.5 sm:mx-3 shrink-0';

const VARIANT_STYLES = {
  base: {
    text: 'text-[#111111]',
    solution: 'from-[#14151E] via-[#7B2CBF] to-[#D946EF]',
    solutionGlow: 'from-purple-400/25 to-pink-400/25',
  },
  overlay: {
    text: 'text-white',
    solution: 'from-violet-300 via-fuchsia-300 to-pink-400',
    solutionGlow: 'from-violet-500/30 to-fuchsia-500/30',
  },
} as const;

/** "We [images] are a creative / studio ➔ dedicated / to craft a [CTA] solution" headline. */
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
        className={`font-clash font-bold text-[22px] sm:text-[34px] md:text-[52px] lg:text-[76px] xl:text-[98px] leading-[1.2] tracking-[-0.035em] ${styles.text}`}
      >
        {/* LINE 1: We [images] are a creative */}
        <div className={LINE_CLASS}>
          <span>We</span>
          {/* Inline slots that receive the flying project cards */}
          <div
            ref={imagesRowRef}
            className="inline-flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5 mx-2 sm:mx-3 md:mx-4 shrink-0 align-middle py-1 overflow-hidden"
          >
            <div className={SLOT_CLASS} />
            <div className={SLOT_CLASS} />
            <div className={SLOT_CLASS} />
          </div>
          <span>&nbsp;are a creative</span>
        </div>

        {/* LINE 2: studio ➔ dedicated */}
        <div className={NEXT_LINE_CLASS}>
          <span>studio</span>
          {isBase ? (
            <div
              ref={arrowRef}
              className={`relative inline-flex items-center justify-center ${ARROW_SIZE_CLASS} align-middle transition-transform duration-300 hover:scale-110 cursor-pointer overflow-hidden group`}
            >
              <div className="w-full h-full -rotate-90 flex items-center justify-center pointer-events-none scale-[1.7] sm:scale-[1.9] md:scale-[2.2]">
                <Lottie src={bouncyArrowData} loop autoplay className="w-full h-full" />
              </div>
            </div>
          ) : (
            <div ref={arrowRef} className={`${ARROW_SIZE_CLASS} overflow-hidden align-middle inline-flex`} />
          )}
          <span>&nbsp;dedicated</span>
        </div>

        {/* LINE 3: to craft a [WORK WITH US] solution */}
        <div className={NEXT_LINE_CLASS}>
          <span>to craft a</span>
          {isBase ? (
            <div ref={buttonSlotRef} className="relative inline-flex items-center shrink-0 mx-2 sm:mx-3 md:mx-4 overflow-hidden">
              <button
                onClick={onWorkWithUsClick}
                className="relative inline-flex items-center justify-center px-4 sm:px-6 md:px-8 h-8 sm:h-11 md:h-14 lg:h-16 rounded-full bg-gradient-to-r from-[#D73827] to-[#E34E39] text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-neue font-bold uppercase tracking-wider shrink-0 align-middle hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap overflow-hidden border border-white/25 shadow-lg"
              >
                WORK WITH US
              </button>
            </div>
          ) : (
            <div
              ref={buttonSlotRef}
              className="h-8 sm:h-11 md:h-14 lg:h-16 mx-2 sm:mx-3 md:mx-4 shrink-0 overflow-hidden align-middle inline-flex"
            />
          )}
          <span>&nbsp;</span>
          <span className="relative inline-block">
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${styles.solution}`}>solution</span>
            <span className={`absolute inset-0 bg-gradient-to-r blur-2xl -z-10 pointer-events-none ${styles.solutionGlow}`} />
          </span>
        </div>
      </h2>
    </div>
  );
};
