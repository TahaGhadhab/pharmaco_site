"use client";

import { Monitor, Smartphone } from "lucide-react";
import { Segmented, type SegmentedOption } from "@/components/ui/segmented";
import { setScreenMode, useScreenMode } from "@/lib/screen-mode";
import type { ScreenVariant } from "@/lib/screens";

/**
 * Bascule mobile / ordinateur des captures.
 *
 * Deux icônes, pas de texte : l'objet se lit d'un coup d'œil et n'ajoute pas
 * une ligne de plus à la page. Tout le comportement — pastille qui glisse,
 * navigation aux flèches, mouvement réduit — vient de `Segmented`, partagé
 * avec la bascule mensuel / annuel des tarifs.
 *
 * L'état est global (`lib/screen-mode.ts`) : plusieurs interrupteurs peuvent
 * cohabiter sur la page, ils montrent tous la même chose.
 */

const ICONE = "size-4.5";

const OPTIONS: readonly SegmentedOption<ScreenVariant>[] = [
  {
    id: "phone",
    icon: <Smartphone className={ICONE} strokeWidth={1.75} />,
    description: "Voir les captures sur mobile",
  },
  {
    id: "desktop",
    icon: <Monitor className={ICONE} strokeWidth={1.75} />,
    description: "Voir les captures sur ordinateur",
  },
];

export function ScreenModeToggle({ className }: { className?: string }) {
  return (
    <Segmented
      options={OPTIONS}
      value={useScreenMode()}
      onChange={setScreenMode}
      ariaLabel="Affichage des captures d'écran"
      className={className}
    />
  );
}
