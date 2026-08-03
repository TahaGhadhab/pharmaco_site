import { Quote } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { Avatar } from "@/components/ui/avatar";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SECTION AVIS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Le design est terminé. Il ne manque que le contenu.
 *
 * ⛔ NE PAS PUBLIER DE TÉMOIGNAGE INVENTÉ. Un avis fabriqué est une pratique
 *    commerciale trompeuse (art. L121-2 et s. du Code de la consommation :
 *    jusqu'à 2 ans d'emprisonnement et 300 000 € d'amende, portable à 10 % du
 *    chiffre d'affaires). La directive Omnibus vise explicitement les faux avis.
 *
 * ─── COMMENT ÇA MARCHE ─────────────────────────────────────────────────────
 *
 *   TEMOIGNAGES  → vrais verbatims. Vide aujourd'hui.
 *   APERCU       → maquette de mise en page, affichée UNIQUEMENT en `npm run dev`.
 *
 * En production, tant que TEMOIGNAGES est vide, la section ne s'affiche pas du
 * tout. L'aperçu ne peut donc pas partir en ligne par accident.
 *
 * ─── COMMENT OBTENIR UN VRAI VERBATIM EN DIX MINUTES ───────────────────────
 *
 * Appelez un titulaire qui utilise déjà l'application et posez ces trois
 * questions. La réponse à la deuxième est presque toujours la bonne citation.
 *
 *   1. « Qu'est-ce que vous faisiez avant, pour ça ? »
 *      → installe le contraste, et détend la personne.
 *
 *   2. « Qu'est-ce qui a changé concrètement, dans une journée normale ? »
 *      → c'est ici que sort la phrase utilisable. Ne la reformulez pas :
 *        les maladresses de l'oral sont ce qui rend un témoignage crédible.
 *
 *   3. « Vous le diriez à un confrère ? Dans quels termes ? »
 *      → donne souvent une meilleure formulation que la 2.
 *
 * Puis : accord écrit de la personne sur le texte exact, son prénom, son rôle
 * et sa région. Un simple email de confirmation suffit et vous protège.
 * ═══════════════════════════════════════════════════════════════════════════
 */

type Temoignage = {
  /** Le verbatim, mot pour mot. */
  citation: string;
  /** Fragment de la citation à souligner en vert. Doit y figurer tel quel. */
  fort?: string;
  /** Prénom + initiale du nom, avec accord de la personne. */
  personne: string;
  /** Ex. « Titulaire · officine de quartier · Occitanie ». */
  fonction: string;
  /** Deux lettres pour l'avatar. */
  initiales: string;
  /** Chemin d'une vraie photo dans /public. Sinon, avatar généré. */
  photo?: string;
};

/** ✅ Les vrais verbatims. C'est ce tableau qu'il faut remplir pour publier. */
const TEMOIGNAGES: Temoignage[] = [];

/** 🔧 Maquette de mise en page. Jamais rendue en production. */
const APERCU: Temoignage[] = [
  {
    citation:
      "Avant, je portais toute l’officine dans ma tête. Maintenant l’équipe voit la même chose que moi, et je n’ai plus à répéter trois fois la même consigne.",
    fort: "l’équipe voit la même chose que moi",
    personne: "patrick bellil",
    fonction: "Titulaire · officine de quartier · Toulouse",
    initiales: "PB",
  },
  {
    citation:
      "Le vrai changement, c’est le passage de relais. L’équipe de l’après-midi arrive et sait où on en est, sans que personne ait eu besoin de lui expliquer.",
    fort: "sait où on en est",
    personne: "GIN.S",
    fonction: "Ttulaire,·pharmacie T9/SOUIR·paris",
    initiales: "GS",
  },
  {
    citation:
      "Les locations, c’est ce qui m’a le plus surpris. On a récupéré deux termes qu’on n’aurait jamais vus passer autrement.",
    fort: "deux termes qu’on n’aurait jamais vus passer",
    personne: "salma coaching",
    fonction: "Titulaire · officine de centre-ville · PARIS",
    initiales: "SC",
  },
];

function Citation({ citation, fort }: Pick<Temoignage, "citation" | "fort">) {
  if (!fort || !citation.includes(fort)) return <>{citation}</>;

  const [avant, apres] = citation.split(fort);
  return (
    <>
      {avant}
      <span className="font-semibold text-primary-strong">{fort}</span>
      {apres}
    </>
  );
}

function Carte({ t }: { t: Temoignage }) {
  return (
    <figure className="flex h-full flex-col gap-6 rounded-card bg-surface p-7 shadow-card ring-1 ring-line">
      <Quote
        className="size-7 shrink-0 text-primary-tint"
        fill="currentColor"
        strokeWidth={0}
        aria-hidden
      />

      <blockquote className="text-[1.05rem] leading-relaxed text-ink">
        <Citation citation={t.citation} fort={t.fort} />
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3">
        <Avatar nom={t.citation} initiales={t.initiales} photo={t.photo} />
        <span className="block">
          <span className="block text-[0.92rem] font-semibold text-ink">
            {t.personne}
          </span>
          <span className="u-eyebrow mt-0.5 block text-ink-4">{t.fonction}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const publiables = TEMOIGNAGES.length > 0;
  const apercu = !publiables && process.env.NODE_ENV === "development";

  /* Rien de réel à montrer, et on n'est pas en développement : la section n'existe pas. */
  if (!publiables && !apercu) return null;

  const liste = publiables ? TEMOIGNAGES : APERCU;

  return (
    <Section id="avis" tone="surface">
      {apercu ? (
        <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-card border-2 border-dashed border-warning/50 bg-warning-tint/50 px-5 py-4">
          <span className="u-eyebrow rounded-pill bg-warning px-2.5 py-1 text-[#3a2a10]">
            Aperçu
          </span>
          <span className="text-[0.88rem] leading-relaxed text-ink-2">
            Mise en page seulement — ces citations sont fictives et ne
            s’affichent qu’en <span className="u-numeric">npm run dev</span>.
            Remplissez <span className="u-numeric">TEMOIGNAGES</span> avec de
            vrais verbatims pour publier la section.
          </span>
        </div>
      ) : null}

      <Reveal className="mx-auto max-w-[38rem] text-center">
        <Eyebrow className="flex justify-center">Retours d’officines</Eyebrow>
        <h2 className="mt-5 text-h2 font-semibold text-ink">
          Ce que ça change, vu du comptoir.
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
        {liste.map((t, i) => (
          <RevealItem key={`${t.personne}-${i}`} className="h-full">
            <Carte t={t} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
