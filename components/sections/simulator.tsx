"use client";

import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import {
  ButtonLink,
  Card,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import {
  CHAMPS,
  CLAUSE_LEGALE,
  DEFAUTS,
  STATUT_LIBELLE,
  calculer,
  formaterETP,
  formaterPartRevenu,
  formaterValeur,
  type Champ,
  type Entrees,
} from "@/lib/simulator";
import { site } from "@/lib/site";
import { cn, euros } from "@/lib/utils";

/* ── Interpolation douce du montant ───────────────────────────────────────
   Le chiffre glisse d'une valeur à l'autre : c'est ce qui donne envie de
   bouger les curseurs. §11 : coupé net si `prefers-reduced-motion`.        */

const DUREE_INTERPOLATION = 420;

function useMontantAnime(cible: number, reduit: boolean) {
  const [anime, setAnime] = useState(cible);
  const courant = useRef(cible);

  useEffect(() => {
    // Mouvement réduit : aucune interpolation, on garde seulement le repère.
    if (reduit) {
      courant.current = cible;
      return;
    }
    const depart = courant.current;
    if (depart === cible) return;

    const debut = performance.now();
    let image = 0;

    const boucle = (maintenant: number) => {
      const avancement = Math.min(1, (maintenant - debut) / DUREE_INTERPOLATION);
      const adouci = 1 - Math.pow(1 - avancement, 3);
      const valeur = depart + (cible - depart) * adouci;
      courant.current = valeur;
      setAnime(valeur);
      if (avancement < 1) image = requestAnimationFrame(boucle);
    };

    image = requestAnimationFrame(boucle);
    return () => cancelAnimationFrame(image);
  }, [cible, reduit]);

  return reduit ? cible : anime;
}

/* ── Curseur ──────────────────────────────────────────────────────────────
   `input[type=range]` restylé, sans librairie. La piste et son remplissage
   sont des calques ; l'input reste natif, donc accessible au clavier.      */

const CURSEUR = [
  "absolute inset-0 h-6 w-full cursor-pointer appearance-none rounded-pill bg-transparent",
  "[&::-webkit-slider-runnable-track]:h-6 [&::-webkit-slider-runnable-track]:bg-transparent",
  "[&::-webkit-slider-thumb]:mt-0.5 [&::-webkit-slider-thumb]:box-border",
  "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-2",
  "[&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:bg-primary",
  "[&::-webkit-slider-thumb]:shadow-cta",
  "[&::-moz-range-track]:h-6 [&::-moz-range-track]:border-none [&::-moz-range-track]:bg-transparent",
  "[&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:size-5",
  "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-pill",
  "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface",
  "[&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-cta",
].join(" ");

function Curseur({
  champ,
  valeur,
  onChange,
}: {
  champ: Champ;
  valeur: number;
  onChange: (valeur: number) => void;
}) {
  const id = useId();
  const noteId = `${id}-note`;
  const remplissage = ((valeur - champ.min) / (champ.max - champ.min)) * 100;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <label htmlFor={id} className="text-[0.95rem] font-medium text-ink">
          {champ.libelle}
        </label>
        <span className="u-numeric text-[1.05rem] font-semibold text-primary-deep">
          {formaterValeur(champ.unite, valeur)}
        </span>
      </div>

      <div className="relative mt-4 h-6">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-pill bg-surface-muted dark:bg-line"
        />
        <span
          aria-hidden
          style={{ width: `${remplissage}%` }}
          className="pointer-events-none absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-pill bg-primary"
        />
        <input
          id={id}
          type="range"
          min={champ.min}
          max={champ.max}
          step={champ.pas}
          value={valeur}
          aria-describedby={noteId}
          onChange={(event) => onChange(Number(event.target.value))}
          className={CURSEUR}
        />
      </div>

      <p id={noteId} className="u-eyebrow mt-3 text-ink-4">
        {champ.note}
      </p>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────*/

export function Simulator() {
  const reduit = useReducedMotion() ?? false;
  const [entrees, setEntrees] = useState<Entrees>(DEFAUTS);
  const [detailOuvert, setDetailOuvert] = useState(false);

  const { total, lignes, etp, partRevenu } = calculer(entrees);
  const montant = useMontantAnime(total, reduit);
  const equivalent = formaterETP(etp);
  const partRevenuTexte = formaterPartRevenu(partRevenu);
  const plafond = Math.max(...lignes.map((ligne) => ligne.montant), 1);

  const majEntree = (cle: keyof Entrees, valeur: number) =>
    setEntrees((precedent) => ({ ...precedent, [cle]: valeur }));

  return (
    <Section id="simulateur" tone="tint">
      <Reveal>
        <SectionHeading
          eyebrow="Ce que ça coûte"
          title={
            <>
              Vos quatre chiffres. Le montant qu&rsquo;ils dessinent.
            </>
          }
          lead="Deux lignes sur trois viennent de sources publiques. La troisième, c'est vous qui la réglez. Rien dans ce total ne sort de chez nous."
        />
      </Reveal>

      <div className="mt-12 grid items-start gap-6 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-10">
        {/* Colonne des curseurs */}
        <Reveal>
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col gap-9">
              {CHAMPS.map((champ) => (
                <Curseur
                  key={champ.cle}
                  champ={champ}
                  valeur={entrees[champ.cle]}
                  onChange={(valeur) => majEntree(champ.cle, valeur)}
                />
              ))}
            </div>
          </Card>
        </Reveal>

        {/* Carte de résultat */}
        <div className="self-start lg:sticky lg:top-24">
          <Reveal delay={0.08}>
            <Card className="p-6 shadow-float sm:p-8">
              <Eyebrow>Ce que le désordre coûte à votre officine</Eyebrow>

              <p
                aria-hidden
                className="u-numeric mt-6 text-[clamp(2.5rem,1.9rem_+_2.2vw,3.4rem)] leading-[1.02] font-semibold text-ink"
              >
                {euros(montant)}
              </p>
              <p className="u-eyebrow mt-3 text-ink-4">Par an</p>
              <p role="status" className="sr-only">
                {euros(total)} par an, soit l&rsquo;équivalent de{" "}
                {equivalent.phrase} à temps plein, ou {partRevenuTexte} du revenu
                annuel moyen d&rsquo;un titulaire.
              </p>

              <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-2">
                Soit l&rsquo;équivalent de{" "}
                <span className="u-numeric font-semibold text-ink">
                  {equivalent.valeur}
                </span>{" "}
                {equivalent.mot} à temps plein.
              </p>

              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-3">
                Ou{" "}
                <span className="u-numeric font-medium text-ink-2">
                  {partRevenuTexte}
                </span>{" "}
                du revenu annuel moyen d&rsquo;un titulaire.
              </p>

              {/* Détail repliable — un pharmacien vérifie (§4.4) */}
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => setDetailOuvert((ouvert) => !ouvert)}
                  aria-expanded={detailOuvert}
                  aria-controls="simulateur-detail"
                  className="group flex w-full items-center justify-between gap-3 rounded-field text-left text-[0.9rem] font-medium text-ink-2 transition-colors duration-200 ease-(--ease-out-soft) hover:text-ink"
                >
                  <span>Détail des trois postes</span>
                  <ChevronDown
                    strokeWidth={1.75}
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-200 ease-(--ease-out-soft)",
                      detailOuvert && "rotate-180",
                    )}
                  />
                </button>

                <div
                  id="simulateur-detail"
                  aria-hidden={!detailOuvert}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-(--ease-out-soft)",
                    detailOuvert ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <ul className="flex flex-col gap-5 overflow-hidden">
                    {lignes.map((ligne, index) => (
                      <li
                        key={ligne.cle}
                        className={cn("flex flex-col gap-2", index === 0 && "pt-5")}
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-[0.88rem] text-ink-2">
                            {ligne.libelle}
                          </span>
                          <span className="u-numeric text-[0.95rem] font-semibold text-ink">
                            {euros(ligne.montant)}
                          </span>
                        </div>

                        <span
                          aria-hidden
                          className="block h-1.5 w-full overflow-hidden rounded-pill bg-surface-muted dark:bg-line"
                        >
                          <span
                            style={{
                              width: `${(ligne.montant / plafond) * 100}%`,
                            }}
                            className={cn(
                              "block h-full rounded-pill transition-[width] duration-300 ease-(--ease-out-soft)",
                              ligne.statut === "sourcee"
                                ? "bg-primary"
                                : "bg-primary/40",
                            )}
                          />
                        </span>

                        <p className="text-[0.76rem] leading-relaxed text-ink-4">
                          <span className="u-eyebrow">
                            {STATUT_LIBELLE[ligne.statut]}
                          </span>
                          <span aria-hidden> · </span>
                          {ligne.source}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* §4.1 — clause non négociable, mot pour mot, jamais escamotée */}
              <p className="mt-7 text-[0.78rem] leading-relaxed text-ink-4">
                {CLAUSE_LEGALE}
              </p>

              <ButtonLink
                href={site.urls.inscription}
                size="lg"
                className="mt-7 w-full"
              >
                {site.cta.primary}
              </ButtonLink>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
