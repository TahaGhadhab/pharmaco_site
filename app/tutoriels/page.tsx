import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Tutoriels } from "@/components/sections/tutoriels";
import { ButtonLink, Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { MODULES_TUTORIELS, NOMBRE_TUTORIELS } from "@/lib/tutoriels";
import { EMAIL_CONTACT, site } from "@/lib/site";

/* ══════════════════════════════════════════════════════════════════════════
   /tutoriels — la prise en main, module par module.

   Une page de documentation, pas une page de vente : on y décrit des gestes,
   on n'y vend rien. Le seul appel à l'action est en pied de page, et il ne
   coupe aucun tutoriel en deux.

   Tout le contenu vient de `lib/tutoriels.ts` — y compris le sommaire et le
   décompte ci-dessous. Ajouter un module ne demande de toucher à rien ici.
   ══════════════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Tutoriels",
  description:
    "La prise en main de PharmacoWork en images, module par module : démarrer sa session, créer une tâche, la prendre en charge, la terminer et l'archiver.",
  alternates: { canonical: "/tutoriels" },
  openGraph: {
    title: "Tutoriels · PharmacoWork",
    description:
      "La prise en main de PharmacoWork en images, module par module.",
    url: "/tutoriels",
  },
};

export default function PageTutoriels() {
  return (
    <>
      <SiteHeader />

      <main id="contenu">
        <Section tone="tint" className="pb-10 md:pb-14 lg:pb-16">
          <Reveal>
            <Eyebrow>Prise en main</Eyebrow>
            <h1 className="mt-4 max-w-[20ch] text-display font-semibold tracking-tight text-ink">
              Chaque geste, en images. Un écran à la fois.
            </h1>
            <p className="mt-6 max-w-[54ch] text-lead text-ink-2">
              Les tutoriels sont rangés par module de l&apos;application.
              Ouvrez celui que vous cherchez, suivez les étapes dans
              l&apos;ordre.
            </p>
          </Reveal>

          {/* Sommaire — deux modules aujourd'hui, la liste suit le fichier. */}
          <Reveal delay={0.08}>
            <nav aria-label="Modules" className="mt-9 flex flex-wrap gap-2.5">
              {MODULES_TUTORIELS.map((module) => (
                <Link
                  key={module.id}
                  href={`#${module.id}`}
                  className="group inline-flex items-center gap-2.5 rounded-pill bg-surface px-4 py-2.5 text-[0.9rem] text-ink shadow-card ring-1 ring-line transition-[transform,color] duration-200 ease-(--ease-out-soft) hover:-translate-y-0.5 hover:text-primary-strong"
                >
                  {module.nom}
                  <span className="u-numeric text-[0.68rem] text-ink-4">
                    {module.tutoriels.length}
                  </span>
                </Link>
              ))}
            </nav>

            <p className="u-numeric mt-6 text-[0.75rem] text-ink-4">
              {NOMBRE_TUTORIELS} tutoriels · {MODULES_TUTORIELS.length} modules
            </p>
          </Reveal>
        </Section>

        <Tutoriels />

        <Section tone="tint">
          <Reveal>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
              <div>
                <h2 className="max-w-[24ch] text-h3 font-semibold tracking-tight text-ink">
                  Un geste qui n&apos;est pas ici ?
                </h2>
                <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-2">
                  Les tutoriels s&apos;étoffent module par module. Écrivez-nous
                  à{" "}
                  <a
                    href={`mailto:${EMAIL_CONTACT}`}
                    className="font-medium text-primary-deep underline underline-offset-4 transition-colors duration-200 hover:text-primary-strong"
                  >
                    {EMAIL_CONTACT}
                  </a>{" "}
                  pour demander celui qui vous manque, ou une initiation en
                  visio pour l&apos;équipe.
                </p>
              </div>

              <ButtonLink
                href={site.urls.inscription}
                size="lg"
                className="shrink-0"
              >
                {site.cta.primary}
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-(--ease-out-soft) group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </ButtonLink>
            </div>
          </Reveal>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
