"use client";

import { useSyncExternalStore } from "react";
import { resolveScreen, type ScreenSlot, type ScreenVariant } from "./screens";

/**
 * L'affichage des captures : mobile ou ordinateur.
 *
 * Un seul état pour toute la page. L'interrupteur peut donc être posé dans
 * plusieurs sections sans se désynchroniser, et chaque cadre s'y accroche
 * là où il se trouve — sans provider, sans faire remonter l'état jusqu'à
 * `app/page.tsx`, qui reste un composant serveur.
 *
 * Le rendu serveur part toujours de « mobile » : c'est la capture qui existe
 * pour tous les écrans, donc jamais d'écart d'hydratation.
 */

const DEFAUT: ScreenVariant = "phone";

let mode: ScreenVariant = DEFAUT;
const abonnes = new Set<() => void>();

function subscribe(notify: () => void) {
  abonnes.add(notify);
  return () => {
    abonnes.delete(notify);
  };
}

const getSnapshot = () => mode;
const getServerSnapshot = () => DEFAUT;

export function setScreenMode(next: ScreenVariant) {
  if (next === mode) return;
  mode = next;
  for (const notify of abonnes) notify();
}

/** L'affichage courant. */
export function useScreenMode(): ScreenVariant {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** La capture à montrer pour cet écran, selon l'affichage courant. */
export function useResolvedScreen(slot: ScreenSlot): ScreenSlot {
  return resolveScreen(slot, useScreenMode());
}
