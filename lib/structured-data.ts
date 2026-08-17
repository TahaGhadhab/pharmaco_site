import { PLANS, tarif } from "@/lib/pricing";
import { EMAIL_CONTACT, SITE_URL, site } from "@/lib/site";

/* ══════════════════════════════════════════════════════════════════════════
   Données structurées schema.org.

   Ce que lisent Google (rich results, AI Overviews) et les robots des LLM
   pour savoir *ce qu'est* PharmacoWork sans avoir à le déduire du texte.

   ⛔ §15 — rien ici ne doit dépasser ce qui est vérifiable :
      · pas d'`aggregateRating` ni de `review` : aucun avis réel n'existe,
        et en fabriquer un est une pratique commerciale trompeuse (L121-2).
      · pas de mention de certification, d'hébergement français, ni de
        conformité déclarée.

   Les `offers` reprennent la grille arrêtée par le client. Les montants ne
   sont pas recopiés : ils viennent de `lib/pricing.ts`, comme la section
   tarifs. Un prix affiché à l'écran et un prix balisé qui divergent, c'est
   Google qui signale l'écart — et un client qui a raison de le reprocher.
   ══════════════════════════════════════════════════════════════════════════ */

/** Identifiants stables : ils relient les entités entre elles dans le graphe. */
const ID_ORGANISATION = `${SITE_URL}/#organisation`;
const ID_SITE = `${SITE_URL}/#site`;
const ID_LOGICIEL = `${SITE_URL}/#logiciel`;

const DESCRIPTION =
  "PharmacoWork est l'espace de travail interne d'une officine de pharmacie française. " +
  "Il prend en charge ce que le logiciel de gestion d'officine ne fait pas : tâches, " +
  "ordonnances à préparer, commandes, ruptures, locations de matériel, qualité, agenda " +
  "et planning d'équipe. Il complète le LGO, il ne le remplace pas.";

/**
 * Le graphe complet, en une seule balise.
 *
 * `@graph` plutôt que trois scripts séparés : les `@id` se référencent
 * mutuellement, et Google traite l'ensemble comme une seule description
 * cohérente au lieu de trois fragments à recouper.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ID_ORGANISATION,
      name: site.name,
      /**
       * Les graphies du nom.
       *
       * Interrogés sur « PharmacoWork », plusieurs assistants répondaient sur
       * « Pharma Work » — un autre produit, rapproché au son. Déclarer les
       * variantes réelles donne de quoi trancher ; `/llms.txt` dit en toutes
       * lettres celles qui n'en sont pas.
       */
      alternateName: ["Pharmaco Work", "pharmacowork", "pharmacowork.fr"],
      url: SITE_URL,
      /**
       * Un PNG, pas le SVG — et des dimensions déclarées.
       *
       * Google accepte le SVG pour un logo d'`Organization`, et `/icon.svg`
       * répond bien : ce n'était pas cassé. Mais le matriciel reste ce que sa
       * chaîne de traitement d'images avale le plus sûrement, et `width`/`height`
       * lui évitent d'avoir à télécharger le fichier pour connaître la taille.
       * Le PNG est généré depuis le même SVG par `scripts/generer-icones.mjs` —
       * une seule source de dessin, deux formats de sortie.
       */
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-pharmacowork.png`,
        width: 512,
        height: 512,
        caption: "Logo PharmacoWork",
      },
      slogan: site.slogan,
      description: DESCRIPTION,
      email: EMAIL_CONTACT,
      areaServed: { "@type": "Country", name: "France" },
      knowsLanguage: "fr-FR",
    },
    {
      "@type": "WebSite",
      "@id": ID_SITE,
      url: SITE_URL,
      name: site.name,
      description: DESCRIPTION,
      inLanguage: "fr-FR",
      publisher: { "@id": ID_ORGANISATION },
      about: { "@id": ID_LOGICIEL },
    },
    {
      "@type": "SoftwareApplication",
      "@id": ID_LOGICIEL,
      name: site.name,
      alternateName: "Pharmaco Work",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Logiciel d'organisation pour officine de pharmacie",
      operatingSystem: "Web (navigateur), iOS, Android",
      browserRequirements: "Navigateur récent. Aucune installation requise.",
      inLanguage: "fr-FR",
      description: DESCRIPTION,
      publisher: { "@id": ID_ORGANISATION },
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Officine de pharmacie : titulaire, adjoint, préparateur, apprenti",
        geographicArea: { "@type": "Country", name: "France" },
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: Math.min(...PLANS.map((plan) => plan.mensuel)),
        highPrice: Math.max(...PLANS.map((plan) => plan.mensuel)),
        offerCount: PLANS.length,
        offers: PLANS.map((plan) => ({
          "@type": "Offer",
          name: plan.nom,
          description: `${plan.equipe} · ${plan.stockage} · tous les modules inclus`,
          category: "Abonnement par officine",
          priceCurrency: "EUR",
          price: plan.mensuel,
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              price: plan.mensuel,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
              billingDuration: 1,
              unitCode: "MON",
            },
            {
              "@type": "UnitPriceSpecification",
              price: tarif(plan, "annuel").parAn,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
              billingDuration: 12,
              unitCode: "MON",
            },
          ],
        })),
      },
      /* Les 15 modules réels — pas « Formation », interdit de mise en avant. */
      featureList: [
        "Tâches assignées et datées",
        "Ordonnances à préparer, lues par photo",
        "Commandes fournisseurs et livraisons attendues",
        "Ruptures déclarées, levées au scan, croisées avec le fichier ANSM",
        "Locations de matériel : échéancier, paiements, solde restant dû",
        "Qualité : contrôles, non-conformités, incidents",
        "Agenda de tout ce qui porte une date",
        "Planning d'équipe alimenté par le pointage",
        "Scan des codes-barres CIP13 par la caméra du téléphone",
        "Grille de droits réglée par le titulaire, sept rôles",
      ],
    },
  ],
} as const;
