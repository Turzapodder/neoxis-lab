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

/**
 * CRM-style admin shell: persistent dashboard sidebar (desktop) + drawer
 * (mobile), section navigation driven by the section registry, user card
 * with logout, and a content area for the active page.
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

  // The login page renders bare (no sidebar/chrome).
  const isLogin = pathname.startsWith('/admin/login');

  useEffect(() => {
    if (isLogin) return;
    fetch('/api/admin/me')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('unauthorized'))))
      .then((data: { user: AdminUser }) => setUser(data.user))
      .catch(() => router.replace('/admin/login'));
  }, [router, isLogin]);

  // Close the mobile drawer on navigation.
  useEffect(() => setDrawerOpen(false), [pathname]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  const isDashboard = pathname === '/admin' || pathname === '/admin/';

  if (isLogin) return <>{children}</>;

  const navLinkClass = (active: boolean): string =>
    [
      'group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 font-neue text-[13px] transition-colors',
      active
        ? 'bg-white/10 font-semibold text-white'
        : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-100',
    ].join(' ');

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 pb-6 pt-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-neutral-950">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="font-clash text-sm font-bold tracking-tight text-white">neoxis CMS</p>
          <p className="font-neue text-[10px] uppercase tracking-[0.14em] text-neutral-500">
            Content Studio
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3">
        <div>
          <p className="px-3 pb-2 font-neue text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
            Overview
          </p>
          <Link href="/admin" className={navLinkClass(isDashboard)}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </div>

        <div>
          <p className="px-3 pb-2 font-neue text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
            Content Sections
          </p>
          <div className="space-y-0.5">
            {Object.entries(SECTION_ICONS).map(([key, Icon]) => {
              const active = pathname === `/admin/sections/${key}`;
              return (
                <Link key={key} href={`/admin/sections/${key}`} className={navLinkClass(active)}>
                  <Icon className="h-4 w-4" />
                  {key === 'heroStats' ? 'Stats Bar' : key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-3 pb-2 font-neue text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
            Account
          </p>
          <Link
            href="/admin/password"
            className={navLinkClass(pathname === '/admin/password')}
          >
            <KeyRound className="h-4 w-4" />
            Change Password
          </Link>
          <Link href="/" target="_blank" className={navLinkClass(false)}>
            <PanelLeft className="h-4 w-4" />
            View Live Site ↗
          </Link>
        </div>
      </nav>

      {/* User card */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-clash text-xs font-bold text-white">
            {user ? initials(user.name) : '…'}
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate font-neue text-xs font-semibold text-white">
              {user?.name ?? 'Loading…'}
            </p>
            <p className="truncate font-neue text-[10px] text-neutral-500">{user?.email ?? ''}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
            className="cursor-pointer rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
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
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-neutral-950">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="font-clash text-sm font-bold text-white">neoxis CMS</span>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen((open) => !open)}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          className="cursor-pointer rounded-lg p-2 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-neutral-950 pt-14 lg:hidden">
            {sidebar}
          </aside>
        </>
      )}

      {/* Content */}
      <main className="min-w-0 flex-1 px-4 pb-16 pt-20 sm:px-6 lg:px-10 lg:pt-10">
        {children}
      </main>
    </div>
  );
}
