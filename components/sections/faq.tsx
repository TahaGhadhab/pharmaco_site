"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { JsonLd } from "@/components/ui/json-ld";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ESSAI_JOURS, PLANS, REMISE_ANNUELLE } from "@/lib/pricing";
import { site } from "@/lib/site";
import { eurosPrecis } from "@/lib/utils";

/* Les montants ne sont jamais retapés : ils viennent de la grille. Une réponse
   de FAQ qui contredit la section tarifs est une réponse fausse. */
const MOINS_CHER = Math.min(...PLANS.map((plan) => plan.mensuel));
const PLUS_CHER = Math.max(...PLANS.map((plan) => plan.mensuel));
const REMISE = `${Math.round(REMISE_ANNUELLE * 100)} %`;

/**
 * FAQ — §14 du contexte (réponses vérifiées) croisé avec le §6 de l'argumentaire
 * (traitement des objections).
 *
 * Le modèle tarifaire (abonnement par officine, calculé sur la taille de
 * l'équipe · 30 jours d'essai · inscription sans paiement) est la décision
 * commerciale du client. Les montants sont arrêtés et vivent dans
 * `lib/pricing.ts` : ne jamais en réécrire un ici, renvoyer vers #tarifs.
 * ⛔ Ne jamais écrire « remplace votre LGO ».
 *
 * Le JSON-LD `FAQPage` est construit à partir du même tableau que l'affichage.
 */

type Question = { q: string; r: string };

const QUESTIONS: Question[] = [
  {
    q: "Est-ce que ça remplace mon LGO ?",
    r: "Non, et vous le garderez. PharmacoWork ne fait ni délivrance, ni facturation, ni télétransmission. Il prend en charge ce que votre LGO ne fait pas : l'organisation de l'équipe et le suivi de ce qui reste à faire.",
  },
  {
    q: "Mon équipe ne le remplira pas.",
    r: "C'est l'objection la plus légitime, et le produit est construit pour elle. L'agenda n'a aucun champ de saisie, le planning se remplit depuis le pointage, le nom du médicament vient du scan. Ce qu'il reste à faire à la main : cocher une tâche, et scanner une boîte.",
  },
  {
    q: "Vous n'avez aucune référence, aucun client.",
    r: "C'est exact. PharmacoWork ouvre ses premières officines : vous parlez directement à ceux qui construisent le produit, et ce que vous demandez est arbitré la semaine même. C'est le seul moment où une officine peut peser sur un outil qu'elle utilisera dix ans — et nous n'afficherons pas de faux témoignages en attendant.",
  },
  {
    q: "Combien ça coûte ?",
    r: `Un abonnement par officine, calculé sur la taille de votre équipe : pas de facturation à l'utilisateur, pas de module en supplément. Trois formules, de ${eurosPrecis(MOINS_CHER)} à ${eurosPrecis(PLUS_CHER)} HT par mois, avec ${REMISE} de remise en engagement annuel. Les ${ESSAI_JOURS} premiers jours sont offerts et l'inscription ne demande aucun moyen de paiement.`,
  },
  {
    q: "Qu'est-ce qui change d'une formule à l'autre ?",
    r: "La taille de l'équipe et le volume de documents, rien d'autre. Les quinze modules sont dans les trois formules : aucune fonction n'est réservée à la formule du haut.",
  },
  {
    q: "Peut-on vous parler avant de s'inscrire ?",
    r: "Oui, en visio, écran partagé. Deux motifs : une découverte, où le service clients parcourt l'application avec vous, ou une initiation, où l'équipe prend le logiciel en main. Vous en faites la demande depuis la section Visio de cette page.",
  },
  {
    q: "Est-ce que mes confrères voient mes données ?",
    r: "Non. Chaque officine est cloisonnée : ses données portent son identifiant, et toute lecture est filtrée dessus. C'est vérifié automatiquement à chaque livraison.",
  },
  {
    q: "Qui décide de ce que chacun peut faire ?",
    r: "Vous. Sept rôles sont prévus, et le titulaire règle lui-même la grille des droits de son officine. Les étudiants et les stagiaires sont en consultation seule par défaut.",
  },
  {
    q: "Faut-il installer quelque chose ?",
    r: "Non. L'application s'ouvre dans le navigateur et s'installe en un geste sur l'écran d'accueil du téléphone. La caméra lit les codes-barres des boîtes : il n'y a pas de lecteur à acheter.",
  },
  {
    q: "D'où viennent les alertes de rupture nationale ?",
    r: "Du fichier de disponibilité publié par l'ANSM, rechargé chaque nuit. Vous n'êtes alerté que sur les médicaments que vous suivez déjà.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

function Item({
  question,
  index,
  open,
  onToggle,
}: {
  question: Question;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const baseId = useId();
  const boutonId = `${baseId}-b${index}`;
  const panneauId = `${baseId}-p${index}`;
  const Icone = open ? Minus : Plus;

  return (
    <div>
      <h3>
        <button
          type="button"
          id={boutonId}
          aria-expanded={open}
          aria-controls={panneauId}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-4 py-5 text-left transition-colors duration-200 ease-(--ease-out-soft) hover:text-primary-strong sm:gap-6"
        >
          <span className="text-[1.02rem] font-medium tracking-tight text-ink group-hover:text-primary-strong">
            {question.q}
          </span>
          <span
            aria-hidden
            className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-pill bg-surface-muted text-ink-3 transition-colors duration-200 ease-(--ease-out-soft) group-hover:bg-primary-tint group-hover:text-primary-strong"
          >
            <Icone className="size-4" strokeWidth={1.75} />
          </span>
        </button>
      </h3>

      <motion.div
        id={panneauId}
        role="region"
        aria-labelledby={boutonId}
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{
          duration: reduced ? 0 : 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden"
      >
        {/* `pr-10` réserve la gouttière de la pastille +/− sur grand écran.
            Sur téléphone, c'est 40 px pris à une colonne qui n'en a que 328 :
            la réponse y perd une ligne tous les trois paragraphes. */}
        <p className="max-w-[62ch] pb-6 text-[0.925rem] leading-relaxed text-ink-2 sm:pr-10">
          {question.r}
        </p>
      </motion.div>
    </div>
  );
}

export function Faq() {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <Section id="faq">
      <JsonLd data={FAQ_JSON_LD} />

      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <SectionHeading
              eyebrow="Questions"
              title="Ce qu'on nous demande. Sans détour."
              lead={
                <>
                  Les réponses décrivent le produit tel qu&apos;il est aujourd&apos;hui. Si
                  la vôtre n&apos;y est pas,{" "}
                  <Link
                    href={site.urls.contact}
                    className="font-medium text-primary-deep underline underline-offset-4 transition-colors duration-200 hover:text-primary-strong"
                  >
                    écrivez-nous
                  </Link>
                  .
                </>
              }
            />
          </div>
        </Reveal>

        <Reveal className="md:col-span-7" delay={0.08}>
          <div className="divide-y divide-line border-y border-line">
            {QUESTIONS.map((question, index) => (
              <Item
                key={question.q}
                question={question}
                index={index}
                open={ouvert === index}
                onToggle={() => setOuvert(ouvert === index ? null : index)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
