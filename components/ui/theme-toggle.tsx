"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * §11 : l'application gère le mode sombre intégralement. La landing page aussi.
 *
 * Aucun état React : le thème vit sur `<html class="dark">`, posé avant la peinture
 * par le script du layout. Les deux icônes sont rendues, CSS décide laquelle montrer.
 * Pas d'effet, pas de `mounted`, donc pas de désaccord d'hydratation.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("pw-theme", next ? "dark" : "light");
    } catch {
      /* stockage indisponible : le thème reste celui de la session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Basculer entre le thème clair et le thème sombre"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-pill text-ink-3",
        "transition-colors duration-200 hover:bg-surface-muted hover:text-ink",
        className,
      )}
    >
      <Moon className="size-4.5 dark:hidden" strokeWidth={1.75} aria-hidden />
      <Sun className="hidden size-4.5 dark:block" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
