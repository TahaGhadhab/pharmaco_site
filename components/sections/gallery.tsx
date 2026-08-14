"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ScreenFrame } from "@/components/ui/screen-frame";
import { ScreenModeToggle } from "@/components/ui/screen-mode-toggle";
import { useScreenMode } from "@/lib/screen-mode";
import { screens, resolveScreen, type ScreenSlot } from "@/lib/screens";
import { cn } from "@/lib/utils";

/**
 * Le tour de l'application — une bande horizontale, et rien d'autre.
 *
 * ── Ce qui a été retiré, et pourquoi ──────────────────────────────────────
 * Cette section était « punaisée » sur grand écran : le défilement vertical de
 * la page était converti en translation horizontale de la bande, chaque écran
 * dérivant en plus verticalement d'une amplitude propre. Sur le papier, une
 * belle mécanique. À l'usage, deux défauts que le client a vus tout de suite :
 *
 *  · le détournement du scroll fait sauter la page au moment où la section
 *    s'accroche puis se décroche — on ne sait plus où l'on est ;
 *  · la dérive verticale des écrans donne l'impression que la bande flotte,
 *    ce qui empêche de comparer deux captures côte à côte.
 *
 * Reste le défilement natif, avec accroche et deux flèches. Le contenu est
 * intégralement accessible, au doigt comme au clavier comme à la molette, et
 * la page ne bouge que quand on la fait bouger. §11 : plus rien à neutraliser
 * ici en `prefers-reduced-motion`, il n'y a plus de mouvement automatique.
 */

const TOUR: { slot: ScreenSlot; caption: string }[] = [
  { slot: screens.taches, caption: "Tâches assignées, avec échéance" },
  { slot: screens.commandes, caption: "Commandes fournisseurs suivies" },
  { slot: screens.gestionRh, caption: "Équipe, sièges et permissions" },
  { slot: screens.chat, caption: "Messagerie interne de l'équipe" },
];

/* Le sous-titre suit le nombre d'écrans : pas de « Cinq » qui traîne le jour
   où l'on en retire un. */
const NOMBRES = ["", "Un", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept"];
const SOUS_TITRE = `${NOMBRES[TOUR.length] ?? TOUR.length} écrans, pris tels quels.`;

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const mode = useScreenMode();

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;

    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    /* Les captures mobile et ordinateur n'ont pas la même largeur : la piste
       change de course à la bascule, et les flèches doivent le savoir. */
    const observer = new ResizeObserver(sync);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      observer.disconnect();
    };
  }, [sync]);

  function nudge(direction: -1 | 1) {
    trackRef.current?.scrollBy({
      left: direction * Math.round(trackRef.current.clientWidth * 0.72),
      behavior: "smooth",
    });
  }

  const arrow =
    "inline-flex size-11 items-center justify-center rounded-pill bg-surface text-ink-2 shadow-card ring-1 ring-line transition-[opacity,transform,background-color] duration-200 ease-(--ease-out-soft) hover:-translate-y-0.5 hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-35";

  return (
    <Section tone="page" containerClassName="max-w-none px-0">
      <div className="mx-auto w-full max-w-(--container-page) px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Le tour de l'application"
              title="Regardez-la travailler."
              lead={SOUS_TITRE}
            />
            <div className="flex items-center gap-3">
              <ScreenModeToggle />
              <div className="hidden gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  disabled={atStart}
                  aria-label="Écran précédent"
                  className={arrow}
                >
                  <ArrowLeft className="size-4.5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  disabled={atEnd}
                  aria-label="Écran suivant"
                  className={arrow}
                >
                  <ArrowRight className="size-4.5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* `items-start` : les captures n'ont pas toutes la même hauteur, et une
          bande alignée en haut se lit mieux qu'une bande centrée. */}
      <div
        ref={trackRef}
        className={cn(
          "mt-12 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto scroll-smooth",
          "px-4 pb-4 sm:px-6",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {TOUR.map(({ slot, caption }, index) => (
          <figure
            key={slot.id}
            className={cn(
              "flex shrink-0 snap-start flex-col gap-4",
              resolveScreen(slot, mode).variant === "phone"
                ? "w-[18rem]"
                : "w-[34rem] max-w-[85vw]",
            )}
          >
            <ScreenFrame slot={slot} className="max-w-none" />
            <figcaption className="flex items-baseline gap-2.5">
              <span className="u-numeric text-[0.7rem] text-primary-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="u-eyebrow text-ink-4">{caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
