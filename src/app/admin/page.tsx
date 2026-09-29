'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CircleHelp,
  ExternalLink,
  FolderKanban,
  Layers,
  Loader2,
  Lock,
  Moon,
  PanelLeft,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

/**
 * CRM dashboard home: live stats bar (items per section, store status,
 * admins), section grid with real counts, and quick links.
 */

interface SectionStat {
  key: string;
  label: string;
  description: string;
  count: number;
}

interface Overview {
  user: { name: string; email: string };
  store: { active: 'mongodb' | 'json'; configured: boolean; state: string; error: string | null };
  sections: SectionStat[];
  users: number;
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  projects: FolderKanban,
  services: Layers,
  pricing: Sparkles,
  team: Users,
  testimonials: PanelLeft,
  faqs: CircleHelp,
  hero: Moon,
  heroStats: PanelLeft,
};

export default function AdminDashboard() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/overview')
      .then(async (res) => {
        if (!res.ok) throw new Error('unauthorized');
        return (await res.json()) as Overview;
      })
      .then((data) => setOverview(data))
      .catch(() => setError('Failed to load overview data.'));
  }, []);

  if (error) {
    return <p className="font-neue text-sm text-red-600">{error}</p>;
  }

  if (!overview) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-neutral-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const totalItems = overview.sections.reduce((sum, s) => sum + s.count, 0);
  const storeActive = overview.store.active === 'mongodb';
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  return (
    <div className="mx-auto max-w-full">
      {/* Page header */}
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-clash text-2xl font-bold tracking-tight text-neutral-950">
            Welcome back, {overview.user.name.split(' ')[0]}
          </h1>
          <p className="mt-1 font-neue text-xs text-neutral-500">
            Here is what is happening with your site content today.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 font-neue text-xs font-medium text-neutral-700 transition-colors hover:bg-black/[0.04]"
        >
          View site <ExternalLink className="h-3 w-3" />
        </Link>
      </header>

      {/* Stat tiles */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Store status */}
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <p className="font-neue text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Data store
          </p>
          <p className="mt-2 flex items-center gap-2 font-clash text-lg font-bold text-neutral-950">
            <span
              className={`h-2 w-2 rounded-full ${storeActive ? 'bg-emerald-500' : 'bg-amber-500'}`}
            />
            {storeActive ? 'MongoDB' : 'JSON fallback'}
          </p>
          <p className="mt-1 font-neue text-[11px] leading-snug text-neutral-500">
            {storeActive
              ? 'Connected — saving content to the database.'
              : isLocalhost
                ? 'Mongo unreachable — edits persist to data/cms.json. Start mongod and retry.'
                : 'Mongo unreachable — check MONGO_URL.'}
          </p>
        </div>

        {/* Content items */}
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <p className="font-neue text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Content items
          </p>
          <p className="mt-2 font-clash text-lg font-bold text-neutral-950">{totalItems}</p>
          <p className="mt-1 font-neue text-[11px] text-neutral-500">
            Across {overview.sections.length} sections
          </p>
        </div>

        {/* Sections */}
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <p className="font-neue text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Editable sections
          </p>
          <p className="mt-2 font-clash text-lg font-bold text-neutral-950">
            {overview.sections.length}
          </p>
          <p className="mt-1 font-neue text-[11px] text-neutral-500">Schema-driven editors</p>
        </div>

        {/* Admins */}
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <p className="font-neue text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Admin users
          </p>
          <p className="mt-2 flex items-center gap-2 font-clash text-lg font-bold text-neutral-950">
            <Lock className="h-4 w-4 text-neutral-400" />
            {overview.users}
          </p>
          <p className="mt-1 font-neue text-[11px] text-neutral-500">
            <Link href="/admin/password" className="underline hover:text-neutral-800">
              Change password
            </Link>
          </p>
        </div>
      </div>

      {/* Section cards */}
      <h2 className="mb-3 font-neue text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
        Manage content
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {overview.sections.map((section, index) => {
          const Icon = SECTION_ICONS[section.key] ?? PanelLeft;
          return (
            <Link
              key={section.key}
              href={`/admin/sections/${section.key}`}
              className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.04] text-neutral-900">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-clash text-xs font-bold text-neutral-300 transition-colors group-hover:text-neutral-900">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-clash text-base font-bold text-neutral-950">{section.label}</h3>
                <span className="shrink-0 rounded-full bg-neutral-950 px-2 py-0.5 font-neue text-[10px] font-semibold text-white">
                  {section.count}
                </span>
              </div>
              <p className="mt-1 font-neue text-xs leading-relaxed text-neutral-500">
                {section.description}
              </p>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 rounded-2xl border border-black/[0.06] bg-white/60 p-4 font-neue text-xs leading-relaxed text-neutral-500">
        Edits save to the {storeActive ? 'MongoDB' : 'JSON'} store and go live immediately — the
        site reads straight from the same store on every request. Images upload to Cloudinary when
        configured, with a local fallback in development.
      </p>
    </div>
  );
}
