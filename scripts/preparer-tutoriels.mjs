/**
 * Prépare les captures des tutoriels pour `public/tutoriels/`.
 *
 * ┌─ CE QUE FAIT CE SCRIPT ───────────────────────────────────────────────────┐
 * │ Les captures livrées par le client sont des PNG de 500 × 500 : un mockup   │
 * │ de téléphone, une main qui désigne le geste, et **un fond blanc opaque**.  │
 * │ Posé tel quel dans la page, ce carré blanc reste blanc en thème sombre —   │
 * │ douze pavés lumineux au milieu d'une page qui ne l'est pas.                │
 * │                                                                            │
 * │ Le script détoure donc le fond : le blanc qui touche le bord devient       │
 * │ transparent, et la page fournit sa propre surface dans les deux thèmes.    │
 * └────────────────────────────────────────────────────────────────────────────┘
 *
 * Source :  .screens-sources/tutoriels/<n>.png   (hors dépôt, cf. .gitignore)
 * Sortie :  public/tutoriels/<slug>.webp
 *
 * Le numéro du fichier source n'a aucun sens en lui-même : c'est l'ordre dans
 * lequel le client a exporté ses captures. La table `CAPTURES` ci-dessous est
 * la seule chose qui relie un numéro à une étape de tutoriel — elle doit rester
 * d'accord avec `lib/tutoriels.ts`.
 *
 * `sharp` arrive avec Next ; ce script ne tourne jamais au build. Outil
 * d'atelier, lancé à la main :  node scripts/preparer-tutoriels.mjs
 */

import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(RACINE, ".screens-sources", "tutoriels");
const SORTIE = path.join(RACINE, "public", "tutoriels");

/** Numéro de la capture livrée → nom servi. Voir `lib/tutoriels.ts`. */
const CAPTURES = {
  1: "session-demarrer-1",
  2: "session-demarrer-2",
  3: "tache-consulter-1",
  4: "tache-consulter-2",
  5: "tache-demarrer-1",
  6: "tache-demarrer-2",
  7: "tache-terminer-1",
  8: "tache-terminer-2",
  10: "tache-terminer-3",
  9: "tache-creer-1",
  11: "tache-creer-2",
  12: "tache-creer-3",
  14: "ordonnance-creer-1",
  15: "ordonnance-creer-2",
  16: "commande-creer-1",
  17: "commande-creer-2",
  18: "location-ouvrir-1",
  19: "location-ouvrir-2",
  20: "location-ouvrir-3",
  13: "location-creer-1",
  21: "commande-recevoir-1",
  22: "profil-preferences-1",
};

/**
 * Zones à masquer avant publication, par numéro de capture.
 *
 * ⛔ La capture 22 (« Mon profil ») porte une ADRESSE E-MAIL RÉELLE, lisible.
 * Une donnée personnelle n'a rien à faire sur une page publique — et une fois
 * la page en ligne, elle est indexée, archivée et hors de notre contrôle.
 * Elle est donc floutée ici, à la conversion : le fichier source reste intact
 * dans .screens-sources/, seule la version servie est masquée.
 *
 * Le vrai correctif est en amont : rejouer la capture depuis un compte de
 * démonstration. Ce masque est un garde-fou, pas une solution.
 *
 * Coordonnées en pixels de l'image source, origine en haut à gauche.
 */
const MASQUES = {
  22: [{ left: 152, top: 171, width: 197, height: 26 }],
};

/** Floute les zones demandées. Sans zone, l'image ressort telle quelle. */
async function masquer(entree, zones) {
  if (!zones || zones.length === 0) return entree;

  const calques = await Promise.all(
    zones.map(async (zone) => ({
      input: await sharp(entree).extract(zone).blur(7).png().toBuffer(),
      left: zone.left,
      top: zone.top,
    })),
  );

  return sharp(entree).composite(calques).png().toBuffer();
}

/**
 * Retrouve le fichier source d'un numéro, quelle que soit son extension.
 *
 * Le client exporte tantôt en PNG, tantôt en JPEG : le numéro fait foi, pas
 * le format. Un JPEG a déjà perdu ce qu'il a perdu — on ne le récupère pas,
 * mais on n'en retire pas davantage.
 */
const EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

function fichierDe(numero, fichiers) {
  const point = (nom) => nom.lastIndexOf(".");
  return fichiers.find(
    (nom) =>
      nom.slice(0, point(nom)) === String(numero) &&
      EXTENSIONS.includes(nom.slice(point(nom)).toLowerCase()),
  );
}

