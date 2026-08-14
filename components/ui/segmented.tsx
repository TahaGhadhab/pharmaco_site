"use client";

import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Bascule segmentée — la pastille verte qui glisse.
 *
 * Un seul composant pour les deux bascules de la page : mobile / ordinateur
 * sur les captures, mensuel / annuel sur les tarifs. Elles doivent avoir
 * exactement le même poids, la même course et la même courbe — c'est le même
 * geste, il ne peut pas avoir deux ressorts différents.
 *
 * ── Le glissement ────────────────────────────────────────────────────────
 * `layoutId` fait voyager la pastille d'un segment à l'autre au lieu de la
 * réafficher ailleurs. L'identifiant est dérivé de `useId()` : deux bascules
 * peuvent cohabiter sans se disputer la même pastille.
 *
 * Clavier : les flèches gauche/droite parcourent les segments, comme sur un
 * groupe de boutons radio. Chaque segment reste atteignable au Tab.
 * §11 : en `prefers-reduced-motion`, la pastille se pose sans glisser.
 *
 * ── Sur téléphone ────────────────────────────────────────────────────────
 * Les segments montent à 44 px de haut : en dessous, la cible est plus petite
 * que le doigt qui la vise. Et `fill` étale la bascule sur toute la largeur —
 * une pastille de 90 px calée à gauche d'un écran de 360 px se rate une fois
 * sur trois. À partir de `sm`, la bascule reprend sa taille de contenu.
 */

export type SegmentedOption<T extends string> = {
  id: T;
  /** Libellé visible. Absent = segment purement iconique (carré). */
  label?: string;
  icon?: ReactNode;
  /** Micro-étiquette accrochée au libellé, ex. « −15 % ». */
  badge?: string;
  /** Lu par les lecteurs d'écran — toujours une phrase complète. */
  description: string;
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
  fill = false,
}: {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
  /** Pleine largeur sous `sm` — segments à parts égales. */
  fill?: boolean;
}) {
  const reduced = useReducedMotion();
  const pastille = `segmented-${useId()}`;
  const boutons = useRef<(HTMLButtonElement | null)[]>([]);

  function surTouche(evenement: KeyboardEvent, index: number) {
    const pas =
      evenement.key === "ArrowRight" ? 1 : evenement.key === "ArrowLeft" ? -1 : 0;
    if (pas === 0) return;

    evenement.preventDefault();
    const suivant = (index + pas + options.length) % options.length;
    onChange(options[suivant].id);
    boutons.current[suivant]?.focus();
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "items-center gap-1 rounded-pill bg-surface p-1",
        "shadow-card ring-1 ring-line",
        fill ? "flex w-full sm:inline-flex sm:w-auto" : "inline-flex shrink-0",
        className,
      )}
    >
      {options.map((option, index) => {
        const choisi = option.id === value;

        return (
          <motion.button
            key={option.id}
            ref={(element) => {
              boutons.current[index] = element;
            }}
            type="button"
            onClick={() => onChange(option.id)}
            onKeyDown={(evenement) => surTouche(evenement, index)}
            aria-pressed={choisi}
            aria-label={option.description}
            title={option.description}
            whileTap={reduced ? undefined : { scale: 0.94 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative inline-flex items-center justify-center gap-2 rounded-pill",
              "transition-colors duration-200 ease-(--ease-out-soft)",
              option.label
                ? "px-4 py-3 text-[0.9rem] font-medium sm:py-2"
                : "size-10 sm:size-9",
              fill && "flex-1 sm:flex-none",
              choisi
                ? "text-white dark:text-[#06120c]"
                : "text-ink-3 hover:bg-primary-tint-2 hover:text-primary-deep dark:hover:bg-surface-muted",
            )}
          >
            {choisi ? (
              <motion.span
                layoutId={pastille}
                aria-hidden
                className="absolute inset-0 rounded-pill bg-primary shadow-cta"
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32, mass: 0.8 }
                }
              />
            ) : null}

            {option.icon ? (
              <span className="relative flex items-center" aria-hidden>
                {option.icon}
              </span>
            ) : null}

            {option.label ? (
              <span className="relative">{option.label}</span>
            ) : null}

            {option.badge ? (
              <span
                aria-hidden
                className={cn(
                  "u-numeric relative rounded-pill px-1.5 py-0.5 text-[0.62rem] leading-none",
                  "transition-colors duration-200 ease-(--ease-out-soft)",
                  choisi
                    ? "bg-white/25 dark:bg-black/15"
                    : "bg-primary-tint text-primary-strong",
                )}
              >
                {option.badge}
              </span>
            ) : null}
          </motion.button>
        );
      })}
    </div>
  );
}
