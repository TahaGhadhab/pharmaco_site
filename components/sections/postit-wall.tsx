"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Le constat — mur de post-its retournables.
 *
 * Chaque post-it porte une information qui n'attend qu'une chose : se perdre.
 * On le retourne, il devient la fiche PharmacoWork correspondante.
 * La démonstration se fait par le geste, pas par le paragraphe.
 *
 * Deux points de vigilance tenus ici :
 *  · **Accessibilité** — `backface-visibility` masque une face à l'œil mais la
 *    laisse dans l'arbre d'accessibilité : un lecteur d'écran lirait les deux
 *    faces d'un bloc. La face cachée porte donc `aria-hidden` piloté par l'état.
 *  · **Véracité** — les versos ne décrivent que des mécanismes réellement
 *    construits (§16). Pas de relance automatique, pas d'accusé de lecture,
 *    pas de litige généré tout seul : ça n'existe pas dans le produit.
 */

type Postit = {
  /** Ce qui est griffonné sur le papier. `\n` = retour à la ligne. */
  recto: string;
  tilt: string;
  verso: {
    module: string;
    titre: string;
    acteur: string;
    detail: string;
    statut: string;
  };
};

const POSTITS: Postit[] = [
  {
    recto: "Rappeler Mme D.\ntire-lait ??",
    tilt: "-2deg",
    verso: {
      module: "Locations",
      titre: "Tire-lait — 2 périodes restant dues",
      acteur: "WY",
      detail: "Solde 84,00 €",
      statut: "Restitution bloquée",
    },
  },
  {
    recto: "RUPTURE amox 500\n→ voir substitut ?",
    tilt: "1.5deg",
    verso: {
      module: "Ruptures",
      titre: "Amoxicilline 500 — alternative proposée",
      acteur: "OD",
      detail: "Visible par toute l’équipe",
      statut: "Suivie à l’ANSM",
    },
  },
  {
    recto: "Cmde grossiste\npassée ???",
    tilt: "-1deg",
    verso: {
      module: "Commandes",
      titre: "Commande fournisseur — 42 lignes",
      acteur: "GA",
      detail: "Livraison attendue demain",
      statut: "En cours",
    },
  },
  {
    recto: "Léa en congés lundi\n→ qui reprend ?",
    tilt: "2deg",
    verso: {
      module: "Congés",
      titre: "Absence approuvée — planning à jour",
      acteur: "SL",
      detail: "3 tâches réassignées",
      statut: "Confirmé",
    },
  },
  {
    recto: "Préparer l’ordonnance\nde M. Dupont",
    tilt: "-2.5deg",
    verso: {
      module: "Tâches",
      titre: "Ordonnance de M. Dupont — à préparer",
      acteur: "WY",
      detail: "Échéance aujourd’hui 14 h",
      statut: "Assignée",
    },
  },
  {
    recto: "Dire à l’équipe\nde l’aprem que…",
    tilt: "1deg",
    verso: {
      module: "Actualités",
      titre: "Consigne publiée au journal interne",
      acteur: "SL",
      detail: "Notification envoyée à l’équipe",
      statut: "Publiée",
    },
  },
];

function FlipCard({ postit }: { postit: Postit }) {
  const [flipped, setFlipped] = useState(false);
  const { recto, tilt, verso } = postit;

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-expanded={flipped}
      aria-label={
        flipped
          ? `${verso.module} : ${verso.titre}. Revenir au post-it.`
          : `Post-it : ${recto.replace(/\n/g, " ")}. Voir ce que ça devient dans PharmacoWork.`
      }
      className="group min-h-[12rem] w-full cursor-pointer text-left [perspective:1200px] focus-visible:outline-none sm:min-h-[13rem]"
    >
      <div
        className={cn(
          "relative h-full min-h-[12rem] w-full transition-transform duration-[550ms] ease-(--ease-in-out-soft) [transform-style:preserve-3d] sm:min-h-[13rem]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* ── Recto : le papier ─────────────────────────────────────────── */}
        <div
          aria-hidden={flipped}
          style={{ rotate: tilt }}
          className={cn(
            "absolute inset-0 flex flex-col rounded-[4px] p-3.5 [backface-visibility:hidden] sm:p-5",
            "bg-postit text-postit-ink",
            "shadow-[0_8px_18px_var(--pw-postit-edge)]/35",
            "transition-transform duration-300 ease-(--ease-out-soft) group-hover:scale-[1.015]",
          )}
        >
          {/* Bout de scotch */}
          <span
            className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-2 bg-white/55 ring-1 ring-black/5 sm:w-20"
            aria-hidden
          />
          <span className="whitespace-pre-line text-[0.92rem] font-semibold leading-snug sm:text-[1.02rem]">
            {recto}
          </span>
          <span className="u-eyebrow mt-auto self-end text-postit-ink/55">
            Cliquer
          </span>
        </div>

        {/* ── Verso : la fiche ──────────────────────────────────────────── */}
        <div
          aria-hidden={!flipped}
          className={cn(
            "absolute inset-0 flex flex-col gap-2 rounded-card bg-surface p-3.5 sm:gap-2.5 sm:p-5",
            "shadow-float ring-1 ring-line [backface-visibility:hidden] [transform:rotateY(180deg)]",
          )}
        >
          <span className="u-eyebrow self-start rounded-pill bg-primary-tint px-2 py-1 text-primary-strong sm:px-2.5">
            {verso.module}
          </span>

          <span className="text-[0.86rem] font-semibold leading-snug text-ink sm:text-[0.98rem]">
            {verso.titre}
          </span>

          <span className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1.5 sm:gap-x-3 sm:gap-y-2">
            <span className="inline-flex size-6 items-center justify-center rounded-pill bg-primary-cta text-[0.58rem] font-bold text-white dark:text-[#06120c]">
              {verso.acteur}
            </span>
            <span className="u-numeric text-[0.68rem] text-ink-3">
              {verso.detail}
            </span>
            <span className="u-eyebrow text-primary-deep">{verso.statut}</span>
          </span>
        </div>
      </div>
    </button>
  );
}

export function PostitWall() {
  return (
    <Section id="probleme" tone="page">
      <Reveal>
        <SectionHeading
          eyebrow="Le constat"
          title="Ça vous rappelle quelque chose ?"
          lead="Chaque post-it est une information qui n’attend qu’une chose : se perdre. Cliquez dessus."
        />
      </Reveal>

      {/* Deux colonnes dès le téléphone, et ce n'est pas qu'une question de
          longueur : six post-its pleine largeur, empilés, ne forment pas un mur
          — ils forment une liste. À deux colonnes, on retrouve le tableau de
          liège, et la section perd au passage 700 px de défilement. */}
      <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-3">
        {POSTITS.map((postit) => (
          <RevealItem key={postit.recto}>
            <FlipCard postit={postit} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-[46ch] text-h3 font-semibold leading-snug text-ink sm:mt-14">
          Le post-it n’a ni responsable, ni échéance, ni mémoire.{" "}
          <span className="text-primary">PharmacoWork donne les trois.</span>
        </p>
      </Reveal>
    </Section>
  );
}
