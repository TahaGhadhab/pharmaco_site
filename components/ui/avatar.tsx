import { cn } from "@/lib/utils";

/**
 * Avatar de témoignage.
 *
 * Si `photo` est fourni, la photo est affichée. Sinon, un avatar est généré :
 * deux formes douces dans la palette du produit, déterminées par un hachage du
 * nom — le même nom donne toujours le même avatar.
 *
 * Pourquoi pas un service d'avatars aléatoires : ce sont des visages de vraies
 * personnes, prêter le visage d'un inconnu à un faux pharmacien pose exactement
 * le problème qu'on cherche à éviter. Et c'est une requête externe de plus.
 */

const TEINTES = [
  { fond: "var(--pw-primary)", forme: "var(--pw-primary-strong)" },
  { fond: "var(--pw-primary-deep)", forme: "var(--pw-primary)" },
  { fond: "var(--pw-primary-strong)", forme: "var(--pw-primary-deep)" },
  { fond: "var(--pw-text-2)", forme: "var(--pw-text-3)" },
];

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function Avatar({
  nom,
  initiales,
  photo,
  className,
}: {
  nom: string;
  initiales: string;
  /** Chemin dans /public. Prend le pas sur l'avatar généré. */
  photo?: string;
  className?: string;
}) {
  const graine = hash(nom);
  const teinte = TEINTES[graine % TEINTES.length];
  const angle = graine % 360;
  const decalage = 30 + (graine % 34);

  return (
    <span
      className={cn(
        "relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-pill ring-1 ring-line",
        className,
      )}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <>
          <svg viewBox="0 0 44 44" className="absolute inset-0 size-full" aria-hidden>
            <rect width="44" height="44" fill={teinte.fond} />
            <ellipse
              cx={decalage}
              cy={44 - decalage / 2}
              rx="26"
              ry="20"
              fill={teinte.forme}
              opacity="0.75"
              transform={`rotate(${angle} 22 22)`}
            />
          </svg>
          <span className="relative text-[0.72rem] font-bold text-white">
            {initiales}
          </span>
        </>
      )}
    </span>
  );
}
