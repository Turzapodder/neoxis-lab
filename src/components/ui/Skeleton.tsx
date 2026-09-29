import type { ReactNode } from 'react';

/**
 * Reusable skeleton loading states for the admin panel.
 *
 * A11y: each skeleton is wrapped in a polite live region ("Loading…") with
 * aria-busy, while the decorative bars themselves are hidden from screen
 * readers. The pulse animation is disabled under prefers-reduced-motion.
 */

/** Single shimmering bar/box. Purely decorative. */
export function SkeletonBar({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-neutral-200/90 motion-reduce:animate-none ${className}`}
    />
  );
}

/** Polite live region wrapping a skeleton layout. */
export function SkeletonRegion({
  label,
  className = '',
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/** Mirrors the CRM dashboard layout (stat tiles + section card grid). */
export function DashboardSkeleton() {
  return (
    <SkeletonRegion label="Loading dashboard">
      <div className="mx-auto max-w-full" aria-hidden="true">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SkeletonBar className="h-8 w-64" />
            <SkeletonBar className="mt-2 h-4 w-80" />
          </div>
          <SkeletonBar className="h-10 w-28 rounded-full" />
        </div>

        {/* Stat tiles */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
            >
              <SkeletonBar className="h-3 w-20" />
              <SkeletonBar className="mt-2.5 h-6 w-24" />
              <SkeletonBar className="mt-1.5 h-3.5 w-full" />
            </div>
          ))}
        </div>

        {/* Manage content label */}
        <SkeletonBar className="mb-4 h-3 w-28" />

        {/* Section cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <SkeletonBar className="h-11 w-11 rounded-xl" />
                <SkeletonBar className="h-4 w-6" />
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <SkeletonBar className="h-5 w-32" />
                <SkeletonBar className="h-6 w-9 rounded-full" />
              </div>
              <SkeletonBar className="mt-2 h-3.5 w-full" />
              <SkeletonBar className="mt-1.5 h-3.5 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonRegion>
  );
}

/** Mirrors the section editor layout (header + item cards with field grids). */
export function SectionEditorSkeleton() {
  return (
    <SkeletonRegion label="Loading section editor">
      <div className="mx-auto max-w-full" aria-hidden="true">
        {/* Header */}
        <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
          <div>
            <SkeletonBar className="h-3 w-32" />
            <SkeletonBar className="mt-2 h-9 w-44" />
            <SkeletonBar className="mt-1.5 h-4 w-96 max-w-full" />
          </div>
          <SkeletonBar className="h-12 w-40 rounded-full" />
        </div>

        {/* Item cards */}
        <div className="flex flex-col gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <SkeletonBar className="h-4 w-6" />
                  <SkeletonBar className="h-5 w-40" />
                </div>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((__, j) => (
                    <SkeletonBar key={j} className="h-8 w-8 rounded-full" />
                  ))}
                </div>
              </div>
              <div className="mt-5 border-t border-black/[0.06] pt-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((__, j) => (
                    <div key={j}>
                      <SkeletonBar className="h-3.5 w-24" />
                      <SkeletonBar className="mt-2 h-11 w-full rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonRegion>
  );
}
