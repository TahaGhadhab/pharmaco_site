"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, PackageX, TriangleAlert } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { ButtonLink, Section, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ScreenFrame } from "@/components/ui/screen-frame";
import { ADHERENTS, estPublie } from "@/lib/adherents";
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

/* ── Une cellule du parc ──────────────────────────────────────────────────
   Le libellé passe au vert et non au gris : en gris, posé sous les boutons, le
   bloc se lisait comme une deuxième ligne de réassurance — une mention de bas
   de page, pas une preuve. L'accent le fait exister.

   Aucune réserve de hauteur sur le libellé : « OFFICINES ACTIVES » passe à deux
   lignes en dessous de 360 px, mais les nombres sont en haut de cellule et les
   libellés démarrent à la même ligne de base. Rien ne se désaligne, et réserver
   deux lignes ne servait qu'à creuser un vide sur les écrans où il en tient une.
                                                                              */

function Parc({ valeur, libelle }: { valeur: number; libelle: string }) {
  return (
    <div className="px-4 py-4 sm:px-5 sm:py-5">
      <Counter
        value={valeur}
        className="u-numeric text-[2rem] font-semibold text-ink sm:text-[2.4rem]"
      />
      <p className="u-eyebrow mt-2.5 leading-[1.35] text-primary-deep">
        {libelle}
      </p>
    </div>
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
            {/* ── Pourquoi une taille en `vw` sur petit écran ────────────────
                La deuxième ligne est insécable, et c'est le surlignage post-it
                qui l'impose : la bande est un calque posé sur la ligne, elle ne
                sait pas se couper en deux.

                Or « Zéro pour votre équipe. » mesure 10,27 em — mesuré, pas
                estimé. À la taille que `text-display` donne sur un téléphone,
                elle est donc plus large que sa colonne, et comme un élément de
                grille a `min-width: auto`, c'est la grille entière qui
                s'élargissait. L'`overflow-hidden` de la section rognait le
                débord : sur 360 px on ne lisait pas la fin du titre. Le calcul
                donne le seuil exact — en dessous de 425 px de viewport, ça ne
                tenait sur aucun téléphone.

                8,5vw laisse 3 % de marge sur toute la plage, jusqu'aux 320 px
                du plus petit écran encore en service. Seule la taille est
                reprise : l'interlignage et l'approche continuent de venir de
                `text-display`, qui reprend la main à partir de 451 px — le
                raccord est à 1 px près, et le desktop est intact. */}
            <h1 className="mt-6 text-display font-semibold text-ink max-[450px]:text-[8.5vw]">
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

          {/* ── Le parc, sous les deux boutons ───────────────────────────────
              Position choisie : c'est juste après avoir lu la promesse et vu le
              bouton que le visiteur se demande « qui d'autre s'en sert ». Le
              bloc n'ajoute qu'une rangée — pas une section — et la même rangée
              sert aux deux vues : deux nombres côte à côte tiennent dans les
              328 px d'un téléphone comme dans la colonne du desktop. Seule
              l'échelle du chiffre change, pour qu'il ne rivalise pas avec le
              titre sur petit écran.

              À zéro, `estPublie` retire le bloc — même garde que la section
              avis. Voir `lib/adherents.ts` : le chiffre est réel et ne progresse
              jamais tout seul. */}
          {estPublie ? (
            <Reveal delay={0.24}>
              {/* Une plaque, pas deux lignes de texte. Elle emprunte son
                  traitement à la carte de la formule conseillée — lavis vert
                  qui descend du haut, trame `u-grid-faint` par-dessus — pour
                  que la page n'ait qu'un seul vocabulaire pour ses encarts.

                  Bridée à 26 rem : dans la colonne du hero, une plaque étirée
                  sur 576 px redevient une barre. Sur téléphone, elle prend la
                  largeur disponible et les deux cellules se partagent la
                  rangée — la même structure sert aux deux vues. */}
              <div className="relative mt-9 max-w-[26rem] overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-line">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-primary-tint/45 to-transparent"
                />
                <span
                  aria-hidden
                  className="u-grid-faint pointer-events-none absolute inset-0 opacity-40"
                />

                <div className="relative grid grid-cols-2 divide-x divide-line">
                  <Parc
                    valeur={ADHERENTS.officines}
                    libelle="Officines actives"
                  />
                  <Parc valeur={ADHERENTS.membres} libelle="Membres actifs" />
                </div>

                {/* Aucune date affichée, et c'est délibéré — voir
                    `lib/adherents.ts`. Une date figée se périme ; une date qui
                    suivrait l'horloge affirmerait chaque matin qu'un relevé a eu
                    lieu ce matin-là, alors que le chiffre n'aurait pas bougé.
                    Un décompte au présent n'affirme rien sur sa fraîcheur : il
                    suffit qu'il soit vrai. */}
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.3}>
            <p className="u-eyebrow mt-6 text-ink-3">
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

          {/* La capture accueil.webp ne fait que 325 px de large : au-delà,
              le cadre l'agrandit et la netteté s'en va. On plafonne donc à sa
              résolution native plutôt qu'à la largeur qu'on voudrait lui
              donner visuellement. */}
          <div
            className={cn(
              "relative w-full transition-[max-width] duration-[420ms] ease-(--ease-out-soft)",
              surTelephone ? "max-w-[320px]" : "max-w-[560px]",
            )}
          >
            {/* L'inclinaison n'existe qu'à partir de `sm`. Sous 640 px, le cadre
                occupe déjà toute la largeur disponible : le faire pivoter de
                2,5° élargit son emprise d'une trentaine de pixels, que
                l'`overflow-hidden` de la section rogne — on voyait un coin de
                téléphone coupé net. Droit, il entre entier. */}
            <ScreenFrame
              slot={screens.accueil}
              phoneClassName="max-w-[320px] sm:rotate-[-2.5deg]"
              desktopClassName="max-w-[560px] sm:rotate-[-1.5deg]"
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
