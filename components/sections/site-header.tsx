"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Navigation sticky.
 *
 * Au repos, le header ne pose rien sur la page : fond transparent, aucun trait.
 * Dès que le document défile, une surface floutée et un filet apparaissent en
 * fondu (250 ms) — la séparation se fait par la surface, jamais par un trait dur.
 *
 * Le flou est porté par un calque interne, pas par <header> : un élément qui
 * porte `backdrop-filter` devient bloc conteneur de ses descendants `fixed`,
 * ce qui casserait la feuille du bas.
 */

const MENU_ID = "menu-principal";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    restDelta: 0.001,
  });
  /* La barre de lecture suit le scroll : en reduced-motion on la lie
     directement, sans ressort — c'est un indicateur, pas une animation. */
  const progress = reduced ? scrollYProgress : smoothed;

  /* `useScroll` mesure une première fois au montage : un rechargement en cours
     de page émet donc bien un changement depuis 0, et le header s'habille. */
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 8);
  });

  /* Panneau ouvert : Escape ferme, et le fond ne défile plus derrière. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  /* Passage en desktop : le panneau mobile n'a plus lieu d'être. Le seuil suit
     celui de la nav (`xl`) — un panneau resté ouvert derrière une barre qui a
     repris ses entrées bloquerait le défilement de la page pour rien. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");

    function onChange() {
      if (query.matches) setOpen(false);
    }

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Surface + filet, en fondu au scroll */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 bg-surface/80 backdrop-blur-xl",
          "transition-opacity duration-[250ms] ease-(--ease-out-soft)",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 -z-10 h-px bg-line",
          "transition-opacity duration-[250ms] ease-(--ease-out-soft)",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Plus large que le contenu des sections (1200 px), et volontairement :
          la barre porte sept entrées de navigation, un lien de connexion, un
          bouton et la bascule de thème. À la largeur du contenu, « Le problème »
          et « Ce que ça coûte » se cassaient en deux lignes. */}
      <div className="relative mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 md:h-18">
        <Link
          href="/"
          aria-label={`${site.name} — accueil`}
          className="shrink-0 rounded-field"
        >
          <Logo />
        </Link>

        {/* Élément de flux, pas `absolute left-1/2` : une nav hors flux peut
            recouvrir le bloc de droite quand la fenêtre se resserre — c'est ce
            qui masquait le sélecteur de thème.

            `whitespace-nowrap` : un libellé de navigation ne se coupe jamais en
            deux lignes. Il tient sur une ligne, ou c'est le menu qui le porte —
            mais on n'écrit pas « Ce que ça / coûte » sur deux étages.

            D'où les deux paliers. En dessous de `xl` (1280 px), sept entrées ne
            tiennent pas côte à côte : le menu prend le relais. Entre `xl` et
            `2xl`, elles tiennent en resserrant d'un demi-cran la gouttière et le
            corps ; au-delà, la barre reprend sa taille pleine. */}
        <nav
          aria-label="Navigation principale"
          className="hidden flex-1 items-center justify-center gap-0.5 xl:flex"
        >
          {[...site.nav, ...site.pages].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-pill px-2.5 py-2 text-[0.85rem] text-ink-2 transition-colors duration-200 ease-(--ease-out-soft) hover:bg-surface-muted hover:text-ink 2xl:px-3 2xl:text-[0.9rem]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-1">
          {/* Officine déjà en place : lien magique. Discret, ce n'est pas le
              parcours que la page cherche à provoquer. */}
          <Link
            href={site.urls.connexion}
            className="hidden whitespace-nowrap rounded-pill px-3 py-2 text-[0.85rem] text-ink-2 transition-colors duration-200 ease-(--ease-out-soft) hover:bg-surface-muted hover:text-ink xl:inline-flex 2xl:px-3.5 2xl:text-[0.9rem]"
          >
            {site.cta.connexion}
          </Link>

          <ButtonLink
            href={site.urls.inscription}
            className="hidden whitespace-nowrap sm:inline-flex"
          >
            {site.cta.primary}
          </ButtonLink>

          {/* Bascule clair/sombre, à l'extrême droite et détachée par un filet :
              c'est un réglage, pas un élément de navigation. */}
          <span
            aria-hidden
            className="mx-1.5 hidden h-5 w-px bg-line sm:block"
          />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex size-10 items-center justify-center rounded-pill text-ink-2 transition-colors duration-200 hover:bg-surface-muted hover:text-ink xl:hidden"
          >
            {open ? (
              <X className="size-5" strokeWidth={1.75} aria-hidden />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Progression de lecture — 2 px, discrète, collée au bas du header */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
      />

      {/* AnimatePresence n'accepte pas de Fragment : deux enfants clés distincts. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="voile"
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-ink/40 xl:hidden dark:bg-black/60"
          />
        ) : null}

        {open ? (
          <motion.div
            key="feuille"
            id={MENU_ID}
            initial={reduced ? { opacity: 0 } : { y: "100%" }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: "100%" }}
            transition={{ duration: reduced ? 0.2 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-sheet bg-surface px-4 pb-8 pt-3 shadow-float ring-1 ring-line xl:hidden"
          >
            <div className="mx-auto h-1 w-10 rounded-pill bg-line" aria-hidden />

            <nav aria-label="Navigation" className="mt-4 flex flex-col">
              {[...site.nav, ...site.pages].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between rounded-field px-3 py-3.5 text-[1.02rem] text-ink transition-colors duration-200 hover:bg-surface-muted"
                >
                  {item.label}
                  <ChevronRight
                    className="size-4 text-ink-4"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              ))}
            </nav>

            <ButtonLink
              href={site.urls.inscription}
              size="lg"
              onClick={close}
              className="mt-4 w-full"
            >
              {site.cta.primary}
            </ButtonLink>

            <Link
              href={site.urls.connexion}
              onClick={close}
              className="mt-3 block rounded-pill py-2.5 text-center text-[0.9rem] text-ink-2 transition-colors duration-200 ease-(--ease-out-soft) hover:bg-surface-muted hover:text-ink"
            >
              {site.cta.connexion}
            </Link>

            <p className="u-eyebrow mt-6 text-center text-ink-3">
              {site.slogan}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
