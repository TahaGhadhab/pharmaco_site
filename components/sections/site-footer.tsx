import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

/**
 * Pied de page.
 *
 * ⛔ Pas de logos clients, pas de compteur d'officines, pas de badge de certification,
 * pas de réseau social inventé. Le dernier mot est un mot de positionnement (§9) :
 * PharmacoWork complète le LGO, il ne le remplace pas.
 */

const LIENS_LEGAUX = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Contact", href: site.urls.contact },
];

const LIEN =
  "text-[0.9rem] text-ink-3 transition-colors duration-200 ease-(--ease-out-soft) hover:text-primary-strong";

export function SiteFooter() {
  const annee = new Date().getFullYear();

  return (
    <footer className="bg-page px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto w-full max-w-(--container-page)">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <Logo />
            <p className="mt-5 text-[0.95rem] text-ink-2">{site.baseline}</p>
            <p className="mt-6 max-w-[42ch] text-[0.85rem] leading-relaxed text-ink-4">
              PharmacoWork complète votre logiciel de gestion d&apos;officine. Il ne le
              remplace pas.
            </p>
          </div>

          {/* Les deux colonnes de liens côte à côte dès le téléphone : empilées,
              elles ajoutaient 200 px de pied de page pour huit liens courts. La
              répartition de grand écran (6 / 3 / 3) est conservée telle quelle,
              le sous-conteneur occupant les six colonnes de droite. */}
          <div className="grid grid-cols-2 gap-6 md:col-span-6 md:gap-10">
            <nav aria-label="Sections de la page">
              <p className="u-eyebrow text-ink-4">Sur cette page</p>
              <ul className="mt-5 space-y-3">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={LIEN}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Informations légales">
              <p className="u-eyebrow text-ink-4">Informations</p>
              <ul className="mt-5 space-y-3">
                {LIENS_LEGAUX.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={LIEN}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-numeric text-[0.78rem] text-ink-4">
            © {annee} {site.name}
          </p>
          <p className="u-eyebrow text-ink-4">Conçu pour l&apos;officine française</p>
        </div>
      </div>
    </footer>
  );
}
