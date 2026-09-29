import { NextRequest, NextResponse } from 'next/server';
import { REFRESH_COOKIE, clearAuthCookies } from '@/server/auth';
import { hashRefreshToken, revokeSessionFamily } from '@/server/sessions';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (refreshToken) {
    // Kill the DB family so the token can never be reused.
    await revokeSessionFamily(hashRefreshToken(refreshToken));
  }
  await clearAuthCookies();
  return NextResponse.json({ ok: true });
}
