import { useSyncExternalStore } from 'react';
import { getLocation, subscribe } from '@/lib/router';

/** Current path and hash; updates on client-side navigation and back/forward. */
export function useLocation() {
  return useSyncExternalStore(subscribe, getLocation);
}
