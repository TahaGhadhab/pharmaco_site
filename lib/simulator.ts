/**
 * Simulateur — « Ce que le désordre coûte à votre officine ».
 *
 * ⚠️ Principe juridique (§4.1 de ARGUMENTAIRE_VENTE.md) : le montant produit ici
 * n'est **pas** une promesse de PharmacoWork. C'est le coût *actuel* du problème,
 * calculé à partir des chiffres saisis par le visiteur et de barèmes publics dont
 * la source est affichée à l'écran. Ne jamais présenter ce résultat comme un gain,
 * une économie ou un retour sur investissement.
 *
 * ⚠️ Règle de composition du total, plus stricte que le §4.3 d'origine :
 * **toute ligne du total est soit un barème public citable, soit une valeur que
 * le visiteur règle lui-même.** Rien entre les deux. C'est pourquoi le poste
 * « termes de location » a été retiré : son barème (12,60 €/jour) ne portait que
 * sur un lit médicalisé, et le nombre de termes oubliés était notre hypothèse,
 * pas celle du visiteur. Ne pas le réintroduire sans mesure terrain.
 *
 * Logique pure, sans JSX : tout est testable isolément.
 */

import { euros, nombre } from "@/lib/utils";

/* ── Constantes du barème (§4.3) ───────────────────────────────────────── */

/**
 * Coût employeur d'une heure d'équipe, en euros.
 * Grille de la convention collective de l'officine (IDCC 1996) après la réforme
 * de classification du 1er novembre 2025 : préparateur coef. 250 ≈ 16,50 €/h,
 * adjoint coef. 500 ≈ 29,50 €/h, titulaire ≈ 30 €/h. Le mix réaliste du
 * traitement d'une rupture (60/30/10) donne 21,75 €/h — on retient 20 €/h,
 * volontairement en dessous (§3.2).
 */
export const COUT_HORAIRE = 20;

/** Semaines d'activité pleine retenues dans l'année (§3.3). */
export const SEMAINES = 46;

/** Jours travaillés retenus dans l'année (§3.5). */
export const JOURS = 250;

/**
 * Part de marge brute moyenne d'une officine française : 29 % du CA HT.
 * Source : Le Moniteur des pharmacies, « 10 chiffres pour comprendre l'officine
 * en 2025 » (§3.1).
 */
export const PART_MARGE = 0.29;

/**
 * Part du CA HT non servie pour cause de rupture : 0,52 %.
 * Source : étude Offisanté × Le Moniteur des pharmacies, 500 premières
 * spécialités en tension sur 12 mois glissants (§3.4). Le taux est la **moyenne**
 * de l'étude — 8 314 €/an de CA perdu sur une officine à 1,6 M€ — soit 0,52 %.
 * La médiane (7 940 €) donnerait 0,50 % : l'écart est négligeable, mais ne pas
 * attribuer le 0,52 % à la médiane, c'est faux.
 */
export const TAUX_CA_PERDU = 0.0052;

/**
 * Coût annuel chargé d'un préparateur en pharmacie, coef. 250 : ≈ 30 000 €.
 * Sert uniquement à traduire le total en équivalent temps plein (§3.9) —
 * c'est la mise en perspective la plus parlante pour un titulaire.
 */
export const COUT_ETP_PREPARATEUR = 30_000;

/**
 * Revenu brut annuel moyen d'un titulaire en 2024, hors dividendes : 64 461 €.
 * Source : Le Moniteur des pharmacies / INSEE (§3.1). Seconde mise en
 * perspective du §3.9 — registre personnel, là où l'ETP parle effectif.
 */
export const REVENU_TITULAIRE = 64_461;

/**
 * La clause du §4.1, à afficher sous le résultat.
 *
 * La troisième phrase (« Nous n'avons pas encore de mesure terrain, et nous
 * n'en inventerons pas. ») a été retirée le 5 août 2026, sur décision du client.
 * Ce qui reste est la partie qui protège : elle dit que le montant est le coût
 * du problème et non un gain PharmacoWork — c'est elle qui rend le simulateur
 * publiable au regard du §15. **Ne pas raccourcir davantage.**
 */
