import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { PostitWall } from "@/components/sections/postit-wall";
import { Simulator } from "@/components/sections/simulator";
import { Founders } from "@/components/sections/founders";
import { Features } from "@/components/sections/features";
import { Modules } from "@/components/sections/modules";
import { Gallery } from "@/components/sections/gallery";
import { Pricing } from "@/components/sections/pricing";
import { Visio } from "@/components/sections/visio";
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
 * Les tarifs arrivent en dernier lieu produit, après les fonctionnalités : on ne
 * demande pas à un visiteur ce que ça coûte avant de lui avoir montré ce que
 * c'est. Il a déjà, grâce au simulateur, un ordre de grandeur en tête.
 *
 * La demande de visio suit immédiatement les tarifs : c'est là que naît
 * l'hésitation, et la réponse à l'hésitation est quelqu'un à qui parler.
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
        <Founders />
        <Gallery />
        <Modules />
        <Features />
        <Pricing />
        <Visio />
        <Testimonials />
        <FinalCta />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
