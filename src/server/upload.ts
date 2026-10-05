import { createHash } from 'crypto';

/**
 * Reusable image upload helper.
 * Primary: Cloudinary (signed upload via REST, no SDK needed).
 * Fallback: writes into ./public/uploads so local dev works with zero config.
 * Consumers just call `uploadImage(fileOrBase64)` and get a URL back.
 */

const CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY =
  process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const cloudinaryConfigured = (): boolean =>
  Boolean(CLOUD_NAME && API_KEY && API_SECRET);

export interface UploadResult {
  url: string;
  publicId?: string;
  provider: 'cloudinary' | 'local';
  width?: number;
  height?: number;
}

export class UploadError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);

/** Normalize any supported input into a Buffer + mime type. */
async function toBuffer(input: File | Blob | string): Promise<{ buffer: Buffer; mime: string }> {
  if (typeof input === 'string') {
    // Data URL: data:image/jpeg;base64,xxxx
    const match = /^data:(image\/[a-zA-Z+]+);base64,(.+)$/.exec(input.trim());
    if (!match) throw new UploadError('Invalid data URL');
    const [, mime, base64] = match;
    if (!ALLOWED_TYPES.has(mime)) throw new UploadError(`Unsupported type: ${mime}`);
    return { buffer: Buffer.from(base64, 'base64'), mime };
  }
  const file = input as File;
  const mime = file.type || 'image/jpeg';
  if (!ALLOWED_TYPES.has(mime)) throw new UploadError(`Unsupported type: ${mime}`);
  return { buffer: Buffer.from(await file.arrayBuffer()), mime };
}

/** Cloudinary signed-upload payload: timestamp + folder signed with the API secret. */
function signParams(params: Record<string, string>): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return createHash('sha1').update(`${toSign}${API_SECRET}`).digest('hex');
}

async function uploadToCloudinary(buffer: Buffer, mime: string): Promise<UploadResult> {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = 'neoxis-cms';
  const signature = signParams({ folder, timestamp });

  const form = new FormData();
  form.append('file', new Blob([new Uint8Array(buffer)], { type: mime }));
  form.append('api_key', API_KEY as string);
  form.append('timestamp', timestamp);
  form.append('folder', folder);
  form.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new UploadError(`Cloudinary upload failed: ${response.status} ${detail.slice(0, 200)}`, 502);
  }

  const json = (await response.json()) as {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
  };

  return {
    url: json.secure_url,
    publicId: json.public_id,
    provider: 'cloudinary',
    width: json.width,
    height: json.height,
  };
}

async function uploadToLocal(buffer: Buffer, mime: string): Promise<UploadResult> {
  const { promises: fs } = await import('fs');
  const path = await import('path');
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });

  const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : mime === 'image/gif' ? 'gif' : mime === 'image/avif' ? 'avif' : 'jpg';
  const name = `${Date.now().toString(36)}-${createHash('sha1').update(buffer).digest('hex').slice(0, 8)}.${ext}`;
  await fs.writeFile(path.join(dir, name), buffer);
  return { url: `/uploads/${name}`, provider: 'local' };
}

/**
 * Upload an image. Accepts a File/Blob (multipart) or a base64 data URL.
 * Throws UploadError with an HTTP status the API route can pass through.
 */
export async function uploadImage(input: File | Blob | string): Promise<UploadResult> {
  const { buffer, mime } = await toBuffer(input);
  if (buffer.byteLength === 0) throw new UploadError('Empty file');
  if (buffer.byteLength > MAX_BYTES) throw new UploadError('Image exceeds 8 MB limit', 413);

  if (cloudinaryConfigured()) {
    try {
      return await uploadToCloudinary(buffer, mime);
    } catch (error) {
      if (error instanceof UploadError) throw error;
      throw new UploadError(`Cloudinary upload failed: ${(error as Error).message}`, 502);
    }
  }

  // No Cloudinary credentials — persist locally so the CMS still works in dev.
  return uploadToLocal(buffer, mime);
}
