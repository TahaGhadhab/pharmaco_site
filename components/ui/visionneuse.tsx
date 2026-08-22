"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   Visionneuse — la capture en grand, zoomable.

   Les vignettes de la page font 300 px de large : de quoi reconnaître un
   écran, pas de quoi lire un libellé. Un clic ouvre la capture en plein
   écran, où elle se zoome et se déplace librement.

   ┌─ POURQUOI UN PORTAIL ────────────────────────────────────────────────────┐
   │ `position: fixed` ne suffit pas ici. Les captures vivent dans un panneau │
   │ d'accordéon en `overflow-hidden`, lui-même sous un `Reveal` qui laisse   │
   │ un `filter: blur(0px)` en style inline une fois son animation finie.     │
   │ Un élément qui porte un `filter` devient bloc conteneur de ses           │
   │ descendants fixes : la visionneuse se serait retrouvée positionnée dans  │
   │ l'accordéon, puis rognée par lui. Le portail la sort dans `<body>`.      │
   └──────────────────────────────────────────────────────────────────────────┘

   Clavier : Échap ferme, ← et → passent d'une étape à l'autre, + et −
   zooment. Le focus part sur la boîte de dialogue et revient d'où il venait.
   §11 : en `prefers-reduced-motion`, l'ouverture ne fait plus que se poser.
   ══════════════════════════════════════════════════════════════════════════ */

export type VueVisionneuse = {
  image: string;
  alt: string;
  legende: string;
};

/** Bornes du zoom. Au-delà de 4×, une capture de 500 px n'est plus que du gros pixel. */
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_DOUBLE_CLIC = 2.4;

const clamp = (valeur: number, mini: number, maxi: number) =>
  Math.min(maxi, Math.max(mini, valeur));

/**
 * `false` au rendu serveur, `true` une fois hydraté.
 *
 * Il faut cette bascule parce que `createPortal` demande `document.body`, qui
 * n'existe pas côté serveur — et la page est prérendue en statique. Écrite avec
 * `useSyncExternalStore` plutôt qu'avec un `setState` dans un effet : c'est le
 * même résultat sans le rendu en cascade qu'un effet provoquerait au montage.
 */
const RIEN = () => () => {};
function useHydrate() {
  return useSyncExternalStore(
    RIEN,
    () => true,
    () => false,
  );
}

