"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
  type RefObject,
} from "react";
import { useReducedMotion } from "motion/react";
import "./logo-loop.css";

/**
 * LogoLoop — défilement continu et sans couture.
 * D'après le composant React Bits, adapté à ce projet sur trois points :
 *
 *  1. **`prefers-reduced-motion` coupe la boucle rAF**, il ne se contente pas
 *     de figer la transformation en CSS. L'original laissait tourner une
 *     `requestAnimationFrame` à 60 i/s pour un résultat invisible.
 *  2. **`useResizeObserver` ne se réabonne plus à chaque rendu.** L'original
 *     recevait `[containerRef, seqRef]` en littéral : un nouveau tableau à
 *     chaque rendu, donc des `ResizeObserver` créés et détruits en boucle.
 *  3. La couleur du fondu vient d'un token du design system, elle suit donc
 *     les deux thèmes (l'original avait un `#0b0b0b` en dur).
 */

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

export type LogoItem =
  | {
      node: ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      width?: number;
      height?: number;
    };

export type LogoLoopProps = {
  logos: LogoItem[];
  /** Vitesse en pixels par seconde. Négatif = sens inverse. */
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  /** Vitesse au survol. 0 met en pause. */
  hoverSpeed?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const toCssLength = (value?: number | string) =>
  typeof value === "number" ? `${value}px` : (value ?? undefined);

/** Observe le conteneur et la séquence. Les refs sont stables : pas de tableau littéral en dépendance. */
function useResizeObserver(
  callback: () => void,
  containerRef: RefObject<HTMLDivElement | null>,
  seqRef: RefObject<HTMLUListElement | null>,
) {
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", callback);
      callback();
      return () => window.removeEventListener("resize", callback);
    }

    const observers = [containerRef.current, seqRef.current]
      .filter((el): el is HTMLDivElement | HTMLUListElement => el !== null)
      .map((el) => {
        const observer = new ResizeObserver(callback);
        observer.observe(el);
        return observer;
      });

    callback();
    return () => observers.forEach((o) => o.disconnect());
  }, [callback, containerRef, seqRef]);
}

/** Les images changent la largeur de la séquence en se chargeant : on remesure. */
function useImageLoader(
  seqRef: RefObject<HTMLUListElement | null>,
  onLoad: () => void,
) {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }

    let remaining = images.length;
    const handle = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };

    images.forEach((img) => {
      if (img.complete) handle();
      else {
        img.addEventListener("load", handle, { once: true });
        img.addEventListener("error", handle, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handle);
        img.removeEventListener("error", handle);
      });
    };
  }, [onLoad, seqRef]);
}

function useAnimationLoop(
  trackRef: RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqSize: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
  enabled: boolean,
) {
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    /* Mouvement désactivé : on remet la piste à zéro et on ne lance aucune boucle. */
    if (!enabled) {
      track.style.transform = "";
      offsetRef.current = 0;
      velocityRef.current = 0;
      return;
    }

    const apply = (offset: number) => {
      track.style.transform = isVertical
        ? `translate3d(0, ${-offset}px, 0)`
        : `translate3d(${-offset}px, 0, 0)`;
    };

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      apply(offsetRef.current);
    }

    const animate = (timestamp: number) => {
      lastRef.current ??= timestamp;
      const delta = Math.max(0, timestamp - lastRef.current) / 1000;
      lastRef.current = timestamp;

      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      velocityRef.current +=
        (target - velocityRef.current) * (1 - Math.exp(-delta / SMOOTH_TAU));

      if (seqSize > 0) {
        let next = offsetRef.current + velocityRef.current * delta;
        next = ((next % seqSize) + seqSize) % seqSize;
        offsetRef.current = next;
        apply(next);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [
    trackRef,
    targetVelocity,
    seqSize,
    isHovered,
    hoverSpeed,
    isVertical,
    enabled,
  ]);
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  hoverSpeed,
  pauseOnHover,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Défilement",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const reduced = useReducedMotion();
  const isVertical = direction === "up" || direction === "down";

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const dir = isVertical
      ? direction === "up"
        ? 1
        : -1
      : direction === "left"
        ? 1
        : -1;
    return magnitude * dir * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect();
    const w = rect?.width ?? 0;
    const h = rect?.height ?? 0;

    if (isVertical) {
      if (h > 0) {
        setSeqHeight(Math.ceil(h));
        const viewport = containerRef.current?.clientHeight ?? h;
        setCopyCount(
          Math.max(MIN_COPIES, Math.ceil(viewport / h) + COPY_HEADROOM),
        );
      }
    } else if (w > 0) {
      setSeqWidth(Math.ceil(w));
      setCopyCount(
        Math.max(MIN_COPIES, Math.ceil(containerWidth / w) + COPY_HEADROOM),
      );
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, containerRef, seqRef);
  useImageLoader(seqRef, updateDimensions);
  useAnimationLoop(
    trackRef,
    targetVelocity,
    isVertical ? seqHeight : seqWidth,
    isHovered,
    effectiveHoverSpeed,
    isVertical,
    !reduced,
  );

  const rootClassName = [
    "logoloop",
    isVertical ? "logoloop--vertical" : "logoloop--horizontal",
    fadeOut && "logoloop--fade",
    scaleOnHover && "logoloop--scale-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderLogoItem = useCallback(
    (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key}>
            {renderItem(item, key)}
          </li>
        );
      }

      const isNode = "node" in item;
      const content = isNode ? (
        <span className="logoloop__node">{item.node}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );

      const label = isNode
        ? (item.ariaLabel ?? item.title)
        : (item.alt ?? item.title);

      return (
        <li className="logoloop__item" key={key}>
          {item.href ? (
            <a
              className="logoloop__link"
              href={item.href}
              aria-label={label || "Lien"}
              target="_blank"
              rel="noreferrer noopener"
            >
              {content}
            </a>
          ) : (
            content
          )}
        </li>
      );
    },
    [renderItem],
  );

  /* Seule la première copie est lue par les technologies d'assistance :
     les suivantes ne servent qu'à masquer la couture. */
  const lists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="logoloop__list"
          key={`copy-${copyIndex}`}
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, i) => renderLogoItem(item, `${copyIndex}-${i}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem],
  );

  const containerStyle: CSSProperties = {
    width: isVertical ? undefined : (toCssLength(width) ?? "100%"),
    ["--logoloop-gap" as string]: `${gap}px`,
    ["--logoloop-logoHeight" as string]: `${logoHeight}px`,
    ...(fadeOutColor && { ["--logoloop-fadeColor" as string]: fadeOutColor }),
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() =>
          effectiveHoverSpeed !== undefined && setIsHovered(true)
        }
        onMouseLeave={() =>
          effectiveHoverSpeed !== undefined && setIsHovered(false)
        }
      >
        {lists}
      </div>
    </div>
  );
});

export default LogoLoop;
