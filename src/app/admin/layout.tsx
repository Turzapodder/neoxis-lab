import type { ReactNode } from 'react';
import AdminShell from '@/components/admin/AdminShell';

/**
 * Admin shell. Opts the admin tree out of the public site's global overlays
 * (custom cursor, ripples, AI copilot, cookie consent) which live in the root
 * layout, and wraps everything in the CRM-style dashboard chrome. The shell
 * itself renders children bare on /admin/login.
 */

export const metadata = {
  title: 'neoxis admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-scope min-h-screen bg-neutral-100">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
