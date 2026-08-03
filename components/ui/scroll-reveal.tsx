"use client";

import { useEffect, useMemo, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import "./scroll-reveal.css";

/**
 * ScrollReveal — le texte se révèle mot à mot pendant qu'on le fait défiler.
 * D'après le composant React Bits, adapté à ce projet sur quatre points :
 *
 *  1. `prefers-reduced-motion` est respecté (§11) — l'original ne le gérait pas.
 *     Le texte s'affiche alors d'emblée, net et lisible : on retire le mouvement,
 *     jamais le contenu.
 *  2. Le nettoyage est **cantonné à l'instance** via `gsap.context()`.
 *     L'original appelait `ScrollTrigger.getAll().kill()`, ce qui détruisait aussi
 *     les déclencheurs des autres composants de la page.
 *  3. La balise est configurable et vaut `p` par défaut. L'original rendait un
 *     `<h2>` en dur, ce qui aurait cassé la hiérarchie de titres de la page.
 *  4. La typographie vient du design system (`textClassName`), pas d'un
 *     `font-size` en dur dans le CSS.
 *
 * ⚠️ `children` doit être une **chaîne** pour être découpé en mots. Tout autre
 * contenu est rendu tel quel, sans animation de mots (l'original l'effaçait).
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollRevealProps = {
  children: ReactNode;
  /** Conteneur de défilement. Par défaut : la fenêtre. */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  /** Balise du conteneur. `p` par défaut — ne pas mettre `h2` sans raison. */
  as?: ElementType;
};

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  // Valeurs calées sur « Clean Clinical » : plus sobres que celles d'origine.
  baseOpacity = 0.12,
  baseRotation = 2,
  blurStrength = 6,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  as: Tag = "p",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;

    return children.split(/(\s+)/).map((word, index) =>
      /^\s+$/.test(word) ? (
        word
      ) : (
        <span className="word" key={`${word}-${index}`}>
          {word}
        </span>
      ),
    );
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;

    /* Contexte cantonné à cet élément : au démontage, `revert()` ne détruit que
       les animations et déclencheurs créés ici. */
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { rotate: 0, clearProps: "transform" });
        gsap.set(el.querySelectorAll(".word"), {
          opacity: 1,
          filter: "none",
          clearProps: "willChange",
        });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom",
              end: rotationEnd,
              scrub: true,
            },
          },
        );

        const words = el.querySelectorAll<HTMLElement>(".word");

        gsap.fromTo(
          words,
          { opacity: baseOpacity },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        );

        if (enableBlur) {
          gsap.fromTo(
            words,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: "none",
              filter: "blur(0px)",
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: "top bottom-=20%",
                end: wordAnimationEnd,
                scrub: true,
              },
            },
          );
        }
      });
    }, containerRef);

    /* Geist se charge en asynchrone : sans ce recalcul, les points de
       déclenchement sont calculés sur une métrique de police de repli. */
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <Tag
      ref={containerRef}
      className={cn("scroll-reveal", containerClassName)}
    >
      <span className={cn("scroll-reveal-text block", textClassName)}>
        {splitText}
      </span>
    </Tag>
  );
}

export default ScrollReveal;
