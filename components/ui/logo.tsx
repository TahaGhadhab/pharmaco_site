import { cn } from "@/lib/utils";

/**
 * Logo PharmacoWork — corolle orange, croix verte au centre.
 *
 * C'est le logo réellement utilisé par l'application (visible dans les captures
 * de `public/screens/`). Il remplace la fleur monochrome verte décrite au §11 de
 * `LANDING_PAGE_CONTEXT.md`, désormais périmé sur ce point.
 *
 * Les couleurs sont volontairement figées : une marque ne se recolore pas avec
 * le thème. Les deux teintes tiennent le contraste sur fond clair comme sombre.
 */

const ORANGE = "#EE8B33";
const VERT = "#1E8749";

/** 12 pétales, un tous les 30°. */
const PETALES = Array.from({ length: 12 }, (_, i) => i * 30);

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("size-8", className)}
    >
      <g fill={ORANGE}>
        {PETALES.map((angle) => (
          <ellipse
            key={angle}
            cx="24"
            cy="10.8"
            rx="2.5"
            ry="6.6"
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
      </g>

      {/* Croix : deux rectangles arrondis croisés. Les angles extérieurs sont
          adoucis, l'intersection reste franche — comme sur le logo d'origine. */}
      <g fill={VERT}>
        <rect x="21.3" y="16.2" width="5.4" height="15.6" rx="1.8" />
        <rect x="16.2" y="21.3" width="15.6" height="5.4" rx="1.8" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-8" />
      {showWordmark ? (
        <span className="text-[1.05rem] font-semibold tracking-tight text-ink">
          PharmacoWork
        </span>
      ) : null}
    </span>
  );
}
