import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap.
 *
 * La vitrine est une page unique : une seule entrée. Les ancres (`#faq`,
 * `#simulateur`…) n'ont pas leur place ici — ce ne sont pas des URL
 * distinctes, et les déclarer ferait remonter des doublons.
 *
 * `lastModified` est figé à la date de build : une date qui change à chaque
 * requête est ignorée par Google, qui la lit comme du bruit.
 */

const DERNIERE_MODIFICATION = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: DERNIERE_MODIFICATION,
      changeFrequency: "weekly",
      priority: 1,
    },
    /* Les tutoriels sont la seule autre page de contenu : une prise en main
       en images, autonome, et une porte d'entrée légitime depuis la recherche. */
    {
      url: `${SITE_URL}/tutoriels`,
      lastModified: DERNIERE_MODIFICATION,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    /* Les pages légales sont indexables — elles participent à la confiance
       accordée au domaine — mais ne concurrencent pas l'accueil. */
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: DERNIERE_MODIFICATION,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/confidentialite`,
      lastModified: DERNIERE_MODIFICATION,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
