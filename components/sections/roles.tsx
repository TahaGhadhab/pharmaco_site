"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, GraduationCap, Minus, SlidersHorizontal } from "lucide-react";
import {
  IconBadge,
  Section,
  SectionHeading,
  Tag,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   Les sept rôles — §2 du contexte produit.

   Onglets plutôt que tableau : à 7 rôles × N droits, un tableau devient
   illisible sur téléphone (AGENTS.md — « si un contenu est long, il se
   déplie »). Ici la liste défile horizontalement en mobile, se pose en
   colonne à partir de md, et pilote un seul panneau.
   ══════════════════════════════════════════════════════════════════════════ */

type Role = {
  id: string;
  name: string;
  profile: string;
  summary: string;
  /** Rôle d'apprentissage : consultation seule par défaut. */
  learning?: boolean;
  allow: readonly string[];
  deny: readonly string[];
};

const ROLES: readonly Role[] = [
  {
    id: "etudiant",
    name: "Étudiant",
    profile: "Étudiant en pharmacie",
    summary: "Il voit comment l'officine travaille. Il n'y touche pas.",
    learning: true,
    allow: [
      "Consulte les modules ouverts à son officine",
      "Comprend l'organisation sans avoir à la demander",
    ],
    deny: ["Aucune écriture, dans aucun module"],
  },
  {
    id: "stagiaire",
    name: "Stagiaire",
    profile: "Stagiaire en officine",
    summary: "Consultation seule, le temps du stage.",
    learning: true,
    allow: [
      "Suit ce qui est en cours sans rien modifier",
      "Prend l'officine en marche, sans risque de fausse manœuvre",
    ],
    deny: ["Aucune écriture, dans aucun module"],
  },
  {
    id: "rayonniste",
    name: "Rayonniste",
    profile: "Mise en rayon et réassort",
    summary: "L'approvisionnement, et rien d'autre.",
    allow: [
      "Commandes fournisseurs",
      "Ruptures déclarées et alternatives proposées",
    ],
    deny: ["Ordonnances", "Locations de matériel"],
  },
  {
    id: "preparateur",
    name: "Préparateur/trice",
    profile: "Préparateur en pharmacie",
    summary: "Le travail de comptoir et de back-office, en entier.",
    allow: [
      "Ordonnances à préparer",
      "Commandes fournisseurs",
      "Locations de matériel",
    ],
    deny: ["Tâches de l'équipe", "Actualités internes"],
  },
  {
    id: "collaborateur",
    name: "Collaborateur",
    profile: "Pharmacien collaborateur",
    summary: "Les mêmes droits qu'un adjoint.",
    allow: [
      "Tout l'opérationnel de l'officine",
      "Tâches, actualités et messagerie interne",
    ],
    deny: ["Administration de l'officine"],
  },
  {
    id: "adjoint",
    name: "Adjoint(e)",
    profile: "Pharmacien adjoint",
    summary: "Opérationnel complet, sans l'administration.",
    allow: [
      "Tous les modules Officine et Organisation",
      "Tâches, actualités et messagerie interne",
    ],
    deny: ["Gestion RH, paramètres et permissions"],
  },
  {
    id: "titulaire",
    name: "Titulaire",
    profile: "Pharmacien propriétaire",
    summary: "Tout. Plus ce que personne d'autre ne voit.",
    allow: [
      "Tout l'opérationnel de l'officine",
      "Gestion RH, invitations et planning",
      "Paramètres et matrice des droits",
    ],
    deny: [],
  },
];

const NAV_KEYS = [
  "ArrowRight",
  "ArrowDown",
  "ArrowLeft",
  "ArrowUp",
  "Home",
  "End",
];

function RightLine({
  children,
  granted,
}: {
  children: ReactNode;
  granted: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill",
          granted
            ? "bg-primary-tint text-primary-strong"
            : "bg-surface-muted text-ink-4",
        )}
      >
        {granted ? (
          <Check className="size-3" strokeWidth={1.75} aria-hidden />
        ) : (
          <Minus className="size-3" strokeWidth={1.75} aria-hidden />
        )}
      </span>
      <span
        className={cn(
          "text-[0.93rem] leading-relaxed",
          granted ? "text-ink-2" : "text-ink-3",
        )}
      >
        {children}
      </span>
    </li>
  );
}

