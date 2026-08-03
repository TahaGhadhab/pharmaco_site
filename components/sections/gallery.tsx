"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ScreenFrame } from "@/components/ui/screen-frame";
import { screens, type ScreenSlot } from "@/lib/screens";
import { cn } from "@/lib/utils";

/**
 * Le tour de l'application.
 *
 * Sur grand écran, la section se « punaise » : le défilement vertical de la page
 * est converti en translation horizontale de la bande. Le mouvement passe par un
 * ressort — la piste continue une fraction de seconde après la molette, ce qui
 * donne l'inertie. Chaque écran dérive verticalement d'une amplitude propre :
 * la bande respire au lieu de glisser d'un bloc.
 *
 * Sous 1024 px, ou quand `prefers-reduced-motion` est demandé, on retombe sur un
 * défilement horizontal natif avec accroche — le contenu reste intégralement
 * accessible, sans détournement du scroll. §11.
 */

const TOUR: { slot: ScreenSlot; caption: string }[] = [
  { slot: screens.taches, caption: "Tâches assignées, avec échéance" },
  { slot: screens.commandes, caption: "Commandes fournisseurs suivies" },
  { slot: screens.qualite, caption: "Traçabilité qualité horodatée" },
  { slot: screens.gestionRh, caption: "Équipe, sièges et permissions" },
  { slot: screens.chat, caption: "Messagerie interne de l'équipe" },
];

/** Marge conservée à droite en fin de course, pour que le dernier écran respire. */
const TAIL = 96;

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    useCallback(
      (notify: () => void) => {
        const mql = window.matchMedia(query);
        mql.addEventListener("change", notify);
        return () => mql.removeEventListener("change", notify);
      },
      [query],
    ),
    () => window.matchMedia(query).matches,
    () => false, // rendu serveur : on part toujours du repli
  );
}

const widthFor = (slot: ScreenSlot) =>
  slot.variant === "phone" ? "w-[19rem]" : "w-[36rem]";

/* ── Un écran de la bande ────────────────────────────────────────────────────
   La dérive verticale est propre à chaque index : amplitude et sens alternent,
   ce qui évite l'effet « tout bouge ensemble ».                               */

function DriftingItem({
  slot,
  caption,
  index,
  progress,
}: {
  slot: ScreenSlot;
  caption: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const amplitude = (index % 2 === 0 ? 1 : -1) * (16 + (index % 3) * 9);
  const y = useTransform(progress, [0, 1], [amplitude, -amplitude]);

  return (
    <motion.figure
      style={{ y }}
      className={cn("flex shrink-0 flex-col gap-4", widthFor(slot))}
    >
      <ScreenFrame slot={slot} className="max-w-none" />
      <figcaption className="flex items-baseline gap-2.5">
        <span className="u-numeric text-[0.7rem] text-primary-deep">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="u-eyebrow text-ink-4">{caption}</span>
      </figcaption>
    </motion.figure>
  );
}

/* ── Version punaisée, grand écran ───────────────────────────────────────── */

function PinnedTour() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  /* Course horizontale = largeur de la piste moins la fenêtre. Remesurée au
     redimensionnement et quand les captures se chargent (elles changent la hauteur,
     pas la largeur, mais la police, elle, décale tout). */
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + TAIL));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Le ressort est ce qui fait toute la fluidité : la piste rattrape la position
     cible au lieu de la suivre au pixel. `restDelta` bas pour éviter le tremblement. */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progressScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-surface"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-(--container-page) px-6">
          <Eyebrow>Le tour de l&apos;application</Eyebrow>
          <h2 className="mt-4 text-h2 font-semibold text-ink">
            Regardez-la travailler.
          </h2>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-12 flex w-max items-start gap-8 px-6 will-change-transform lg:px-[max(1.5rem,calc((100vw-var(--container-page))/2))]"
        >
          {TOUR.map(({ slot, caption }, index) => (
            <DriftingItem
              key={slot.id}
              slot={slot}
              caption={caption}
              index={index}
              progress={smooth}
            />
          ))}
        </motion.div>

        {/* Jauge d'avancement — le seul repère dont on dispose une fois punaisé */}
        <div className="mx-auto mt-12 w-full max-w-(--container-page) px-6">
          <div className="h-px w-full overflow-hidden bg-line">
            <motion.div
              style={{ scaleX: progressScale }}
              className="h-full w-full origin-left bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Repli : défilement natif ────────────────────────────────────────────── */

function ScrollableTour() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
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
    <Section tone="surface" containerClassName="max-w-none px-0">
      <div className="mx-auto w-full max-w-(--container-page) px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Le tour de l'application"
              title="Regardez-la travailler."
              lead="Cinq écrans, pris tels quels."
            />
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
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className={cn(
          "mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth",
          "px-4 pb-4 sm:px-6",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {TOUR.map(({ slot, caption }, index) => (
          <figure
            key={slot.id}
            className={cn(
              "flex shrink-0 snap-start flex-col gap-4",
              slot.variant === "phone" ? "w-[18rem]" : "w-[34rem] max-w-[85vw]",
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

export function Gallery() {
  const isWide = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();

  return isWide && !reduced ? <PinnedTour /> : <ScrollableTour />;
}
