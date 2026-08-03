import { Stethoscope, Users, Layers } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * « Pourquoi nous » — l'argument de crédibilité le plus fort disponible,
 * et le seul qu'un concurrent ne peut pas copier.
 *
 * ⚠️ Tout ce bloc repose sur un fait confirmé par le client : les fondateurs
 * sont pharmaciens en exercice, et l'application est utilisée en officine.
 * Si cela cesse d'être vrai, la section doit être retirée, pas reformulée.
 */

const PREUVES = [
  {
    icon: Stethoscope,
    titre: "Pensé par des pharmaciens en exercice",
    texte:
      "Le vocabulaire, les flux, les urgences : c’est notre quotidien, pas une traduction approximative.",
  },
  {
    icon: Users,
    titre: "Utilisé en officine, tous les jours",
    texte:
      "Chaque écran est éprouvé au comptoir avant d’être livré, par des équipes qui travaillent avec.",
  },
  {
    icon: Layers,
    titre: "Complémentaire de votre LGO",
    texte:
      "PharmacoWork ne touche pas à votre logiciel métier. Il organise tout ce qui vit autour.",
  },
];

export function Founders() {
  return (
    <Section id="pourquoi" tone="surface">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Pourquoi nous</Eyebrow>

          <h2 className="mt-5 max-w-[16ch] text-h2 font-semibold text-ink">
            Conçu derrière un comptoir, pas dans un open space.
          </h2>

          <blockquote className="mt-7 border-l-[3px] border-primary pl-6 text-lead font-medium leading-relaxed text-ink">
            « On n’a pas étudié le marché de l’officine. On y travaille. Chaque
            module répond à un problème qu’on a vécu un vendredi à 18 h. »
          </blockquote>

          <p className="u-eyebrow mt-5 pl-6 text-ink-3">
            L’équipe fondatrice, pharmaciens
          </p>
        </Reveal>

        <RevealGroup className="flex flex-col gap-4">
          {PREUVES.map(({ icon: Icon, titre, texte }) => (
            <RevealItem key={titre}>
              <div className="flex gap-4 rounded-card bg-page p-5 ring-1 ring-line sm:p-6">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-pill bg-primary-tint text-primary-strong">
                  <Icon className="size-4.5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="block">
                  <span className="block font-semibold text-ink">{titre}</span>
                  <span className="mt-1.5 block text-[0.92rem] leading-relaxed text-ink-3">
                    {texte}
                  </span>
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
