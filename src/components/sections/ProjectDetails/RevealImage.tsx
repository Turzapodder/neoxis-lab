import React from 'react';

interface RevealImageProps {
  src: string;
  alt: string;
  /** Frame size, rounding and background. */
  className?: string;
}

/** Rounded image frame that wipes open as it scrolls into view, with the image drifting inside it. */
export const RevealImage: React.FC<RevealImageProps> = ({ src, alt, className = '' }) => (
  <div data-reveal-frame className={`relative w-full overflow-hidden bg-neutral-100 ${className}`}>
    <img
      data-parallax
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full scale-[1.15] object-cover object-center"
    />
  </div>
);
