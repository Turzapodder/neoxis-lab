import { NextRequest, NextResponse } from 'next/server';
import { changePassword, getSession } from '@/server/auth';

export const dynamic = 'force-dynamic';

const MIN_LENGTH = 8;

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    currentPassword?: unknown;
    newPassword?: unknown;
  } | null;

  const currentPassword = typeof body?.currentPassword === 'string' ? body.currentPassword : '';
  const newPassword = typeof body?.newPassword === 'string' ? body.newPassword : '';

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Both fields are required' }, { status: 400 });
  }
  if (newPassword.length < MIN_LENGTH) {
    return NextResponse.json({ error: `New password must be at least ${MIN_LENGTH} characters` }, { status: 400 });
  }

  const ok = await changePassword(session.sub, currentPassword, newPassword);
  if (!ok) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 403 });
  }
  return NextResponse.json({ ok: true });
}
