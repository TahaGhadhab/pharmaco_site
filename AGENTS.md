<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PharmacoWork — Landing page

Site vitrine d'un espace de travail interne pour officine de pharmacie française.
Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · TypeScript · `motion` · `lucide-react`.

## Les trois documents qui font autorité

| Fichier | Rôle | Statut |
|---|---|---|
| `LANDING_PAGE_CONTEXT.md` | Produit, faits vérifiés, identité visuelle, **garde-fous** | Fait foi. Le §15 est non négociable. |
| `ARGUMENTAIRE_VENTE.md` | Angles de vente, calcul économique, slogan, copy longue | Matière première |
| `inspo.md` | Analyse UX/UI de Skello — patterns de layout et de motion | Inspiration structurelle uniquement |

⚠️ `ARGUMENTAIRE_VENTE.md` contient de la **copy longue**. Ce n'est pas de la copy web.
Sur la page, on coupe : un titre, deux phrases, on passe à autre chose.

## Règles de rédaction

- Français, vouvoiement professionnel. Phrases courtes, un fait par phrase.
- Vocabulaire métier exact : *officine*, *titulaire*, *adjoint*, *préparateur*, *rupture*,
  *ordonnance*, *délivrance*, *FINESS*, *CIP13*, *LGO*.
- Titres en deux propositions courtes séparées par un point. C'est la signature verbale.
- Bénéfice avant fonctionnalité. On décrit ce que ça fait, jamais ce que ça « révolutionne ».

### ⛔ Interdits absolus (§15 du contexte — risque juridique réel)

Aucun chiffre de gain produit · « certifié HDS » · « conforme RGPD » · « dispositif médical » ·
toute promesse liée à la sécurité du patient ou à la délivrance · « remplace votre LGO » ·
**témoignages inventés**, logos clients, compteurs d'officines ·
mise en avant du module Formation · « messagerie instantanée » ou « temps réel » ·
noms de patients dans les visuels ·
« hébergement en France » (l'infrastructure est **européenne**) ·
« signature électronique » sur les locations (n'existe pas).

**Logo — l'interdiction de la croix verte est levée (3 août 2026).** Le logo en vigueur,
celui de l'application, est une corolle orange de douze pétales avec une croix verte au
centre : `components/ui/logo.tsx` et `app/icon.svg`. Couleurs figées (`#EE8B33`, `#1E8749`),
il ne suit pas le thème. Ne pas le remplacer par l'ancienne fleur monochrome.

**Formulations de repli, autorisées :** « conçu selon les principes du RGPD » ·
« hébergement européen » · pour les locations, le vrai mécanisme est le verrou de
restitution tant que le solde n'est pas nul.

**Tarif — décision commerciale confirmée par le client :** abonnement par officine,
calculé sur la taille de l'équipe, sans facturation à l'utilisateur. Premier mois
offert, inscription sans moyen de paiement. **Ne pas afficher de montant** tant
qu'aucun n'a été arrêté.

**Témoignages :** section prête dans `components/sections/testimonials.tsx`, masquée
tant qu'aucun verbatim réel n'est saisi. Un avis fabriqué est une pratique commerciale
trompeuse (art. L121-2 C. conso). Ne jamais en écrire, même « en attendant ».

Bannis aussi : *révolutionnez*, *boostez*, *tout-en-un*, *nouvelle génération*, *propulsé par l'IA*.

## Ergonomie — la contrainte n°1 du client

**La page ne doit pas être un mur de texte.** Consigne explicite du client.

- **Un message par écran.** Si un bloc a besoin de deux idées, c'est deux blocs.
- **Trois phrases maximum** par bloc de contenu, sauf FAQ.
- Le blanc est un composant. Respiration verticale généreuse entre les sections.
- Pas de liste de plus de 4 items visibles d'un coup.
- Si un contenu est long, il se **déplie** (accordéon, onglet, détail) — il ne s'étale pas.

## Design system

Tout est défini dans `app/globals.css`. **Ne jamais écrire une couleur en dur.**

| Usage | Classe |
|---|---|
| Accent (unique) | `text-primary` `bg-primary` `bg-primary-tint` `text-primary-deep` |
| Fonds | `bg-page` `bg-surface` `bg-surface-muted` |
| Texte | `text-ink` `text-ink-2` `text-ink-3` `text-ink-4` |
| Bordures | `ring-line` `border-line` |
| Rayons | `rounded-card` (14px) · `rounded-field` (10px) · `rounded-pill` · `rounded-sheet` |
| Ombres | `shadow-card` `shadow-raised` `shadow-float` `shadow-cta` |
| Typo | `text-display` `text-h2` `text-h3` `text-lead` |
| Geist Mono | `.u-eyebrow` (micro-libellé majuscule) · `.u-numeric` (chiffres, KPI, dates) |

**Geist Mono est la signature visuelle du produit.** L'employer pour les sur-titres de section,
les chiffres, les compteurs, les dates, les identifiants. Jamais pour du texte courant.

Mode sombre : géré par la classe `.dark` sur `<html>`. Toute couleur passant par les tokens
suit automatiquement. **Vérifier les deux thèmes.**

## Primitives partagées — les utiliser, ne pas les réécrire

```tsx
import { Section, SectionHeading, Eyebrow, Button, ButtonLink, Card, IconBadge, Tag }
  from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ScreenFrame, PhoneFrame, DesktopFrame } from "@/components/ui/screen-frame";
import { Logo, LogoMark } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { screens } from "@/lib/screens";
import { site } from "@/lib/site";
import { cn, euros, nombre } from "@/lib/utils";
```

`<Section tone="page | surface | tint | ink">` gère le rythme vertical et l'alternance des fonds.
La séparation entre sections se fait **par la surface, jamais par un trait**.

## Captures d'écran

Le client fournira les captures plus tard. **Ne jamais fabriquer de faux screenshot.**
Utiliser `<ScreenFrame slot={screens.xxx} />` : le cadre de réservation s'affiche
automatiquement tant que le fichier est absent de `public/screens/`.

Slots disponibles : `accueil` `scan` `ruptures` `ordonnance` `location` `planning`
`agenda` `qualite` `permissions` `chat` — voir `lib/screens.ts`.

Le cadre s'adapte aux proportions de la capture et l'affiche entière — ne jamais
lui réimposer un `aspect-[…]` ni un `object-cover`, ce serait rogner l'image.
Seule la largeur se règle à l'appel (`className="max-w-[…]"`).

## Motion

Animé, mais jamais gratuit — le §11 impose le respect de `prefers-reduced-motion`,
déjà câblé dans `Reveal` et dans `globals.css`.

- Entrée dans le viewport → `<Reveal>` / `<RevealGroup>` + `<RevealItem>`.
- Hover → translation de 2 à 4 px, transition 200 ms, courbe `--ease-out-soft`.
- Durées : 200 ms (micro-interaction), 600 ms (apparition). Jamais au-delà de 800 ms.
- Pas de parallaxe lourde, pas de 3D, pas de dégradé agressif, pas d'auto-play sonore.

## Conventions de code

- Composants de section dans `components/sections/`, un fichier par section, en kebab-case.
- `"use client"` uniquement si le composant a de l'état, un effet ou un écouteur.
  `Reveal`, `ScreenFrame` et `ThemeToggle` sont déjà clients — les importer depuis un
  composant serveur ne pose aucun problème.
- Icônes : `lucide-react`, `strokeWidth={1.75}`, taille via `className="size-5"`.
- Accessibilité : un seul `<h1>` sur la page, titres de section en `<h2>`, contraste AA,
  `aria-label` sur tout bouton sans texte, focus visible jamais supprimé.