export function Visionneuse({
  vues,
  index,
  onIndex,
  onFermer,
  titre,
}: {
  vues: readonly VueVisionneuse[];
  /** `null` = fermée. */
  index: number | null;
  onIndex: (index: number) => void;
  onFermer: () => void;
  /** Nom du tutoriel, rappelé en tête. */
  titre: string;
}) {
  const reduced = useReducedMotion();
  const monte = useHydrate();

  const boiteRef = useRef<HTMLDivElement>(null);
  const cadreRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const rendueRef = useRef<HTMLElement | null>(null);

  const [echelle, setEchelle] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /* Pointeurs actifs : un seul = déplacement, deux = pincement. */
  const pointeurs = useRef(new Map<number, { x: number; y: number }>());
  const pince = useRef<{ distance: number; echelle: number } | null>(null);
  const depart = useRef<{ x: number; y: number } | null>(null);
  /** Un pointeur qui a bougé de plus de quelques pixels n'est plus un clic. */
  const abouge = useRef(false);

  const ouverte = index !== null;
  const vue = ouverte ? vues[index] : null;

  /** Ramène la capture à sa taille d'origine, centrée. */
  const reinitialiser = useCallback(() => {
    setEchelle(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  /* Changer d'étape remet le zoom à plat : on ne garde pas le cadrage d'une
     capture pour la suivante, il ne veut plus rien dire.

     Ajusté pendant le rendu, pas dans un effet : c'est la forme que React
     recommande pour un état qui dérive d'une prop, et elle évite le rendu
     intermédiaire où la capture suivante s'afficherait au zoom de la
     précédente avant d'être remise à plat. */
  const [indexRendu, setIndexRendu] = useState(index);
  if (index !== indexRendu) {
    setIndexRendu(index);
    setEchelle(1);
    setPosition({ x: 0, y: 0 });
  }

  /**
   * Taille réellement occupée par la capture dans sa boîte.
   *
   * L'image remplit toute la zone (`object-contain`) : sa boîte fait la taille
   * du cadre, mais le dessin, lui, n'en occupe qu'une partie — le reste est du
   * vide de part et d'autre. Les deux ne se confondent pas : c'est le dessin
   * qui borne le déplacement, et c'est le vide qui referme la visionneuse
   * quand on clique dedans.
   */
  const contenu = useCallback(() => {
    const image = imageRef.current;
    if (!image || !image.offsetWidth) return null;

    const boiteL = image.offsetWidth;
    const boiteH = image.offsetHeight;
    const rapport =
      image.naturalWidth && image.naturalHeight
        ? image.naturalWidth / image.naturalHeight
        : 1;

    let largeur = boiteL;
    let hauteur = boiteL / rapport;
    if (hauteur > boiteH) {
      hauteur = boiteH;
      largeur = boiteH * rapport;
    }

    return { largeur, hauteur, boiteL, boiteH };
  }, []);

  /**
   * Limite le déplacement à ce que le zoom a réellement fait déborder.
   *
   * Sans cette borne, on pousse la capture hors de l'écran et on se retrouve
   * devant un fond noir sans savoir comment revenir.
   */
  const borner = useCallback(
    (x: number, y: number, valeur: number) => {
      const mesure = contenu();
      if (!mesure) return { x, y };

      const debordX = Math.max(0, (mesure.largeur * valeur - mesure.boiteL) / 2);
      const debordY = Math.max(0, (mesure.hauteur * valeur - mesure.boiteH) / 2);

      return { x: clamp(x, -debordX, debordX), y: clamp(y, -debordY, debordY) };
    },
    [contenu],
  );

  /**
   * Zoome en gardant sous le doigt (ou le curseur) le point visé.
   *
   * `ancre` est exprimée par rapport au CENTRE du cadre, comme la translation :
   * c'est ce qui permet d'écrire la correction en une ligne.
   */
  const zoomer = useCallback(
    (cible: number, ancre?: { x: number; y: number }) => {
      setEchelle((precedente) => {
        const suivante = clamp(cible, ZOOM_MIN, ZOOM_MAX);
        const rapport = suivante / precedente;

        setPosition((p) => {
          if (suivante === ZOOM_MIN) return { x: 0, y: 0 };
          const point = ancre ?? { x: 0, y: 0 };
          const x = point.x - (point.x - p.x) * rapport;
          const y = point.y - (point.y - p.y) * rapport;
          return borner(x, y, suivante);
        });

        return suivante;
      });
    },
    [borner],
  );

  /** Coordonnées d'un événement par rapport au centre du cadre. */
  const versCentre = useCallback((clientX: number, clientY: number) => {
    const cadre = cadreRef.current;
    if (!cadre) return { x: 0, y: 0 };
    const boite = cadre.getBoundingClientRect();
    return {
      x: clientX - (boite.left + boite.width / 2),
      y: clientY - (boite.top + boite.height / 2),
    };
  }, []);

  const precedente = useCallback(() => {
    if (index === null) return;
    onIndex((index - 1 + vues.length) % vues.length);
  }, [index, onIndex, vues.length]);

  const suivante = useCallback(() => {
    if (index === null) return;
    onIndex((index + 1) % vues.length);
  }, [index, onIndex, vues.length]);

  /* Ouverture : on mémorise le focus, on le pose sur la boîte, on bloque le
     défilement du fond. À la fermeture, tout revient d'où ça venait. */
  useEffect(() => {
    if (!ouverte) return;

    rendueRef.current = document.activeElement as HTMLElement | null;
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const image = requestAnimationFrame(() => boiteRef.current?.focus());

    return () => {
      cancelAnimationFrame(image);
      document.body.style.overflow = defilement;
      rendueRef.current?.focus?.();
    };
  }, [ouverte]);

  useEffect(() => {
    if (!ouverte) return;

    function surTouche(evenement: KeyboardEvent) {
      switch (evenement.key) {
        case "Escape":
          onFermer();
          break;
        case "ArrowLeft":
          evenement.preventDefault();
          precedente();
          break;
        case "ArrowRight":
          evenement.preventDefault();
          suivante();
          break;
        case "+":
        case "=":
          evenement.preventDefault();
          zoomer(echelle + 0.5);
          break;
        case "-":
          evenement.preventDefault();
          zoomer(echelle - 0.5);
          break;
        case "0":
          reinitialiser();
          break;
      }
    }

    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [ouverte, onFermer, precedente, suivante, zoomer, echelle, reinitialiser]);

  /**
   * Molette et pavé tactile.
   *
   * L'écouteur est posé à la main, en `passive: false` : React attache les
   * `onWheel` en passif, et un écouteur passif ne peut pas appeler
   * `preventDefault()` — la page défilerait derrière pendant qu'on zoome.
   */
  useEffect(() => {
    const cadre = cadreRef.current;
    if (!ouverte || !cadre) return;

    function surMolette(evenement: WheelEvent) {
      evenement.preventDefault();
      const facteur = Math.exp(-evenement.deltaY * 0.0018);
      setEchelle((precedente) => {
        const suivante = clamp(precedente * facteur, ZOOM_MIN, ZOOM_MAX);
        const ancre = versCentre(evenement.clientX, evenement.clientY);
        const rapport = suivante / precedente;

        setPosition((p) => {
          if (suivante === ZOOM_MIN) return { x: 0, y: 0 };
          return borner(
            ancre.x - (ancre.x - p.x) * rapport,
            ancre.y - (ancre.y - p.y) * rapport,
            suivante,
          );
        });

        return suivante;
      });
    }

    cadre.addEventListener("wheel", surMolette, { passive: false });
    return () => cadre.removeEventListener("wheel", surMolette);
  }, [ouverte, borner, versCentre]);

  function surPointeurBas(evenement: ReactPointerEvent<HTMLDivElement>) {
    pointeurs.current.set(evenement.pointerId, {
      x: evenement.clientX,
      y: evenement.clientY,
    });
    abouge.current = false;
    evenement.currentTarget.setPointerCapture(evenement.pointerId);

    if (pointeurs.current.size === 2) {
      const [a, b] = [...pointeurs.current.values()];
      pince.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        echelle,
      };
      depart.current = null;
      return;
    }

    if (echelle > 1) {
      depart.current = {
        x: evenement.clientX - position.x,
        y: evenement.clientY - position.y,
      };
    }
  }

  function surPointeurBouge(evenement: ReactPointerEvent<HTMLDivElement>) {
    if (!pointeurs.current.has(evenement.pointerId)) return;

    const avant = pointeurs.current.get(evenement.pointerId)!;
    if (Math.hypot(evenement.clientX - avant.x, evenement.clientY - avant.y) > 3) {
      abouge.current = true;
    }

    pointeurs.current.set(evenement.pointerId, {
      x: evenement.clientX,
      y: evenement.clientY,
    });

    /* Pincement : le rapport des distances donne directement l'échelle. */
    if (pointeurs.current.size === 2 && pince.current) {
      const [a, b] = [...pointeurs.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const ancre = versCentre((a.x + b.x) / 2, (a.y + b.y) / 2);
      zoomer((pince.current.echelle * distance) / pince.current.distance, ancre);
      return;
    }

    if (!depart.current) return;
    setPosition(
      borner(
        evenement.clientX - depart.current.x,
        evenement.clientY - depart.current.y,
        echelle,
      ),
    );
  }

  function surPointeurHaut(evenement: ReactPointerEvent<HTMLDivElement>) {
    const dernier = pointeurs.current.size === 1;
    pointeurs.current.delete(evenement.pointerId);
    if (pointeurs.current.size < 2) pince.current = null;
    if (pointeurs.current.size === 0) depart.current = null;

    /* Clic net, hors du dessin : c'est le geste « je clique à côté pour
       fermer ». L'image occupe toute la zone, on ne peut donc pas le confier à
       un fond cliquable placé dessous — il faut mesurer. */
    if (!dernier || abouge.current || echelle > 1) return;

    const mesure = contenu();
    const image = imageRef.current;
    if (!mesure || !image) return;

    const boite = image.getBoundingClientRect();
    const centreX = boite.left + boite.width / 2;
    const centreY = boite.top + boite.height / 2;

    const dehors =
      Math.abs(evenement.clientX - centreX) > mesure.largeur / 2 ||
      Math.abs(evenement.clientY - centreY) > mesure.hauteur / 2;

    if (dehors) onFermer();
  }

  if (!monte) return null;

  return createPortal(
    <AnimatePresence>
      {ouverte && vue ? (
        <motion.div
          ref={boiteRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${titre} — étape ${(index ?? 0) + 1} sur ${vues.length}`}
          tabIndex={-1}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: reduced ? 0.15 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-100 flex flex-col bg-ink/92 backdrop-blur-sm outline-none dark:bg-black/92"
        >
          {/* ── Barre du haut ──────────────────────────────────────────── */}
          <div className="flex shrink-0 items-center gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1">
              <p className="u-eyebrow truncate text-page/70">{titre}</p>
              <p className="u-numeric mt-1 text-[0.72rem] text-page/50">
                Étape {(index ?? 0) + 1} / {vues.length} ·{" "}
                {Math.round(echelle * 100)} %
              </p>
            </div>

            <button
              type="button"
              onClick={() => zoomer(echelle - 0.5)}
              disabled={echelle <= ZOOM_MIN}
              aria-label="Réduire"
              className={BOUTON}
            >
              <Minus className="size-4.5" strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => zoomer(echelle + 0.5)}
              disabled={echelle >= ZOOM_MAX}
              aria-label="Agrandir"
              className={BOUTON}
            >
              <Plus className="size-4.5" strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={onFermer}
              aria-label="Fermer la visionneuse"
              className={BOUTON}
            >
              <X className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          {/* ── La capture ─────────────────────────────────────────────── */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            {vues.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={precedente}
                  aria-label="Étape précédente"
                  className={cn(BOUTON, "absolute left-2 z-10 sm:left-4")}
                >
                  <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={suivante}
                  aria-label="Étape suivante"
                  className={cn(BOUTON, "absolute right-2 z-10 sm:right-4")}
                >
                  <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
                </button>
              </>
            ) : null}

            <div
              ref={cadreRef}
              onPointerDown={surPointeurBas}
              onPointerMove={surPointeurBouge}
              onPointerUp={surPointeurHaut}
              onPointerCancel={surPointeurHaut}
              onDoubleClick={(evenement) =>
                zoomer(
                  echelle > 1 ? ZOOM_MIN : ZOOM_DOUBLE_CLIC,
                  versCentre(evenement.clientX, evenement.clientY),
                )
              }
              className={cn(
                /* Le cadre prend toute la zone disponible et c'est l'image qui
                   s'y inscrit — l'inverse de ce qu'on avait d'abord, où l'image
                   portait une hauteur fixe : sur téléphone, sa largeur se
                   faisait comprimer par le flex pendant que la hauteur tenait,
                   et le téléphone de la capture sortait étiré. */
                /* `min-w-0` n'est pas décoratif : la taille minimale
                   automatique d'un élément flex vaut le min-content de son
                   contenu, soit ici les 500 px intrinsèques de la capture.
                   Sur un écran de 390 px, le cadre imposait donc 524 px à
                   toute la boîte de dialogue — les boutons du haut et la
                   flèche de droite sortaient de l'écran, et la légende était
                   coupée. */
                "relative h-full w-full min-w-0 overflow-hidden px-3 py-2 sm:px-16",
                /* `touch-none` : le pincement et le déplacement sont gérés ici,
                   le navigateur ne doit pas les interpréter en plus. */
                "touch-none select-none",
                echelle > 1
                  ? "cursor-grab active:cursor-grabbing"
                  : "cursor-zoom-out",
              )}
            >
              <motion.img
                ref={imageRef}
                key={vue.image}
                src={vue.image}
                alt={vue.alt}
                draggable={false}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${echelle})`,
                }}
                /* L'image remplit le cadre et s'y inscrit sans se déformer,
                   quelles que soient ses proportions. Elle est donc AGRANDIE
                   au-delà de ses 500 px natifs : à sa taille d'origine, elle
                   occupait un tiers d'un écran d'ordinateur — on l'aurait
                   ouverte pour rien. Le zoom prend le relais au-delà. */
                className="h-full w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* ── La légende ─────────────────────────────────────────────── */}
          <div className="shrink-0 px-4 pb-6 pt-4 sm:px-6 sm:pb-8">
            <p className="mx-auto max-w-[70ch] text-center text-[0.9rem] leading-relaxed text-page/85">
              <span className="u-eyebrow mr-2 text-page/50">
                Étape {(index ?? 0) + 1}
              </span>
              {vue.legende}
            </p>
            <p className="u-eyebrow mt-4 text-center text-page/35">
              Molette ou pincement pour zoomer · double-clic pour ajuster ·
              Échap pour fermer
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/* Boutons de la visionneuse : posés sur un fond sombre, ils ne peuvent pas
   emprunter les variantes de `Button`, qui sont réglées pour la page. */
const BOUTON =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-pill bg-page/10 text-page " +
  "ring-1 ring-page/15 backdrop-blur-sm transition-colors duration-200 ease-(--ease-out-soft) " +
  "hover:bg-page/20 disabled:pointer-events-none disabled:opacity-35";
