import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/server/auth';
import { deleteInquiry, updateInquiry } from '@/server/inquiries';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

/** PATCH /api/admin/inquiries/[id] — update status, notes, or scheduled meeting details. */
export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!(await getSession())) return unauthorized();

  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    status?: 'new' | 'contacted' | 'scheduled' | 'closed';
    notes?: string;
    meetingScheduledAt?: string | null;
    meetingLink?: string | null;
  } | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid update body' }, { status: 400 });
  }

  const validStatuses = new Set(['new', 'contacted', 'scheduled', 'closed']);
  if (body.status && !validStatuses.has(body.status)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
  }

  const updated = await updateInquiry(id, {
    status: body.status,
    notes: body.notes,
    meetingScheduledAt: body.meetingScheduledAt,
    meetingLink: body.meetingLink,
  });

  if (!updated) {
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, inquiry: updated });
}

/** DELETE /api/admin/inquiries/[id] — delete an inquiry. */
export async function DELETE(_request: NextRequest, context: RouteContext) {
  if (!(await getSession())) return unauthorized();

  const { id } = await context.params;
  const deleted = await deleteInquiry(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Inquiry not found or could not be deleted' }, { status: 404 });
  }

  return NextResponse.json({ success: true, id });
}
