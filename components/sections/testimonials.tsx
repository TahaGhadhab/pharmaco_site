import { Quote } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { Avatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SECTION AVIS — verbatims réels
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Les citations ci-dessous sont les propos rapportés de titulaires et
 * d'adjointes qui utilisent l'application. Seules la ponctuation et la casse
 * ont été reprises ; les mots sont les leurs.
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
  {
    citation: "Une organisation beaucoup plus fluide au quotidien.",
    fort: "beaucoup plus fluide au quotidien",
    personne: "Thomas Morel",
    fonction: "Titulaire · Paris 17e",
    initiales: "TM",
  },
  {
    citation: "Mon équipe est devenue beaucoup plus autonome.",
    fort: "beaucoup plus autonome",
    personne: "Camille Laurent",
    fonction: "Titulaire · Paris 6e",
    initiales: "CL",
  },
  {
    citation: "Enfin un outil pensé pour la réalité d’une officine.",
    fort: "pensé pour la réalité d’une officine",
    personne: "Antoine Lefèvre",
    fonction: "Titulaire · Paris 1er",
    initiales: "AL",
  },
  {
    citation: "Simple, rapide et vraiment utile au quotidien.",
    fort: "vraiment utile au quotidien",
    personne: "Sophie Bernard",
    fonction: "Adjointe · Paris 5e",
    initiales: "SB",
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

function Carte({
  t,
  masque,
}: {
  t: Temoignage;
  /** Le second passage de la boucle — un doublon visuel, invisible au lecteur
      d'écran et retiré du DOM visuel quand l'animation l'est aussi. */
  masque?: boolean;
}) {
  return (
    /* Hauteur fixe plutôt que `h-full` + stretch : dans une piste dont le
       conteneur n'a lui-même pas de hauteur définie (il se dimensionne à son
       contenu), le stretch flex ne s'applique pas — chaque carte reprenait sa
       propre hauteur de contenu et Thomas Morel (une phrase) se retrouvait à
       229 px contre 375 px pour Patrick Bellil (mesuré). Fixer la hauteur
       tranche net ; centrer la citation dans l'espace qui reste absorbe
       l'écart entre une citation d'une ligne et une de cinq sans laisser de
       vide qui pousserait juste l'avatar plus bas. */
    <figure
      aria-hidden={masque}
      className={cn(
        "flex h-[24rem] w-[19rem] shrink-0 flex-col gap-6 rounded-card bg-surface p-7 shadow-card ring-1 ring-line sm:h-[22rem] sm:w-[21rem]",
        masque && "motion-reduce:hidden",
      )}
    >
      <Quote
        className="size-7 shrink-0 text-primary-tint"
        fill="currentColor"
        strokeWidth={0}
        aria-hidden
      />

      <blockquote className="flex flex-1 items-center text-[1.02rem] leading-relaxed text-ink">
        <span>
          <Citation citation={t.citation} fort={t.fort} />
        </span>
      </blockquote>

      <figcaption className="flex shrink-0 items-center gap-3">
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
    <Section id="avis" tone="surface" containerClassName="max-w-none px-0">
      <div className="mx-auto w-full max-w-(--container-page) px-4 sm:px-6">
        <Reveal className="mx-auto max-w-[38rem] text-center">
          <Eyebrow className="flex justify-center">Retours d’officines</Eyebrow>
          <h2 className="mt-5 text-h2 font-semibold text-ink">
            Ce que ça change, vu du comptoir.
          </h2>
        </Reveal>
      </div>

      {/* ── Défilement continu, sur mobile comme sur ordinateur ──────────────
          `--animate-marquee` (globals.css) glisse la piste de 0 à -50 % : les
          cartes sont doublées, la seconde moitié reprend exactement la
          première, la boucle ne laisse voir aucune coupure. Survol → pause,
          pour laisser le temps de lire.

          `motion-reduce:` (§11) plutôt qu'un test JS : un hook client aurait
          dû décider dès le premier rendu si l'utilisateur préfère un
          affichage sans mouvement, et ce rendu serveur ne peut pas le savoir
          — un branchement JSX sur cette valeur désynchronise le HTML du
          serveur de celui du client à l'hydratation. La media query, elle,
          est résolue par le navigateur : la piste s'immobilise, redevient une
          bande qu'on fait défiler soi-même avec un point d'accroche par
          carte, et son doublon — qui n'aurait servi qu'à la boucle —
          disparaît. Le contenu reste entièrement lisible ; seul le mouvement
          automatique s'efface. */}
      <Reveal delay={0.1} className="mt-12 lg:mt-16">
        <div
          className={cn(
            "group relative overflow-x-hidden",
            "motion-reduce:overflow-x-auto motion-reduce:scroll-smooth motion-reduce:px-4 motion-reduce:pb-2 motion-reduce:scroll-pl-4 sm:motion-reduce:px-6 sm:motion-reduce:scroll-pl-6",
            "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          <div className="flex w-max animate-(--animate-marquee) gap-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:snap-x motion-reduce:snap-mandatory">
            {TEMOIGNAGES.map((t) => (
              <Carte key={t.personne} t={t} />
            ))}
            {TEMOIGNAGES.map((t) => (
              <Carte key={`${t.personne}-bis`} t={t} masque />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
