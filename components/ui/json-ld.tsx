/**
 * Injection de données structurées schema.org.
 *
 * `<` est remplacé par son échappement unicode : sans cela, une donnée
 * contenant `</script>` refermerait la balise et ouvrirait une injection XSS.
 * C'est la recommandation de Next (`docs/01-app/02-guides/json-ld.md`).
 *
 * Une balise `<script>` native, pas `next/script` : ce sont des données,
 * pas du code à exécuter.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
