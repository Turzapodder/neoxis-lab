'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      router.replace(nextPath.startsWith('/admin') ? nextPath : '/admin');
      router.refresh();
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-canvas-bg)] px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </span>
          <h1 className="font-clash text-2xl font-bold tracking-tight text-neutral-950">
            neoxis <span className="text-sm font-medium text-neutral-400">admin</span>
          </h1>
          <p className="font-neue text-sm text-neutral-500">Sign in to manage site content</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] border border-black/10 bg-white/90 p-6 shadow-xl backdrop-blur-xl sm:p-7"
        >
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 font-neue text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <label className="mb-1.5 block font-neue text-xs text-neutral-600" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@neoxis.design"
            className="mb-4 w-full rounded-xl border border-black/10 bg-black/[0.04] px-4 py-2.5 font-neue text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-900/40 focus:outline-none"
          />

          <label className="mb-1.5 block font-neue text-xs text-neutral-600" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            className="mb-6 w-full rounded-xl border border-black/10 bg-black/[0.04] px-4 py-2.5 font-neue text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-900/40 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-full bg-neutral-950 py-3 font-clash text-sm font-semibold text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center font-neue text-xs text-neutral-400">
          Credentials are configured via ADMIN_EMAIL / ADMIN_PASSWORD env vars.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
