"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Video } from "lucide-react";
import { ButtonLink, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Segmented, type SegmentedOption } from "@/components/ui/segmented";
import { lienVisio, site, type MotifVisio } from "@/lib/site";

/**
 * Demande de visio avec le service clients.
 *
 * Deux motifs, un seul geste : la bascule segmentée change le panneau, le
 * bouton ouvre un `mailto:` déjà rempli (objet, officine, disponibilités) —
 * voir `lienVisio` dans `lib/site.ts`. Aucun formulaire n'est branché sur la
 * vitrine, et on n'en simule pas un : un champ qui n'envoie rien est pire
 * qu'un lien qui envoie vraiment.
 *
 * ⛔ Aucune durée, aucun délai de réponse, aucun nom d'outil de visio : ce
 * sont des engagements commerciaux que le client n'a pas arrêtés. La page
 * promet un échange, pas un horaire.
 */

type Motif = {
  id: MotifVisio;
  onglet: string;
  description: string;
  icone: typeof Video;
  titre: string;
  texte: string;
  points: readonly string[];
  cta: string;
};

const MOTIFS: readonly Motif[] = [
  {
    id: "decouverte",
    onglet: "Découverte",
    description: "Voir l'application en visio avec le service clients",
    icone: Video,
    titre: "On vous montre l’application en direct.",
    texte:
      "Le service clients ouvre l’application et la parcourt avec vous. Vous posez vos questions au fil des écrans, sur vos propres cas.",
    points: [
      "Les modules qui concernent votre officine, dans l’ordre que vous voulez",
      "Ce que PharmacoWork fait, et ce qu’il laisse à votre LGO",
      "Ce qui reste à saisir à la main, sans détour",
    ],
    cta: "Demander une visio de découverte",
  },
  {
    id: "priseEnMain",
    onglet: "Initiation",
    description: "Faire prendre le logiciel en main par l'équipe, en visio",
    icone: GraduationCap,
    titre: "On met votre équipe dessus.",
    texte:
      "Une séance d’initiation pour celles et ceux qui s’en serviront tous les jours. On part de votre officine, pas d’un jeu de démonstration.",
    points: [
      "Le réglage des sept rôles et de la grille des droits",
      "Le scan d’une boîte et la déclaration d’une rupture",
      "Le pointage, et le planning qu’il alimente",
      "Les questions de l’équipe, pendant la séance",
    ],
    cta: "Demander une initiation",
  },
];

const ONGLETS: readonly SegmentedOption<MotifVisio>[] = MOTIFS.map((motif) => ({
  id: motif.id,
  label: motif.onglet,
  description: motif.description,
}));

export function Visio() {
  const [motifChoisi, setMotifChoisi] = useState<MotifVisio>("decouverte");
  const reduced = useReducedMotion();

  const motif = MOTIFS.find((item) => item.id === motifChoisi) ?? MOTIFS[0];
  const Icone = motif.icone;

  /* `tone="page"` : la section s'intercale entre les tarifs (tint) et les avis
     (surface) — trois fonds différents à la suite, jamais deux fois le même.
     La carte passe donc en `bg-surface` pour se détacher du fond. */
  return (
    <Section id="visio" tone="page">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <SectionHeading
              eyebrow="Visio"
              title="Parlons-en de vive voix. Écran partagé."
              lead={
                <>
                  Choisissez le motif : nous vous répondons par email avec un créneau
                  et un lien. Si vous préférez écrire,{" "}
                  <Link
                    href={site.urls.contact}
                    className="font-medium text-primary-deep underline underline-offset-4 transition-colors duration-200 hover:text-primary-strong"
                  >
                    l’adresse du service clients
                  </Link>{" "}
                  fonctionne aussi.
                </>
              }
            />

            <p className="u-eyebrow mt-8 text-ink-3">
              Sans engagement · Aucune inscription préalable
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-7" delay={0.08}>
          {/* Deux onglets à parts égales sur téléphone : ce sont eux qui pilotent
              tout le panneau en dessous, ils ne peuvent pas être la plus petite
              cible de la section. */}
          <Segmented
            options={ONGLETS}
            value={motifChoisi}
            onChange={setMotifChoisi}
            ariaLabel="Motif de la visio"
            fill
          />

          {/* `mode="wait"` : le panneau sortant s'efface avant que l'entrant
              arrive — deux textes superposés ne se lisent ni l'un ni l'autre. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={motif.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{
                duration: reduced ? 0.15 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 rounded-card bg-surface p-5 shadow-card ring-1 ring-line sm:mt-6 sm:p-8"
            >
              <span className="flex size-11 items-center justify-center rounded-pill bg-primary-tint text-primary-strong">
                <Icone className="size-5" strokeWidth={1.75} aria-hidden />
              </span>

              <h3 className="mt-5 max-w-[24ch] text-h3 font-semibold text-ink">
                {motif.titre}
              </h3>

              <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-2">
                {motif.texte}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {motif.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <Check
                      className="mt-0.5 size-4.5 shrink-0 text-primary-strong"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="text-[0.92rem] leading-relaxed text-ink-3">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href={lienVisio(motif.id)} size="lg">
                  {motif.cta}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 ease-(--ease-out-soft) group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </ButtonLink>

                <p className="text-[0.85rem] leading-relaxed text-ink-4">
                  Ouvre un email pré-rempli. Vous complétez, vous envoyez.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  );
}
