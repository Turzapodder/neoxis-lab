import React from 'react';
import { SmartImage } from '@/components/ui/SmartImage';

interface RevealImageProps {
  src: string;
  alt: string;
  /** Frame size, rounding and background. */
  className?: string;
  /** Rendered width hint for the responsive image (CSS `sizes`). */
  sizes?: string;
}

/** Rounded image frame that wipes open as it scrolls into view, with the image drifting inside it. */
export const RevealImage: React.FC<RevealImageProps> = ({ src, alt, className = '', sizes = '(min-width: 1024px) 58vw, 100vw' }) => (
  <div data-reveal-frame className={`relative w-full overflow-hidden bg-neutral-100 ${className}`}>
    <SmartImage
      data-parallax
      src={src}
      alt={alt}
      width={1280}
      height={896}
      sizes={sizes}
      className="absolute inset-0 h-full w-full scale-[1.15] object-cover object-center"
    />
  </div>
);
