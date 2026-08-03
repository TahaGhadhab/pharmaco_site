# Analyse UX/UI — Skello.io

**Type :** site marketing SaaS B2B (logiciel RH / planning pour équipes de terrain)
**Stack :** Webflow (CDN `website-files.com`), GTM, Calendly, Arcade (démo interactive), Notion (changelog), Teamtailor (carrières), Intercom-like (support)
**Date d'analyse :** août 2026

> ⚠️ Les valeurs hexadécimales et typographiques ci-dessous sont **reconstituées visuellement** (le CSS compilé Webflow n'est pas lisible depuis le HTML rendu). Elles sont exploitables comme base de travail, mais à recaler à la pipette si tu veux du pixel-perfect.

---

## 1. Positionnement & stratégie de la page

| Élément | Observation |
|---|---|
| Promesse principale | La solution RH « IA » pour les équipes de terrain |
| 4 piliers produit | Planifier · Suivre les temps · Préparer la paie · Centraliser l'admin RH |
| Preuve sociale chiffrée | 25 000 équipes, 600 000 salariés, 4,5/5 sur 2 000+ avis |
| Double CTA permanent | « Demander une démo » (primaire, sales-led) + « Essayer gratuitement » (secondaire, product-led) |
| Réducteur de friction | Essai 14 jours, sans engagement, badge « données sécurisées » |
| Segmentation | Par **secteur** (CHR, retail, pharmacie/optique, BTP, industrie, services, loisirs) et par **taille** (2–200 / +200 salariés) |

**Stratégie de conversion :** hybride PLG + sales-led. Le CTA démo est répété ~8 fois sur la home (nav, hero, mega-menu, blocs produit, bandeau final). L'essai gratuit sert de porte de sortie pour les petites structures.

---

## 2. Arborescence des pages

```
/  (home, dupliquée par marché : /en /it /ch /be /lu + skello.es)
│
├── /product
│   ├── /scheduling
│   │   ├── /planification                  ← page pilier
│   │   ├── /smart-scheduling               [NEW]
│   │   ├── /steering-forecasting
│   │   └── /gestion-des-contraintes-legales
│   ├── /time-tracking
│   │   ├── /suivi-temps-de-travail         ← page pilier
│   │   ├── /mobile-clock-in
│   │   ├── /tablet-clock-in-system
│   │   └── /electronic-signature
│   ├── /time-absence-management
│   │   ├── /gestion-des-temps-absences     ← page pilier
│   │   ├── /leave-and-absence-management
│   │   ├── /pto-and-compensatory-rest
│   │   └── /overtime-compensation
│   ├── /payroll-management
│   │   ├── /gestion-paie                   ← page pilier
│   │   ├── /payroll-preparation-and-accounting-report
│   │   ├── /partners-integrations
│   │   ├── /distribution-of-pay-slips
│   │   └── /document-generation            [NEW]
│   ├── /hr-and-admin
│   │   ├── /admin-rh                       ← page pilier
│   │   ├── /skello-assistant               (assistant IA)
│   │   ├── /dpae
│   │   ├── /hris-employee-register
│   │   └── /recrutement                    [NEW]
│   ├── /employee-experience                (app salarié)
│   ├── /integrations-and-partners
│   ├── /skello-intelligence                (hub IA)
│   └── /product-tour                       (démo Arcade, « 3 min »)
│
├── /industries/{hotels-and-catering | retail-and-wholesale |
│                optical-medical-pharmacy | construction |
│                industries-and-services | services |
│                leisure-and-well-being | small-businesses | large-businesses}
│
├── /pricing
├── /customers  +  /clients/{slug}          (cas clients)
├── /gain-simulator                         (calculateur de ROI)
├── /blog  +  /blog/{slug}
├── /customer-support
├── /career  ·  /press-release  ·  /partenariats  ·  /comptables-et-pro-de-la-paie
├── /landing/demo  ·  /landing/demo-partner  (landings de conversion, sans nav)
└── /landing/{general-terms-and-conditions | general-term-of-use |
             privacy-policy | mentions-legales | faq-securite}
```

**Modèle éditorial :** hub-and-spoke. 5 hubs produit → chacun avec 3–5 pages filles ciblant une longue traîne SEO (« badgeuse mobile », « DPAE automatique », « signature électronique feuilles d'heures »). Les pages secteur croisent le produit avec un vocabulaire métier (multi-chantiers, 3x8, gardes et astreintes, ouverture dominicale…).

---

## 3. Design system

### 3.1 Couleurs

| Rôle | Valeur estimée | Usage |
|---|---|---|
| `--brand-blue` | `#1B4EF5` → `#0F5CFF` | logo, CTA primaire, liens, coches, accents |
| `--brand-blue-hover` | `#0A3ED6` | états hover du CTA |
| `--ink-900` | `#0B1020` / `#111428` | titres, texte fort |
| `--ink-600` | `#4A5068` | paragraphes |
| `--ink-400` | `#8A90A6` | légendes, labels |
| `--surface-0` | `#FFFFFF` | fond par défaut |
| `--surface-blue-50` | `#EEF3FF` | sections alternées, cartes produit |
| `--surface-cream` | `#FBF6EF` / beige | sections « offres », cartes premium |
| `--accent-yellow` | `#FFC53D` | pictos « + », badges, micro-accents |
| `--accent-orange` | dégradé `#FF8A4C → #FFC9A3` | carte « Populaire », visuels IA |
| `--success` | `#12B76A` | coches de comparateur, verrou vert |
| `--danger` | `#F04438` | croix comparateur, verrou rouge |

**Logique chromatique :** mono-chrome bleu dominant + neutres froids, avec l'orange/jaune réservé aux **zones de décision** (plan populaire, nouveautés, IA). Peu de couleurs = hiérarchie très lisible. Les dégradés « éventail » orange/pêche sur fond crème sont le seul écart décoratif — ils signalent le premium.

### 3.2 Typographie

- **Famille :** une grotesque géométrique unique (proche d'Aeonik / Gilroy / Poppins). Équivalents libres : `Poppins`, `Plus Jakarta Sans`, `Figtree`.
- **Échelle observée :**

| Token | Desktop | Mobile | Poids |
|---|---|---|---|
| `display` (H1 hero) | 56–64 px / 1.05 | 34–38 px | 700 |
| `h2` (titre de section) | 40–44 px / 1.15 | 28 px | 700 |
| `h3` (titre de bloc) | 28–32 px | 22 px | 600 |
| `body-lg` (sous-titre hero, listes à coches) | 18–20 px / 1.5 | 16 px | 400–500 |
| `body` | 16 px / 1.6 | 15 px | 400 |
| `label` / eyebrow | 13–14 px, uppercase ou tracking léger | — | 600 |

- **Traitement rédactionnel :** titres en **deux phrases courtes séparées par un point** (« Des plannings conformes. Une paie juste. »). C'est la signature verbale du site : rythme binaire, ton affirmatif, zéro jargon RH.

### 3.3 Espacement, rayons, ombres

- Grille de base **8 px** ; padding vertical de section : `96–128 px` desktop, `56–64 px` mobile.
- Conteneur max : **~1200–1280 px**, gouttières 24 px.
- Rayons : `12 px` (petits éléments), `16–20 px` (cartes), `24–32 px` (visuels produit, cartes pricing), pilule `999 px` pour boutons et tags.
- Ombres : très douces, diffuses, teintées bleu — type `0 8px 32px rgba(17,20,40,.08)`. Pas de bordures dures : la séparation se fait par **fond coloré**, pas par trait.

### 3.4 Iconographie & imagerie

- **Icônes système** : SVG monoline, coche bleue circulaire récurrente (le motif le plus répété du site), chevrons, flèches « suivant », picto bouclier pour la sécurité.
- **Photographie** : mise en situation terrain (cuisine, chantier, magasin, officine), lumière naturelle, personnes réelles au travail — jamais de stock corporate en costume.
- **Composition signature** : photo réelle + **fragment d'interface produit en overlay** (carte de remplacement, écran de pointage, export paie, liste d'alertes). C'est LE pattern visuel de la marque : ça prouve le produit sans imposer un screenshot complet.
- **Formats** : `.avif` / `.webp` pour les photos, `.svg` pour les icônes, `.mp4` pour le hero.
- **Logos clients** : niveaux de gris / monochrome, en bandeau défilant infini.

### 3.5 Composants récurrents

| Composant | Anatomie |
|---|---|
| **Bouton primaire** | pilule bleue, texte blanc, petit rond dégradé décoratif à gauche |
| **Bouton secondaire** | pilule outline ou ghost, texte encre |
| **Lien texte** | libellé + flèche `→`, translation de la flèche au hover |
| **Liste à coches** | icône coche bleue + phrase bénéfice (jamais une feature nue) |
| **Carte produit** | 50/50 texte + visuel, alternance gauche/droite |
| **Onglets produit** | 4 onglets (Planning / Badgeuse / Paie / Admin RH) qui pilotent le contenu en dessous |
| **Carte témoignage** | vignette vidéo + hashtag secteur + phrase de contexte, lien YouTube |
| **Carrousel logos** | marquee infini, dupliqué pour la boucle |
| **Carte pricing** | prix « dès X€/mois », description, CTA double, liste à coches, badge « Populaire » |
| **Accordéon FAQ** | `+` / `−` swap, réponse en liste à puces (optimisé rich snippets) |
| **Mega-menu** | 5 colonnes produit + encart démo + encart « Explore Skello » |
| **Sélecteur de langue** | 7 marchés (FR, IT, CH, BE, LU, EN, ES) |

### 3.6 Motion

Discret et fonctionnel : fade-up à l'entrée en viewport (~30–40 px), marquee de logos, accordéons, translation de flèche au hover, vidéo hero en autoplay muet et bouclé. Aucune animation gratuite.

---

## 4. Layout de la home, section par section

| # | Section | Layout | Rôle |
|---|---|---|---|
| 0 | Bandeau promo + nav sticky | pleine largeur, mega-menu | annonce + navigation |
| 1 | **Hero** | 50/50 : H1 + 4 bénéfices à coches + 2 CTA + réassurance à gauche, **vidéo produit** à droite | promesse + conversion immédiate |
| 2 | Preuve sociale | ligne de stats + note 4,5/5 + lien stores + marquee de 12 logos | crédibilité |
| 3 | **Onglets produit** | 4 onglets → bloc 50/50 (titre binaire + 3–4 coches + lien) | démonstration modulaire |
| 4 | Sélecteur secteur | 4 cartes cliquables | routage vers les pages métier |
| 5 | Bloc IA / gain de temps | 50/50, visuel « alertes paie » | différenciation |
| 6 | **Démo interactive** | embed Arcade pleine largeur | essai sans inscription |
| 7 | Support & onboarding | 50/50, photo support | levée d'objection « et après ? » |
| 8 | **Témoignages clients** | grille/carrousel de 12 cartes vidéo, taguées par secteur | preuve par les pairs |
| 9 | CTA final | bandeau centré, 2 boutons | conversion |
| 10 | **FAQ** | 10 accordéons | SEO + objections |
| 11 | Footer | 4 colonnes (solutions, secteurs, communauté, légal) + réseaux + langues | maillage interne |

**Rythme :** alternance systématique fond blanc / fond bleu très clair, et alternance image-gauche / image-droite. Un seul message par écran.

---

## 5. Contenu — logique rédactionnelle

**Structure type d'un bloc :**
> Titre en deux propositions courtes → 3 à 4 bénéfices à coches → lien « En savoir plus » → visuel prouvant le bénéfice.

**Règles observées :**
1. **Bénéfice avant fonctionnalité.** On ne dit pas « module de conformité », on dit « rester conforme à votre convention collective, automatiquement ».
2. **Chiffres partout.** 25 000 équipes, 600 000 salariés, 14 jours, 4,5/5, « 3 à 5 h/semaine », « jusqu'à 35 h/mois », +15 plateformes d'emploi.
3. **Vocabulaire réglementaire français assumé** (convention collective, DPAE, RTT, RUP, modulation, annualisation) — c'est une barrière à l'entrée face aux concurrents US.
4. **Adressage double** : le manager (gagner du temps, piloter les coûts) et le salarié (recevoir son planning, poser ses congés, équilibre vie pro/perso).
5. **FAQ orientée requêtes SEO** : « Skello vs Excel », « comment les salariés accèdent au planning », « est-ce conforme au droit du travail », « adapté à mon secteur ».

**Angles secteur** (pages `/industries`) :
CHR (horaires variables, coups de feu, extras) · Retail (temps partiel, dimanches, rotations) · Santé (astreintes, qualifications) · BTP (multi-chantiers, équipes mobiles) · Industrie (2x8/3x8/5x8, annualisation, intérim) · Services (déplacements, polyvalence) · Loisirs (saisonnalité, horaires atypiques).

---

## 6. Page Pricing — structure

- **Toggle à 3 entrées** : Planning / Badgeuse / Planning + Badgeuse (Duo) — architecture d'offre en matrice.
- **3 cartes par entrée** : `Standard` → `Max` → `Business` (sur devis, 200–10 000 salariés).
- Prix d'appel : Badgeuse Standard **59 €/mois**, Planning Standard **79 €**, Badgeuse Max **89 €**, Duo Standard **99 €**, Planning Max **107 €**, Duo Max **129 €**. Tous en « **dès** X€/mois ».
- Incitation : **−10 % en engagement annuel** (picto cadeau), essai 14 jours sur chaque carte.
- Logique d'upsell : la carte Max n'énumère pas tout, elle dit « en plus de l'offre Standard » + le delta. Très efficace.
- **Add-ons vendus à part** : Recrutement (dès 40 €/mois), HR Expert (dès 20 €/mois), Service de paie (dès 20 €/mois/salarié).
- **Comparateur détaillé** : tableau à 6 colonnes, coche verte / croix rouge / mention textuelle (« limité à 1 modèle », « 200 SMS/mois », « illimité »), regroupé en 6 familles (Planning, Temps & absences, Admin RH, Paie, Pilotage, Expérience salarié, Paramétrage) + export PDF.

---

## 7. Ce qui marche / ce qui accroche

**Points forts**
- Hiérarchie visuelle très propre : une couleur d'accent, un composant de preuve (la coche), un rythme de section constant.
- Le pattern « photo terrain + fragment d'UI » : plus crédible qu'un screenshot, plus concret qu'une illustration.
- Le mega-menu expose toute la profondeur produit sans noyer — grâce au groupement en 5 familles.
- L'essai interactif Arcade en milieu de page casse le mur de texte et fait tester avant l'inscription.
- Le comparateur de pricing avec mentions textuelles (et pas juste ✓/✗) répond aux vraies questions d'achat.

**Points faibles / dette**
- Sur la version EN, deux blocs produit portent le **même titre et les mêmes bullets** (duplication de contenu non corrigée).
- Localisation incomplète : des libellés français traînent dans la page EN (« Signature électronique des feuilles d'heures », « Partenariats », « Dès »). Symptomatique d'un Webflow multi-locale géré à la main.
- Deux systèmes de pricing cohabitent (Standard/Max/Business **et** un ancien Basic/Success/Premium plus bas dans la page) — friction cognitive.
- 12 témoignages en carrousel : trop, personne ne les parcourt tous.
- Hero en vidéo `.mp4` autoplay : coût LCP non négligeable sur mobile 4G.

---

## 8. Kit de départ (tokens CSS)

```css
:root {
  /* couleur */
  --blue-600:#1B4EF5; --blue-700:#0A3ED6; --blue-50:#EEF3FF;
  --ink-900:#0B1020;  --ink-600:#4A5068;  --ink-400:#8A90A6;
  --cream:#FBF6EF;    --yellow:#FFC53D;   --orange:#FF8A4C;
  --success:#12B76A;  --danger:#F04438;   --white:#FFF;

  /* typo */
  --font: "Plus Jakarta Sans", "Poppins", system-ui, sans-serif;
  --fs-display:clamp(2.25rem,1.4rem+3.6vw,4rem);
  --fs-h2:clamp(1.75rem,1.2rem+2.2vw,2.75rem);
  --fs-h3:clamp(1.375rem,1.1rem+1vw,2rem);
  --fs-body:1rem; --fs-body-lg:1.125rem;
  --lh-tight:1.08; --lh-normal:1.6;

  /* espace (base 8) */
  --s-1:.5rem; --s-2:1rem; --s-3:1.5rem; --s-4:2rem;
  --s-6:3rem;  --s-8:4rem; --s-12:6rem;  --s-16:8rem;

  /* forme */
  --r-sm:12px; --r-md:20px; --r-lg:32px; --r-pill:999px;
  --shadow-card:0 8px 32px rgba(17,20,40,.08);
  --shadow-cta:0 6px 20px rgba(27,78,245,.28);
  --container:1240px;
}
```

**Recette pour répliquer le modèle :**
1. Hero 50/50 : promesse + 4 coches bénéfices + 2 CTA + réassurance + preuve vidéo.
2. Bandeau logos immédiatement après.
3. Onglets pour montrer 4 modules sans 4 sections.
4. Alterner blanc / bleu-50 et image gauche / droite, un message par écran.
5. Une démo jouable au milieu de la page.
6. Preuve sociale sectorisée (le prospect doit voir son métier).
7. CTA final + FAQ SEO + footer de maillage.