export const CLAUSE_LEGALE =
  "Ce calcul utilise vos chiffres et des sources publiques. Il estime ce que le " +
  "désordre vous coûte aujourd'hui — pas ce que PharmacoWork vous ferait gagner.";

/* ── Entrées ───────────────────────────────────────────────────────────── */

export type Entrees = {
  /** Chiffre d'affaires HT annuel, en euros. */
  caHt: number;
  /** Nombre de personnes dans l'équipe, titulaire compris. */
  effectif: number;
  /** Heures par semaine passées à gérer les ruptures, pour toute l'équipe. */
  heuresRuptures: number;
  /** Minutes de coordination non tracée, par personne et par jour. */
  minutesCoordination: number;
};

export type CleEntree = keyof Entrees;

/** Unité d'affichage de la valeur courante d'un curseur. */
export type Unite = "euros" | "personnes" | "heures" | "minutes";

export type Champ = {
  cle: CleEntree;
  libelle: string;
  min: number;
  max: number;
  pas: number;
  unite: Unite;
  /** Note de source, en Geist Mono sous le curseur (§4.2). */
  note: string;
};

/** Valeurs par défaut : l'officine française de référence, données 2025 (§3.1). */
export const DEFAUTS: Entrees = {
  caHt: 2_263_000,
  effectif: 6,
  heuresRuptures: 8,
  minutesCoordination: 10,
};

/**
 * Les quatre curseurs, dans l'ordre d'affichage (§4.2).
 *
 * Le quatrième porte la seule valeur non sourcée du calcul. Sa note ne cite donc
 * aucune source : elle dit qu'il n'y en a pas. C'est la stratégie du §0 — dans un
 * secteur saturé de plaquettes, avouer le trou vaut mieux que le combler.
 */
export const CHAMPS: readonly Champ[] = [
  {
    cle: "caHt",
    libelle: "Chiffre d'affaires HT annuel",
    min: 800_000,
    max: 6_000_000,
    pas: 50_000,
    unite: "euros",
    note: "MOYENNE FRANÇAISE 2025 : 2 263 K€",
  },
  {
    cle: "effectif",
    libelle: "Personnes dans l'équipe",
    min: 2,
    max: 20,
    pas: 1,
    unite: "personnes",
    note: "MOYENNE FRANÇAISE 2025 : 6,2 PERSONNES",
  },
  {
    cle: "heuresRuptures",
    libelle: "Heures par semaine passées à gérer les ruptures",
    min: 2,
    max: 16,
    pas: 1,
    unite: "heures",
    note: "USPO ET GPUE MESURENT 12 H",
  },
  {
    cle: "minutesCoordination",
    libelle: "Minutes par personne et par jour à redemander, répéter, retrouver",
    min: 5,
    max: 20,
    pas: 5,
    unite: "minutes",
    note: "AUCUNE SOURCE PUBLIQUE — CE CHIFFRE EST LE VÔTRE",
  },
];

/* ── Sorties ───────────────────────────────────────────────────────────── */

export type CleLigne = "ruptures" | "margePerdue" | "coordination";

/**
 * Statut de chaque poste :
 * `sourcee` = barème public citable · `saisie` = valeur réglée par le visiteur.
 * Il n'existe plus de troisième statut — voir la règle de composition en tête
 * de fichier.
 */
export type Statut = "sourcee" | "saisie";

export const STATUT_LIBELLE: Record<Statut, string> = {
  sourcee: "SOURCE PUBLIQUE",
  saisie: "VOTRE ESTIMATION",
};

export type Ligne = {
  cle: CleLigne;
  libelle: string;
  montant: number;
  /** Source affichée au dépliage — un pharmacien vérifie (§4.4). */
  source: string;
  statut: Statut;
  /** Part du total, entre 0 et 1. */
  part: number;
};

export type Resultat = {
  /** Coût annuel total, en euros. */
  total: number;
  lignes: Ligne[];
  /** Équivalent temps plein de préparateur correspondant au total. */
  etp: number;
  /** Part du revenu brut annuel d'un titulaire, entre 0 et 1. */
  partRevenu: number;
};

/* ── Calcul ────────────────────────────────────────────────────────────── */

function borner(valeur: number, min: number, max: number) {
  if (!Number.isFinite(valeur)) return min;
  return Math.min(max, Math.max(min, valeur));
}

