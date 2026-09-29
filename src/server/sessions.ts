import { createHash, randomBytes } from 'crypto';
import type { CmsData, StoredSession } from './db';
import { updateDb } from './db';

/**
 * Database-backed admin sessions with refresh-token rotation.
 *
 * Token design:
 *  - Access token  — stateless HMAC (same shape as before), short TTL.
 *    No DB lookup on the hot path; carries user identity + session family id.
 *  - Refresh token — opaque random 384-bit value, sha256-hashed in the DB.
 *    Rotated on every refresh; the previous hash is kept briefly so that
 *    replaying an old token revokes the whole family (theft detection).
 *
 * Everything persists through the normal db layer, so sessions live in
 * MongoDB in production and in data/cms.json offline.
 */

export const REFRESH_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
/** How long a rotated-out hash still counts for reuse detection. */
const STALE_KEEP_MS = 1000 * 60 * 60 * 24; // 24 h
/** Hard cap on retained stale hashes per family. */
const MAX_STALE = 8;

export interface SessionFamily {
  family: StoredSession;
  user: CmsData['users'][number];
}

const sha256 = (value: string): string => createHash('sha256').update(value).digest('hex');

export const hashRefreshToken = sha256;

export function generateRefreshToken(): string {
  return randomBytes(48).toString('base64url');
}

/** Purge expired families and trim stale-hash lists (runs inside updateDb). */
function pruneSessions(data: CmsData): void {
  const now = Date.now();
  data.sessions = data.sessions.filter((session) => {
    if (session.revokedAt) return now - Date.parse(session.revokedAt) < STALE_KEEP_MS;
    return Date.parse(session.expiresAt) > now;
  });
  for (const session of data.sessions) {
    if (session.staleHashes.length > MAX_STALE) {
      session.staleHashes = session.staleHashes.slice(-MAX_STALE);
    }
  }
}

/**
 * Create a new session family for a user.
 * Returns the family id (embedded in access tokens) and the generated
 * refresh token (plain — only the hash is stored).
 */
export async function createSessionFamily(
  userId: string,
  userAgent: string,
): Promise<{ familyId: string; refreshToken: string }> {
  const refreshToken = generateRefreshToken();
  const now = new Date().toISOString();
  const familyId = `sess-${randomBytes(8).toString('hex')}`;

  await updateDb((data) => {
    pruneSessions(data);
    data.sessions.push({
      id: familyId,
      userId,
      refreshHash: sha256(refreshToken),
      staleHashes: [],
      createdAt: now,
      lastUsedAt: now,
      expiresAt: new Date(Date.now() + REFRESH_TTL_MS).toISOString(),
      revokedAt: null,
      userAgent: userAgent.slice(0, 200),
    });
  });

  return { familyId, refreshToken };
}

export interface RotateResult {
  ok: true;
  userId: string;
  /** Session family id — to be embedded in the next access token. */
  familyId: string;
  refreshToken: string;
}

export interface ReuseDetected {
  ok: false;
  reason: 'reuse';
}

export interface InvalidRefresh {
  ok: false;
  reason: 'invalid' | 'expired';
}

/**
 * Rotate a refresh token: verify the presented token, retire it, and issue
 * a fresh one in the same family. If a previously-retired token shows up
 * again, the family is revoked immediately (token-theft defence).
 */
export async function rotateRefreshToken(
  presentedToken: string,
  userAgent: string,
): Promise<RotateResult | ReuseDetected | InvalidRefresh> {
  const presentedHash = sha256(presentedToken);
  const now = new Date();

  return updateDb((data) => {
    pruneSessions(data);
    const family = data.sessions.find(
      (session) => !session.revokedAt && session.refreshHash === presentedHash,
    );
    if (family) {
      // Happy path: rotate.
      const nextToken = generateRefreshToken();
      family.staleHashes.push(family.refreshHash);
      if (family.staleHashes.length > MAX_STALE) {
        family.staleHashes = family.staleHashes.slice(-MAX_STALE);
      }
      family.refreshHash = sha256(nextToken);
      family.lastUsedAt = now.toISOString();
      family.expiresAt = new Date(now.getTime() + REFRESH_TTL_MS).toISOString();
      family.userAgent = userAgent.slice(0, 200) || family.userAgent;
      return {
        ok: true,
        userId: family.userId,
        familyId: family.id,
        refreshToken: nextToken,
      } as const;
    }

    // Replay of a retired token → revoke the whole family.
    const staleFamily = data.sessions.find(
      (session) => !session.revokedAt && session.staleHashes.includes(presentedHash),
    );
    if (staleFamily) {
      staleFamily.revokedAt = now.toISOString();
      return { ok: false, reason: 'reuse' } as const;
    }

    const expiredFamily = data.sessions.find((session) =>
      session.staleHashes.includes(presentedHash),
    );
    if (expiredFamily) {
      return { ok: false, reason: 'reuse' } as const;
    }

    return { ok: false, reason: 'invalid' } as const;
  });
}

/** Revoke one family (used on logout / refresh reuse). */
export async function revokeSessionFamily(refreshHash: string): Promise<void> {
  await updateDb((data) => {
    const family = data.sessions.find((session) => session.refreshHash === refreshHash);
    if (family && !family.revokedAt) {
      family.revokedAt = new Date().toISOString();
    }
  });
}

/** Revoke every family across all devices for a user (e.g. password change). */
export async function revokeAllSessionsForUser(userId: string): Promise<void> {
  await updateDb((data) => {
    const now = new Date().toISOString();
    for (const session of data.sessions) {
      if (session.userId === userId && !session.revokedAt) {
        session.revokedAt = now;
      }
    }
  });
}

/** Housekeeping — drop expired/revoked families. Call opportunistically. */
export async function pruneExpiredSessions(): Promise<void> {
  await updateDb((data) => {
    pruneSessions(data);
  });
}
