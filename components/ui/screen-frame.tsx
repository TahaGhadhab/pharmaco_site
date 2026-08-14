"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResolvedScreen } from "@/lib/screen-mode";
import { site } from "@/lib/site";
import type { ScreenSlot } from "@/lib/screens";

/** Affiché dans la barre d'URL du cadre desktop — suit l'URL réelle de l'app. */
const APP_HOST = site.urls.app.replace(/^https?:\/\//, "");

/**
 * Cadre d'écran produit.
 *
 * Si le fichier `slot.src` existe dans /public, il est affiché.
 * Sinon, un cadre de réservation prend sa place — avec le nom de fichier
 * attendu et le brief de capture. Aucun code à modifier au moment de
 * déposer les images.
 *
 * ── Le cadre s'adapte à la capture, jamais l'inverse ───────────────────────
 * La capture est affichée à ses PROPRES proportions : c'est elle qui donne sa
 * hauteur au cadre. Toute image entre donc entière, quelle que soit sa taille.
 *
 * Auparavant le cadre imposait ses proportions (`aspect-[375/812]`) et l'image
 * les rattrapait en `object-cover` — c'est-à-dire en se faisant rogner. Les
 * captures fournies font ~375 × 666 (une fenêtre de navigateur, pas un écran de
 * téléphone) : mises à l'échelle sur la hauteur du cadre, elles débordaient de
 * 22 % en largeur et perdaient 11 % de chaque côté. Le titre de l'écran et la
 * barre d'onglets étaient coupés. Le cadre desktop rognait pire encore (33 %).
 */

/* Indications affichées dans le cadre de réservation. Le desktop suit le
   cadrage réellement livré par le client — une fenêtre de ~1600 × 670, pas un
   écran plein. Annoncer 1440 × 900 ferait recadrer pour rien. */
const DIMENSIONS: Record<ScreenSlot["variant"], string> = {
  phone: "375 × 812",
  desktop: "1600 × 670",
};

/**
 * Proportions du cadre de réservation UNIQUEMENT — il n'a pas d'image pour lui
 * donner une hauteur. Dès que la capture existe, ce sont ses proportions à elle
 * qui gouvernent : ces valeurs ne la contraignent pas.
 */
const PLACEHOLDER_ASPECT: Record<ScreenSlot["variant"], string> = {
  phone: "aspect-[375/812]",
  desktop: "aspect-[1600/670]",
};

function Placeholder({ slot }: { slot: ScreenSlot }) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center",
        "bg-surface-muted",
        PLACEHOLDER_ASPECT[slot.variant],
      )}
    >
      <div className="u-grid-faint absolute inset-0 opacity-60" aria-hidden />

      {/* Balayage lent : signale une zone en attente, sans clignoter */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-(--animate-sweep) bg-linear-to-b from-transparent via-primary/8 to-transparent"
        aria-hidden
      />

      <div className="relative flex size-10 items-center justify-center rounded-pill bg-primary-tint text-primary-strong">
        <ImageIcon className="size-4.5" strokeWidth={1.75} aria-hidden />
      </div>

      <div className="relative space-y-1.5">
        <p className="u-eyebrow text-primary-deep">Capture à venir</p>
        <p className="u-numeric text-[0.7rem] text-ink-3">
          {slot.src} · {DIMENSIONS[slot.variant]}
        </p>
      </div>

      <p className="relative max-w-[30ch] text-[0.78rem] leading-relaxed text-ink-4">
        {slot.brief}
      </p>
    </div>
  );
}

function Media({ slot }: { slot: ScreenSlot }) {
  const [failed, setFailed] = useState(false);

  if (failed) return <Placeholder slot={slot} />;

  /* La capture peut être absente : on a besoin de `onError` pour basculer sur le
     cadre de réservation, ce que `next/image` ne permet pas sans requête 404. */
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={slot.src}
      alt={slot.alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      /* `h-auto` : la hauteur vient de l'image. C'est ce qui garantit qu'aucune
         capture n'est rognée, quelles que soient ses dimensions. */
      className="block h-auto w-full"
    />
  );
}

