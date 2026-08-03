import { Building2, EyeOff, LockKeyhole, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, IconBadge, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { ReactNode } from "react";

/**
 * Section « Vos données » — §5.4 de l'argumentaire, §8 du contexte.
 *
 * ⛔ On décrit des mécanismes vérifiés dans le code. On ne promet jamais un état
 * juridique : ni « conforme RGPD », ni « certifié », ni « HDS », ni « sécurisé »
 * employé seul comme une garantie. Aucun badge d'organisme : il n'y en a pas.
 */

type Preuve = {
  icon: LucideIcon;
  titre: string;
  phrase: ReactNode;
};

const PREUVES: Preuve[] = [
  {
    icon: Building2,
    titre: "Cloisonné par officine",
    phrase: "Chaque donnée porte son officine, et toute lecture est filtrée dessus.",
  },
  {
    icon: LockKeyhole,
    titre: "Note client chiffrée",
    phrase: (
      <>
        La note client d&apos;une ordonnance est chiffrée au repos en{" "}
        <span className="u-numeric">AES-256-GCM</span>.
      </>
    ),
  },
  {
    icon: ScrollText,
    titre: "Journal d'accès nominatif",
    phrase: "Chaque consultation d'une note écrit une ligne, avec un nom et une heure.",
  },
  {
    icon: EyeOff,
    titre: "Image jamais stockée",
    phrase: "L'image de l'ordonnance est lue en mémoire, puis jetée.",
  },
];

export function Trust() {
  return (
    <Section id="donnees" tone="tint">
      <Reveal>
        <SectionHeading
          eyebrow="Vos données"
          title="Un groupe WhatsApp n'est pas un outil de travail."
          lead="Il mélange le professionnel et le personnel, il ne trace rien, et il ne connaît aucun droit d'accès. Voici ce qui se passe dans PharmacoWork à la place."
        />
      </Reveal>

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {PREUVES.map(({ icon: Icon, titre, phrase }) => (
          <RevealItem key={titre} className="h-full">
            <Card className="flex h-full flex-col gap-4">
              <IconBadge>
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </IconBadge>
              <h3 className="text-[1.02rem] font-semibold tracking-tight text-ink">
                {titre}
              </h3>
              <p className="text-[0.925rem] leading-relaxed text-ink-2">{phrase}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-8 text-[0.82rem] leading-relaxed text-ink-4">
          Lien magique sans mot de passe · Sessions de connexion révocables · OCR chez un
          fournisseur français · Plus de <span className="u-numeric">215</span> tests
          d&apos;intégration exécutés contre une vraie base.
        </p>
      </Reveal>
    </Section>
  );
}
