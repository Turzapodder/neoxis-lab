import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/server/auth';
import { readDb, updateDb } from '@/server/db';
import { getSectionDef, SECTION_KEYS } from '@/server/sections';
import { validateItems } from '@/server/validate';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ key: string }>;
}

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

/** GET /api/admin/sections/[key] — list items of one section. */
export async function GET(_request: NextRequest, context: RouteContext) {
  if (!(await getSession())) return unauthorized();

  const { key } = await context.params;
  const section = getSectionDef(key);
  if (!section) {
    return NextResponse.json({ error: `Unknown section. Valid: ${SECTION_KEYS.join(', ')}` }, { status: 404 });
  }

  const db = await readDb();
  const data = db.content[key] as { items?: unknown } | undefined;
  return NextResponse.json({
    key: section.key,
    label: section.label,
    description: section.description,
    listKey: section.listKey,
    schema: section.schema,
    items: Array.isArray(data?.items) ? data.items : section.seed,
  });
}

/** PUT /api/admin/sections/[key] — replace the whole item list (validated). */
export async function PUT(request: NextRequest, context: RouteContext) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { key } = await context.params;
  const section = getSectionDef(key);
  if (!section) {
    return NextResponse.json({ error: `Unknown section. Valid: ${SECTION_KEYS.join(', ')}` }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as { items?: unknown } | null;
  const result = validateItems(section, body?.items);
  if (!result.ok) {
    return NextResponse.json({ error: 'Validation failed', details: result.errors }, { status: 422 });
  }

  await updateDb((data) => {
    data.content[key] = { items: result.items };
  });

  return NextResponse.json({ key, items: result.items, updatedBy: session.email });
}
