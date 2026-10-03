import { ROUTES } from '@/constants/routes';
import { scrollToSection, scrollToTop } from '@/utils/scroll';

export interface RouterLocation {
  pathname: string;
  hash: string;
}

export type Route =
  | { name: 'home' }
  | { name: 'project'; projectId?: string }
  | { name: 'terms' }
  | { name: 'privacy' };

/** Short paths that open the same page as a canonical one. */
const PATH_ALIASES: Record<string, string> = {
  '/terms': ROUTES.terms,
  '/privacy': ROUTES.privacy,
};

const PROJECT_PATTERN = /^\/project(?:\/([^/]+))?$/;

/** Lowercases, drops trailing slashes and resolves aliases, so paths to the same page compare equal. */
const normalizePath = (pathname: string) => {
  const path = pathname.toLowerCase().replace(/\/+$/, '') || ROUTES.home;
  return PATH_ALIASES[path] ?? path;
};

/** Maps a normalized path to a page. Unknown paths show the landing page. */
export const resolveRoute = (pathname: string): Route => {
  if (pathname === ROUTES.terms) return { name: 'terms' };
  if (pathname === ROUTES.privacy) return { name: 'privacy' };

  const project = PROJECT_PATTERN.exec(pathname);
  if (project) return { name: 'project', projectId: project[1] };

  return { name: 'home' };
};

const readLocation = (): RouterLocation => ({
  pathname: normalizePath(window.location.pathname),
  hash: window.location.hash,
});

// One snapshot shared by all subscribers; replaced on change so React sees a new value.
let current = readLocation();
const listeners = new Set<() => void>();

const sync = () => {
  const next = readLocation();
  if (next.pathname === current.pathname && next.hash === current.hash) return;
  current = next;
  listeners.forEach((listener) => listener());
};

export const getLocation = () => current;

/** Notifies `listener` after `navigate` and after back/forward. */
export const subscribe = (listener: () => void) => {
  if (listeners.size === 0) window.addEventListener('popstate', sync);
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener('popstate', sync);
  };
};

/**
 * Client-side navigation. A link into the current page scrolls there without a history entry;
 * a link to another page pushes one, and `useNavigationScroll` positions the new page.
 */
export const navigate = (to: string) => {
  const url = new URL(to, window.location.href);

  if (normalizePath(url.pathname) === current.pathname) {
    const sectionId = url.hash.slice(1);
    if (sectionId) scrollToSection(sectionId);
    else scrollToTop();
    return;
  }

  window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
  sync();
};
