/**
 * Génère les déclinaisons matricielles du logo à partir de `app/icon.svg`.
 *
 * ┌─ UNE SEULE SOURCE ────────────────────────────────────────────────────────┐
 * │ `app/icon.svg` est le logo. Tout ce que produit ce script en découle :     │
 * │ personne ne redessine une corolle à la main dans un éditeur d'images.      │
 * │ Le logo change → on relance `node scripts/generer-icones.mjs`.             │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * Pourquoi un `favicon.ico` alors qu'un SVG est déjà déclaré, et que Google
 * accepte le SVG : parce que `https://www.pharmacowork.fr/favicon.ico`
 * répondait **404**. C'est l'URL que les collecteurs de favicons — celui de
 * Google comme ceux des agrégateurs et des navigateurs — interrogent en repli
 * quand ils ne retiennent pas le `<link>` de la page. Sans fichier à cet
 * emplacement, le résultat de recherche reste au globe générique.
 *
 * ⚠️ Ce n'est PAS un problème d'empreinte. Le jeton que Next colle à l'URL
 * (`/icon.svg?icon.1ux4ujjlfs2-9.svg`) dérive du contenu du fichier : il est
 * identique d'un build à l'autre tant que le logo ne bouge pas — vérifié entre
 * la production et un build local. Il ne casse aucun cache.
 *
 * Le `.ico` apporte en plus ce qu'un SVG ne peut pas donner : des rendus
 * calés au pixel en 16 et 32, là où la réduction automatique d'une corolle à
 * douze pétales bave.
 *
 * `sharp` arrive avec Next ; il n'est pas une dépendance du site et ce script
 * ne tourne jamais au build. C'est un outil d'atelier, lancé à la main.
 */

import { Buffer } from "node:buffer";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(RACINE, "app", "icon.svg");

/**
 * Tailles embarquées dans le `.ico`.
 *
 * Le 48 n'est pas décoratif : Google demande un favicon carré d'au moins
 * 48 px, et de dimension multiple de 48. Les 16 et 32 servent l'onglet du
 * navigateur, qui pioche la taille exacte plutôt que de rééchantillonner.
 */
const TAILLES_ICO = [16, 32, 48];

/** Fond de l'icône iOS : Safari aplatit la transparence sur du noir. */
const FOND_IOS = { r: 247, g: 249, b: 246, alpha: 1 };

/**
 * Rend le SVG à la taille demandée.
 *
 * `density` est monté avant le rendu : librsvg pixellise à 72 ppp par défaut,
 * ce qui donne des pétales crénelés une fois réduits. On rastérise large, puis
 * on réduit — les bords restent nets.
 */
async function rendre(svg, taille, { fond = null, marge = 0 } = {}) {
  const utile = Math.round(taille * (1 - marge * 2));

  let image = sharp(svg, { density: 512 })
    .resize(utile, utile, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 });

  if (marge > 0 || fond) {
    const bord = Math.round((taille - utile) / 2);
    image = sharp(await image.toBuffer())
      .extend({
        top: bord,
        bottom: taille - utile - bord,
        left: bord,
        right: taille - utile - bord,
        background: fond ?? { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .flatten(fond ? { background: fond } : false)
      .png({ compressionLevel: 9 });
  }

  return image.toBuffer();
}

/**
 * Assemble des PNG en un conteneur `.ico`.
 *
 * Format ICO, variante PNG (Vista et au-delà) : l'en-tête décrit les images,
 * chaque image est un PNG stocké tel quel. Tous les navigateurs actuels et les
 * collecteurs des moteurs la lisent ; elle évite le BMP à masque inversé, qui
 * n'apporte plus rien qu'un risque d'erreur d'alignement.
 *
 *   ICONDIR      6 octets  · réservé(2)=0, type(2)=1 (icône), nombre(2)
 *   ICONDIRENTRY 16 octets · largeur(1), hauteur(1), couleurs(1)=0, réservé(1)=0,
 *                            plans(2)=1, bits(2)=32, taille(4), décalage(4)
 */
function assemblerIco(images) {
  const enTete = Buffer.alloc(6);
  enTete.writeUInt16LE(0, 0);
  enTete.writeUInt16LE(1, 2);
  enTete.writeUInt16LE(images.length, 4);

  const entrees = [];
  // Les données commencent après le répertoire complet.
  let decalage = 6 + images.length * 16;

  for (const { taille, png } of images) {
    const entree = Buffer.alloc(16);
    // 256 s'écrit 0 sur un octet — la convention du format.
    entree.writeUInt8(taille >= 256 ? 0 : taille, 0);
    entree.writeUInt8(taille >= 256 ? 0 : taille, 1);
    entree.writeUInt8(0, 2);
    entree.writeUInt8(0, 3);
    entree.writeUInt16LE(1, 4);
    entree.writeUInt16LE(32, 6);
    entree.writeUInt32LE(png.length, 8);
    entree.writeUInt32LE(decalage, 12);
    entrees.push(entree);
    decalage += png.length;
  }

  return Buffer.concat([
    enTete,
    ...entrees,
    ...images.map(({ png }) => png),
  ]);
}

const svg = await readFile(SOURCE);

/* ── /favicon.ico ─ transparence conservée ─────────────────────────────────
   Google pose la vignette sur blanc en thème clair et sur ardoise en thème
   sombre. Un fond cuit en dur ferait une pastille claire dans le second cas ;
   l'orange et le vert du logo passent sur les deux.                        */
const ico = assemblerIco(
  await Promise.all(
    TAILLES_ICO.map(async (taille) => ({
      taille,
      png: await rendre(svg, taille),
    })),
  ),
);
await writeFile(path.join(RACINE, "app", "favicon.ico"), ico);

/* ── /apple-icon.png ─ 180 px, fond opaque ─────────────────────────────────
   L'écran d'accueil iOS ne gère pas l'alpha : il aplatit sur du noir. D'où le
   fond clair, et une marge — iOS rogne les angles, un logo au ras du bord y
   perd ses pétales.                                                        */
await writeFile(
  path.join(RACINE, "app", "apple-icon.png"),
  await rendre(svg, 180, { fond: FOND_IOS, marge: 0.12 }),
);

/* ── /logo-pharmacowork.png ─ 512 px ───────────────────────────────────────
   Le logo de l'`Organization` du JSON-LD. Google accepte le SVG, mais l'URL
   du nôtre est empreintée et bouge à chaque build : le graphe pointerait vers
   une image morte d'un déploiement à l'autre. Ce fichier vit dans `public/`,
   donc à une URL fixe.                                                     */
await writeFile(
  path.join(RACINE, "public", "logo-pharmacowork.png"),
  await rendre(svg, 512),
);

console.log(
  `favicon.ico (${TAILLES_ICO.join(", ")} px) · apple-icon.png (180 px) · ` +
    `logo-pharmacowork.png (512 px) — générés depuis app/icon.svg`,
);
