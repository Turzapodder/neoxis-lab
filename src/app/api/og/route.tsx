import { ImageResponse } from 'next/og';
import { SITE } from '@/config/site';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title')?.slice(0, 120) || SITE.shortName;
  const subtitle = searchParams.get('subtitle')?.slice(0, 160) || SITE.tagline;
  const tag = searchParams.get('tag')?.slice(0, 60) || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0F1016 0%, #1E1030 55%, #3B0764 100%)',
          padding: 72,
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        {/* Top brand row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em' }}>neoxis</span>
          <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.85 }}>®</span>
          <span style={{ fontSize: 18, opacity: 0.55, marginLeft: 16 }}>{tag}</span>
        </div>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: title.length > 24 ? 68 : 92,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, opacity: 0.72, maxWidth: 900 }}>{subtitle}</div>
        </div>

        {/* Bottom accent row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 3, background: 'rgba(255,255,255,0.7)' }} />
          <span style={{ fontSize: 20, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Creative Lab // Digital First
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
