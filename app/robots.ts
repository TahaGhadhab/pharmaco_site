import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt généré.
 *
 * Deux publics, une seule règle : tout est ouvert.
 *  · Les moteurs classiques (Googlebot, Bingbot) suivent la règle générique.
 *  · Les robots des LLM sont **nommés explicitement** en `Allow`. Sans cela
 *    certains s'abstiennent par prudence quand aucune directive ne les vise,
 *    et le produit n'existe alors pas dans leurs réponses.
 *
 * `Google-Extended` ne pilote pas l'indexation : il autorise l'usage du
 * contenu par Gemini et les AI Overviews. Le refuser sort le site des
 * réponses génératives de Google tout en le laissant dans les résultats bleus.
 */

const ROBOTS_LLM = [
  "GPTBot", // OpenAI — entraînement
  "OAI-SearchBot", // OpenAI — index de ChatGPT Search
  "ChatGPT-User", // OpenAI — navigation à la demande de l'utilisateur
  "ClaudeBot", // Anthropic — index
  "Claude-User", // Anthropic — navigation à la demande de l'utilisateur
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini & AI Overviews
  "Applebot-Extended",
  "Bingbot",
  "cohere-ai",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ROBOTS_LLM, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
