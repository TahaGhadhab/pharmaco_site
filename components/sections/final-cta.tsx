import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

/**
 * Clôture de la page. `tone="ink"` : fond encre en clair, surface sourde en sombre —
 * le texte hérite de la couleur du conteneur, on ne fige donc aucune teinte ici.
 *
 * Le slogan « Rien ne se perd. » vit à cet endroit, et nulle part ailleurs.
 * ⛔ Aucun prix, aucun essai gratuit, aucun chiffre de gain.
 */

export function FinalCta() {
  return (
    <Section tone="ink">
      <Reveal className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
        <p className="u-eyebrow opacity-60">{site.baseline}</p>

        <h2 className="mt-6 text-display font-semibold">{site.slogan}</h2>

        <p className="mt-6 max-w-[40ch] text-lead opacity-80">
          Déposez une demande avec le FINESS de votre officine. Nous vous répondons par
          email.
        </p>

        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
          <ButtonLink href={site.urls.inscription} size="lg">
            {site.cta.primary}
          </ButtonLink>

          <Link
            href={site.urls.contact}
            className="group inline-flex items-center gap-1.5 text-[0.95rem] font-medium underline underline-offset-4 opacity-80 transition-opacity duration-200 ease-(--ease-out-soft) hover:opacity-100"
          >
            Nous écrire
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-(--ease-out-soft) group-hover:translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden
            />
          </Link>
        </div>

        <p className="u-eyebrow mt-12 opacity-70">
          Rien à installer · Aucune carte bancaire · Chaque officine validée à la main
        </p>
      </Reveal>
    </Section>
  );
}
