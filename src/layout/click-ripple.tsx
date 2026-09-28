"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface RippleInstance {
  id: number;
  x: number;
  y: number;
  tint: string;
}

/** Purple tint on light canvas, white tint over dark sections. */
export function ClickRipple() {
  const pathname = usePathname();
  const [ripples, setRipples] = useState<RippleInstance[]>([]);

  useEffect(() => {
    let count = 0;

    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isDark = Boolean(
        target?.closest('[data-cursor-theme="dark"]') ||
          target?.closest('[role="dialog"]') ||
          target?.closest(".bg-neutral-950") ||
          target?.closest(".bg-neutral-900") ||
          target?.closest(".bg-black\\/50") ||
          target?.closest(".bg-black"),
      );
      const tint = isDark
        ? "rgba(255, 255, 255, 0.22)"
        : "rgba(168, 85, 247, 0.18)";

      const newRipple = {
        id: ++count,
        x: e.clientX,
        y: e.clientY,
        tint,
      };

      setRipples((prev) => [...prev.slice(-10), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  // Admin area skips decorative ripples.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="ripple-layer fixed inset-0 z-[99998] pointer-events-none overflow-hidden">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
            backgroundColor: r.tint,
          }}
        />
      ))}
    </div>
  );
}
