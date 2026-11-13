import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { DEFAULT_TITLE } from '@/config/site';
import { HOME_METADATA, absoluteUrl } from '@/lib/seo';
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { ClickRipple } from '@/layout/click-ripple';
import { CookieConsentModal } from '@/components/modals/CookieConsentModal';
import './globals.css';

/**
 * Body font. The original design used Neue Montreal (commercial — the local
 * woff2 files were broken, see git history), so we self-host Inter, the
 * closest free grotesque, as a drop-in replacement at the same weights.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * Display font: Clash Display (Fontshare, ITF Free Font License) self-hosted as one
 * 29 KB variable file covering weights 200–700. Served from our own origin and
 * preloaded, so headings no longer wait on a render-blocking third-party stylesheet.
 */
const clashDisplay = localFont({
  src: '../assets/fonts/ClashDisplay-Variable.woff2',
  weight: '200 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-clash-display',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  ...HOME_METADATA,
  title: { default: DEFAULT_TITLE, template: `%s — NeoXis Lab` },
  applicationName: 'NeoXis Lab',
  authors: [{ name: 'NeoXis Lab', url: absoluteUrl('/') }],
  creator: 'NeoXis Lab',
  publisher: 'NeoXis Lab',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#F8F9FC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`light ${inter.variable} ${clashDisplay.variable}`}
      data-theme="light"
      style={{ colorScheme: 'light' }}
    >
      <head>
        {/* Enforce light mode before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{localStorage.removeItem('luvron-theme');document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}catch(e){}})();`,
          }}
        />
        {/* Organization + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body className="overflow-x-hidden antialiased selection:bg-purple-500/25 selection:text-current transition-colors duration-300">
        {children}
        {/* Global interactive layer — each overlay hides itself on /admin */}
        <ClickRipple />
        <CookieConsentModal />
      </body>
    </html>
  );
}
