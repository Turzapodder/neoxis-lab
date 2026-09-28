import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { readDb, updateDb, type AdminUser } from './db';
import { hashPassword, verifyPassword } from './password';

/**
 * Stateless HMAC-signed sessions (no external deps).
 * Token = base64url(payload).base64url(HMAC-SHA256(payload, AUTH_SECRET))
 * The payload carries the user id, an issued-at and an expiry — tamper-proof
 * without a session store.
 */

export const SESSION_COOKIE = 'neoxis_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

const getSecret = (): string => process.env.AUTH_SECRET || 'insecure-dev-secret-do-not-use-in-prod';

interface SessionPayload {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

const b64url = (input: string | Buffer): string =>
  Buffer.from(input).toString('base64url');

const sign = (payload: string): string =>
  createHmac('sha256', getSecret()).update(payload).digest('base64url');

export function createSessionToken(user: Pick<AdminUser, 'id' | 'email' | 'name'>): string {
  const payload: SessionPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_MS,
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
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SessionPayload;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/* ── Cookie helpers ─────────────────────────────────────────────────────── */

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/* ── Admin users ────────────────────────────────────────────────────────── */

/** Ensure the initial admin from env exists in the db (first-run seeding). */
export async function ensureAdminUser(): Promise<void> {
  const email = (process.env.ADMIN_EMAIL || 'admin@neoxis.design').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  const name = process.env.ADMIN_NAME || 'NeoXis Admin';

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
  const data = await readDb();
  const user = data.users.find((u) => u.email === email.toLowerCase().trim());
  if (!user) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  return ok ? user : null;
}

/** Change the current admin's password; verifies the old one first. */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<boolean> {
  return updateDb(async (data) => {
    const user = data.users.find((u) => u.id === userId);
    if (!user) return false;
    if (!(await verifyPassword(currentPassword, user.passwordHash))) return false;
    user.passwordHash = await hashPassword(newPassword);
    return true;
  });
}
