import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Image de partage (1200×630).
 *
 * Générée à la compilation, pas de fichier binaire à maintenir. Elle
 * s'affiche partout où le lien est collé : LinkedIn, WhatsApp, Slack,
 * iMessage — et c'est aussi la vignette que Google peut reprendre.
 *
 * Le logo est lu depuis `app/icon.svg` et passé en data URI : satori sait
 * rasteriser une image, pas un composant React contenant du SVG complexe.
 *
 * ⚠️ Couleurs en dur, à l'inverse de la règle du design system : cette image
 * est rendue hors du navigateur, sans CSS ni variables de thème. Les valeurs
 * reprennent les jetons `--page`, `--ink` et le vert de marque.
 */

export const alt =
  "PharmacoWork — l'espace de travail de votre officine. Rien ne se perd.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPIER = "#f7f9f6";
const ENCRE = "#12201a";
const ENCRE_DOUCE = "#4d635a";
const VERT = "#1E8749";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "app", "icon.svg"));
  const logoDataUri = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPIER,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUri} width={72} height={72} alt="" />
          <span style={{ fontSize: 38, fontWeight: 600, color: ENCRE }}>
            PharmacoWork
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: ENCRE,
            }}
          >
            L&apos;espace de travail
          </span>
          <span
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: VERT,
            }}
          >
            de votre officine.
          </span>
          <span
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: ENCRE_DOUCE,
            }}
          >
            Tout ce que votre LGO ne fait pas. Rien ne se perd.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            color: ENCRE_DOUCE,
          }}
        >
          <span style={{ color: VERT }}>pharmacowork.fr</span>
          <span style={{ color: "#c3d2c9" }}>·</span>
          <span>Conçu pour l&apos;officine française</span>
        </div>
      </div>
    ),
    size,
  );
}
