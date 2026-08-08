import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/ui/json-ld";
import { structuredData } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /**
   * Le nom de marque en tête du titre : c'est lui qu'on cherche quand on tape
   * « pharmacowork », et Google pondère fortement la position du terme.
   */
  title: {
    default: "PharmacoWork — L'espace de travail de votre officine",
    template: "%s · PharmacoWork",
  },
  description:
    "Tout ce que votre officine fait hors du LGO, dans une seule application. Tâches, ordonnances à préparer, commandes, ruptures, locations, qualité, planning et messagerie d'équipe.",
  applicationName: "PharmacoWork",
  authors: [{ name: "PharmacoWork", url: SITE_URL }],
  creator: "PharmacoWork",
  publisher: "PharmacoWork",
  keywords: [
    "PharmacoWork",
    "officine",
    "pharmacie",
    "logiciel officine",
    "gestion équipe pharmacie",
    "ruptures ANSM",
    "CIP13",
    "planning officine",
    "traçabilité qualité officine",
  ],
  /**
   * Canonical explicite : la page est servie sur plusieurs origines pendant
   * la vie du projet (domaine Railway, prévisualisations). Sans cette balise,
   * Google indexe la première qu'il trouve et la marque perd son domaine.
   */
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "PharmacoWork",
    title: "PharmacoWork — Rien ne se perd.",
    description:
      "L'espace de travail interne de votre officine. Tout ce que votre LGO ne fait pas, sur le téléphone que votre équipe a déjà.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PharmacoWork — Rien ne se perd.",
    description:
      "L'espace de travail interne de votre officine. Tout ce que votre LGO ne fait pas, sur le téléphone que votre équipe a déjà.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "Logiciel professionnel de santé",
  /**
   * Search Console — jeton de la méthode « balise Meta ».
   *
   * Ce n'est pas un secret : Google le publie dans le HTML, c'est tout son
   * objet. Il vit donc dans le code, pas dans une variable d'environnement
   * qu'on oublierait de reporter d'un déploiement à l'autre. L'override par
   * `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` reste possible si la propriété
   * change de main.
   *
   * ⚠️ Ne jamais retirer cette balise : Google revalide périodiquement, et
   * sa disparition fait perdre le statut de propriétaire.
   */
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "alC9loe2GAWoDHxxaFIcYPWcPHgs8DO2i4XPvddpk6c",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f0e" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* Applique le thème avant la peinture : pas de flash au chargement. */
const themeScript = `(function(){try{var s=localStorage.getItem("pw-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={structuredData} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-pill focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
