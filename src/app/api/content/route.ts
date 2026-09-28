import { NextResponse } from 'next/server';
import { getCmsContent } from '@/server/content';

export const dynamic = 'force-dynamic';

/** GET /api/content — public, read-only JSON of all CMS-managed content. */
export async function GET() {
  const content = await getCmsContent();
  return NextResponse.json(content);
}
