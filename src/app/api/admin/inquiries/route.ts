import { NextResponse } from 'next/server';
import { getSession } from '@/server/auth';
import { getInquiries, getInquiryStats } from '@/server/inquiries';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/inquiries
 * Returns all client inquiries and summary statistics for the admin dashboard.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [inquiries, stats] = await Promise.all([getInquiries(), getInquiryStats()]);
    return NextResponse.json({ inquiries, stats });
  } catch (error) {
    console.error('Failed to load inquiries:', error);
    return NextResponse.json({ error: 'Failed to load inquiries' }, { status: 500 });
  }
}
