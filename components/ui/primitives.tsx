import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── Sur-titre Geist Mono ─────────────────────────────────────────────────
   La signature visuelle du produit (§11). Ouvre chaque section.            */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("u-eyebrow text-primary-deep", className)}>{children}</p>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────
   Rythme vertical constant. L'alternance des fonds structure la page :
   on ne sépare jamais par un trait, toujours par une surface (inspo §3.3). */

type Tone = "page" | "surface" | "tint" | "ink";

const TONES: Record<Tone, string> = {
  page: "bg-page",
  surface: "bg-surface",
  tint: "bg-primary-tint-2 dark:bg-surface-muted",
  ink: "bg-ink text-page dark:bg-surface-muted dark:text-ink",
};

export function Section({
  id,
  tone = "page",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 px-4 py-16 sm:px-6 md:py-24 lg:py-32",
        TONES[tone],
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-(--container-page)", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

/* ── En-tête de section ──────────────────────────────────────────────────
   Titres en deux propositions courtes séparées par un point (inspo §3.2).  */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-[22ch] text-h2 font-semibold text-ink">{title}</h2>
      {lead ? (
        <p
          className={cn(
            "max-w-[58ch] text-lead text-ink-2",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ── Boutons ──────────────────────────────────────────────────────────────
   Pilules entièrement arrondies (999px, §11).                              */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const BUTTON_BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "transition-[transform,box-shadow,background-color,color] duration-200 ease-(--ease-out-soft) " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-cta hover:bg-primary-strong hover:-translate-y-0.5 " +
    "dark:text-[#06120c]",
  secondary:
    "bg-surface text-ink ring-1 ring-line shadow-card hover:bg-surface-muted hover:-translate-y-0.5",
  ghost: "text-ink-2 hover:bg-surface-muted hover:text-ink",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-13 px-7 text-[0.97rem]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <Link
      className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

/* ── Carte ────────────────────────────────────────────────────────────────
   Rayon 14px, ombre douce, jamais de bordure dure.                          */

export function Card({
  className,
  children,
  interactive = false,
  ...props
}: ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-card bg-surface p-6 shadow-card ring-1 ring-line",
        interactive &&
          "transition-[transform,box-shadow] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-raised",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Pastille d'icône ─────────────────────────────────────────────────────*/

export function IconBadge({
  children,
  className,
  tone = "primary",
}: {
  children: ReactNode;
  className?: string;
  tone?: "primary" | "danger" | "warning" | "info";
}) {
  const tones = {
    primary: "bg-primary-tint text-primary-strong",
    danger: "bg-danger-tint text-danger",
    warning: "bg-warning-tint text-warning",
    info: "bg-info-tint text-info",
  };
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-pill",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ── Étiquette ────────────────────────────────────────────────────────────*/

export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "u-eyebrow inline-flex items-center gap-1.5 rounded-pill bg-primary-tint px-3 py-1.5 text-primary-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