/**
 * Seuils du détourage, en luminance.
 *
 * Au-dessus de `EFFACE`, le pixel est du fond : il disparaît. En dessous de
 * `GARDE`, il appartient au mockup : il reste intact. Entre les deux — le halo
 * d'anticrénelage et l'ombre portée du téléphone — l'opacité monte
 * progressivement. Sans cette rampe, le détourage laisse un liseré blanc d'un
 * pixel autour du téléphone, invisible en thème clair et très visible en sombre.
 */
const EFFACE = 250;
const GARDE = 228;

/**
 * Détoure le fond par propagation depuis les bords.
 *
 * Un simple « tout ce qui est clair devient transparent » percerait l'intérieur
 * de l'image : la barre d'adresse du navigateur, les libellés blancs de
 * l'interface et le contour de la main sont clairs eux aussi. On ne retire donc
 * que le clair **relié au bord** — le fond, et rien d'autre.
 */
function detourer(pixels, largeur, hauteur, canaux) {
  const luminance = (i) =>
    0.299 * pixels[i * canaux] +
    0.587 * pixels[i * canaux + 1] +
    0.114 * pixels[i * canaux + 2];

  const fond = new Uint8Array(largeur * hauteur);
  const pile = [];

  for (let x = 0; x < largeur; x += 1) {
    pile.push(x, (hauteur - 1) * largeur + x);
  }
  for (let y = 0; y < hauteur; y += 1) {
    pile.push(y * largeur, y * largeur + largeur - 1);
  }

  while (pile.length > 0) {
    const index = pile.pop();
    if (fond[index] === 1) continue;
    if (luminance(index) < GARDE) continue;

    fond[index] = 1;

    const x = index % largeur;
    const y = (index - x) / largeur;
    if (x > 0) pile.push(index - 1);
    if (x < largeur - 1) pile.push(index + 1);
    if (y > 0) pile.push(index - largeur);
    if (y < hauteur - 1) pile.push(index + largeur);
  }

  const rgba = Buffer.alloc(largeur * hauteur * 4);
  for (let index = 0; index < largeur * hauteur; index += 1) {
    rgba[index * 4] = pixels[index * canaux];
    rgba[index * 4 + 1] = pixels[index * canaux + 1];
    rgba[index * 4 + 2] = pixels[index * canaux + 2];

    if (fond[index] === 0) {
      rgba[index * 4 + 3] = 255;
      continue;
    }

    const l = luminance(index);
    const opacite = ((EFFACE - l) / (EFFACE - GARDE)) * 255;
    rgba[index * 4 + 3] = Math.max(0, Math.min(255, Math.round(opacite)));
  }

  return rgba;
}

await mkdir(SORTIE, { recursive: true });

const fichiers = await readdir(SOURCE);
const manquants = Object.keys(CAPTURES).filter(
  (numero) => !fichierDe(numero, fichiers),
);
if (manquants.length > 0) {
  throw new Error(
    `Captures absentes de ${SOURCE} : ${manquants.join(", ")}`,
  );
}

for (const [numero, slug] of Object.entries(CAPTURES)) {
  const chemin = path.join(SOURCE, fichierDe(numero, fichiers));
  const masquee = await masquer(await sharp(chemin).png().toBuffer(), MASQUES[numero]);

  const { data, info } = await sharp(masquee)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = detourer(data, info.width, info.height, info.channels);

  /* Encodage QUASI SANS PERTE, et pas une simple qualité 86.
     Ces captures sont de l'interface : du texte fin et des aplats, ce que la
     compression avec pertes traite le plus mal. Surtout, elles n'ont que
     500 px pour un écran de téléphone qui en fait 1179 — le peu de finesse
     qui reste, on ne l'entame pas pour gagner treize kilo-octets. Le fichier
     passe de 9 à 22 ko, ce qui reste le poids d'une vignette. */
  const webp = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ nearLossless: true, quality: 60, effort: 6 })
    .toBuffer();

  await writeFile(path.join(SORTIE, `${slug}.webp`), webp);
  console.log(
    `${numero}.png → tutoriels/${slug}.webp  (${Math.round(webp.length / 1024)} ko)`,
  );
}

console.log(`${Object.keys(CAPTURES).length} captures préparées.`);
