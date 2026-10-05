import { NextResponse } from 'next/server';
import { getSession } from '@/server/auth';
import { readDb, storeStatus } from '@/server/db';
import { SECTIONS } from '@/server/sections';
import { getInquiryStats } from '@/server/inquiries';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/overview
 * One call powering the CRM dashboard: signed-in user, active data store
 * (mongodb or json fallback), live item counts for every section, and inquiry stats.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [db, inquiryStats] = await Promise.all([readDb(), getInquiryStats()]);
  const status = storeStatus();

  const sections = SECTIONS.map((section) => {
    const data = db.content[section.key] as { items?: unknown } | undefined;
    return {
      key: section.key,
      label: section.label,
      description: section.description,
      count: Array.isArray(data?.items) ? data.items.length : 0,
    };
  });

  return NextResponse.json({
    user: { id: session.sub, email: session.email, name: session.name },
    store: {
      active: status.active,
      configured: status.configured,
      state: status.state,
      error: status.error,
    },
    sections,
    users: db.users.length,
    inquiryStats,
  });
}
