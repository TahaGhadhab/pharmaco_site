"use client";

import { useId, useState } from "react";
import {
  ChevronDown,
  FileText,
  ListChecks,
  Package,
  PlayCircle,
  ShoppingCart,
  UserRound,
  ZoomIn,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  IconBadge,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Visionneuse } from "@/components/ui/visionneuse";
import { MODULES_TUTORIELS, type ModuleTutoriel, type Tutoriel } from "@/lib/tutoriels";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   Tutoriels — un module par section, un tutoriel par accordéon.

   ┌─ POURQUOI DES ACCORDÉONS ───────────────────────────────────────────────┐
   │ Quinze captures dépliées d'un coup font exactement le mur que le client  │
   │ ne veut pas. On n'ouvre que ce qu'on est venu chercher : le premier      │
   │ tutoriel de chaque module est ouvert, les autres attendent qu'on les     │
   │ demande. C'est la règle « si un contenu est long, il se déplie ».        │
   └──────────────────────────────────────────────────────────────────────────┘

   Les captures ont leur fond détouré (`scripts/preparer-tutoriels.mjs`) : la
   surface derrière le téléphone vient de la page, et suit donc le thème.
   Aucune n'est rognée — `h-auto`, comme dans `ScreenFrame`.
   ══════════════════════════════════════════════════════════════════════════ */

const ICONES = {
  session: PlayCircle,
  taches: ListChecks,
  ordonnances: FileText,
  commandes: ShoppingCart,
  locations: Package,
  profil: UserRound,
} as const;

/**
 * Icône du module.
 *
 * Composant à part, et non un `const Icone = ICONES[id]` au milieu du rendu :
 * un type de composant fabriqué pendant le rendu change d'identité à chaque
 * passe, ce qui force React à démonter et remonter le sous-arbre.
 * Un module sans icône déclarée reste lisible — on retombe sur la coche.
 */
function IconeModule({ id }: { id: string }) {
  const Icone = ICONES[id as keyof typeof ICONES] ?? ListChecks;
  return <Icone className="size-5" strokeWidth={1.75} aria-hidden />;
}

/* ── Une étape ─────────────────────────────────────────────────────────────*/

