/**
 * Grille tarifaire — décision commerciale du client, montants arrêtés.
 *
 * ┌─ UN SEUL CHIFFRE SAISI PAR FORMULE ───────────────────────────────────────┐
 * │ Seul le prix mensuel est écrit ici. Le prix annuel, le total sur douze    │
 * │ mois et l'économie en découlent par le calcul. Changer un tarif, c'est    │
 * │ donc changer une seule ligne — jamais quatre chiffres à recouper.         │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * Abonnement **par officine**, calculé sur la taille de l'équipe : aucune
 * facturation à l'utilisateur, aucun module en supplément. Tous les modules
 * sont dans toutes les formules — seul le volume de documents change. C'est
 * l'argument, et il doit rester lisible tel quel sur la page.
 *
 * Montants hors taxes.
 */

export const REMISE_ANNUELLE = 0.15;

/** Durée de l'essai offert à toute nouvelle officine, en jours. */
export const ESSAI_JOURS = 30;

/** Les libellés de la bascule vivent dans la section : ici, que du chiffre. */
export type PeriodeId = "mensuel" | "annuel";

/** Plafond de la plus grande formule — l'échelle sur laquelle les trois se lisent. */
export const EQUIPE_MAX = 15;

export type Plan = {
  id: string;
  nom: string;
  /** La taille d'équipe, telle qu'elle s'écrit sur la carte. */
  equipe: string;
  /** La même, en version tableau — plus courte. */
  equipeCourte: string;
  /** Bornes de l'équipe, pour la jauge de la carte. */
  de: number;
  a: number;
  stockage: string;
  /** Volume brut, en Go — sert à dimensionner la jauge de stockage. */
  go: number;
  /** Prix mensuel HT, par officine, sans engagement. */
  mensuel: number;
  /** Une seule formule porte la marque : celle du milieu. */
  conseille?: boolean;
};

export const PLANS: readonly Plan[] = [
  {
    id: "petite",
    nom: "Petite officine",
    equipe: "Jusqu'à 3 personnes",
    equipeCourte: "≤ 3 personnes",
    de: 1,
    a: 3,
    stockage: "20 Go de documents",
    go: 20,
    mensuel: 99,
  },
  {
    id: "moyenne",
    nom: "Officine moyenne",
    equipe: "De 4 à 8 personnes",
    equipeCourte: "De 4 à 8 personnes",
    de: 4,
    a: 8,
    stockage: "50 Go de documents",
    go: 50,
    mensuel: 189,
    conseille: true,
  },
  {
    id: "grande",
    nom: "Grande officine",
    equipe: "De 9 à 15 personnes",
    equipeCourte: "9 à 15 personnes",
    de: 9,
    a: 15,
    stockage: "200 Go de documents",
    go: 200,
    mensuel: 289,
  },
];

/** Au centime : `0,85` n'a pas d'écriture binaire exacte, la multiplication dérive. */
const auCentime = (valeur: number) => Math.round(valeur * 100) / 100;

export type Tarif = {
  /** Ce qui s'affiche en gros : le coût mensuel réel dans la période choisie. */
  parMois: number;
  /** Le total facturé sur douze mois, en annuel. */
  parAn: number;
  /** L'écart avec douze mensualités au prix fort. */
  economie: number;
};

export function tarif(plan: Plan, periode: PeriodeId): Tarif {
  const plein = plan.mensuel * 12;
  const parAn = auCentime(plein * (1 - REMISE_ANNUELLE));

  return {
    parMois:
      periode === "mensuel"
        ? plan.mensuel
        : auCentime(plan.mensuel * (1 - REMISE_ANNUELLE)),
    parAn,
    economie: auCentime(plein - parAn),
  };
}

/* ── Comparatif ────────────────────────────────────────────────────────────
   Une ligne sans `valeurs` est incluse partout — c'est le cas de tous les
   modules. Ne s'affiche que déplié : neuf lignes d'un coup, ce serait le mur
   de texte que le client refuse.                                            */

export type LigneComparatif = {
  libelle: string;
  /** Trois valeurs, dans l'ordre de `PLANS`. Absent = inclus dans les trois. */
  valeurs?: readonly [string, string, string];
};

export const COMPARATIF: readonly LigneComparatif[] = [
  {
    libelle: "Membres de l'équipe",
    valeurs: ["≤ 3 personnes", "De 4 à 8 personnes", "9 à 15 personnes"],
  },
  {
    libelle: "Stockage des documents",
    valeurs: ["20 Go", "50 Go", "200 Go"],
  },
  { libelle: "Ordonnances, commandes, ruptures" },
  { libelle: "Locations de matériel" },
  { libelle: "Qualité, non-conformités, incidents" },
  { libelle: "Planning, congés, agenda" },
  { libelle: "Messagerie et actualités d'équipe" },
  { libelle: "Application mobile et notifications" },
  { libelle: "Mises à jour et support" },
];
