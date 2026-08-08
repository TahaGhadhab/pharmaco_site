import { Quote } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { Avatar } from "@/components/ui/avatar";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SECTION AVIS — verbatims réels
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Les citations ci-dessous sont les propos rapportés de trois titulaires qui
 * utilisent l'application. Seules la ponctuation et la casse ont été reprises ;
 * les mots sont les leurs.
 *
 * ⛔ NE JAMAIS INVENTER NI REFORMULER UN TÉMOIGNAGE. Un avis fabriqué est une
 *    pratique commerciale trompeuse (art. L121-2 et s. du Code de la
 *    consommation : jusqu'à 2 ans d'emprisonnement et 300 000 € d'amende,
 *    portable à 10 % du chiffre d'affaires). La directive Omnibus vise
 *    explicitement les faux avis. Et dans un métier où les confrères se
 *    parlent, un verbatim inventé se repère en une conversation.
 *
 * 📋 À conserver hors dépôt : l'accord écrit de chaque personne sur le texte
 *    exact, son prénom, son rôle et sa ville. Un simple email suffit et vous
 *    couvre en cas de contestation.
 *
 * La section ne s'affiche pas tant que `TEMOIGNAGES` est vide.
 * ═══════════════════════════════════════════════════════════════════════════
 */

type Temoignage = {
  /** Le verbatim, mot pour mot. */
  citation: string;
  /** Fragment de la citation à souligner en vert. Doit y figurer tel quel. */
  fort?: string;
  personne: string;
  /** Ex. « Titulaire · officine de quartier · Toulouse ». */
  fonction: string;
  /** Deux lettres pour l'avatar. */
  initiales: string;
  /** Chemin d'une vraie photo dans /public. Sinon, avatar généré. */
  photo?: string;
};

const TEMOIGNAGES: Temoignage[] = [
  {
    citation:
      "Je peux quitter la pharmacie sereinement. Je sais que l’équipe a toutes les informations pour continuer. Les consignes ne se perdent plus entre deux équipes : elles restent là, accessibles à tous.",
    fort: "Les consignes ne se perdent plus entre deux équipes",
    personne: "Patrick Bellil",
    fonction: "Titulaire · officine de quartier · Toulouse",
    initiales: "PB",
  },
  {
    citation:
      "Je sais immédiatement ce qui est fait, ce qui est en cours et ce qui attend encore. Même pendant les périodes de forte affluence, rien ne passe entre les mailles du filet.",
    fort: "rien ne passe entre les mailles du filet",
    personne: "GIN.S",
    fonction: "Titulaire · Pharmacie T9/SOUIR · Paris",
    initiales: "GS",
  },
  {
    citation:
      "Je n’ai plus besoin d’être derrière chaque collaborateur. L’organisation fait une partie du travail.",
    fort: "L’organisation fait une partie du travail",
    personne: "Marie Attali",
    fonction: "Titulaire · officine de centre-ville · Paris",
    initiales: "MA",
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

      <blockquote className="text-[1.02rem] leading-relaxed text-ink">
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
  if (TEMOIGNAGES.length === 0) return null;

  return (
    <Section id="avis" tone="surface">
      <Reveal className="mx-auto max-w-[38rem] text-center">
        <Eyebrow className="flex justify-center">Retours d’officines</Eyebrow>
        <h2 className="mt-5 text-h2 font-semibold text-ink">
          Ce que ça change, vu du comptoir.
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-3">
        {TEMOIGNAGES.map((t) => (
          <RevealItem key={t.personne} className="h-full">
            <Carte t={t} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
