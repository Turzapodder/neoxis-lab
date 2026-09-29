import { NextResponse } from 'next/server';
import { getSession } from '@/server/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: session.sub, email: session.email, name: session.name },
    /** Access-token expiry (ms). The client schedules a silent refresh before this. */
    accessExpiresAt: session.exp,
    accessTtlMs: 15 * 60 * 1000,
  });
}
