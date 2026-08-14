"use client";

import { Check } from "lucide-react";
import { LogoLoop, type LogoItem } from "@/components/ui/logo-loop";
import { ESSAI_JOURS } from "@/lib/pricing";

/**
 * Bandeau de réassurance, juste sous le hero — en boucle continue.
 *
 * Les quatre mentions défilent sur une seule ligne et se répètent sans couture.
 * Le survol met la boucle en pause : on peut lire la mention qui passe.
 *
 * Toutes les affirmations sont défendables :
 *  · « conçu selon les principes du RGPD » — formulation autorisée par le §8.
 *    ⛔ Ne jamais écrire « conforme RGPD » ni « certifié » : aucun audit réalisé.
 *  · « hébergement européen » — l'infrastructure est européenne (§8).
 *    ⛔ Ne pas préciser un pays sans vérification.
 *  · l'essai de 30 jours et l'inscription sans paiement sont la décision
 *    commerciale actuelle du client. La durée vient de `lib/pricing.ts` :
 *    elle ne s'écrit qu'à un seul endroit.
 */

const MENTIONS = [
  { fort: "Conçu selon les principes du RGPD", suite: "hébergement européen" },
  { fort: "Complément de votre LGO", suite: "pas un remplaçant" },
  { fort: "Zéro installation", suite: "web et mobile" },
  { fort: `${ESSAI_JOURS} jours d'essai gratuit`, suite: "sans carte bancaire" },
];

type Mention = (typeof MENTIONS)[number];

function Pastille({ fort, suite }: Mention) {
  return (
    <span
      className={[
        /* Pastille resserrée sur téléphone : à 1,02 rem et px-5, une seule
           mention occupait plus que la largeur de l'écran — la boucle défilait
           sans jamais en montrer une entière. */
        "group/chip flex items-center gap-2.5 rounded-pill px-4 py-2.5 leading-none",
        "sm:gap-3 sm:px-5 sm:py-3",
        "bg-page ring-1 ring-line",
        "transition-[background-color,box-shadow,color] duration-300 ease-(--ease-out-soft)",
        "hover:bg-primary-tint hover:ring-primary/40",
      ].join(" ")}
    >
      <span
        className={[
          "flex size-6 shrink-0 items-center justify-center rounded-pill",
          "bg-primary-tint text-primary-strong",
          "transition-colors duration-300 ease-(--ease-out-soft)",
          "group-hover/chip:bg-primary group-hover/chip:text-white",
          "dark:group-hover/chip:text-[#06120c]",
        ].join(" ")}
      >
        <Check className="size-3.5" strokeWidth={3} aria-hidden />
      </span>

      <span className="whitespace-nowrap">
        <span
          className={[
            "text-[0.9rem] font-semibold tracking-tight text-ink sm:text-[1.02rem]",
            "transition-colors duration-300 ease-(--ease-out-soft)",
            "group-hover/chip:text-primary-strong",
          ].join(" ")}
        >
          {fort}
        </span>
        <span className="text-[0.9rem] text-ink-4 sm:text-[1.02rem]"> · {suite}</span>
      </span>
    </span>
  );
}

/* Les mentions sont fournies à LogoLoop comme des nœuds ; `renderItem` prend
   la main sur le rendu pour poser nos pastilles au lieu d'un logo. */
const ITEMS: LogoItem[] = MENTIONS.map((m) => ({
  node: <Pastille {...m} />,
  ariaLabel: `${m.fort}, ${m.suite}`,
}));

export function ProofStrip() {
  return (
    <div className="border-y border-line bg-surface py-6">
      <LogoLoop
        logos={ITEMS}
        speed={42}
        direction="left"
        gap={20}
        logoHeight={24}
        hoverSpeed={0}
        fadeOut
        fadeOutColor="var(--pw-surface)"
        scaleOnHover
        ariaLabel="Ce qui est inclus"
        renderItem={(item) => ("node" in item ? item.node : null)}
      />
    </div>
  );
}
