import { NextResponse } from 'next/server';
import { createInquiry, type InquiryInput } from '@/server/inquiries';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as Partial<InquiryInput> | null;

    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request payload. Expected JSON body.' },
        { status: 400 },
      );
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name) {
      return NextResponse.json({ error: 'Your name is required.' }, { status: 400 });
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 },
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Please provide a project brief or message.' },
        { status: 400 },
      );
    }

    const inquiry = await createInquiry({
      name,
      email,
      projectTypes: Array.isArray(body.projectTypes)
        ? body.projectTypes.filter((t): t is string => typeof t === 'string')
        : [],
      budget: typeof body.budget === 'string' ? body.budget : null,
      message,
      source: body.source === 'connect_modal' ? 'connect_modal' : 'contact_section',
    });

    return NextResponse.json({
      success: true,
      id: inquiry.id,
      message: 'Inquiry received successfully! Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('Error in POST /api/inquiries:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing your inquiry.' },
      { status: 500 },
    );
  }
}
