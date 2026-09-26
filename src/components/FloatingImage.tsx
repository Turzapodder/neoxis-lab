import React from 'react';

interface FloatingImageProps {
  src: string;
  alt: string;
  bgColor?: string;
  zIndex?: number;
  className?: string;
}

/**
 * Absolutely-positioned image card used for the floating/docking animation.
 * Position, transforms, and dimensions are driven by GSAP via the forwarded ref.
 */
export const FloatingImage = React.forwardRef<HTMLDivElement, FloatingImageProps>(
  function FloatingImage({ src, alt, bgColor = '#14151B', zIndex = 20, className = '' }, ref) {
    return (
      <div
        ref={ref}
        className={`absolute overflow-hidden rounded-[20px] sm:rounded-[24px] border border-black/10 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] pointer-events-none transition-colors duration-300 ${className}`}
        style={{
          backgroundColor: bgColor,
          zIndex,
          willChange: 'transform, left, top, width, height, opacity, border-radius',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center"
        />
      </div>
    );
  }
);
