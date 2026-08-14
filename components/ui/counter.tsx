"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn, nombre } from "@/lib/utils";

/**
 * Odomètre — le chiffre roule jusqu'à sa valeur.
 *
 * Un décompte interpolé (0, 1, 2, 3… 43) donne un nombre qui *défile*. Ici les
 * chiffres *tournent* : chaque rang est une colonne de dix glyphes qui coulisse
 * derrière une fenêtre d'un cadratin. C'est le geste d'un compteur mécanique, et
 * c'est ce qui fait qu'on le regarde arriver au lieu de le lire.
 *
 * ── Ce qui rend la mécanique exacte ──────────────────────────────────────
 * · Chaque glyphe occupe exactement `1em` (`leading-none` + `h-[1em]`), et la
 *   colonne en compte dix. Un rang se cale donc à `-valeur × 10 %` de la
 *   hauteur de sa colonne — en pourcentage et non en `em`, pour que la course
 *   reste juste quelle que soit la taille de police héritée.
 * · La largeur n'est jamais écrite : la colonne reste dans le flux et Geist
 *   Mono donne à ses dix chiffres la même avance. Aucun nombre magique.
 * · Les rangs partent en cascade, du plus fort au plus faible — c'est le sens
 *   dans lequel un compteur se remplit.
 *
 * ── Accessibilité ────────────────────────────────────────────────────────
 * Les dix glyphes de chaque colonne sont dans le DOM : lus tels quels, ils
 * donneraient « 0123456789 ». La mécanique est donc `aria-hidden`, et la valeur
 * réelle est portée par un `sr-only` — qui sert aussi de contenu au rendu
 * serveur, avant toute animation.
 *
 * §11 : en `prefers-reduced-motion`, aucun roulement. Les chiffres sont posés.
 */

/* 700 ms par rang, sous le plafond de 800 ms du §11. */
const DUREE = 0.7;
const CASCADE = 0.09;

const GLYPHES = Array.from({ length: 10 }, (_, chiffre) => chiffre);

function Rang({
  chiffre,
  delai,
  anime,
}: {
  chiffre: number;
  delai: number;
  anime: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <span className="relative block h-[1em] overflow-hidden">
      <motion.span
        className="flex flex-col"
        initial={{ y: "0%" }}
        animate={{ y: anime || reduced ? `-${chiffre * 10}%` : "0%" }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: DUREE, delay: delai, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {GLYPHES.map((glyphe) => (
          <span key={glyphe} className="block h-[1em] leading-none">
            {glyphe}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Counter({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const vu = useInView(ref, { once: true, margin: "-40px" });

  const rangs = String(Math.max(0, Math.round(value))).split("").map(Number);

  return (
    <span ref={ref} className={cn("inline-flex leading-none", className)}>
      <span className="sr-only">{nombre(value)}</span>

      <span aria-hidden className="flex">
        {rangs.map((chiffre, rang) => (
          <Rang
            key={rang}
            chiffre={chiffre}
            /* Le rang le plus fort part le premier. */
            delai={rang * CASCADE}
            anime={vu}
          />
        ))}
      </span>
    </span>
  );
}
