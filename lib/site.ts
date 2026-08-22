/**
 * Configuration centrale de la landing page.
 * Toute URL, tout libellé de CTA et toute constante partagée vit ici.
 */

const APP =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://app.pharmacowork.fr";

/**
 * Domaine canonique de la vitrine — distinct de celui de l'application.
 * Sert de base à `metadataBase`, au sitemap, au robots.txt et au JSON-LD :
 * une seule origine déclarée partout, sinon Google indexe deux fois le
 * même contenu et dilue le signal.
 *
 * ⚠️ Avec le `www`, et ce n'est pas un détail : Vercel sert la vitrine sur
 * `www.pharmacowork.fr` et redirige l'apex en 308 vers lui. Déclarer l'apex
 * ici ferait pointer le canonical et le sitemap vers une URL qui redirige —
 * Search Console la classe alors en « Page avec redirection » et n'indexe
 * pas ce qu'on lui a soumis. Si le domaine principal change côté Vercel,
 * c'est cette constante qu'il faut suivre.
 */
export const SITE_URL = "https://www.pharmacowork.fr";

/**
 * Adresse de contact du service clients — **la seule**, et elle ne vit qu'ici.
 * Les mentions légales, le JSON-LD, le pied de page et la demande de visio la
 * lisent depuis cette constante : une adresse recopiée à la main est une
 * adresse qu'on oublie de changer.
 */
export const EMAIL_CONTACT = "pharma.cowork@pharmacowork.fr";

/**
 * Motifs de visio proposés au visiteur.
 *
 * Aucun formulaire n'est branché sur la vitrine : la demande part en `mailto:`,
 * objet et corps pré-remplis. Le visiteur n'a qu'à compléter et envoyer, et le
 * service clients reçoit une demande déjà qualifiée.
 *
 * ⚠️ Ni durée ni délai de réponse ne sont annoncés : ce sont des engagements
 * commerciaux, ils appartiennent au client, pas à la page.
 */
export type MotifVisio = "decouverte" | "priseEnMain";

const OBJETS: Record<MotifVisio, string> = {
  decouverte: "Demande de visio — découverte de PharmacoWork",
  priseEnMain: "Demande de visio — initiation de l'équipe",
};

const CORPS: Record<MotifVisio, string> = {
  decouverte:
    "Bonjour,\n\n" +
    "Nous souhaitons voir PharmacoWork en visio avant d'aller plus loin.\n\n" +
    "Officine :\n" +
    "Ville :\n" +
    "Personne à joindre :\n" +
    "Téléphone :\n" +
    "Nos disponibilités :\n" +
    "Ce qu'on aimerait voir en priorité :\n",
  priseEnMain:
    "Bonjour,\n\n" +
    "Nous souhaitons une visio d'initiation au logiciel pour notre équipe.\n\n" +
    "Officine :\n" +
    "Ville :\n" +
    "Personne à joindre :\n" +
    "Téléphone :\n" +
    "Nombre de personnes à former :\n" +
    "Nos disponibilités :\n",
};

/** Lien `mailto:` d'une demande de visio, objet et corps encodés. */
export function lienVisio(motif: MotifVisio) {
  const objet = encodeURIComponent(OBJETS[motif]);
  const corps = encodeURIComponent(CORPS[motif]);
  return `mailto:${EMAIL_CONTACT}?subject=${objet}&body=${corps}`;
}

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
    contact: `mailto:${EMAIL_CONTACT}`,
  },

  /** §10 : jamais « Essai gratuit », « S'inscrire », « Acheter », « Voir les tarifs ». */
  cta: {
    primary: "Demander l'accès",
    secondary: "Voir ce que fait l'application",
    connexion: "Se connecter",
  },

  /**
   * Ancres de l'accueil.
   *
   * ⚠️ Préfixées par `/`, et ce n'est pas un détail : le header et le pied de
   * page sont montés sur les pages annexes (`/tutoriels`, pages légales). Une
   * ancre nue (`#faq`) y désigne un élément qui n'existe pas — le lien ne fait
   * alors rien du tout. Avec le `/`, il ramène à l'accueil au bon endroit,
   * depuis n'importe quelle page.
   */
  nav: [
    { label: "Le problème", href: "/#probleme" },
    { label: "Ce que ça coûte", href: "/#simulateur" },
    { label: "Fonctionnalités", href: "/#fonctionnalites" },
    { label: "Tarifs", href: "/#tarifs" },
    { label: "Visio", href: "/#visio" },
    { label: "Questions", href: "/#faq" },
  ],

  /** Pages à part entière — des URL, pas des ancres de l'accueil. */
  pages: [{ label: "Tutoriels", href: "/tutoriels" }],
} as const;
