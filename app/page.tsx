import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { PostitWall } from "@/components/sections/postit-wall";
import { Simulator } from "@/components/sections/simulator";
import { Features } from "@/components/sections/features";
import { Statement } from "@/components/sections/statement";
import { Modules } from "@/components/sections/modules";
import { Gallery } from "@/components/sections/gallery";
import { Founders } from "@/components/sections/founders";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/sections/site-footer";

/**
 * Ordre des sections.
 *
 * Trois principes gouvernent cet enchaînement :
 *  1. Le mur de post-its installe le problème par le geste, pas par le texte.
 *  2. Le simulateur arrive tôt : le visiteur doit avoir un montant en tête
 *     avant de lire les fonctionnalités. Tout ce qui suit se lit autrement.
 *  3. Les fonds alternent (page / surface / tint) sans jamais se répéter deux
 *     fois de suite — la séparation se fait par la surface, pas par un trait.
 *
 * La FAQ est volontairement **après** le CTA de clôture : le visiteur convaincu
 * part sur le bouton, celui qui hésite trouve ses réponses juste en dessous.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="contenu">
        <Hero />
        <ProofStrip />
        <PostitWall />
        <Simulator />
        <Features />
        <Statement />
        <Modules />
        <Gallery />
        <Founders />
        <Testimonials />
        <FinalCta />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
