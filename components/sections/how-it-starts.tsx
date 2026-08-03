"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

/**
 * « Comment ça commence » — §10 du contexte.
 *
 * Le parcours réel : demande → validation manuelle → lien d'activation → officine ouverte.
 * La validation manuelle est assumée comme un atout de sélection (§5.5 de l'argumentaire),
 * jamais présentée comme une friction.
 *
 * Motion : la ligne de liaison se trace à l'entrée dans le viewport,
 * neutralisée sous `prefers-reduced-motion` (§11).
 */

const ETAPES = [
  {
    numero: "01",
    titre: "Vous déposez une demande",
    phrase: "Le formulaire demande le FINESS de votre établissement, et votre effectif.",
  },
  {
    numero: "02",
    titre: "Nous la validons à la main",
    phrase: "Nous lisons chaque demande. Aucun compte n'est créé avant cette étape.",
  },
  {
    numero: "03",
    titre: "Vous recevez un lien d'activation",
    phrase: "Il arrive par email et reste valable sept jours.",
  },
  {
    numero: "04",
    titre: "Vous ouvrez votre officine",
    phrase: "Vous en devenez titulaire, puis vous invitez votre équipe par email.",
  },
];

function Connecteur({ delai, reduced }: { delai: number; reduced: boolean }) {
  const transition = {
    duration: reduced ? 0 : 0.7,
    delay: reduced ? 0 : delai,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <>
      {/* Frise verticale — mobile */}
      <motion.span
        aria-hidden
        className="mt-2 w-px flex-1 origin-top bg-line md:hidden"
        initial={{ scaleY: reduced ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={transition}
      />
      {/* Frise horizontale — desktop */}
      <motion.span
        aria-hidden
        className="ml-4 hidden h-px flex-1 origin-left bg-line md:block"
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={transition}
      />
    </>
  );
}

export function HowItStarts() {
  const reduced = useReducedMotion() ?? false;

  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          eyebrow="Le parcours"
          title="Comment ça commence."
          lead="Quatre étapes, et une personne au bout du fil à la deuxième."
        />
      </Reveal>

      <ol className="mt-12 grid md:mt-16 md:grid-cols-4 md:gap-x-6">
        {ETAPES.map((etape, index) => (
          <li key={etape.numero} className="relative flex gap-5 md:flex-col md:gap-0">
            <div className="flex shrink-0 flex-col items-center md:w-full md:flex-row md:items-center">
              <span className="u-numeric flex size-11 shrink-0 items-center justify-center rounded-pill bg-primary-tint text-[0.9rem] font-semibold text-primary-strong">
                {etape.numero}
              </span>
              {index < ETAPES.length - 1 ? (
                <Connecteur delai={index * 0.12} reduced={reduced} />
              ) : null}
            </div>

            <div className="pb-10 md:pb-0 md:pr-6 md:pt-6">
              <h3 className="text-[1.02rem] font-semibold tracking-tight text-ink">
                {etape.titre}
              </h3>
              <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-2">
                {etape.phrase}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Reveal delay={0.12}>
        <p className="mt-4 max-w-[46ch] border-l-2 border-primary pl-6 text-h3 font-semibold text-ink md:mt-10">
          Chaque officine est validée à la main.{" "}
          <span className="font-normal text-ink-2">
            Nous savons qui est sur la plateforme, et vous aussi.
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
