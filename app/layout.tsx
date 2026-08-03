import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://pharmacowork.fr"),
  title: {
    default: "PharmacoWork — L'espace de travail de votre officine",
    template: "%s · PharmacoWork",
  },
  description:
    "Tout ce que votre officine fait hors du LGO, dans une seule application. Tâches, ordonnances à préparer, commandes, ruptures, locations, qualité, planning et messagerie d'équipe.",
  applicationName: "PharmacoWork",
  keywords: [
    "officine",
    "pharmacie",
    "logiciel officine",
    "gestion équipe pharmacie",
    "ruptures ANSM",
    "CIP13",
    "planning officine",
    "traçabilité qualité officine",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "PharmacoWork",
    title: "PharmacoWork — Rien ne se perd.",
    description:
      "L'espace de travail interne de votre officine. Tout ce que votre LGO ne fait pas, sur le téléphone que votre équipe a déjà.",
  },
  robots: { index: true, follow: true },
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
