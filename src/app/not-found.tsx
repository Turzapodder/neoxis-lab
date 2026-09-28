import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-canvas-bg)] px-6 text-center text-[var(--color-text-primary)]">
      <p className="font-clash text-[18vw] font-bold leading-none tracking-tight text-neutral-200 select-none sm:text-[140px]">
        404
      </p>
      <h1 className="font-clash text-3xl font-bold tracking-tight text-neutral-950">
        This page went off the grid.
      </h1>
      <p className="max-w-md font-neue text-sm text-neutral-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
        back to the good stuff.
      </p>
      <Link
        href="/"
        className="rounded-full bg-neutral-950 px-7 py-3 font-clash text-sm font-semibold text-white shadow-xl transition-colors hover:bg-neutral-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
