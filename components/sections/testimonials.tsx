"use client";

import { useRef, useState } from "react";
import { Quote } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
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

/* Vitesse de croisière du défilement, en pixels/seconde. */
const VITESSE = 62;

/**
 * Piste défilante — pilotée en JS plutôt qu'en CSS `@keyframes`.
 *
 * Un `animation-play-state: paused` s'arrête net, à la frame près : c'est ce
 * qu'on avait, et ce n'est pas ce qu'on veut. Ici la vitesse elle-même est une
 * valeur qui glisse vers sa cible (0 au survol ou au doigt posé, `VITESSE`
 * sinon) à chaque frame — un simple lissage exponentiel, indépendant du
 * framerate. Résultat : on décélère jusqu'à l'arrêt, on réaccélère à la
 * relâche, jamais un à-coup.
 *
 * `onPointerEnter`/`onPointerLeave` couvrent aussi bien le survol souris que
 * le doigt posé sur un écran tactile — Chrome et Firefox les déclenchent pour
 * les deux types de pointeur. `onPointerDown`/`onPointerUp` en secours,
 * au cas où un navigateur ne suivrait pas un doigt qui reste immobile.
 *
 * Ne tourne que si l'utilisateur accepte le mouvement (§11). La préférence
 * vient de `useReducedMotion`, comme partout ailleurs sur le site — et elle ne
 * gouverne QUE la boucle d'animation. Elle ne décide jamais de la sortie JSX :
 * ce hook s'initialise pendant le rendu, il vaut `false` sur le serveur et peut
 * valoir `true` à l'hydratation. Un JSX qui en dépendrait désynchroniserait les
 * deux HTML — c'est ce qui était déjà arrivé sur cette section. Ici le rendu est
 * le même dans les deux cas : piste immobile, et `motion-reduce:` bascule le
 * conteneur sur un défilement manuel classique, en CSS pur.
 */
function PisteAvis() {
  const pisteRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const vitesseActuelle = useRef(0);
  const [survole, setSurvole] = useState(false);
  const reduit = useReducedMotion();

  useAnimationFrame((_t, delta) => {
    if (reduit || !pisteRef.current) return;

    const cible = survole ? 0 : VITESSE;
    const lissage = 1 - Math.exp(-delta / 220);
    vitesseActuelle.current += (cible - vitesseActuelle.current) * lissage;

    const demiLargeur = pisteRef.current.scrollWidth / 2;
    if (demiLargeur === 0) return;

    let prochain = x.get() - vitesseActuelle.current * (delta / 1000);
    if (prochain <= -demiLargeur) prochain += demiLargeur;
    x.set(prochain);
  });

  const surPointeur = (dedans: boolean) => setSurvole(dedans);

  return (
    <div
      className={cn(
        "relative overflow-x-hidden",
        "motion-reduce:overflow-x-auto motion-reduce:scroll-smooth motion-reduce:px-4 motion-reduce:pb-2 motion-reduce:scroll-pl-4 sm:motion-reduce:px-6 sm:motion-reduce:scroll-pl-6",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      )}
      onPointerEnter={() => surPointeur(true)}
      onPointerLeave={() => surPointeur(false)}
      onPointerDown={() => surPointeur(true)}
      onPointerUp={() => surPointeur(false)}
      onPointerCancel={() => surPointeur(false)}
    >
      <motion.div
        ref={pisteRef}
        style={{ x }}
        className="flex w-max gap-5 motion-reduce:snap-x motion-reduce:snap-mandatory"
      >
        {TEMOIGNAGES.map((t) => (
          <Carte key={t.personne} t={t} />
        ))}
        {TEMOIGNAGES.map((t) => (
          <Carte key={`${t.personne}-bis`} t={t} masque />
        ))}
      </motion.div>
    </div>
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

      <Reveal delay={0.1} className="mt-12 lg:mt-16">
        <PisteAvis />
      </Reveal>
    </Section>
  );
}
