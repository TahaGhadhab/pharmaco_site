/**
 * Configuration centrale de la landing page.
 * Toute URL, tout libellé de CTA et toute constante partagée vit ici.
 */

const APP =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://pharmaco-web-production.up.railway.app";

export const site = {
  name: "PharmacoWork",
  baseline: "L'espace de travail de votre officine",
  slogan: "Rien ne se perd.",

  /**
   * §10 du contexte — deux portes distinctes, à ne pas confondre :
   *  · /inscription → « Demande d'inscription » (officine, adresse, FINESS…).
   *    C'est là que doit mener chaque CTA de la landing page.
   *  · /connexion   → lien magique par email, pour une officine déjà en place.
   *    Réservé au lien discret du header.
   */
  urls: {
    app: APP,
    inscription: `${APP}/inscription`,
    connexion: `${APP}/connexion`,
    contact: "mailto:contact@pharmacowork.fr",
  },

  /** §10 : jamais « Essai gratuit », « S'inscrire », « Acheter », « Voir les tarifs ». */
  cta: {
    primary: "Demander l'accès",
    secondary: "Voir ce que fait l'application",
    connexion: "Se connecter",
  },

  nav: [
    { label: "Le problème", href: "#probleme" },
    { label: "Ce que ça coûte", href: "#simulateur" },
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "Questions", href: "#faq" },
  ],
} as const;
