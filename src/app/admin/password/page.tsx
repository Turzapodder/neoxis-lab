'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || 'Change failed');
        return;
      }
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 font-neue text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to dashboard
      </Link>

      <h1 className="font-clash text-2xl font-bold tracking-tight text-neutral-950">
        Change password
      </h1>
      <p className="mb-6 mt-1 font-neue text-sm text-neutral-500">
        Update the password for your admin account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
      >
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 font-neue text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {success && (
          <p
            role="status"
            className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 font-neue text-sm text-emerald-700"
          >
            Password updated successfully.
          </p>
        )}

        {[
          {
            id: 'current',
            label: 'Current password',
            value: currentPassword,
            set: setCurrentPassword,
            auto: 'current-password' as const,
          },
          {
            id: 'new',
            label: 'New password (min 8 chars)',
            value: newPassword,
            set: setNewPassword,
            auto: 'new-password' as const,
          },
          {
            id: 'confirm',
            label: 'Confirm new password',
            value: confirmPassword,
            set: setConfirmPassword,
            auto: 'new-password' as const,
          },
        ].map((field) => (
          <div key={field.id} className="mb-4 last:mb-0">
            <label
              htmlFor={field.id}
              className="mb-1.5 block font-neue text-xs text-neutral-600"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type="password"
              required
              autoComplete={field.auto}
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-black/[0.04] px-4 py-2.5 font-neue text-sm text-neutral-900 transition-colors focus:border-neutral-900/40 focus:outline-none"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full cursor-pointer rounded-full bg-neutral-950 py-3 font-clash text-sm font-semibold text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Updating…' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
