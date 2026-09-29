import { NextRequest, NextResponse } from 'next/server';
import { REFRESH_COOKIE, clearAuthCookies, createAccessToken, setAuthCookies } from '@/server/auth';
import { readDb, type AdminUser } from '@/server/db';
import { rotateRefreshToken } from '@/server/sessions';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/refresh
 *
 * Exchanges the httpOnly refresh cookie for a new access token and a
 * rotated refresh token. Replay of a retired refresh token revokes the
 * whole session family (theft defence) and the client is logged out.
 */
export async function POST(request: NextRequest) {
  const storeRefresh = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!storeRefresh) {
    return NextResponse.json({ error: 'No session' }, { status: 401 });
  }

  const result = await rotateRefreshToken(storeRefresh, request.headers.get('user-agent') ?? '');

  if (!result.ok) {
    await clearAuthCookies();
    return NextResponse.json(
      {
        error:
          result.reason === 'reuse'
            ? 'Session revoked — please sign in again'
            : 'Session expired — please sign in again',
      },
      { status: 401 },
    );
  }

  // Resolve the user fresh from the DB so name/role changes propagate.
  const data = await readDb();
  const user = data.users.find((u) => u.id === result.userId);
  if (!user) {
    await clearAuthCookies();
    return NextResponse.json({ error: 'Account no longer exists' }, { status: 401 });
  }

  const accessToken = createAccessToken(user as AdminUser, result.familyId);
  await setAuthCookies(accessToken, result.refreshToken);

  const response = NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name },
    accessTtlMs: 15 * 60 * 1000,
  });
  // Defensive: make sure no proxy caches this exchange.
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
