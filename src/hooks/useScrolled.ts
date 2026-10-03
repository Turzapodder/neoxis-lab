import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
};

/** Whether the window has scrolled more than `threshold` px down; updates live. SSR-safe. */
export function useScrolled(threshold = 0) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    // Server snapshot: pages render unscrolled; hydration corrects it on the client.
    () => false,
  );
}
