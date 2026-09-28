"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

/** neoxis accent (purple-500) used for the cursor dot and hover ring. */
const ACCENT = "#a855f7";

export function CustomCursor() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate for mouse/fine pointer devices
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Hide the custom ring over text inputs so the native I-beam stays visible
      const textControl = target.closest(
        "input, textarea, select, [contenteditable='true']",
      ) as HTMLElement | null;
      if (textControl) {
        const tag = textControl.tagName.toLowerCase();
        const inputType = (textControl as HTMLInputElement).type?.toLowerCase() || "";
        const isClickableInput =
          tag === "input" &&
          ["button", "submit", "reset", "checkbox", "radio"].includes(inputType);
        if (!isClickableInput) {
          setIsTextInput(true);
          setHovering(false);
          document.body.classList.remove("cursor-hover");
          setLabel("");
          return;
        }
      }
      setIsTextInput(false);

      // Interactive elements grow the ring
      const interactive = target.closest(
        "a, button, [data-cursor], [role='button'], .cursor-pointer",
      ) as HTMLElement | null;

      if (interactive) {
        setHovering(true);
        document.body.classList.add("cursor-hover");
        setLabel(interactive.getAttribute("data-cursor-label") || "");
      } else {
        setHovering(false);
        document.body.classList.remove("cursor-hover");
        setLabel("");
      }

      // Dark sections flip the ring tint for contrast
      const isDark = Boolean(
        target.closest('[data-cursor-theme="dark"]') ||
          target.closest('[role="dialog"]') ||
          target.closest(".bg-neutral-950") ||
          target.closest(".bg-neutral-900") ||
          target.closest(".bg-black\\/50") ||
          target.closest(".bg-black"),
      );
      setTheme(isDark ? "dark" : "light");
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    let rafId: number;
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("cursor-hover");
    };
  }, []);

  // Admin area keeps the native cursor for a utilitarian feel.
  if (!enabled || pathname?.startsWith("/admin")) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full transition-opacity duration-200"
        style={{
          backgroundColor: ACCENT,
          opacity: isTextInput ? 0 : hovering ? (label ? 0 : 0.4) : 0.85,
        }}
      />

      {/* Trailing ring / expandable badge */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity] duration-200"
        style={{
          opacity: isTextInput ? 0 : 1,
          width: hovering ? (label ? "80px" : "44px") : "32px",
          height: hovering ? (label ? "80px" : "44px") : "32px",
          backgroundColor: hovering
            ? label
              ? ACCENT
              : theme === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(168, 85, 247, 0.08)"
            : "transparent",
          borderColor: hovering
            ? label
              ? "transparent"
              : theme === "dark"
                ? "rgba(255, 255, 255, 0.45)"
                : ACCENT
            : theme === "dark"
              ? "rgba(255, 255, 255, 0.25)"
              : "rgba(15, 16, 22, 0.2)",
          borderWidth: hovering ? (label ? "0px" : "1.5px") : "1px",
        }}
      >
        {label && hovering && (
          <span className="font-clash text-[10px] font-bold tracking-widest text-white uppercase select-none">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
