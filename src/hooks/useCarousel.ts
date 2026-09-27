import { useCallback, useState } from 'react';

/** Wrap-around index for a carousel of `length` items. */
export function useCarousel(length: number) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (step: number) => setIndex((current) => (current + step + length) % length),
    [length],
  );
  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  /** Index of the item `offset` positions away from the current one. */
  const peek = (offset: number) => (index + offset + length) % length;

  return { index, next, prev, peek };
}