export function PhoneFrame({
  slot,
  className,
}: {
  slot: ScreenSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[320px] rounded-[2.75rem] p-2.5",
        "bg-linear-to-b from-ink/12 to-ink/5 shadow-float ring-1 ring-line",
        "dark:from-white/12 dark:to-white/4",
        className,
      )}
    >
      {/* Pas d'îlot dynamique : les captures sont des vues de l'application qui
          commencent à sa propre barre de titre. Une encoche dessinée par-dessus
          ne masquerait pas un statut système — elle masquerait l'interface. */}
      <div className="relative w-full overflow-hidden rounded-[2.15rem] bg-surface ring-1 ring-line">
        <Media slot={slot} />
      </div>
    </div>
  );
}

export function DesktopFrame({
  slot,
  className,
}: {
  slot: ScreenSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-card bg-surface shadow-float ring-1 ring-line",
        className,
      )}
    >
      {/* Chrome de navigateur, très sobre */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-muted px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-pill bg-line" />
          <span className="size-2.5 rounded-pill bg-line" />
          <span className="size-2.5 rounded-pill bg-line" />
        </div>
        <div className="ml-1.5 flex-1 rounded-pill bg-surface px-3 py-1 ring-1 ring-line">
          <span className="u-numeric truncate text-[0.65rem] text-ink-4">
            {APP_HOST}
          </span>
        </div>
      </div>

      <div className="relative w-full">
        <Media slot={slot} />
      </div>
    </div>
  );
}

/**
 * Choisit le bon cadre selon l'affichage demandé — mobile ou ordinateur.
 *
 * L'écran montré vient de `useResolvedScreen` : si le slot n'a pas de
 * contrepartie dans l'affichage courant, il reste tel quel.
 *
 * ── Pourquoi `popLayout` et non `wait` ────────────────────────────────────
 * Un téléphone et un écran d'ordinateur n'ont pas la même hauteur. En mode
 * `wait`, le cadre sortant disparaît AVANT que l'entrant n'arrive : le bloc
 * s'écrase à zéro puis se rouvre, et toute la page sursaute deux fois.
 *
 * `popLayout` sort le cadre sortant du flux — il continue de s'effacer par
 * dessus — pendant que l'entrant prend sa place immédiatement. Le conteneur,
 * lui, porte `layout` : il glisse de l'ancienne hauteur à la nouvelle au lieu
 * de sauter. Un seul mouvement continu, comme la pastille des tarifs.
 *
 * Les largeurs diffèrent trop d'une variante à l'autre pour tenir dans une
 * seule classe : `phoneClassName` et `desktopClassName` s'ajoutent à
 * `className` selon ce qui est affiché.
 */
export function ScreenFrame({
  slot,
  className,
  phoneClassName,
  desktopClassName,
}: {
  slot: ScreenSlot;
  className?: string;
  phoneClassName?: string;
  desktopClassName?: string;
}) {
  const montre = useResolvedScreen(slot);
  const reduced = useReducedMotion();
  const phone = montre.variant === "phone";
  const classes = cn(className, phone ? phoneClassName : desktopClassName);

  return (
    <motion.div
      layout={reduced ? false : "size"}
      transition={{
        layout: { duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] },
      }}
      className="relative flex w-full justify-center"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={montre.id}
          /* `layout` sur l'enfant aussi, et ce n'est pas décoratif : le
             conteneur anime sa taille par une mise à l'échelle. Sans nœud de
             projection ici, la capture serait étirée pendant les 420 ms.
             C'est ce que corrige `layout` — pas de scale dans les variantes
             pour la même raison, il se composerait avec celui du parent. */
          layout={reduced ? false : "position"}
          initial={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 10, filter: "blur(8px)" }
          }
          animate={
            reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, y: -6, filter: "blur(8px)" }
          }
          transition={{
            duration: reduced ? 0.15 : 0.44,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex w-full justify-center"
        >
          {phone ? (
            <PhoneFrame slot={montre} className={classes} />
          ) : (
            <DesktopFrame slot={montre} className={classes} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
