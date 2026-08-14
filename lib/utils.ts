import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formate un montant en euros, sans décimale, à la française. */
export function euros(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/**
 * Formate un montant en euros au centime — mais sans décimale quand il n'y en
 * a pas. « 99 € » et « 84,15 € » dans la même grille : c'est le prix qui décide,
 * pas le format. Utilisé par la section tarifs, où arrondir fausserait le total.
 */
export function eurosPrecis(value: number) {
  const rond = Math.round(value * 100) % 100 === 0;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: rond ? 0 : 2,
    maximumFractionDigits: rond ? 0 : 2,
  }).format(value);
}

/** Formate un nombre à la française (espace insécable fine comme séparateur). */
export function nombre(value: number, decimales = 0) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(value);
}
