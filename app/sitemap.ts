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
  ];
}
