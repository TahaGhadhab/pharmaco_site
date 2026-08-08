/* ══════════════════════════════════════════════════════════════════════════
   Informations légales.

   Les mentions légales sont une obligation, pas une page de confort :
   article 6 III-1 de la LCEN pour l'éditeur, article 13 du RGPD pour le
   traitement des données. Une mention inexacte est plus risquée qu'une
   mention absente — d'où le typage strict ci-dessous.

   ⚠️ `editeur` vaut `null` tant que les informations réelles de la société
   n'ont pas été fournies. Les pages affichent alors un encart d'attente et
   ne sont pas liées depuis le pied de page. Ne jamais remplir ces champs
   « au plus proche » : ils engagent la société.
   ══════════════════════════════════════════════════════════════════════════ */

export type Editeur = {
  /** Dénomination sociale exacte, telle qu'inscrite au RCS. */
  denomination: string;
  /** SAS, SASU, SARL, EURL, entreprise individuelle… */
  formeJuridique: string;
  /** Montant du capital social. `null` si entreprise individuelle. */
  capital: string | null;
  /** Adresse complète du siège social. */
  siege: string;
  /** Ville du greffe d'immatriculation. */
  rcsVille: string;
  /** SIREN à 9 chiffres. */
  siren: string;
  /** TVA intracommunautaire. `null` si non assujetti. */
  tva: string | null;
  /** Personne physique responsable de la publication. */
  directeurPublication: string;
  /** Facultatif : l'email suffit légalement si le contact est direct. */
  telephone: string | null;
  email: string;
};

/** À remplacer par l'objet complet dès réception des informations. */
export const editeur: Editeur | null = null;

/**
 * Hébergeur de la vitrine.
 *
 * Vercel, pas Railway : c'est Railway qui porte l'API et l'application sur
 * `app.pharmacowork.fr`, la landing page est déployée ailleurs. Adresse
 * relevée sur la politique de confidentialité de Vercel.
 *
 * ⛔ Ne pas écrire « hébergement en France » ni « hébergement européen »
 * pour cette page : Vercel Inc. est une société américaine, et le réseau
 * de diffusion sert les fichiers depuis le point de présence le plus
 * proche du visiteur. La formulation européenne du §15 vaut pour
 * l'application, pas pour la vitrine.
 */
export const hebergeur = {
  nom: "Vercel Inc.",
  adresse: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
  site: "https://vercel.com",
} as const;

/** Dernière révision des textes légaux. À mettre à jour à chaque modification. */
export const DERNIERE_REVISION = "8 août 2026";