function Etape({
  numero,
  image,
  alt,
  legende,
  onOuvrir,
}: {
  numero: number;
  image: string;
  alt: string;
  legende: string;
  onOuvrir: () => void;
}) {
  return (
    <figure className="flex flex-col gap-4">
      {/* La vignette est un bouton : à 300 px de large, on reconnaît un écran
          mais on ne lit pas un libellé. Le clic ouvre la visionneuse. */}
      <button
        type="button"
        onClick={onOuvrir}
        aria-label={`Agrandir l'étape ${numero} : ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-card bg-surface-muted ring-1 ring-line transition-[transform,box-shadow] duration-200 ease-(--ease-out-soft) hover:-translate-y-0.5 hover:shadow-raised"
      >
        <span
          aria-hidden
          className="u-numeric absolute left-3 top-3 z-10 rounded-pill bg-surface px-2.5 py-1 text-[0.7rem] text-ink-3 shadow-card ring-1 ring-line"
        >
          {String(numero).padStart(2, "0")}
        </span>

        {/* Loupe : l'affordance du clic. Discrète au repos, franche au survol —
            au doigt, il n'y a pas de survol, elle reste donc toujours visible. */}
        <span
          aria-hidden
          className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-pill bg-surface/90 text-ink-3 shadow-card ring-1 ring-line backdrop-blur-sm transition-colors duration-200 ease-(--ease-out-soft) group-hover:bg-primary group-hover:text-white dark:group-hover:text-[#06120c]"
        >
          <ZoomIn className="size-4" strokeWidth={1.75} />
        </span>

        {/* Captures livrées en 500 × 500, fond détouré. `next/image` n'apporte
            rien ici : le fichier est déjà à sa taille d'affichage et pèse
            une dizaine de kilo-octets. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </button>

      <figcaption className="text-[0.9rem] leading-relaxed text-ink-2">
        <span className="u-eyebrow mr-2 text-primary-deep">
          Étape {numero}
        </span>
        {legende}
      </figcaption>
    </figure>
  );
}

/* ── Un tutoriel ───────────────────────────────────────────────────────────*/

function Accordeon({
  tutoriel,
  index,
  ouvert,
  onToggle,
}: {
  tutoriel: Tutoriel;
  index: number;
  ouvert: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const base = useId();
  const boutonId = `${base}-b`;
  const panneauId = `${base}-p`;
  /** Étape ouverte en grand. `null` = visionneuse fermée. */
  const [vue, setVue] = useState<number | null>(null);

  return (
    <div>
      <h3>
        <button
          type="button"
          id={boutonId}
          aria-expanded={ouvert}
          aria-controls={panneauId}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 py-5 text-left transition-colors duration-200 ease-(--ease-out-soft) sm:gap-5"
        >
          <span
            aria-hidden
            className={cn(
              "u-numeric flex size-9 shrink-0 items-center justify-center rounded-pill text-[0.75rem]",
              "transition-colors duration-200 ease-(--ease-out-soft)",
              ouvert
                ? "bg-primary-tint text-primary-strong"
                : "bg-surface-muted text-ink-3 group-hover:bg-primary-tint group-hover:text-primary-strong",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[1.02rem] font-medium tracking-tight text-ink transition-colors duration-200 group-hover:text-primary-strong">
              {tutoriel.titre}
            </span>
            <span className="mt-1 block text-[0.875rem] text-ink-3">
              {tutoriel.resume}
            </span>
          </span>

          <span className="u-numeric hidden shrink-0 text-[0.72rem] text-ink-4 sm:block">
            {tutoriel.etapes.length} étape
            {tutoriel.etapes.length > 1 ? "s" : ""}
          </span>

          <span
            aria-hidden
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-pill bg-surface-muted text-ink-3",
              "transition-[transform,background-color,color] duration-200 ease-(--ease-out-soft)",
              "group-hover:bg-primary-tint group-hover:text-primary-strong",
              ouvert && "rotate-180",
            )}
          >
            <ChevronDown className="size-4" strokeWidth={1.75} />
          </span>
        </button>
      </h3>

      <motion.div
        id={panneauId}
        role="region"
        aria-labelledby={boutonId}
        inert={!ouvert}
        initial={false}
        animate={{ height: ouvert ? "auto" : 0, opacity: ouvert ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="grid gap-8 pb-10 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {tutoriel.etapes.map((etape, rang) => (
            <Etape
              key={etape.image}
              numero={rang + 1}
              image={etape.image}
              alt={etape.alt}
              legende={etape.legende}
              onOuvrir={() => setVue(rang)}
            />
          ))}
        </div>
      </motion.div>

      {/* Hors du panneau : il porte `inert` quand il est replié, et se ferme
          par une animation de hauteur. La visionneuse, elle, s'affiche par
          portail dans `<body>` — elle n'a rien à faire dans ce flux. */}
      <Visionneuse
        vues={tutoriel.etapes}
        index={vue}
        onIndex={setVue}
        onFermer={() => setVue(null)}
        titre={tutoriel.titre}
      />
    </div>
  );
}

/* ── Un module ─────────────────────────────────────────────────────────────*/

function ModuleSection({
  module,
  tone,
}: {
  module: ModuleTutoriel;
  tone: "page" | "surface";
}) {
  /* Le premier tutoriel est ouvert : la section montre d'emblée à quoi
     ressemble un tutoriel, sans obliger à cliquer pour le découvrir. */
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <Section id={module.id} tone={tone}>
      <Reveal>
        <div className="flex items-start gap-4 sm:gap-5">
          <IconBadge>
            <IconeModule id={module.id} />
          </IconBadge>
          <SectionHeading
            eyebrow={`Module ${module.nom}`}
            title={module.titre}
            lead={module.chapeau}
          />
        </div>
      </Reveal>

      <RevealGroup className="mt-10 md:mt-12">
        <RevealItem>
          <div className="divide-y divide-line border-y border-line">
            {module.tutoriels.map((tutoriel, index) => (
              <Accordeon
                key={tutoriel.id}
                tutoriel={tutoriel}
                index={index}
                ouvert={ouvert === index}
                onToggle={() => setOuvert(ouvert === index ? null : index)}
              />
            ))}
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}

/* ── La page ───────────────────────────────────────────────────────────────*/

export function Tutoriels() {
  return (
    <>
      {MODULES_TUTORIELS.map((module, index) => (
        <ModuleSection
          key={module.id}
          module={module}
          tone={index % 2 === 0 ? "page" : "surface"}
        />
      ))}
    </>
  );
}
