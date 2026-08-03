# PharmacoWork — Landing page

Site vitrine de **PharmacoWork**, l'espace de travail interne d'une officine de pharmacie française.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · TypeScript · `motion` · `lucide-react`

---

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint
```

Copiez `.env.example` en `.env.local` et renseignez l'URL de l'application :

```
NEXT_PUBLIC_APP_URL=https://app.pharmacowork.fr
```

Le CTA « Demander l'accès » pointe vers `<NEXT_PUBLIC_APP_URL>/inscription`, qui porte
déjà le formulaire et ses validations (§10 du contexte produit).

---

## 📸 Ajouter vos captures d'écran

**C'est la seule chose qui reste à faire.** Déposez vos fichiers dans `public/screens/`
aux noms attendus — ils s'affichent automatiquement, aucun code à modifier.

Tant qu'un fichier est absent, un cadre de réservation prend sa place, avec le nom du
fichier attendu et le brief de la capture. La page reste présentable en permanence.

👉 **La liste complète des 10 fichiers est dans [`public/screens/README.md`](public/screens/README.md).**

Les 4 prioritaires : `location.png` · `scan.png` · `ruptures.png` · `accueil.png`.

> ⛔ Aucun nom de patient réel, aucune officine réelle, aucun FINESS réel sur les captures.

---

## Structure

```
app/
  layout.tsx          Polices Geist, métadonnées, thème sans flash, lien d'évitement
  page.tsx            Assemblage des 14 sections, dans l'ordre
  globals.css         Design system « Clean Clinical » — tokens, thèmes, animations
  icon.svg            Le logo — corolle orange, croix verte au centre

components/
  ui/                 Primitives partagées — à réutiliser, pas à réécrire
    primitives.tsx      Section, SectionHeading, Button, Card, IconBadge, Tag
    reveal.tsx          Apparitions au scroll, respectant prefers-reduced-motion
    screen-frame.tsx    Cadres téléphone/desktop + réservation automatique
    logo.tsx            La fleur
    theme-toggle.tsx    Bascule clair/sombre, sans état React
  sections/           Une section = un fichier

lib/
  site.ts             URLs, libellés de CTA, navigation
  screens.ts          Registre des captures d'écran
  simulator.ts        Le calcul économique et ses sources
  utils.ts            cn(), euros(), nombre()
```

### Ordre des sections

| # | Section | Rôle |
|---|---|---|
| 1 | `site-header` | Navigation sticky, barre de progression de lecture |
| 2 | `hero` | « Douze logiciels pour vos patients. Zéro pour votre équipe. » |
| 3 | `proof-strip` | Bandeau de réassurance, 4 mentions |
| 4 | `postit-wall` | **Le constat.** 6 post-its retournables → la fiche PharmacoWork |
| 5 | `simulator` | **Le pivot de conversion.** Ce que le désordre coûte |
| 6 | `features` | 4 blocs alternés — location, CIP13, ANSM, saisie automatique |
| 7 | `statement` | Le manifeste — révélation mot à mot (§9 du contexte) |
| 8 | `modules` | Les 15 modules, en grille |
| 9 | `roles` | Les 7 rôles, en onglets |
| 10 | `gallery` | Bande défilante de 5 écrans |
| 11 | `founders` | « Conçu derrière un comptoir, pas dans un open space. » |
| 12 | `trust` | 4 preuves sur les données de santé |
| 13 | `testimonials` | **En attente de verbatims réels** — invisible en production |
| 14 | `how-it-starts` | La frise du parcours d'entrée |
| 15 | `faq` | 8 accordéons + JSON-LD `FAQPage` |
| 16 | `final-cta` | « Rien ne se perd. » |
| 17 | `site-footer` | Maillage + dernier mot de positionnement |

### 🗣️ La section avis

Le design est terminé, le contenu manque. Elle **ne s'affiche pas en production**
tant que le tableau `TEMOIGNAGES` de [`components/sections/testimonials.tsx`](components/sections/testimonials.tsx)
est vide — impossible d'expédier un placeholder par accident.

**Les trois questions à poser** à un titulaire qui utilise déjà l'application (le
détail est en commentaire en haut du fichier) :

1. « Qu'est-ce que vous faisiez avant, pour ça ? »
2. « Qu'est-ce qui a changé concrètement, dans une journée normale ? » ← la citation sort ici
3. « Vous le diriez à un confrère ? Dans quels termes ? »

Ne reformulez pas : les maladresses de l'oral sont ce qui rend un témoignage crédible.
Obtenez un accord écrit sur le texte exact, le prénom, le rôle et la région.

> ⛔ **Ne jamais inventer de témoignage.** Art. L121-2 et s. du Code de la
> consommation : jusqu'à 2 ans d'emprisonnement et 300 000 € d'amende, portable
> à 10 % du chiffre d'affaires. La directive Omnibus vise explicitement les faux avis.

### `<ScrollReveal>` — révélation du texte au défilement

D'après le composant React Bits, adapté sur quatre points : `prefers-reduced-motion`
respecté, nettoyage cantonné à l'instance (`gsap.context`), balise configurable (`p` par
défaut, pas `h2`), typographie pilotée par le design system.

```tsx
<ScrollReveal textClassName="text-h2 font-semibold text-ink" baseRotation={1.5}>
  Une phrase qu'on veut faire lire en entier.
