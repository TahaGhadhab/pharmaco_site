"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Apparition à l'entrée dans le viewport.
 * §11 : `prefers-reduced-motion` est respecté — le déplacement disparaît,
 * le contenu reste. Jamais d'animation qui empêche de lire.
 *
 * ── Le mouvement ──────────────────────────────────────────────────────────
 * Course un peu plus longue (34 px) et durée portée à 780 ms : l'élément se
 * pose au lieu d'arriver. Un flou de 6 px se dissipe en même temps — c'est lui
 * qui donne la sensation de flux, la translation seule paraissait sèche.
 * 780 ms reste sous le plafond de 800 ms fixé au §11.
 */

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

const DUREE = 0.78;
const FLOU = "blur(6px)";

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const offset = reduced ? OFFSET.none : OFFSET[direction];
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset, ...(reduced ? {} : { filter: FLOU }) }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(reduced ? {} : { filter: "blur(0px)" }),
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduced ? 0.2 : DUREE,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/* Décalage porté à 110 ms : les éléments d'un même groupe se suivent au lieu
   de se chevaucher. C'est ce qui fait la cascade plutôt que la salve. */
const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.11 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: FLOU },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUREE, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Conteneur qui décale l'apparition de ses `RevealItem` enfants. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={reduced ? { hidden: { opacity: 0 }, shown: { opacity: 1 } } : itemVariants}
    >
      {children}
    </motion.div>
  );
}
