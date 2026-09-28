import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/server/auth';
import { cloudinaryConfigured, UploadError, uploadImage } from '@/server/upload';

export const dynamic = 'force-dynamic';

/** POST /api/admin/upload — multipart image upload (Cloudinary or local fallback). */
export async function POST(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'file field is required' }, { status: 400 });
    }

    const result = await uploadImage(file);
    return NextResponse.json({ ...result, cloudinary: cloudinaryConfigured() });
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
