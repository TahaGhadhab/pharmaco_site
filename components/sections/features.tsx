import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ScreenFrame } from "@/components/ui/screen-frame";
import { screens } from "@/lib/screens";
import type { ScreenSlot } from "@/lib/screens";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   Fonctionnalités phares — quatre blocs alternés texte / visuel.

   Ordre imposé par le §7 de ARGUMENTAIRE_VENTE.md :
   l'argent d'abord (location), la crédibilité métier ensuite (CIP13),
   puis l'ANSM, puis la saisie automatique.

   Règle de rédaction (AGENTS.md) : un titre, deux phrases, trois bénéfices.
   Jamais une fonctionnalité nue dans la liste à coches.
   ══════════════════════════════════════════════════════════════════════════ */

type Feature = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  points: readonly string[];
  slot: ScreenSlot;
};

const FEATURES: readonly Feature[] = [
  {
    eyebrow: "Locations",
    title: "Le matériel ne se rend pas tant qu'il n'est pas payé.",
    description:
      "Chaque location de matériel médical est découpée en périodes qui avancent avec le calendrier. Le solde restant dû est recalculé à chaque paiement enregistré.",
    points: [
      "Le matériel ne ressort pas sans que la caisse suive.",
      "Le montant qui manque est affiché, pas à retrouver.",
      "Plus d'impayé que personne n'a vu.",
    ],
    slot: screens.location,
  },
  {
    eyebrow: "Référentiel CIP13",
    title: "Scannez la boîte. Le nom s'écrit tout seul.",
    description: (
      <>
        Le référentiel national des médicaments est embarqué :{" "}
        <span className="u-numeric font-medium text-ink">
          {"20 869"} présentations
        </span>{" "}
        identifiées par leur code CIP13. La caméra du téléphone lit le
        code-barres EAN-13 et le Data Matrix GS1.
      </>
    ),
    points: [
      "Aucun lecteur à acheter : le téléphone de l'équipe suffit.",
      "Plus de faute de frappe sur une dénomination.",
      "L'inverse marche aussi : tapez le début du nom, le CIP13 se remplit.",
    ],
    slot: screens.scan,
  },
  {
    eyebrow: "Ruptures nationales",
    title: "Cette nuit, l'ANSM vous a répondu.",
    description:
      "Le fichier officiel de disponibilité des médicaments est rechargé chaque nuit. Vous êtes prévenu qu'un médicament fait l'objet d'une tension — mais seulement s'il s'agit d'un médicament que vous suivez déjà.",
    points: [
      "Une rupture ouverte ou une alternative proposée : voilà ce qui déclenche l'alerte.",
      "Sans ce filtre : ~474 alertes d'un coup. Avec : une information.",
      "Une alternative qui part elle-même en tension, vous le savez le matin.",
    ],
    slot: screens.ruptures,
  },
  {
    eyebrow: "Saisie automatique",
    title: "Le seul outil de votre officine qui écrit à votre place.",
    description:
      "L'agenda n'a aucun champ de saisie. Il lit les échéances de tâches, les livraisons attendues, les fins de location et les ordonnances à préparer, là où elles sont déjà.",
    points: [
      "Un agenda qu'on n'alimente pas est un agenda qui n'est jamais faux.",
      "Les heures d'arrivée et de départ montent du pointage. Personne ne les note.",
      "La traçabilité se produit pendant le travail, pas la veille de l'inspection.",
    ],
    slot: screens.planning,
  },
];

/* Socle du visuel : la capture ne flotte jamais seule sur le fond de page. */
function ScreenStage({ slot }: { slot: ScreenSlot }) {
  return (
    <div className="relative flex w-full justify-center overflow-hidden rounded-sheet bg-primary-tint-2 px-6 py-10 ring-1 ring-line sm:py-14 dark:bg-surface-muted">
      <div className="u-grid-faint absolute inset-0 opacity-70" aria-hidden />
      <ScreenFrame slot={slot} className="relative max-w-[340px]" />
    </div>
  );
}

function CheckLine({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-primary-tint text-primary-strong">
        <Check className="size-3" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="text-[0.95rem] leading-relaxed text-ink-2">
        {children}
      </span>
    </li>
  );
}

function FeatureBlock({
  feature,
  mediaLeft,
}: {
  feature: Feature;
  mediaLeft: boolean;
}) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
      <Reveal
        direction={mediaLeft ? "left" : "right"}
        delay={0.08}
        className={cn("flex flex-col gap-5", mediaLeft && "md:order-2")}
      >
        <p className="u-eyebrow text-primary-deep">{feature.eyebrow}</p>

        <h3 className="max-w-[19ch] text-h3 font-semibold text-ink">
          {feature.title}
        </h3>

        <p className="max-w-[48ch] text-[1.02rem] leading-relaxed text-ink-2">
          {feature.description}
        </p>

        <ul className="mt-1 flex flex-col gap-3">
          {feature.points.map((point) => (
            <CheckLine key={point}>{point}</CheckLine>
          ))}
        </ul>
      </Reveal>

      <Reveal
        direction={mediaLeft ? "right" : "left"}
        className={cn("flex justify-center", mediaLeft && "md:order-1")}
      >
        <ScreenStage slot={feature.slot} />
      </Reveal>
    </div>
  );
}

export function Features() {
  return (
    <Section id="fonctionnalites">
      <Reveal>
        <SectionHeading
          eyebrow="Ce que fait l'application"
          title="Quatre mécanismes. Vérifiables en dix minutes."
          lead="Pas des intentions : des comportements de l'application, que vous pouvez constater dès la première semaine."
        />
      </Reveal>

      <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28 lg:gap-36">
        {FEATURES.map((feature, index) => (
          <FeatureBlock
            key={feature.eyebrow}
            feature={feature}
            mediaLeft={index % 2 === 0}
          />
        ))}
      </div>
    </Section>
  );
}
