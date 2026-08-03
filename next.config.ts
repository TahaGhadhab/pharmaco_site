import type { NextConfig } from "next";

/**
 * En-têtes de sécurité.
 *
 * Le site est entièrement statique : aucun secret côté serveur, aucune API,
 * aucun formulaire (le CTA renvoie vers l'application). La surface d'attaque se
 * réduit donc à l'injection de contenu et au détournement de la page.
 *
 * ⚠️ `script-src` autorise `'unsafe-inline'` : Next injecte ses propres scripts
 * en ligne (hydratation, données de route) et la page pose un script de thème
 * avant peinture. Les interdire demanderait un nonce par requête, donc un rendu
 * dynamique — au prix de la génération statique. La directive garde malgré tout
 * sa valeur : aucune origine externe ne peut charger de script, `object-src` est
 * fermé et `base-uri` verrouillé, ce qui coupe les vecteurs d'exfiltration.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // N'expose ni la version ni la pile technique dans les réponses.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            // Le site n'a besoin d'aucune de ces capacités.
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
