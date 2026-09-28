import { useCallback, useSyncExternalStore } from 'react';

/** Whether a CSS media query currently matches; updates live. SSR-safe. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    // Server snapshot: assume desktop; hydration corrects it on the client.
    () => false,
  );
}
