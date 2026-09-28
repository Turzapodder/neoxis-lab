import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Next.js 16 "proxy" (the new name for middleware).
 * Runs before every matched request at the edge of the app:
 *
 * - /admin/**        → redirect to /admin/login when no valid session cookie
 * - /api/admin/**    → 401 JSON when no valid session cookie
 *   (except /api/admin/login and /api/admin/logout, which must stay open)
 *
 * Session verification mirrors src/server/auth.ts: HMAC-SHA256 over a
 * base64url payload with an expiry check. Kept dependency-free so it can
 * run in the middleware runtime.
 */

const SESSION_COOKIE = 'neoxis_admin_session';
const PUBLIC_API_PATHS = new Set(['/api/admin/login', '/api/admin/logout']);
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

const getSecret = (): string =>
  process.env.AUTH_SECRET || 'insecure-dev-secret-do-not-use-in-prod';

const sign = (payload: string): string =>
  createHmac('sha256', getSecret()).update(payload).digest('base64url');

interface SessionPayload {
  sub: string;
  exp: number;
}

function verifySessionToken(token: string | undefined): boolean {
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
  const authenticated = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  // Open API endpoints (login/logout) pass through untouched.
  if (PUBLIC_API_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin')) {
    if (authenticated) return NextResponse.next();
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (pathname.startsWith('/admin')) {
    // The login page must stay reachable without a session.
    if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
      // Already signed in? Skip the login form.
      if (authenticated && pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }
    if (authenticated) return NextResponse.next();
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
