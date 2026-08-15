/**
 * Officines et membres actifs — le seul endroit où ces deux chiffres existent.
 *
 * ┌─ CE FICHIER PORTE UNE AFFIRMATION PUBLIQUE ───────────────────────────────┐
 * │ Ces nombres sont montrés à des titulaires pour les aider à décider. Ils    │
 * │ doivent donc être VRAIS, au présent, et rien d'autre.                      │
 * │                                                                            │
 * │ Pour les mettre à jour : trois valeurs, ici, et nulle part ailleurs.       │
 * │ Le hero les lit, `estPublie` décide de l'affichage. Aucun autre fichier    │
 * │ ne retape un chiffre. Pensez à avancer `verifieLe` en même temps — c'est   │
 * │ lui qui déclenche l'avertissement de péremption.                           │
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
   * Date de dernière vérification des deux nombres, au format `AAAA-MM-JJ`.
   *
   * ⛔ **Ne s'affiche pas, et ne doit pas s'afficher.** C'est une trace de
   * tenue, pas une mention pour le visiteur — voir la note « Pourquoi aucune
   * date sur la page » plus bas. Elle sert uniquement à l'avertissement de
   * péremption ci-dessous.
   */
  verifieLe: string;
};

export const ADHERENTS: Adherents = {
  officines: 7,
  membres: 43,
  verifieLe: "2026-08-14",
};

/**
 * Le bloc s'affiche-t-il ?
 *
 * Même garde que la section avis : à zéro, on ne rend rien du tout plutôt que
 * d'annoncer un parc vide. Remettre `officines` à 0 suffit à retirer le bloc de
 * la page, sans toucher au hero.
 */
export const estPublie = ADHERENTS.officines > 0 && ADHERENTS.membres > 0;

/* ── Pourquoi aucune date sur la page ──────────────────────────────────────
   La première version affichait « Relevé au 14 août 2026 ». Deux défauts, et
   ils sont opposés :

     · figée, la mention se périme et donne à voir un chiffre visiblement vieux ;
     · calée sur l'horloge, elle affirmerait chaque matin qu'un relevé a eu lieu
       ce matin-là. Le nombre, lui, n'aurait pas bougé. C'est fabriquer de la
       fraîcheur — le même défaut que l'incrément aléatoire, déplacé sur l'axe
       de la date, et le même article L121-2.

   Un décompte au présent — « 7 officines actives » — n'affirme rien sur sa
   fraîcheur. Il demande seulement à être vrai. La page n'affiche donc pas de
   date, et `verifieLe` reste une trace interne.

   Une seule façon honnête de faire suivre la date à l'horloge : que le nombre
   soit relu en même temps. C'est la bascule décrite en fin de fichier — la date
   devient alors celle de la régénération, et elle est vraie parce que le chiffre
   vient d'être lu.                                                            */

/** Jours écoulés depuis la dernière vérification. */
function joursDepuisVerification() {
  const verifie = Date.parse(`${ADHERENTS.verifieLe}T00:00:00Z`);
  if (Number.isNaN(verifie)) return Number.POSITIVE_INFINITY;
  return Math.floor((Date.now() - verifie) / 86_400_000);
}

/** Au-delà, le chiffre est présumé décroché du réel. */
const PEREMPTION_JOURS = 90;

/* Le garde-fou qui remplace la date affichée.
   Puisque le visiteur ne voit plus quand le relevé a été fait, plus rien ne
   signalerait un chiffre oublié. L'avertissement le signale à qui peut le
   corriger.

   ⚠️ En développement seulement, et le garde n'est pas décoratif : ce module est
   importé par `hero.tsx`, qui est un composant client. Il part donc dans le
   paquet du navigateur, et sans ce garde la relance atterrirait dans la console
   des visiteurs. `next build` fixant `NODE_ENV` à `production`, l'avertissement
   ne sort pas non plus au build — il apparaît au `next dev`, c'est-à-dire là où
   quelqu'un travaille sur la page et peut agir. */
if (process.env.NODE_ENV !== "production" && estPublie) {
  const jours = joursDepuisVerification();
  if (jours > PEREMPTION_JOURS) {
    console.warn(
      `[adherents] Le parc affiché (${ADHERENTS.officines} officines, ` +
        `${ADHERENTS.membres} membres) n'a pas été vérifié depuis ${jours} jours. ` +
        `Confirmez-le auprès du client et mettez à jour lib/adherents.ts, ` +
        `ou remettez officines à 0 pour retirer le bloc de la page.`,
    );
  }
}

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
