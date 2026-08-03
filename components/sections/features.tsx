"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ScreenFrame } from "@/components/ui/screen-frame";
import { screens, type ScreenSlot } from "@/lib/screens";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   Fonctionnalités phares — bande horizontale, hauteur fixe.

   L'ancienne version empilait quatre blocs texte/visuel : plus de 2 000 px de
   défilement vertical pour quatre idées. Ici, les quatre tiennent sur une seule
   rangée d'environ 430 px de haut. La page ne s'allonge plus.

   Au repos : la capture, et rien d'autre. Au survol (ou au clavier, ou au
   toucher) : un volet monte du bas et donne le titre et deux phrases.

   Ordre imposé par le §7 de ARGUMENTAIRE_VENTE.md — l'argent d'abord.
   ══════════════════════════════════════════════════════════════════════════ */

type Feature = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  slot: ScreenSlot;
};

const FEATURES: readonly Feature[] = [
  {
    eyebrow: "Locations",
    title: "Le matériel ne se rend pas tant qu'il n'est pas payé.",
    description:
      "Chaque location est découpée en périodes qui avancent avec le calendrier. La restitution est refusée tant que le solde n'est pas nul — et le montant qui manque est affiché.",
    slot: screens.location,
  },
  {
    eyebrow: "Référentiel CIP13",
    title: "Scannez la boîte. Le nom s'écrit tout seul.",
    description: (
      <>
        <span className="u-numeric font-medium text-ink">{"20 869"}</span>{" "}
        présentations embarquées, lues au code-barres EAN-13 ou au Data Matrix
        GS1. Aucun lecteur à acheter : le téléphone de l&rsquo;équipe suffit.
      </>
    ),
    slot: screens.scan,
  },
  {
    eyebrow: "Ruptures nationales",
    title: "Cette nuit, l'ANSM vous a répondu.",
    description:
      "Le fichier officiel de disponibilité est rechargé chaque nuit. Mais vous n'êtes prévenu qu'un médicament fait l'objet d'une tension que s'il s'agit d'un médicament que vous suivez déjà.",
    slot: screens.ruptures,
  },
  {
    eyebrow: "Saisie automatique",
    title: "L'agenda écrit à votre place.",
    description:
      "Aucun champ de saisie : il lit vos échéances, vos livraisons et vos fins de location là où elles sont déjà. Les heures réelles montent du pointage.",
    slot: screens.planning,
  },
];

function Carte({
  feature,
  index,
  actif,
  onActiver,
  onDesactiver,
}: {
  feature: Feature;
  index: number;
  actif: boolean;
  onActiver: () => void;
  onDesactiver: () => void;
}) {
  const reduced = useReducedMotion();
  const { eyebrow, title, description, slot } = feature;

  return (
    <button
      type="button"
      onMouseEnter={onActiver}
      onMouseLeave={onDesactiver}
      onFocus={onActiver}
      onBlur={onDesactiver}
      onClick={() => (actif ? onDesactiver() : onActiver())}
      aria-expanded={actif}
      className={cn(
        "group relative shrink-0 snap-start overflow-hidden text-left",
        "h-[30rem] w-[18rem] sm:h-[33rem] sm:w-[19.5rem]",
        "rounded-sheet bg-primary-tint-2 ring-1 ring-line dark:bg-surface-muted",
        "transition-[box-shadow,transform] duration-300 ease-(--ease-out-soft)",
        actif && "shadow-float",
      )}
    >
      <div className="u-grid-faint absolute inset-0 opacity-70" aria-hidden />

      {/* La capture — elle glisse doucement vers le haut quand le volet monte,
          pour qu'on la voie encore entièrement au lieu d'être coupée. */}
      <motion.div
        animate={reduced ? undefined : { y: actif ? -30 : 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex justify-center px-4 pt-7 sm:px-5"
      >
        <ScreenFrame slot={slot} className="max-w-[224px] sm:max-w-[248px]" />
      </motion.div>

      {/* Barre au repos : le seul texte visible tant qu'on ne survole pas. */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 py-4",
          "bg-linear-to-t from-page via-page/95 to-transparent pt-10 dark:from-surface-muted dark:via-surface-muted/95",
          "transition-opacity duration-300 ease-(--ease-out-soft)",
          actif ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="u-eyebrow text-primary-deep">{eyebrow}</span>
        <span className="flex size-6 items-center justify-center rounded-pill bg-primary-tint text-primary-strong">
          <Plus className="size-3.5" strokeWidth={2.5} aria-hidden />
        </span>
      </div>

      {/* Volet explicatif. Toujours dans le DOM — seulement déplacé hors du
          cadre — donc lu par les lecteurs d'écran quel que soit l'état. */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-5 pt-8",
          "bg-linear-to-t from-surface via-surface/97 to-transparent",
          "transition-transform duration-[420ms] ease-(--ease-out-soft)",
          actif ? "translate-y-0" : "translate-y-full",
        )}
      >
        <span className="u-eyebrow text-primary-deep">{eyebrow}</span>
        <span className="text-[1.1rem] font-semibold leading-snug text-ink">
          {title}
        </span>
        <span className="text-[0.9rem] leading-relaxed text-ink-2">
          {description}
        </span>
        <span className="u-numeric mt-1 text-[0.68rem] text-ink-4">
          {String(index + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
        </span>
      </div>
    </button>
  );
}

export function Features() {
  const [actif, setActif] = useState<number | null>(null);

  return (
    <Section id="fonctionnalites" containerClassName="max-w-none px-0">
      <div className="mx-auto w-full max-w-(--container-page) px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Ce que fait l'application"
            title="Quatre mécanismes. Vérifiables en dix minutes."
            lead="Passez sur une capture pour savoir ce qu'elle fait."
          />
        </Reveal>
      </div>

      {/* La piste est `w-max mx-auto` dans un conteneur qui défile : les marges
          automatiques centrent la rangée quand elle tient, et retombent à zéro
          quand elle déborde. `justify-center` sur le conteneur lui-même aurait
          rogné la première carte au lieu de la laisser atteignable. */}
      <div
        className={cn(
          "mt-10 snap-x snap-mandatory overflow-x-auto scroll-smooth",
          "px-4 pb-4 sm:px-6",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <div className="mx-auto flex w-max gap-4 sm:gap-5">
          {FEATURES.map((feature, index) => (
            <Carte
              key={feature.eyebrow}
              feature={feature}
              index={index}
              actif={actif === index}
              onActiver={() => setActif(index)}
              onDesactiver={() => setActif((v) => (v === index ? null : v))}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
