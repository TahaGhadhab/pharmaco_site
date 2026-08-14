/**
 * Officines et membres actifs — le seul endroit où ces deux chiffres existent.
 *
 * ┌─ CE FICHIER PORTE UNE AFFIRMATION PUBLIQUE ───────────────────────────────┐
 * │ Ces nombres sont montrés à des titulaires pour les aider à décider. Ils    │
 * │ doivent donc être VRAIS au jour du relevé, et rien d'autre.                │
 * │                                                                            │
 * │ Pour les mettre à jour : trois valeurs, ici, et nulle part ailleurs.       │
 * │ Le hero les lit, `estPublie` décide de l'affichage. Aucun autre fichier    │
 * │ ne retape un chiffre.                                                      │
 * └────────────────────────────────────────────────────────────────────────────┘
 *
 * ── Levée du §15, 14 août 2026 ─────────────────────────────────────────────
 * Le §15 interdisait les « compteurs d'officines », et le motif était écrit :
 * « Rien de tel n'existe encore » (LANDING_PAGE_CONTEXT.md §16, ligne 667).
 * Le client atteste désormais d'un parc réel — sept officines, quarante-trois
 * membres. L'interdiction tombe donc pour la même raison qu'elle existait,
 * comme celle du logo le 3 août et celle des tarifs le 14 août.
 *
 * ── ⛔ Ce qui reste interdit, et pourquoi ────────────────────────────────────
 * **Aucune progression automatique.** Ni `Math.random()`, ni incrément au
 * calendrier, ni interpolation « probable ». Un compteur qui monte tout seul
 * cesse en quelques semaines de décrire l'officine réelle : il affiche un parc
 * que personne n'a signé, et il ne peut par construction que le surestimer.
 * C'est l'article L121-2 du Code de la consommation — la pratique commerciale
 * trompeuse — celui-là même que `components/sections/testimonials.tsx` cite
 * pour les faux avis, avec les mêmes peines. Un chiffre d'adoption inventé se
 * défend encore moins qu'un verbatim inventé : il est vérifiable.
 *
 * La seule façon honnête de faire monter ce compteur sans intervention est de
 * le brancher sur la donnée réelle — voir la note en fin de fichier.
 */

export type Adherents = {
  /** Officines abonnées et actives. Chiffre réel, attesté par le client. */
  officines: number;
  /** Comptes utilisateurs actifs dans ces officines. */
  membres: number;
  /**
   * Date d'arrêté du relevé, telle qu'elle s'écrit sur la page.
   *
   * Un libellé, pas une date ISO : c'est la seule forme dont la page a besoin,
   * et deux champs à recouper — l'ISO et son rendu — c'est un champ de trop.
   * Elle est affichée : un chiffre daté est défendable, un chiffre nu ne l'est
   * pas, et la date force la mise à jour quand elle vieillit.
   */
  releve: string;
};

export const ADHERENTS: Adherents = {
  officines: 7,
  membres: 43,
  releve: "14 août 2026",
};

/**
 * Le bloc s'affiche-t-il ?
 *
 * Même garde que la section avis : à zéro, on ne rend rien du tout plutôt que
 * d'annoncer un parc vide. Remettre `officines` à 0 suffit à retirer le bloc de
 * la page, sans toucher au hero.
 */
export const estPublie = ADHERENTS.officines > 0 && ADHERENTS.membres > 0;

/* ── Pour que le compteur monte sans intervention ───────────────────────────
   La page est entièrement statique aujourd'hui (toutes les routes sortent en
   `○ Static` au build). Un compteur vivant demande une source, pas un hasard :

     1. l'application expose un endpoint public de dénombrement, par exemple
        `GET {site.urls.app}/api/public/parc` → `{ officines, membres }` ;
     2. ce fichier cesse d'exporter une constante et exporte une fonction
        `async function lireAdherents()` qui l'appelle ;
     3. la page passe en revalidation périodique — `export const revalidate =
        86400` sur `app/page.tsx` suffit à la régénérer une fois par jour.

   Le chiffre monte alors tout seul, et il monte parce qu'une officine s'est
   réellement abonnée. C'est le même résultat visuel que la dérive aléatoire,
   à ceci près qu'il est vrai.                                                */
