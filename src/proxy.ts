import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Next.js 16 "proxy" (the new name for middleware).
 * Runs before every matched request at the edge of the app:
 *
 * - /api/admin/**  → 401 JSON when the ACCESS token is missing/expired
 *   (the client silently calls /api/admin/refresh and retries — the refresh
 *   cookie itself must never be usable against these routes directly).
 * - /admin/**      → redirect to /admin/login only when NEITHER an access
 *   token NOR a refresh cookie is present. A valid refresh cookie lets the
 *   page through; the client re-establishes the access token without a
 *   login screen.
 *
 * Access-token verification mirrors src/server/auth.ts: HMAC-SHA256 over a
 * base64url payload with an expiry check. Dependency-free (edge runtime).
 */

const ACCESS_COOKIE = 'neoxis_admin_at';
const REFRESH_COOKIE = 'neoxis_admin_rt';
const PUBLIC_API_PATHS = new Set(['/api/admin/login', '/api/admin/logout', '/api/admin/refresh']);
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

const getSecret = (): string =>
  process.env.AUTH_SECRET || 'insecure-dev-secret-do-not-use-in-prod';

const sign = (payload: string): string =>
  createHmac('sha256', getSecret()).update(payload).digest('base64url');

interface SessionPayload {
  sub: string;
  exp: number;
  fam: string;
}

function verifyAccessToken(token: string | undefined): boolean {
  if (!token) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;

  const expected = Buffer.from(sign(encoded));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SessionPayload;
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccess = verifyAccessToken(request.cookies.get(ACCESS_COOKIE)?.value);
  const hasRefresh = Boolean(request.cookies.get(REFRESH_COOKIE)?.value);

  // Open API endpoints (login/logout/refresh) pass through untouched.
  if (PUBLIC_API_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin')) {
    if (hasAccess) return NextResponse.next();
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (pathname.startsWith('/admin')) {
    // The login page must stay reachable without a session.
    if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
      // Fully authenticated user? Skip the login form. A user with only a
      // refresh cookie sees the form — their tokens were likely revoked.
      if (hasAccess && pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }
    if (hasAccess || hasRefresh) return NextResponse.next();

    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
