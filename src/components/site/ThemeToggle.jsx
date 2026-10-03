"use client";

import { Moon, Sun } from "lucide-react";
import { cx } from "./ui";

export const THEME_KEY = "nexarrow-theme";

/**
 * Flips the `dark` class the head script set before paint. The icon is chosen
 * by CSS from that same class, so server and client markup always agree.
 */
export default function ThemeToggle({ className = "" }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // Persistence is best-effort; private modes may refuse storage.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={cx(
        "grid size-10 shrink-0 place-items-center rounded-md border border-line text-ink transition-colors hover:border-ink",
        className,
      )}
    >
      <Moon size={16} strokeWidth={1.8} className="dark:hidden" />
      <Sun size={16} strokeWidth={1.8} className="hidden dark:block" />
    </button>
  );
}
