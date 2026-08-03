import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { PostitWall } from "@/components/sections/postit-wall";
import { Simulator } from "@/components/sections/simulator";
import { Features } from "@/components/sections/features";
import { Statement } from "@/components/sections/statement";
import { Modules } from "@/components/sections/modules";
import { Roles } from "@/components/sections/roles";
import { Gallery } from "@/components/sections/gallery";
import { Founders } from "@/components/sections/founders";
import { Trust } from "@/components/sections/trust";
import { Testimonials } from "@/components/sections/testimonials";
import { HowItStarts } from "@/components/sections/how-it-starts";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
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
        <Roles />
        <Gallery />
        <Founders />
        <Trust />
        <Testimonials />
        <HowItStarts />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
