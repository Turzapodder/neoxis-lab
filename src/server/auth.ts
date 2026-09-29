import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import type { AdminUser } from './db';
import { hashPassword, verifyPassword } from './password';
import {
  REFRESH_TTL_MS,
  createSessionFamily,
  revokeAllSessionsForUser,
} from './sessions';

/**
 * Admin auth: short-lived stateless access tokens + long-lived rotating
 * refresh tokens stored (hashed) in the database.
 *
 * Access token  — HMAC-SHA256 over a base64url payload, ~15 min TTL. The
 *                 payload carries the user id, the session family id and an
 *                 expiry, so API requests need no DB round-trip.
 * Refresh token — opaque random value in an httpOnly cookie; only its sha256
 *                 lives in the DB (see src/server/sessions.ts). Rotated on
 *                 every refresh; replay revokes the family.
 */

export const ACCESS_COOKIE = 'neoxis_admin_at';
export const REFRESH_COOKIE = 'neoxis_admin_rt';

export const ACCESS_TTL_MS = 1000 * 60 * 15; // 15 minutes
export { REFRESH_TTL_MS };

const getSecret = (): string => process.env.AUTH_SECRET || 'insecure-dev-secret-do-not-use-in-prod';

interface AccessPayload {
  sub: string;
  email: string;
  name: string;
  /** Session family id — lets us map an access token back to its DB family. */
  fam: string;
  iat: number;
  exp: number;
}

export interface SessionPayload extends AccessPayload {}

const b64url = (input: string | Buffer): string => Buffer.from(input).toString('base64url');

const sign = (payload: string): string =>
  createHmac('sha256', getSecret()).update(payload).digest('base64url');

/* ── Access tokens ──────────────────────────────────────────────────────── */

export function createAccessToken(
  user: Pick<AdminUser, 'id' | 'email' | 'name'>,
  familyId: string,
): string {
  const payload: AccessPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    fam: familyId,
    iat: Date.now(),
    exp: Date.now() + ACCESS_TTL_MS,
  };
  const encoded = b64url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;

  const expected = Buffer.from(sign(encoded));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as AccessPayload;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    if (typeof payload.fam !== 'string' || payload.fam.length === 0) return null;
    return payload;
  } catch {
    return null;
  }
}

/* ── Cookie helpers ─────────────────────────────────────────────────────── */

const baseCookie = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_COOKIE, accessToken, { ...baseCookie, maxAge: ACCESS_TTL_MS / 1000 });
  store.set(REFRESH_COOKIE, refreshToken, {
    ...baseCookie,
    maxAge: REFRESH_TTL_MS / 1000,
    path: '/', // refresh endpoint is /api/admin/refresh (root-scoped)
  });
}

export async function setAccessCookie(accessToken: string): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_COOKIE, accessToken, { ...baseCookie, maxAge: ACCESS_TTL_MS / 1000 });
}

export async function clearAuthCookies(): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_COOKIE, '', { ...baseCookie, maxAge: 0 });
  store.set(REFRESH_COOKIE, '', { ...baseCookie, maxAge: 0 });
}

/* ── Session accessors ──────────────────────────────────────────────────── */

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySessionToken(store.get(ACCESS_COOKIE)?.value);
}

/**
 * Full context for a request: access payload + the presented refresh token
 * (if any). The refresh token is returned hashed-ready — callers pass it to
 * the sessions module.
 */
export async function getAuthContext(): Promise<{
  session: SessionPayload | null;
  refreshToken: string | null;
}> {
  const store = await cookies();
  return {
    session: verifySessionToken(store.get(ACCESS_COOKIE)?.value),
    refreshToken: store.get(REFRESH_COOKIE)?.value ?? null,
  };
}

/* ── Admin users ────────────────────────────────────────────────────────── */

/** Ensure the initial admin from env exists in the db (first-run seeding). */
export async function ensureAdminUser(): Promise<void> {
  const email = (process.env.ADMIN_EMAIL || 'admin@neoxis.design').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  const name = process.env.ADMIN_NAME || 'NeoXis Admin';

  const { updateDb } = await import('./db');
  await updateDb(async (data) => {
    if (!data.users.some((u) => u.email === email)) {
      data.users.push({
        id: `admin-${Date.now().toString(36)}`,
        email,
        passwordHash: await hashPassword(password),
        name,
        role: 'admin',
        createdAt: new Date().toISOString(),
      });
    }
  });
}

export async function authenticate(email: string, password: string): Promise<AdminUser | null> {
  await ensureAdminUser();
  const { readDb } = await import('./db');
  const data = await readDb();
  const user = data.users.find((u) => u.email === email.toLowerCase().trim());
  if (!user) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  return ok ? user : null;
}

/**
 * Establish a fresh login: create the DB session family and return both
 * tokens ready to be set as cookies.
 */
export async function startSession(
  user: Pick<AdminUser, 'id' | 'email' | 'name'>,
  userAgent: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const { familyId, refreshToken } = await createSessionFamily(user.id, userAgent);
  const accessToken = createAccessToken(user, familyId);
  return { accessToken, refreshToken };
}

/**
 * Change the current admin's password; verifies the old one first and
 * revokes every other session (this device keeps its family via re-login
 * on next access-token expiry).
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<boolean> {
  const { updateDb } = await import('./db');
  const ok = await updateDb(async (data) => {
    const user = data.users.find((u) => u.id === userId);
    if (!user) return false;
    if (!(await verifyPassword(currentPassword, user.passwordHash))) return false;
    user.passwordHash = await hashPassword(newPassword);
    return true;
  });
  if (ok) {
    await revokeAllSessionsForUser(userId);
  }
  return ok;
}
