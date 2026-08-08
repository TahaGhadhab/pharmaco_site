import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { Eyebrow } from "@/components/ui/primitives";
import { DERNIERE_REVISION } from "@/lib/legal";

/* ══════════════════════════════════════════════════════════════════════════
   Coquille des pages légales.

   La règle « pas de mur de texte » vise la landing page, pas ces pages-ci :
   on vient y chercher une information précise, et la découper en accordéons
   la rendrait plus difficile à lire, pas moins. On garde donc du texte suivi,
   en colonne étroite, avec des intertitres qui servent de sommaire visuel.

   Un seul `<h1>` par page, porté ici. Les sous-parties sont en `<h2>`.
   ══════════════════════════════════════════════════════════════════════════ */

export function LegalPage({
  eyebrow,
  titre,
  chapeau,
  children,
}: {
  eyebrow: string;
  titre: string;
  chapeau?: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="contenu" className="bg-page px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto w-full max-w-[68ch]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-h2 font-semibold tracking-tight text-ink">
            {titre}
          </h1>
          {chapeau ? (
            <p className="mt-5 text-lead text-ink-2">{chapeau}</p>
          ) : null}
          <p className="u-numeric mt-6 text-[0.78rem] text-ink-4">
            Dernière mise à jour : {DERNIERE_REVISION}
          </p>

          <div className="mt-12 flex flex-col gap-10">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

/** Bloc de contenu légal : un intertitre, du texte suivi. */
export function LegalBloc({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h3 font-semibold tracking-tight text-ink">{titre}</h2>
      <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-ink-2">
        {children}
      </div>
    </section>
  );
}

/** Liste de définitions — la forme la plus lisible pour l'identité d'une société. */
export function LegalListe({
  entrees,
}: {
  entrees: readonly { terme: string; valeur: ReactNode }[];
}) {
  return (
    <dl className="flex flex-col gap-2.5 border-l-2 border-line pl-5">
      {entrees.map(({ terme, valeur }) => (
        <div key={terme} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
          <dt className="shrink-0 text-[0.95rem] text-ink-4 sm:w-52">{terme}</dt>
          <dd className="text-[0.95rem] text-ink">{valeur}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Encart affiché tant que l'identité de l'éditeur n'est pas renseignée.
 *
 * Volontairement visible : il vaut mieux une page qui dit franchement qu'elle
 * est incomplète qu'une page qui affiche des informations approximatives.
 */
export function LegalIncomplet() {
  return (
    <div className="flex gap-4 rounded-card bg-warning-tint p-5 ring-1 ring-line">
      <AlertTriangle
        className="mt-0.5 size-5 shrink-0 text-warning"
        strokeWidth={1.75}
        aria-hidden
      />
      <div className="flex flex-col gap-2 text-[0.925rem] leading-relaxed text-ink-2">
        <p className="font-medium text-ink">
          Informations en cours de publication.
        </p>
        <p>
          L&apos;identité complète de l&apos;éditeur sera publiée ici dès
          l&apos;immatriculation finalisée. Pour toute demande d&apos;ici là,
          écrivez à{" "}
          <a
            href="mailto:contact@pharmacowork.fr"
            className="font-medium text-primary-deep underline underline-offset-4 hover:text-primary-strong"
          >
            contact@pharmacowork.fr
          </a>
          .
        </p>
      </div>
    </div>
  );
}