export function Roles() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const role = ROLES[index];

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!NAV_KEYS.includes(event.key)) return;
    event.preventDefault();

    const last = ROLES.length - 1;
    let next = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    setIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="Rôles & permissions"
          title="Sept rôles. Et c'est vous qui réglez les droits."
          lead="Les droits sont appliqués côté serveur, sur chaque écriture. Ce n'est pas de l'affichage conditionnel : un rôle sans droit reçoit un refus."
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-6">
          {/* Sélecteur — scrollable en mobile, colonne à partir de md */}
          <div
            role="tablist"
            aria-label="Rôles de l'officine"
            onKeyDown={handleKeyDown}
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:gap-1.5 md:overflow-visible md:px-0 md:pb-0"
          >
            {ROLES.map((item, itemIndex) => {
              const active = itemIndex === index;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[itemIndex] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`role-tab-${item.id}`}
                  aria-selected={active}
                  aria-controls="role-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setIndex(itemIndex)}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-pill px-4 py-2.5 text-left text-[0.92rem] font-medium",
                    "transition-[background-color,color,transform] duration-200 ease-(--ease-out-soft)",
                    "md:w-full md:rounded-field md:px-4 md:py-3",
                    active
                      ? "bg-primary-tint text-primary-strong"
                      : "text-ink-2 hover:bg-surface-muted hover:text-ink md:hover:translate-x-0.5",
                  )}
                >
                  <span
                    className={cn(
                      "u-numeric text-[0.7rem]",
                      active ? "text-primary-strong" : "text-ink-4",
                    )}
                    aria-hidden
                  >
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="whitespace-nowrap">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Panneau des droits */}
          <div
            role="tabpanel"
            id="role-panel"
            aria-labelledby={`role-tab-${role.id}`}
            tabIndex={0}
            className="rounded-card bg-surface p-6 shadow-card ring-1 ring-line sm:p-8 md:min-h-[21rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{
                  duration: reduced ? 0.12 : 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <p className="u-eyebrow text-ink-4">{role.profile}</p>
                  <h3 className="text-h3 font-semibold text-ink">
                    {role.name}
                  </h3>
                  <p className="max-w-[46ch] text-[1rem] leading-relaxed text-ink-2">
                    {role.summary}
                  </p>
                  {role.learning ? (
                    <Tag className="mt-1 self-start">
                      <GraduationCap
                        className="size-3.5"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      Consultation seule par défaut
                    </Tag>
                  ) : null}
                </div>

                <div
                  className={cn(
                    "grid gap-6",
                    role.deny.length > 0 && "sm:grid-cols-2 sm:gap-8",
                  )}
                >
                  <div className="flex flex-col gap-3">
                    <p className="u-eyebrow text-primary-deep">Peut faire</p>
                    <ul className="flex flex-col gap-2.5">
                      {role.allow.map((line) => (
                        <RightLine key={line} granted>
                          {line}
                        </RightLine>
                      ))}
                    </ul>
                  </div>

                  {role.deny.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      <p className="u-eyebrow text-ink-4">
                        Fermé par défaut
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {role.deny.map((line) => (
                          <RightLine key={line} granted={false}>
                            {line}
                          </RightLine>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="u-ring-glow mt-6 flex flex-col gap-4 rounded-card bg-primary-tint-2 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6 dark:bg-surface-muted">
          <IconBadge className="size-10">
            <SlidersHorizontal
              className="size-4.5"
              strokeWidth={1.75}
              aria-hidden
            />
          </IconBadge>
          <p className="max-w-[70ch] text-[0.95rem] leading-relaxed text-ink-2">
            Ces droits sont ceux <span className="font-medium text-ink">par
            défaut</span>. La matrice prime : si vous décidez d&rsquo;ouvrir un
            droit précis à vos étudiants ou à vos rayonnistes, il s&rsquo;applique.
            Le produit ne se substitue pas à votre jugement.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
