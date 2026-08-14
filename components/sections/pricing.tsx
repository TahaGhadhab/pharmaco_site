"use client";

import { useId, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  Building,
  Building2,
  Check,
  ChevronDown,
  Gift,
  HardDrive,
  Store,
  type LucideIcon,
} from "lucide-react";
import {
  ButtonLink,
  Section,
  SectionHeading,
  Tag,
} from "@/components/ui/primitives";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { Segmented, type SegmentedOption } from "@/components/ui/segmented";
import {
  COMPARATIF,
  EQUIPE_MAX,
  ESSAI_JOURS,
  PLANS,
  REMISE_ANNUELLE,
  tarif,
  type PeriodeId,
  type Plan,
} from "@/lib/pricing";
import { site } from "@/lib/site";
import { cn, eurosPrecis } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   Tarifs.

   Un abonnement par officine, calculé sur la taille de l'équipe. Les montants
   sont arrêtés : ils s'affichent. Tout le raisonnement tarifaire vit dans
   `lib/pricing.ts` — ici, on ne fait que le montrer.

   ── Ce qui donne son caractère à la section ──────────────────────────────
   · La formule conseillée est une carte encre, pas une carte blanche avec un
     liseré. Elle a le poids visuel du bloc de clôture, et le halo vert
     respirant de `u-ring-glow` — l'encart « qu'on veut faire remarquer ».
   · Chaque formule porte une jauge d'équipe : quinze pastilles, remplies
     jusqu'au plafond de la formule. D'une carte à l'autre, la barre s'allonge.
     La progression se lit avant même d'avoir lu un chiffre.
   · Le prix se recompose en fondu à chaque bascule, l'économie annuelle
     arrive en ressort. Rien ne saute : les hauteurs sont réservées.

   ── L'ergonomie commande la structure ────────────────────────────────────
   Une carte ne porte que quatre informations : la taille d'équipe, le prix,
   le stockage, et le fait que tous les modules sont inclus. Les neuf lignes
   du comparatif complet ne s'étalent pas — elles se déplient.
   ══════════════════════════════════════════════════════════════════════════ */

const PERIODES: readonly SegmentedOption<PeriodeId>[] = [
  {
    id: "mensuel",
    label: "Mensuel",
    description: "Afficher les tarifs mensuels",
  },
  {
    id: "annuel",
    label: "Annuel",
    badge: `−${Math.round(REMISE_ANNUELLE * 100)} %`,
    description: `Afficher les tarifs annuels, remise de ${Math.round(REMISE_ANNUELLE * 100)} %`,
  },
];

/** Une officine de quartier, une officine de centre-ville, un grand plateau. */
const ICONES: Record<string, LucideIcon> = {
  petite: Store,
  moyenne: Building2,
  grande: Building,
};

/* ── Le rebond ────────────────────────────────────────────────────────────
   Un ressort, pas une courbe : la carte dépasse sa position puis revient. Le
   reste de la page entre en `ease-out` — ici on veut qu'on sente arriver un
   objet, pas qu'on le voie apparaître.

   `damping` bas (13) = le rebond. Au-delà de 18 il n'y en a plus, en dessous
   de 10 la carte oscille et ça devient un jouet. §11 : neutralisé en
   `prefers-reduced-motion`, où il ne reste que l'opacité.                   */

const REBOND: Variants = {
  hidden: { opacity: 0, y: 38 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 13, mass: 0.9 },
  },
};

const REBOND_REDUIT: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

/** Le même ressort, en plus vif, pour le survol. */
const RESSORT_SURVOL = {
  type: "spring",
  stiffness: 420,
  damping: 14,
  mass: 0.7,
} as const;

