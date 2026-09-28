/**
 * Vite returned plain URL strings for static asset imports; Next.js/Turbopack
 * returns `{ src, width, height }` static image objects. Every data file and
 * component consumes plain `string` URLs, so unwrap once at the boundary.
 */
interface StaticImage {
  src: string;
}

export const asset = (image: string | StaticImage): string =>
  typeof image === 'string' ? image : image.src;
