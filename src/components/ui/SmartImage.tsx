import React from 'react';
import Image, { type ImageProps } from 'next/image';

/**
 * Remote hosts the Next.js image optimizer may fetch from.
 * Keep in sync with `images.remotePatterns` in next.config.ts.
 */
const OPTIMIZED_HOSTS = new Set(['res.cloudinary.com']);

/**
 * True when next/image can resize and re-encode `src`: site paths without a query
 * string, and https URLs on an allow-listed host. Anything else (an arbitrary URL
 * pasted into the CMS, SVGs, data URLs) is served as-is so it never breaks.
 */
export function isOptimizable(src: string): boolean {
  if (src.startsWith('/') && !src.startsWith('//')) {
    return !src.includes('?') && !src.toLowerCase().endsWith('.svg');
  }
  try {
    const url = new URL(src);
    return url.protocol === 'https:' && OPTIMIZED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export type SmartImageProps = ImageProps;

/**
 * next/image with a safety net for CMS content: responsive AVIF/WebP for known
 * sources, plain passthrough for unknown ones. Lazy-loads by default.
 */
export const SmartImage: React.FC<SmartImageProps> = ({ src, unoptimized, ...props }) => (
  <Image src={src} unoptimized={unoptimized ?? (typeof src === 'string' && !isOptimizable(src))} {...props} />
);
