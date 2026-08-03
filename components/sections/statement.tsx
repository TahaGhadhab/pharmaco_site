import { Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/**
 * §9 du contexte — « l'angle le plus fort » : ce qui sépare PharmacoWork
 * d'un Trello qu'on aurait bricolé.
 *
 * Une seule phrase, en pleine largeur. Elle se révèle mot à mot au défilement :
 * c'est la ligne qu'on veut faire lire en entier, pas survoler.
 *
 * ⚠️ On scanne une **boîte**, la tension porte sur le **médicament** (§5.2).
 */
export function Statement() {
  return (
    <Section tone="tint">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Eyebrow>Face aux outils génériques</Eyebrow>
        </Reveal>

        <ScrollReveal
          containerClassName="mt-7"
          textClassName="text-h2 font-semibold text-ink"
          baseRotation={1.5}
          blurStrength={7}
          baseOpacity={0.1}
        >
          Un outil générique ne saura jamais scanner une boîte et vous dire que
          l’ANSM a déclaré une tension sur ce médicament cette nuit.
        </ScrollReveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[52ch] text-lead text-ink-2">
            Trello ne connaît pas le CIP13. Notion ne lit pas le fichier de
            l’ANSM. C’est toute la différence.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
