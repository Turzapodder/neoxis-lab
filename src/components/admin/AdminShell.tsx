'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BadgeDollarSign,
  CircleHelp,
  FolderKanban,
  KeyRound,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  MessageSquareQuote,
  PanelLeft,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  adminFetch,
  cancelProactiveRefresh,
  refreshAccessToken,
  scheduleProactiveRefresh,
} from '@/lib/admin-fetch';

/**
 * CRM-style admin shell: persistent dashboard sidebar (desktop) + drawer
 * (mobile), section navigation driven by the section registry, user card
 * with logout, and a content area for the active page.
 *
 * Auth: verifies the session on mount, schedules proactive silent token
 * refreshes, and recovers from expired access tokens without a login screen
 * (thanks to the rotating refresh cookie).
 */

const SECTION_ICONS: Record<string, LucideIcon> = {
  projects: FolderKanban,
  services: Layers,
  pricing: BadgeDollarSign,
  team: Users,
  testimonials: MessageSquareQuote,
  faqs: CircleHelp,
  hero: Sparkles,
  heroStats: PanelLeft,
};

const SECTION_LABELS: Record<string, string> = {
  projects: 'Projects',
  services: 'Services',
  pricing: 'Pricing',
  team: 'Team',
  testimonials: 'Testimonials',
  faqs: 'FAQs',
  hero: 'Hero',
  heroStats: 'Stats Bar',
};

interface AdminUser {
  name: string;
  email: string;
}

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'A';

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // The login page renders bare (no sidebar/chrome).
  const isLogin = pathname.startsWith('/admin/login');

  useEffect(() => {
    if (isLogin) return;
    let cancelled = false;

    const verify = async () => {
      try {
        const res = await adminFetch('/api/admin/me');
        if (cancelled) return;
        if (!res.ok) {
          // adminFetch already tried a silent refresh; give up gracefully.
          router.replace('/admin/login');
          return;
        }
        const data = (await res.json()) as {
          user: AdminUser;
          accessExpiresAt?: number;
          accessTtlMs?: number;
        };
        setUser(data.user);
        if (data.accessExpiresAt) {
          // Proactive refresh a bit before the access token dies.
          scheduleProactiveRefresh(Math.max(data.accessExpiresAt - Date.now(), 30_000));
        } else if (data.accessTtlMs) {
          scheduleProactiveRefresh(data.accessTtlMs);
        } else {
          void refreshAccessToken();
        }
      } catch {
        if (!cancelled) router.replace('/admin/login');
      }
    };

    void verify();
    return () => {
      cancelled = true;
    };
  }, [router, isLogin, pathname]);

  // Close the mobile drawer on navigation.
  useEffect(() => setDrawerOpen(false), [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    cancelProactiveRefresh();
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' });
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  };

  const isDashboard = pathname === '/admin' || pathname === '/admin/';

  // The login page renders bare (no sidebar/chrome).
  if (isLogin) return <>{children}</>;

  const navLinkClass = (active: boolean): string =>
    [
      'group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors',
      active
        ? 'bg-white/10 font-semibold text-white'
        : 'font-medium text-neutral-300 hover:bg-white/5 hover:text-white',
    ].join(' ');

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 pb-6 pt-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral-950">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="font-clash text-base font-bold tracking-tight text-white">neoxis CMS</p>
          <p className="font-neue text-[11px] uppercase tracking-[0.14em] text-neutral-400">
            Content Studio
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Admin" className="flex-1 space-y-7 overflow-y-auto px-3">
        <div>
          <p className="px-3.5 pb-2 font-neue text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Overview
          </p>
          <Link href="/admin" className={navLinkClass(isDashboard)}>
            <LayoutDashboard className="h-[18px] w-[18px]" />
            Dashboard
          </Link>
        </div>

        <div>
          <p className="px-3.5 pb-2 font-neue text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Content Sections
          </p>
          <div className="space-y-1">
            {Object.entries(SECTION_ICONS).map(([key, Icon]) => {
              const active = pathname === `/admin/sections/${key}`;
              return (
                <Link key={key} href={`/admin/sections/${key}`} className={navLinkClass(active)}>
                  <Icon className="h-[18px] w-[18px]" />
                  {SECTION_LABELS[key] ?? key}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-3.5 pb-2 font-neue text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Account
          </p>
          <div className="space-y-1">
            <Link
              href="/admin/password"
              className={navLinkClass(pathname === '/admin/password')}
            >
              <KeyRound className="h-[18px] w-[18px]" />
              Change Password
            </Link>
            <Link href="/" target="_blank" className={navLinkClass(false)}>
              <PanelLeft className="h-[18px] w-[18px]" />
              View Live Site ↗
            </Link>
          </div>
        </div>
      </nav>

      {/* User card */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3.5 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-clash text-sm font-bold text-white">
            {user ? initials(user.name) : '…'}
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate font-neue text-[13px] font-semibold text-white">
              {user?.name ?? 'Loading…'}
            </p>
            <p className="truncate font-neue text-[11px] text-neutral-400">{user?.email ?? ''}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            aria-label="Log out"
            title="Log out"
            className="cursor-pointer rounded-lg p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-neutral-950 lg:block">
        {sidebar}
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between bg-neutral-950 px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-neutral-950">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-clash text-base font-bold text-white">neoxis CMS</span>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen((open) => !open)}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
          aria-controls="admin-mobile-drawer"
          className="cursor-pointer rounded-lg p-2 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {drawerOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
      {drawerOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-40 bg-neutral-950/60 lg:hidden"
          />
          <aside
            id="admin-mobile-drawer"
            aria-label="Admin menu"
            className="fixed inset-y-0 left-0 z-50 w-64 bg-neutral-950 pt-14 lg:hidden"
          >
            {sidebar}
          </aside>
        </>
      )}

      {/* Content */}
      <main id="admin-main" className="min-w-0 flex-1 px-4 pb-16 pt-20 sm:px-6 lg:px-10 lg:pt-10">
        {children}
      </main>
    </div>
  );
}
