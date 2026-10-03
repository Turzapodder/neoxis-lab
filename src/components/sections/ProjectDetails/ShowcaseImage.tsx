import React from 'react';

interface ShowcaseImageProps {
  src: string;
  alt: string;
  /** Frame size, rounding, background and shadow. */
  className?: string;
  /** Hover zoom applied to the image. */
  zoomClassName?: string;
  /** Load right away; for images in the first screen. */
  eager?: boolean;
}

/** Bordered, rounded image frame whose image zooms in on hover. */
export const ShowcaseImage: React.FC<ShowcaseImageProps> = ({
  src,
  alt,
  className = '',
  zoomClassName = 'group-hover:scale-105',
  eager = false,
}) => (
  <div className={`group relative w-full overflow-hidden border border-black/[0.08] ${className}`}>
    <img
      src={src}
      alt={alt}
      loading={eager ? undefined : 'lazy'}
      className={`w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${zoomClassName}`}
    />
  </div>
);