/* ── La flottaison ────────────────────────────────────────────────────────
   Une fois posée, la carte conseillée ne s'immobilise pas tout à fait : elle
   respire, cinq pixels en cinq secondes et demie. C'est le mouvement des
   fragments d'interface du hero, à l'identique — le vocabulaire existe déjà,
   on ne lui en invente pas un deuxième.

   Elle ne démarre qu'à la FIN du rebond, sur `onAnimationComplete`, et pas
   après un délai deviné : le rebond ne se déclenche qu'à l'entrée dans le
   viewport, un délai compté depuis le montage tomberait n'importe quand.

   Deux étages de `motion` et non un seul : le rebond et le survol occupent
   déjà le `transform` du conteneur. Une troisième animation sur la même
   propriété écraserait les deux autres — imbriquée, elle s'y compose.       */

const FLOTTAISON = 5;
const RESPIRATION = 5.5;

function PlanAnime({ plan, periode }: { plan: Plan; periode: PeriodeId }) {
  const reduced = useReducedMotion();
  const [pose, setPose] = useState(false);
  const flotte = plan.conseille && pose && !reduced;

  return (
    <motion.div
      variants={reduced ? REBOND_REDUIT : REBOND}
      whileHover={reduced ? undefined : { y: -10 }}
      transition={RESSORT_SURVOL}
      onAnimationComplete={(etat) => {
        if (etat === "shown") setPose(true);
      }}
      /* Le décalage de la carte conseillée passe par une marge négative, pas
         par `-translate-y` : le ressort occupe déjà le `transform`, et une
         classe CSS le lui reprendrait au premier survol. */
      className={cn("h-full", plan.conseille && "lg:-mt-3")}
    >
      <motion.div
        animate={flotte ? { y: [0, -FLOTTAISON, 0] } : undefined}
        transition={
          flotte
            ? { duration: RESPIRATION, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        className="h-full"
      >
        <CartePlan plan={plan} periode={periode} />
      </motion.div>
    </motion.div>
  );
}

/* ── Jauge d'équipe ───────────────────────────────────────────────────────
   Quinze pastilles — le plafond de la plus grande formule. Décoratif au sens
   strict : la taille d'équipe est déjà écrite juste au-dessus, en toutes
   lettres. Donc `aria-hidden`, rien à annoncer deux fois.                  */

function JaugeEquipe({ plan }: { plan: Plan }) {
  return (
    <div className="mt-5 flex flex-wrap gap-1" aria-hidden>
      {Array.from({ length: EQUIPE_MAX }, (_, index) => (
        <span
          key={index}
          className={cn(
            "size-1.5 rounded-pill transition-colors duration-300 ease-(--ease-out-soft)",
            index < plan.a ? "bg-primary" : "bg-line",
          )}
        />
      ))}
    </div>
  );
}

/* ── Une formule ──────────────────────────────────────────────────────────*/

function CartePlan({ plan, periode }: { plan: Plan; periode: PeriodeId }) {
  const reduced = useReducedMotion();
  const { parMois, parAn, economie } = tarif(plan, periode);
  const annuel = periode === "annuel";
  const Icone = ICONES[plan.id] ?? Store;

  const carte = (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden bg-surface p-6 sm:p-7",
        /* 22 px = le rayon de feuille moins l'épaisseur du contour. Un rayon
           intérieur égal au rayon extérieur laisserait un liseré plus épais
           dans les angles qu'au milieu des côtés. */
        /* Plus de `hover:-translate-y-1` ici : le soulèvement est passé au
           ressort, sur le conteneur animé. Deux transforms sur la même carte,
           l'une en CSS l'autre en JS, s'écraseraient l'une l'autre. */
        plan.conseille
          ? "rounded-[22px]"
          : "rounded-sheet shadow-card ring-1 ring-line transition-shadow duration-300 ease-(--ease-out-soft) hover:shadow-raised",
      )}
    >
      {plan.conseille ? (
        <>
          {/* Le fond noir a sauté : sur une rangée de cartes blanches, il
              cassait la famille au lieu de la dominer. Reste un lavis qui
              descend du haut de la carte — assez pour qu'elle se détache, pas
              assez pour qu'elle en sorte. Il suit l'accent de la formule
              conseillée : un lavis vert sous une étiquette orange ferait deux
              familles de couleur dans le même empan de deux cents pixels. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-linear-to-b from-featured-tint/55 to-transparent"
          />
          <span
            aria-hidden
            className="u-grid-faint pointer-events-none absolute inset-0 opacity-40"
          />
        </>
      ) : null}

      {/* Hauteur réservée dans les trois cartes : sans elle, la formule
          conseillée décalerait ses voisines d'une ligne. */}
      <div className="relative flex min-h-8 items-start">
        {plan.conseille ? (
          /* Pilule claire cerclée de vert, et non plus un aplat de menthe : sur
             une carte blanche posée sur un lavis vert, l'aplat faisait une
             troisième valeur de vert dans le même centimètre carré. Le texte
             passe de `primary-strong` à `primary-deep` — deux crans de moins,
             toujours 5,2 de contraste. */
          <Tag className="bg-surface/75 text-primary-deep ring-1 ring-primary/25">
            {/* Le pouls de la pastille « en poste », repris tel quel du hero :
                un point qui bat, pas une décoration de plus. Halo à 45 % : à
                pleine teinte il clignotait plus fort que le texte. */}
            <span className="relative flex size-1.5" aria-hidden>
              <span className="motion-halo absolute inset-0 animate-(--animate-halo) rounded-pill bg-featured-dot/45" />
              <span className="relative size-1.5 rounded-pill bg-featured-dot" />
            </span>
            Conseillé pour votre officine
          </Tag>
        ) : null}
      </div>

      {/* La formule conseillée porte le vert plein, les autres sa teinte :
          la hiérarchie se lit sur la pastille avant même le prix. */}
      <span
        aria-hidden
        className={cn(
          "relative mt-4 flex size-11 items-center justify-center rounded-pill",
          plan.conseille
            ? "bg-primary-cta text-white shadow-cta dark:text-[#06120c]"
            : "bg-primary-tint text-primary-strong",
        )}
      >
        <Icone className="size-5" strokeWidth={1.75} />
      </span>

      <h3 className="relative mt-5 text-[1.18rem] font-semibold tracking-tight text-ink">
        {plan.nom}
      </h3>
      <p className="relative mt-1.5 text-[0.9rem] text-ink-3">{plan.equipe}</p>

      <div className="relative">
        <JaugeEquipe plan={plan} />
      </div>

      {/* Le prix. Hauteur réservée : la ligne annuelle en compte deux, et la
          grille ne doit pas tressauter à chaque bascule. */}
      <div className="relative mt-7 min-h-[7.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={periode}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(5px)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(5px)" }}
            transition={{ duration: reduced ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="u-numeric text-[clamp(2.1rem,1.7rem_+_1.3vw,2.6rem)] leading-none font-semibold text-ink">
                {eurosPrecis(parMois)}
              </span>
              <span className="u-eyebrow text-ink-4">HT / mois</span>
            </p>

            {annuel ? (
              <>
                <p className="mt-3.5 text-[0.86rem] leading-relaxed text-ink-3">
                  Soit{" "}
                  <span className="u-numeric font-medium text-ink-2">
                    {eurosPrecis(parAn)}
                  </span>{" "}
                  HT par an
                </p>

                <motion.p
                  initial={reduced ? false : { opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 460,
                    damping: 24,
                    delay: 0.08,
                  }}
                  className="u-numeric mt-2.5 inline-flex origin-left items-center gap-1.5 rounded-pill bg-primary-tint px-2.5 py-1 text-[0.72rem] leading-none text-primary-strong"
                >
                  <Gift className="size-3.5" strokeWidth={2} aria-hidden />
                  {eurosPrecis(economie)} économisés
                </motion.p>
              </>
            ) : (
              <p className="mt-3.5 text-[0.86rem] leading-relaxed text-ink-3">
                Facturé chaque mois.
                <br />
                <span className="font-medium text-primary-deep">
                  −{Math.round(REMISE_ANNUELLE * 100)} % en annuel
                </span>
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Deux lignes, pas davantage : ce qui distingue la formule, et ce qui
          ne la distingue pas. */}
      <ul className="relative mt-6 flex flex-col gap-3 border-t border-line pt-6">
        <li className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-ink-2">
          <HardDrive
            className="mt-px size-4.5 shrink-0 text-primary-deep"
            strokeWidth={1.75}
            aria-hidden
          />
          {plan.stockage}
        </li>
        <li className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-ink-2">
          <Check
            className="mt-px size-4.5 shrink-0 text-primary-deep"
            strokeWidth={2.25}
            aria-hidden
          />
          Tous les modules, sans supplément
        </li>
      </ul>

      <ButtonLink
        href={site.urls.inscription}
        variant={plan.conseille ? "primary" : "secondary"}
        className={cn(
          "relative mt-8 w-full",
          /* Sur fond blanc, un bouton blanc s'efface. On le tire vers le vert :
             il reste secondaire, mais il existe. */
          !plan.conseille &&
            "text-primary-strong ring-primary/35 hover:bg-primary-tint hover:ring-primary/50",
        )}
      >
        {site.cta.primary}
      </ButtonLink>
    </div>
  );

  if (!plan.conseille) return carte;

  /* Le cadre lumineux. Il n'entoure QUE la formule conseillée : c'est un
     signal, et un signal que porteraient les trois cartes n'en serait plus un.
     Le dégradé conique tourne en 7 s ; la carte, posée dessus, n'en laisse
     voir qu'un liseré de deux pixels — un et demi passait inaperçu de jour. */
  return (
    <div className="u-border-spin relative h-full rounded-sheet p-[2px]">
      {carte}
    </div>
  );
}

/* ── Comparatif déplié ────────────────────────────────────────────────────*/

function Comparatif({ periode }: { periode: PeriodeId }) {
  const [ouvert, setOuvert] = useState(false);
  const panneauId = useId();

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => setOuvert((valeur) => !valeur)}
        aria-expanded={ouvert}
        aria-controls={panneauId}
        className={cn(
          "mx-auto flex items-center gap-2.5 rounded-pill bg-surface px-5 py-3",
          "text-[0.92rem] font-medium text-ink-2 shadow-card ring-1 ring-line",
          "transition-[transform,color,box-shadow] duration-200 ease-(--ease-out-soft)",
          "hover:-translate-y-0.5 hover:text-ink hover:shadow-raised",
        )}
      >
        {ouvert ? "Masquer le comparatif" : "Comparer les formules"}
        <ChevronDown
          strokeWidth={1.75}
          aria-hidden
          className={cn(
            "size-4 shrink-0 transition-transform duration-300 ease-(--ease-out-soft)",
            ouvert && "rotate-180",
          )}
        />
      </button>

      <div
        id={panneauId}
        aria-hidden={!ouvert}
        className={cn(
          "grid transition-[grid-template-rows] duration-[420ms] ease-(--ease-out-soft)",
          ouvert ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {/* Le tableau garde sa largeur et défile de lui-même sur petit
              écran : le rétrécir casserait la lecture en colonnes. */}
          <div className="mt-7 overflow-x-auto rounded-card bg-surface shadow-card ring-1 ring-line">
            {/* `border-separate` et non `border-collapse` : une cellule collante
                perd ses bordures en mode fusionné, sur plusieurs moteurs. Les
                filets sont donc portés par les cellules, une par une. */}
            <table className="w-full min-w-[46rem] border-separate border-spacing-0 text-left">
              <caption className="sr-only">
                Comparaison des trois formules d&rsquo;abonnement
              </caption>

              <thead>
                <tr>
                  {/* La colonne des libellés reste en place quand le tableau
                      défile : sur un téléphone, sans elle, on lit trois coches
                      sans savoir de quoi elles parlent. */}
                  <th
                    scope="col"
                    className="u-eyebrow sticky left-0 z-10 border-b border-line bg-surface px-5 py-4 text-left font-normal text-ink-4"
                  >
                    Comparer les formules
                  </th>
                  {PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className={cn(
                        "border-b border-line px-4 py-4 text-center align-top",
                        plan.conseille && "bg-primary-tint-2 dark:bg-surface-muted",
                      )}
                    >
                      <span className="block text-[0.9rem] font-semibold text-ink">
                        {plan.nom}
                      </span>
                      <span className="u-numeric mt-1 block text-[0.72rem] font-normal text-ink-4">
                        {eurosPrecis(tarif(plan, periode).parMois)} HT / mois
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {COMPARATIF.map((ligne, rang) => {
                  const dernier = rang === COMPARATIF.length - 1;

                  return (
                    <tr key={ligne.libelle} className="group/ligne">
                      <th
                        scope="row"
                        className={cn(
                          "sticky left-0 z-10 bg-surface px-5 py-3.5 text-left text-[0.88rem] font-medium text-ink-2",
                          "transition-colors duration-200 group-hover/ligne:text-ink",
                          !dernier && "border-b border-line",
                        )}
                      >
                        {ligne.libelle}
                      </th>

                      {PLANS.map((plan, colonne) => (
                        <td
                          key={plan.id}
                          className={cn(
                            "px-4 py-3.5 text-center text-[0.86rem] text-ink-2",
                            !dernier && "border-b border-line",
                            plan.conseille
                              ? "bg-primary-tint-2 dark:bg-surface-muted"
                              : "transition-colors duration-200 group-hover/ligne:bg-surface-muted/60",
                          )}
                        >
                          {ligne.valeurs ? (
                            ligne.valeurs[colonne]
                          ) : (
                            <span className="inline-flex size-6 items-center justify-center rounded-pill bg-primary-tint text-primary-strong">
                              <Check
                                className="size-3.5"
                                strokeWidth={3}
                                aria-hidden
                              />
                              <span className="sr-only">Inclus</span>
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────*/

export function Pricing() {
  const [periode, setPeriode] = useState<PeriodeId>("mensuel");

  return (
    /* Le fond de section a son propre jeton : c'est lui qui bascule quand on
       échange les rôles de l'ambre et du vert. `tone="tint"` reste la base,
       il fournit le repli sombre. */
    <Section id="tarifs" tone="tint" className="bg-section-tarifs">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Tarifs"
            title="Un abonnement par officine. Jamais par utilisateur."
            lead="Tous les modules dans les trois formules. Seuls la taille de l'équipe et le volume de documents changent."
          />
          <Segmented
            options={PERIODES}
            value={periode}
            onChange={setPeriode}
            ariaLabel="Période de facturation"
          />
        </div>
      </Reveal>

      {/* Sous 1024 px les cartes s'empilent, bridées à 26 rem et centrées : une
          carte tarifaire large de toute la page ne se lit pas. À partir de lg,
          les trois colonnes, où le libellé « Conseillé » tient sur une ligne. */}
      <RevealGroup className="mx-auto mt-12 grid max-w-[26rem] items-stretch gap-5 md:mt-16 lg:max-w-none lg:grid-cols-3 lg:gap-6">
        {PLANS.map((plan) => (
          <PlanAnime key={plan.id} plan={plan} periode={periode} />
        ))}
      </RevealGroup>

      <Reveal delay={0.08}>
        {/* L'essai est l'argument d'entrée : il a droit à son propre encart.
            Liseré vert plutôt que halo animé — le halo appartient à la carte
            conseillée, et deux signaux qui pulsent n'en font plus aucun. */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-card bg-surface p-6 text-center shadow-card ring-1 ring-primary/25 sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
          <span
            aria-hidden
            className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-primary-tint text-primary-strong"
          >
            <Gift className="size-5.5" strokeWidth={1.75} />
          </span>

          <div>
            <p className="text-[1.05rem] font-semibold tracking-tight text-ink">
              <span className="u-numeric">{ESSAI_JOURS}</span> jours d&rsquo;essai
              gratuit
            </p>
            <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-3">
              Pour toute nouvelle officine. Aucun moyen de paiement demandé à
              l&rsquo;inscription.
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-[0.78rem] leading-relaxed text-ink-4">
          Montants hors taxes, par officine. Le passage d&rsquo;une formule à
          l&rsquo;autre suit la taille de votre équipe.
        </p>

        <Comparatif periode={periode} />
      </Reveal>
    </Section>
  );
}
