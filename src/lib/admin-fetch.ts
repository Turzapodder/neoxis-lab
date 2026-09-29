'use client';

/**
 * Authenticated fetch wrapper for the admin panel.
 *
 * - On any 401 it silently calls /api/admin/refresh once and retries the
 *   original request with the fresh access cookie.
 * - Concurrent callers share a single in-flight refresh (single-flight).
 * - Schedules a proactive refresh ~2 min before access-token expiry so the
 *   user almost never hits the 401 path at all.
 * - If refresh fails (revoked family / expired refresh), redirects to the
 *   login page preserving the current path as ?next=.
 */

const DEFAULT_ACCESS_TTL_MS = 15 * 60 * 1000;

let inFlightRefresh: Promise<boolean> | null = null;
let proactiveTimer: ReturnType<typeof setTimeout> | null = null;

function redirectToLogin(): void {
  if (typeof window === 'undefined') return;
  const next = window.location.pathname + window.location.search;
  const url = `/admin/login?next=${encodeURIComponent(next)}`;
  window.location.assign(url);
}

/** Attempt a silent refresh. Resolves true when a new access token is set. */
export async function refreshAccessToken(): Promise<boolean> {
  // Single-flight: concurrent 401s wait on the same refresh call.
  inFlightRefresh ??= fetch('/api/admin/refresh', { method: 'POST', credentials: 'same-origin' })
    .then(async (res) => {
      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as { accessTtlMs?: number };
        scheduleProactiveRefresh(data.accessTtlMs ?? DEFAULT_ACCESS_TTL_MS);
        return true;
      }
      return false;
    })
    .catch(() => false)
    .finally(() => {
      inFlightRefresh = null;
    });

  return inFlightRefresh;
}

/**
 * Track access-token expiry. Call after login / refresh responses that
 * carry accessTtlMs, or after /me returns accessExpiresAt.
 */
export function scheduleProactiveRefresh(ttlMs: number): void {
  if (typeof window === 'undefined') return;
  if (proactiveTimer) clearTimeout(proactiveTimer);

  // Refresh 2 minutes early (or halfway through very short TTLs).
  const lead = Math.min(2 * 60 * 1000, ttlMs / 2);
  const delay = Math.max(ttlMs - lead, 10_000);

  proactiveTimer = setTimeout(() => {
    void refreshAccessToken().then((ok) => {
      if (!ok) redirectToLogin();
    });
  }, delay);
}

export function cancelProactiveRefresh(): void {
  if (proactiveTimer) {
    clearTimeout(proactiveTimer);
    proactiveTimer = null;
  }
}

/**
 * Fetch with automatic auth recovery:
 *   401 → silent refresh → retry once → on failure, back to login.
 */
export async function adminFetch(input: string, init?: RequestInit): Promise<Response> {
  const doFetch = () =>
    fetch(input, {
      ...init,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    });

  let res = await doFetch();

  if (res.status === 401 && !input.includes('/api/admin/login') && !input.includes('/api/admin/refresh')) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await doFetch();
    } else {
      redirectToLogin();
      // Return a synthetic 401 so callers can bail out of their flow.
      return new Response(JSON.stringify({ error: 'Session expired' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return res;
}