/** Ramène des entrées quelconques dans les bornes des curseurs. */
export function bornerEntrees(entrees: Entrees): Entrees {
  const sortie = { ...entrees };
  for (const champ of CHAMPS) {
    sortie[champ.cle] = borner(entrees[champ.cle], champ.min, champ.max);
  }
  return sortie;
}

/**
 * Traduit un coût annuel en équivalent temps plein de préparateur (§3.9).
 * « Le titulaire raisonne en postes, pas en euros. »
 */
export function equivalentETP(total: number) {
  return total / COUT_ETP_PREPARATEUR;
}

/** Traduit un coût annuel en part du revenu brut du titulaire (§3.9). */
export function partRevenuTitulaire(total: number) {
  return total / REVENU_TITULAIRE;
}

/**
 * Le calcul, ligne par ligne, chaque ligne portant sa source.
 *
 * ruptures     = heuresRuptures × 46 semaines × 20 €/h
 * margePerdue  = CA HT × 0,52 % × 29 %
 * coordination = effectif × minutes/60 × 250 jours × 20 €/h
 */
export function calculer(entrees: Entrees): Resultat {
  const { caHt, effectif, heuresRuptures, minutesCoordination } =
    bornerEntrees(entrees);

  const ruptures = heuresRuptures * SEMAINES * COUT_HORAIRE;
  const margePerdue = caHt * TAUX_CA_PERDU * PART_MARGE;
  const coordination =
    effectif * (minutesCoordination / 60) * JOURS * COUT_HORAIRE;

  const total = ruptures + margePerdue + coordination;
  const diviseur = total > 0 ? total : 1;

  const lignes: Ligne[] = [
    {
      cle: "ruptures",
      libelle: "Ruptures, temps d'équipe",
      montant: ruptures,
      statut: "sourcee",
      source:
        "USPO (avril 2024) et GPUE (rapport 2025) mesurent 12 h par semaine et par équipe. " +
        "Ici : vos heures × 46 semaines × 20 €/h chargé.",
      part: ruptures / diviseur,
    },
    {
      cle: "margePerdue",
      libelle: "Marge perdue, ventes non servies",
      montant: margePerdue,
      statut: "sourcee",
      source:
        "Étude Offisanté × Le Moniteur des pharmacies : 0,52 % du CA HT non servi en moyenne, " +
        "appliqué à 29 % de marge brute.",
      part: margePerdue / diviseur,
    },
    {
      cle: "coordination",
      libelle: "Coordination non tracée",
      montant: coordination,
      statut: "saisie",
      source:
        "Aucune source publique n'existe sur ce poste, et nous n'en avons pas inventé : " +
        "c'est vous qui réglez les minutes, sur 250 jours travaillés.",
      part: coordination / diviseur,
    },
  ];

  return {
    total,
    lignes,
    etp: equivalentETP(total),
    partRevenu: partRevenuTitulaire(total),
  };
}

/* ── Formatage ─────────────────────────────────────────────────────────── */

/** Valeur courante d'un curseur, prête à afficher en `.u-numeric`. */
export function formaterValeur(unite: Unite, valeur: number): string {
  switch (unite) {
    case "euros":
      return euros(valeur);
    case "personnes":
      return `${nombre(valeur)} pers.`;
    case "heures":
      return `${nombre(valeur)} h/sem.`;
    case "minutes":
      return `${nombre(valeur)} min`;
  }
}

/**
 * « Soit l'équivalent de 0,5 préparateur à temps plein. » (§3.9)
 * Renvoie les morceaux séparément : seuls les chiffres portent `.u-numeric`.
 */
export function formaterETP(etp: number): {
  valeur: string;
  mot: string;
  phrase: string;
} {
  const arrondi = Math.round(etp * 10) / 10;
  const valeur = nombre(arrondi, 1);
  const mot = arrondi >= 2 ? "préparateurs" : "préparateur";
  return { valeur, mot, phrase: `${valeur} ${mot}` };
}

/** « 24 % du revenu annuel du titulaire. » (§3.9, mise en perspective n°2) */
export function formaterPartRevenu(part: number): string {
  return `${nombre(Math.round(part * 100))} %`;
}