</ScrollReveal>
```

**À employer avec parcimonie** — un seul emplacement aujourd'hui : `statement`.
L'effet ne vaut que s'il reste exceptionnel : sur des puces ou des cartes, il devient du bruit.
`children` doit être une **chaîne** pour être découpé en mots.

### `<LogoLoop>` — défilement continu

D'après le composant React Bits, adapté sur trois points : `prefers-reduced-motion`
**coupe la boucle rAF** au lieu de la figer en CSS, `useResizeObserver` ne se réabonne
plus à chaque rendu, et la couleur du fondu vient d'un token (suit les deux thèmes).

Utilisé par `proof-strip`. Le composant accepte aussi des images — il resservira le
jour où il y aura de vrais logos partenaires à afficher.

```tsx
<LogoLoop logos={items} speed={42} hoverSpeed={0} fadeOut
          fadeOutColor="var(--pw-surface)" scaleOnHover />
```

> Le parent qui passe `renderItem` doit être `"use client"` : une fonction ne
> traverse pas la frontière serveur → client.

---

## ⚠️ Avant toute modification de contenu

Trois documents font autorité. **Lisez-les.**

| Fichier | Rôle |
|---|---|
| [`LANDING_PAGE_CONTEXT.md`](LANDING_PAGE_CONTEXT.md) | Produit, faits vérifiés dans le code, identité visuelle, **garde-fous du §15** |
| [`ARGUMENTAIRE_VENTE.md`](ARGUMENTAIRE_VENTE.md) | Angles de vente, calcul économique sourcé, slogan |
| [`AGENTS.md`](AGENTS.md) | Conventions de code, design system, règles de rédaction |

### Les interdits, en une ligne

Aucun chiffre de gain produit · « certifié HDS » · « conforme RGPD » · « dispositif médical » ·
toute promesse liée à la sécurité du patient ou à la délivrance · « remplace votre LGO » ·
témoignages, logos clients, compteurs d'officines · « essai gratuit », tout tarif ·
module Formation · « messagerie instantanée » ou « temps réel » · noms de patients dans les visuels.

**Le simulateur chiffre le coût du problème, jamais un gain apporté par le produit.**
La clause juridique sous le résultat n'est pas décorative — elle est ce qui rend le
montant publiable. Ne la retirez pas.

---

## Design system

Tout est dans `app/globals.css`. **Ne jamais écrire une couleur en dur.**

Accent unique : le vert `#1B9D58`. Fonds `bg-page` / `bg-surface` / `bg-surface-muted`.
Texte `text-ink` → `text-ink-4`. Rayons `rounded-card` (14 px), `rounded-pill`.

**Geist Mono est la signature visuelle du produit** : `.u-eyebrow` pour les micro-libellés
en majuscules, `.u-numeric` pour tous les chiffres.

Le mode sombre est intégral. `prefers-reduced-motion` est respecté partout.

---

## Reste à faire

- [ ] Déposer les 10 captures d'écran dans `public/screens/`
- [ ] Câbler les pages légales (mentions légales, confidentialité) — liens en `#` dans le footer
- [ ] Arbitrer la réponse à « et si vous fermez ? » (engagement de portabilité des données)
- [ ] Fournir une image Open Graph (`app/opengraph-image.png`, 1200 × 630)
- [ ] Confirmer le domaine de production dans `metadataBase` (`app/layout.tsx`)
