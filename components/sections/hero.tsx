"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, PackageX, TriangleAlert } from "lucide-react";
import { ButtonLink, Section, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ScreenFrame } from "@/components/ui/screen-frame";
import { useScreenMode } from "@/lib/screen-mode";
import { screens } from "@/lib/screens";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Above-the-fold.
 *
 * Colonne gauche : la promesse, deux CTA, une ligne de réassurance. Rien d'autre.
 * Colonne droite : l'écran d'accueil, légèrement incliné, entouré de deux
 * fragments d'interface fabriqués en HTML — le pattern « produit en overlay »
 * de l'inspo §3.4. Ils prouvent l'application sans imiter une capture.
 */

/* ── Fragment d'interface flottant ────────────────────────────────────────
   Flottement très lent (≤ 8 px). Neutralisé en prefers-reduced-motion :
   la carte reste, seul le déplacement disparaît (§11).                     */

function FloatingCard({
  children,
  className,
  duration = 5,
  delay = 0,
  distance = 8,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  distance?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      animate={reduced ? undefined : { y: [0, -distance, 0] }}
      transition={
        reduced
          ? undefined
          : { duration, delay, repeat: Infinity, ease: "easeInOut" }
      }
      className={cn(
        "absolute z-10 hidden rounded-card bg-surface/95 p-3 shadow-float ring-1 ring-line backdrop-blur-sm sm:block",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  /* Le visuel suit l'interrupteur posé plus bas dans la page : mobile ou
     ordinateur. La colonne s'élargit d'autant, et les deux fragments se
     replacent — collés au cadre étroit, débordant du cadre large. */
  const surTelephone = useScreenMode() === "phone";

  return (
    <Section
      tone="page"
      className="overflow-hidden pb-16 pt-24 md:pb-24 md:pt-28 lg:pb-28 lg:pt-32"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
        {/* ── Promesse ─────────────────────────────────────────────────── */}
        <div>
          <Reveal>
            <Tag>Par des pharmaciens, pour des pharmaciens</Tag>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-display font-semibold text-ink">
              Douze logiciels pour vos patients.
              <br />
              {/* Surlignage post-it : le désordre passe au premier plan. */}
              <span className="relative inline-block whitespace-nowrap">
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.08em] bottom-[0.09em] h-[0.3em] -rotate-1 bg-postit/75"
                />
                <span className="relative">Zéro pour votre équipe.</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[46ch] text-lead text-ink-2">
              Tâches, ordonnances à préparer, commandes, ruptures, locations de
              matériel : tout ce qui fait tourner votre officine en interne vit
              aujourd’hui sur des post-its. PharmacoWork lui donne enfin un
              endroit où exister.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={site.urls.inscription} size="lg">
                {site.cta.primary}
              </ButtonLink>

              <ButtonLink href="#fonctionnalites" variant="secondary" size="lg">
                {site.cta.secondary}
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-(--ease-out-soft) group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="u-eyebrow mt-5 text-ink-3">
              Vit à côté de votre LGO, pas dedans · Hébergement européen
            </p>
          </Reveal>
        </div>

        {/* ── L'application ────────────────────────────────────────────── */}
        <Reveal direction="left" delay={0.1} className="relative flex justify-center">
          {/* Halo vert très diffus — le seul accent du visuel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
          >
            <div className="size-[26rem] max-w-full rounded-pill bg-primary/10 blur-3xl" />
          </div>

          {/* 360 px : la capture n'étant plus rognée, le cadre suit ses
              proportions réelles et se raccourcit. On élargit d'autant pour que
              le téléphone garde la même présence dans la colonne. */}
          <div
            className={cn(
              "relative w-full transition-[max-width] duration-[420ms] ease-(--ease-out-soft)",
              surTelephone ? "max-w-[360px]" : "max-w-[560px]",
            )}
          >
            <ScreenFrame
              slot={screens.accueil}
              phoneClassName="max-w-[360px] rotate-[-2.5deg]"
              desktopClassName="max-w-[560px] rotate-[-1.5deg]"
            />

            {/* Fragment 1 — compteur de ruptures */}
            <FloatingCard
              className={surTelephone ? "-left-8 top-16" : "-left-10 top-8"}
              duration={5.4}
              distance={7}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-danger-tint text-danger">
                  <PackageX className="size-4" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="block">
                  <span className="u-numeric block text-[1.05rem] font-semibold leading-none text-ink">
                    3
                  </span>
                  <span className="mt-1 block text-[0.72rem] leading-none text-ink-3">
                    ruptures ouvertes
                  </span>
                </span>
              </div>
            </FloatingCard>

            {/* Fragment 2 — alerte ANSM (le médicament, jamais la présentation) */}
            <FloatingCard
              className={cn(
                "w-[13.5rem]",
                surTelephone ? "-right-6 bottom-24" : "-right-8 -bottom-6",
              )}
              duration={6}
              delay={0.8}
              distance={6}
            >
              <div className="flex items-start gap-2.5">
                <span className="relative flex size-8 shrink-0 items-center justify-center rounded-pill bg-warning-tint text-warning">
                  <TriangleAlert
                    className="size-4"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {/* Pastille d'alerte — halo repris du design system */}
                  <span
                    className="absolute -right-0.5 -top-0.5 flex size-2"
                    aria-hidden
                  >
                    <span className="motion-halo absolute inset-0 animate-(--animate-halo) rounded-pill bg-warning" />
                    <span className="relative size-2 rounded-pill bg-warning" />
                  </span>
                </span>
                <span className="block">
                  <span className="u-eyebrow block text-ink-3">Alerte ANSM</span>
                  <span className="mt-1 block text-[0.78rem] font-medium leading-snug text-ink">
                    Tension d’approvisionnement
                  </span>
                </span>
              </div>
            </FloatingCard>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
