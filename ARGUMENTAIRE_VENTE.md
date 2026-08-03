# PharmacoWork — Argumentaire de vente

> **Destinataire :** l'agent IA qui rédige et développe la landing page.
> **Complément de :** `LANDING_PAGE_CONTEXT.md` (produit, faits, garde-fous). Ce document-ci
> ne redit pas le produit : il dit **comment le vendre**, **quoi mettre en avant**, **dans quel
> ordre**, et **avec quels chiffres**.
>
> **Contrainte absolue reprise du §15 du contexte :** aucun chiffre de *gain produit*. Ce
> document ne la contourne pas — il la retourne en avantage concurrentiel (voir §2).

---

## 0. La décision stratégique qui commande tout le reste

Le contexte produit interdit d'écrire « 5 h gagnées par semaine ». C'est une contrainte
juridique réelle. La réponse commerciale n'est pas de renoncer au chiffre.

**On ne chiffre pas le gain. On chiffre le problème.**

- Le **coût du désordre** est documenté par des sources publiques françaises et européennes
  (GPUE, USPO, Offisanté × Le Moniteur des pharmacies, ANSM, convention collective). Ce sont
  des chiffres **tiers, citables, vérifiables** — ils ne parlent pas de PharmacoWork, ils
  parlent de l'officine du visiteur.
- Le **gain**, on le laisse au visiteur : simulateur à ses propres chiffres, formule affichée,
  sources en note de bas de page.

Trois effets :
1. **C'est publiable.** Aucune affirmation sur les performances du produit.
2. **C'est plus vendeur.** Un titulaire ne croit pas « +40 % d'efficacité ». Il croit
   « l'USPO dit 12 h par semaine » — parce que c'est son syndicat.
3. **Ça devient un argument de marque.** Voir §5.5 : dans un secteur saturé de plaquettes,
   dire « nous n'avons pas encore de chiffre et nous refusons d'en inventer un » est le
   signal de crédibilité le plus fort qu'on puisse envoyer à un pharmacien.

---

## 1. Le slogan

### Recommandation principale

> # Rien ne se perd.

**Pourquoi celui-là :**

- **Trois mots.** Il tient sous le logo, dans un pied de page, sur une icône d'app, dans un mail.
- **Il dit exactement le produit.** Les sept problèmes du §3 du contexte sont tous des pertes :
  la consigne orale qui se perd à 17 h, le post-it qui se perd, le cahier qui ne survit pas au
  changement d'équipe, le terme de location qu'on ne voit pas passer, la traçabilité qu'on
  reconstitue parce qu'elle s'est perdue.
- **Il fonctionne à trois niveaux simultanés** — l'information, le temps, l'argent. C'est
  rare et c'est ce qui fait sa densité.
- **Il parle à un public scientifique.** L'écho à Lavoisier (« Rien ne se perd, rien ne se crée,
  tout se transforme ») est immédiat pour quelqu'un qui a fait six ans de pharmacie. Le clin
  d'œil est flatteur, jamais lourd, et jamais explicité.
- **Il ne promet rien d'interdit.** Pas un chiffre, pas une certification, pas une performance.
  C'est une affirmation sur la nature de l'outil, pas sur son rendement.
- **Il est sobre.** Il passe le test du §12 : aucun mot de jargon marketing.

**Comment l'employer :**

| Emplacement | Texte |
|---|---|
| Signature de marque (header, footer, favicon, OG image) | `PharmacoWork — Rien ne se perd.` |
| Titre du hero (descriptif, pas le slogan) | *Tout ce que votre officine fait hors du LGO, dans une seule application.* |
| Fin de page, avant le formulaire, en Geist Mono | `RIEN NE SE PERD.` |
| Balise `<title>` | `PharmacoWork — L'espace de travail de votre officine` |

> ⚠️ **Ne pas mettre le slogan en H1 du hero.** Un slogan poétique en titre principal coûte
> du référencement et de la clarté. Le H1 doit dire ce que c'est. Le slogan vit **au-dessus**
> (en Geist Mono, petit, vert) ou **en clôture de page**, là où il reste.

### Alternatives, classées

| # | Slogan | Force | Réserve |
|---|---|---|---|
| 2 | **Ça s'écrit tout seul.** | Décrit le mécanisme central du produit : le nom du médicament, le planning, l'agenda, la traçabilité — tout s'écrit sans saisie. Très concret. | Moins large que le n°1, ne couvre pas l'argent. Excellent **sur-titre de la section fonctionnalités**. |
| 3 | **Le second logiciel de votre officine.** | Désamorce d'emblée la peur n°1 du titulaire (« on veut remplacer mon LGO ») et installe la complémentarité comme une évidence. | Plus positionnement que slogan. Très bon **en première ligne de la section « Est-ce que ça remplace mon LGO ? »**. |
| 4 | **Ce qui se dit à 9 h existe encore à 17 h.** | La phrase la plus immédiatement reconnaissable par quelqu'un qui tient un comptoir. | Trop longue pour une signature. À garder comme **accroche de la section « Le problème »**. |
| 5 | **L'officine, écrite.** | Élégant, très sobre. | Un peu abstrait seul. |

> **À ne pas utiliser :** « Votre officine enfin organisée » (condescendant), « La pharmacie
> nouvelle génération » (banni §12), « L'officine augmentée » (creux), tout ce qui contient
> *simplifiez*, *boostez*, *révolutionnez*, *tout-en-un*.

---

## 2. La thèse commerciale, en une page

**À qui on parle :** au titulaire. Un chef d'entreprise de 2,3 M€ de CA, 5 salariés, dont le
revenu brut annuel a **baissé** en 2024 (64 461 €, contre 66 416 € en 2023), dont la marge brute
stagne à 29 %, et qui a plus de 80 % de chances d'avoir eu du mal à recruter cette année.
Il n'achète pas du confort. Il achète de la **marge** et du **risque en moins**.

**Ce qu'on lui dit, dans cet ordre :**

1. **Vous savez déjà que ça vous coûte.** Vous ne savez juste pas combien. → on chiffre le
   problème, avec ses sources à lui (USPO, GPUE, Le Moniteur).
2. **Ce n'est pas un problème de logiciel de gestion.** Votre LGO fait la vente. Le désordre
   est ailleurs : dans ce qui reste à faire, dans ce qui est en rupture, dans qui travaille
   demain. → on installe la complémentarité, jamais la substitution.
3. **Un outil générique ne le résoudra pas.** Trello ne connaît pas le CIP13. Notion ne lit
   pas le fichier ANSM. WhatsApp ne trace rien et fait circuler des données de santé.
   → c'est la barrière à l'entrée, et c'est le cœur de la démonstration.
4. **Voici ce que fait PharmacoWork, mécanisme par mécanisme.** Pas de pourcentage : des
   verrous. Le matériel ne se rend pas tant qu'il n'est pas payé. L'agenda n'a pas de champ de
   saisie. L'historique qualité est dérivé des données, il ne peut pas mentir.
5. **Nous ne vous vendons pas un chiffre.** On vous donne le calcul, vous mettez vos nombres.
6. **L'accès est validé à la main.** Ce n'est pas une friction, c'est une sélection.

**Le glissement à opérer sur toute la page :** de *« un outil de plus à remplir »* vers
*« le seul outil de la liste qui écrit à votre place »*. C'est l'objection n°1 (§6) et c'est
aussi la meilleure preuve du produit.

---

## 3. Le calcul — ce que le désordre coûte à une officine française

> **Statut de cette section : matière première pour la landing page, à publier avec ses
> sources.** Tous les chiffres ci-dessous décrivent **le coût du problème dans l'officine
> française**, jamais la performance de PharmacoWork. C'est ce qui les rend publiables.

### 3.1 L'officine de référence

Données 2025, sources publiques :

| Donnée | Valeur | Source |
|---|---|---|
| Officines en activité en France | 19 990 | Le Moniteur des pharmacies, *10 chiffres pour comprendre l'officine en 2025* |
| CA HT moyen | 2 263 K€ | idem |
| Marge brute moyenne | 29 % du CA HT, soit **661 K€** | idem |
| Effectif moyen | 5,2 salariés (≈ **6,2 personnes** avec le titulaire) | idem |
| Revenu brut annuel du titulaire (2024, hors dividendes) | **64 461 €** | idem / INSEE |

### 3.2 Le coût horaire d'une heure d'équipe

Calculé sur la grille de la convention collective de la pharmacie d'officine (IDCC 1996),
après la réforme de classification du 1er novembre 2025 :

| Poste | Brut mensuel (35 h) | Brut horaire | **Coût employeur ≈** |
|---|---|---|---|
| Préparateur, coef. 250 | 1 998,41 € | 13,18 € | **≈ 16,50 €/h** |
| Pharmacien adjoint, coef. 500 | ≈ 3 200 € | 21,10 € | **≈ 29,50 €/h** |
| Titulaire (coût d'opportunité) | — | — | **≈ 30,00 €/h** |

Répartition réaliste du traitement d'une rupture (60 % préparateur / 30 % adjoint / 10 %
titulaire) → **21,75 €/h**.

> 👉 **On retient 20 €/h**, volontairement en dessous. Tout le calcul qui suit est prudent.

### 3.3 Poste 1 — Le temps passé à gérer les ruptures ⚫ *sourcé*

C'est le poste le mieux documenté du secteur, et de loin.

| Source | Chiffre | Périmètre |
|---|---|---|
| GPUE, enquête 2022 | **6 h 40 / semaine** par équipe officinale | 27 pays UE |
| USPO (P.-O. Variot, France Info, avril 2024) | **12 h / semaine** | France |
| GPUE, rapport 2025 (présenté au Parlement européen, mars 2026) | **12 h / semaine**, « plus du double d'il y a cinq ans » | 27 pays UE + AELE |
| Le Moniteur des pharmacies | **25 % du temps professionnel** consacré aux pénuries | France |
| ANSM | **3 887 signalements** de rupture ou risque de rupture en 2025 (3 825 en 2024) | France |

Calcul, sur 46 semaines d'activité pleine :

```
                heures/sem  ×  46 sem  ×  20 €/h
  Hypothèse basse    6 h    →   5 520 €/an
  Hypothèse retenue  8 h    →   7 360 €/an
  Hypothèse haute   12 h    →  11 040 €/an
```

> **→ 5 500 € à 11 000 € par an.**
> L'hypothèse retenue (8 h) est *inférieure* au chiffre français de l'USPO. Assumé : mieux
> vaut un chiffre qu'on ne peut pas nous reprocher.

### 3.4 Poste 2 — La marge perdue sur les ventes non servies ⚫ *sourcé*

Étude **Offisanté × Le Moniteur des pharmacies**, 500 premières spécialités en tension,
12 mois glissants :

- Perte de CA moyenne : **8 314 €/an** pour une officine à 1,6 M€ de CA
- Médiane : 7 940 € — soit **0,52 % du CA HT**

Appliqué à l'officine de référence : 2 263 K€ × 0,52 % = **11 768 € de CA perdu**,
soit à 29 % de marge → **3 413 € de marge perdue par an**.

> **→ 2 400 € à 3 400 € par an de marge.**
>
> ⚠️ **Honnêteté nécessaire dans la copie :** PharmacoWork ne récupère pas cette vente — il
> ne fait pas la délivrance. Ce qu'il change, c'est que **l'alternative trouvée l'est une seule
> fois** : elle est déclarée, partagée, et si elle part elle-même en tension, l'ANSM le dit le
> lendemain matin. Ne pas laisser entendre qu'on récupère ces 3 400 €. Les citer comme
> **mesure de l'ampleur du problème**.

### 3.5 Poste 3 — La coordination non tracée 🟡 *hypothèse assumée*

Aucune source publique. Raisonnement transparent : le temps quotidien passé à redemander,
à répéter une consigne, à chercher qui a fait quoi, à reconstituer le planning réalisé.

```
  6,2 personnes × 250 jours × 20 €/h

  10 min / personne / jour  →   5 170 €/an
  20 min / personne / jour  →  10 330 €/an
```

> **→ 5 200 € à 10 300 € par an.**
> ⛔ **À valider sur pilote avant toute publication chiffrée.** Sur la landing page :
> utilisable **uniquement dans le simulateur**, en paramètre modifiable par le visiteur, jamais
> en chiffre affirmé.

### 3.6 Poste 4 — Les termes de location non encaissés 🟡 *hypothèse assumée*

Le poste le plus petit en euros, mais le plus **spectaculaire** en démonstration — parce que
c'est le seul que le produit rend **impossible par construction**.

- Base LPPR d'un lit médicalisé : **12,60 €/jour**, soit **≈ 378 € par mois de location**.
- Le MAD pèse rarement plus de 3 % du CA de l'officine, jusqu'à 10 % sur certains territoires,
  dont **25 % en location pure** (Le Moniteur des pharmacies).
- Un lit médicalisé non restitué, c'est **800 à 2 000 €** de matériel qui ne revient pas.

```
  1 terme mensuel oublié par trimestre  →  4 × 378 €  =  1 512 €/an
  2 termes oubliés dans l'année         →      756 €/an
```

> **→ 750 € à 1 500 € par an**, plus le risque de matériel non rendu.
>
> **La phrase à écrire sur la page :** *« Un impayé de location n'est pas un impayé oublié.
> C'est un impayé que personne n'a vu. »* Puis, en dessous :
> *« Le matériel ne se rend pas tant qu'il n'est pas payé. »*

### 3.7 Poste 5 — Le risque réglementaire 🟡 *à manier avec précaution*

Pas un coût récurrent : un coût d'événement. À traiter en **section confiance**, jamais en
euros dans le total.

| Fait | Source |
|---|---|
| 87 sanctions CNIL en 2024, plus de 55 M€ d'amendes | CNIL, bilan 2024 |
| Professionnels de santé libéraux sanctionnés : **3 000 à 5 000 €** | idem |
| Cegedim Santé : **800 000 €** pour traitement de données de santé sans autorisation (sept. 2024) | CNIL |
| Violation du secret professionnel (art. 226-13 CP) : jusqu'à 1 an et 15 000 € | Code pénal |

> ⛔ **Ce qu'on écrit :** *« Les données de vos patients circulent aujourd'hui sur un groupe
> WhatsApp. Ce n'est pas une opinion : c'est ce que la CNIL a sanctionné chez des
> professionnels de santé en 2024. »*
> ⛔ **Ce qu'on n'écrit jamais :** que PharmacoWork vous met en conformité, qu'il est certifié
> HDS, ou qu'il est conforme RGPD. Voir §8 et §15 du contexte produit. On décrit les
> mécanismes (cloisonnement, chiffrement AES-256-GCM, journal d'accès nominatif), on ne
> promet pas le résultat.

### 3.8 Synthèse

**Socle strictement sourcé** — c'est ce chiffre-là qu'on met en avant :

| Poste | Bas | Haut | Statut |
|---|---|---|---|
| Temps de gestion des ruptures | 5 500 € | 11 000 € | ⚫ Sources publiques |
| Marge perdue, ventes non servies | 2 400 € | 3 400 € | ⚫ Source publique |
| **TOTAL PUBLIABLE** | **≈ 8 000 €** | **≈ 14 000 €** | |

**Avec les hypothèses non mesurées** (réservé au simulateur) :

| Poste | Bas | Haut | Statut |
|---|---|---|---|
| Coordination non tracée | 5 200 € | 10 300 € | 🟡 Hypothèse |
| Termes de location non encaissés | 750 € | 1 500 € | 🟡 Hypothèse |
| **TOTAL ÉTENDU** | **≈ 14 000 €** | **≈ 26 000 €** | |

### 3.9 Les trois mises en perspective à utiliser sur la page

Le chiffre brut ne parle pas. Ces trois traductions, si. Par ordre d'impact :

> **1. Entre un quart et une moitié de préparateur à temps plein.**
> Un préparateur au coef. 250 coûte ≈ 30 000 €/an chargé. 8 000 à 14 000 €, c'est **0,27 à
> 0,47 ETP** — trois à six mois de salaire chargé, tous les ans.
> *→ C'est la traduction la plus efficace : le titulaire raisonne en postes, pas en euros.*

> **2. 12 % à 22 % du revenu annuel du titulaire.**
> Sur un revenu brut de 64 461 €, dont le repli est déjà documenté sur 2024.

> **3. 1,2 % à 2,1 % de la marge brute.**
> Sur 661 K€. Le langage de l'expert-comptable — à réserver à la FAQ ou à une note, c'est le
> moins parlant émotionnellement.

---

## 4. Le simulateur — la pièce maîtresse de la landing page

C'est **l'élément de conversion n°1 de la page** et le seul dispositif qui permet d'afficher
un montant à quatre chiffres sans enfreindre le §15.

### 4.1 Le principe juridique qui le rend publiable

Le résultat affiché n'est **pas une promesse de PharmacoWork**. C'est le coût du problème,
calculé à partir de :
- **les chiffres que le visiteur saisit lui-même**,
- **des barèmes publics** dont la source est affichée à l'écran.

**La ligne à écrire sous le résultat, en toutes lettres, non négociable :**

> *Ce calcul utilise vos chiffres et des sources publiques. Il estime ce que le désordre vous
> coûte aujourd'hui — pas ce que PharmacoWork vous ferait gagner. Nous n'avons pas encore de
> mesure terrain, et nous n'en inventerons pas.*

Cette phrase n'affaiblit pas le simulateur. **Elle en fait l'argument.**

### 4.2 Les champs

| # | Libellé | Type | Défaut | Bornes |
|---|---|---|---|---|
| 1 | Chiffre d'affaires HT annuel | curseur € | 2 263 000 | 800 K€ – 6 M€ |
| 2 | Nombre de personnes dans l'équipe | curseur | 6 | 2 – 20 |
| 3 | Heures par semaine passées à gérer les ruptures | curseur h | 8 | 2 – 16 |
| 4 | Locations de matériel en cours | curseur | 6 | 0 – 40 |

Chaque curseur porte une note discrète en Geist Mono :
- champ 1 → `MOYENNE FRANÇAISE 2025 : 2 263 K€`
- champ 3 → `USPO ET GPUE MESURENT 12 H`
- champ 4 → `BASE LPPR LIT MÉDICALISÉ : 12,60 €/JOUR`

### 4.3 La formule

```
coutHoraire = 20            // €/h chargé, mix préparateur / adjoint / titulaire
semaines    = 46
jours       = 250

ruptures    = heuresRuptures × semaines × coutHoraire
margePerdue = CA × 0,0052 × 0,29
coordination= effectif × (10/60) × jours × coutHoraire
locations   = min(locations, 4) × 378

TOTAL = ruptures + margePerdue + coordination + locations
```

Avec les valeurs par défaut : 7 360 + 3 413 + 5 167 + 1 512 = **≈ 17 450 € / an**.

### 4.4 L'affichage du résultat

```
┌──────────────────────────────────────────────────┐
│  CE QUE LE DÉSORDRE COÛTE À VOTRE OFFICINE       │  ← Geist Mono, vert #15894C
│                                                   │
│         17 450 €                                  │  ← chiffre en Geist Mono, très grand
│         par an                                    │
│                                                   │
│  Soit l'équivalent de 0,6 préparateur             │  ← la traduction en ETP, essentielle
│  à temps plein.                                   │
│                                                   │
│  ▸ Ruptures, temps d'équipe          7 360 €     │  ← détail dépliable, chaque ligne
│  ▸ Marge perdue, ventes non servies  3 413 €     │     avec sa source au survol
│  ▸ Coordination non tracée           5 167 €     │
│  ▸ Termes de location non encaissés  1 512 €     │
│                                                   │
│  Ce calcul utilise vos chiffres et des sources   │
│  publiques. Il estime ce que le désordre vous    │
│  coûte aujourd'hui — pas ce que PharmacoWork     │
│  vous ferait gagner. Nous n'avons pas encore de  │
│  mesure terrain, et nous n'en inventerons pas.   │
│                                                   │
│         [ Demander l'accès ]                      │
└──────────────────────────────────────────────────┘
```

**Placement dans la page :** juste après la section « Le problème », avant les fonctionnalités.
Le visiteur arrive avec une gêne diffuse ; il repart de ce bloc avec un montant. Tout ce qui
suit est lu différemment.

**Détail qui compte :** les quatre lignes de détail doivent être **dépliables et sourcées au
survol**. Un pharmacien vérifie. Qu'il puisse le faire est le meilleur argument de la page.

---

## 5. Les cinq arguments de vente, hiérarchisés

Sur les dix caractéristiques du §5 du contexte, **cinq seulement portent la vente**. Les autres
sont des preuves, pas des arguments. Voici l'ordre.

### 5.1 — L'argent arrête de fuir 💰 *l'argument à effet euro immédiat*

**Le mécanisme :** échéancier de location découpé en périodes qui avancent avec le calendrier,
solde restant dû calculé en permanence, et **restitution refusée tant que la location n'est pas
soldée**, montant manquant affiché.

**Pourquoi c'est l'argument n°1 :** c'est le seul du produit qui a un effet monétaire **direct,
immédiat et vérifiable dès la première semaine**. Et surtout : ce n'est pas une aide à la
décision, c'est un **verrou**. Un verrou ne se mesure pas, il se constate.

**Copy prête :**
> ### Le matériel ne se rend pas tant qu'il n'est pas payé.
> Chaque location est découpée en périodes, hebdomadaires ou mensuelles, qui avancent avec le
> calendrier. Chaque paiement est enregistré au centime. Le solde restant dû est calculé en
> permanence.
> Et quand quelqu'un veut clôturer une location qui n'est pas soldée, l'application refuse et
> affiche ce qui manque.
>
> *Un impayé de location n'est pas un impayé oublié. C'est un impayé que personne n'a vu.*

---

### 5.2 — Il connaît les médicaments 💊 *l'argument de crédibilité métier*

**Le mécanisme :** référentiel national CIP13 embarqué (20 869 présentations issues de la BDPM
de l'ANSM), scan EAN-13 et Data Matrix GS1 à la caméra du téléphone, et synchronisation
nocturne du fichier officiel de disponibilité de l'ANSM — **filtré sur les seuls médicaments
que l'officine suit déjà**.

**Pourquoi c'est l'argument n°2 :** c'est la **barrière à l'entrée**. Tout ce que fait
PharmacoWork par ailleurs, un Trello bien tenu le ferait à moitié. Ça, non. Aucun outil
générique ne saura jamais lire le Data Matrix d'une boîte et dire que l'ANSM a déclaré une
tension dessus cette nuit. C'est ce qui transforme « encore un outil » en « un outil de
pharmacien ».

Et c'est l'argument qui **connecte directement au chiffre du §3.3** : 3 887 signalements ANSM
en 2025, 12 h par semaine selon l'USPO.

**Copy prête :**
> ### Scannez la boîte. Le nom s'écrit tout seul.
> 20 869 présentations, identifiées par leur code CIP13, issues de la base publique de l'ANSM.
> La caméra de votre téléphone lit le code-barres et le Data Matrix. Aucun lecteur à acheter.
>
> ### Et cette nuit, l'ANSM vous a répondu.
> Le fichier officiel de disponibilité des médicaments est rechargé chaque nuit. Mais vous
> n'êtes alerté que sur les médicaments **que vous suivez déjà** — ceux sur lesquels vous avez
> une rupture ouverte, ou que vous avez proposés en alternative.
> Sans ce filtre, ce serait 474 alertes d'un coup. Avec, c'est une information.
>
> *Une alternative qui part elle-même en tension : c'est exactement ce qu'il faut savoir.*

> ⚠️ Rappel §5.2 du contexte : écrire « ce **médicament** fait l'objet d'une tension », jamais
> « cette boîte est en rupture ».

---

### 5.3 — Ça s'écrit tout seul ✍️ *l'argument qui tue l'objection n°1*

**Le mécanisme :** l'agenda n'a aucun champ de saisie — il agrège tout ce qui porte une date
ailleurs. Le planning reçoit les heures d'arrivée et de départ réelles depuis le pointage.
L'historique qualité est **dérivé** des données à la lecture, il n'est stocké nulle part et ne
peut donc pas diverger de la réalité. Le nom du médicament vient du scan.

**Pourquoi c'est l'argument n°3 :** parce que l'objection réflexe du titulaire est *« mon
équipe ne le remplira pas »*. Elle est fondée : elle a raison sur tous les outils qu'on lui a
vendus avant. C'est le seul argument qui la retourne complètement.

**Copy prête :**
> ### Le seul outil de votre officine qui écrit à votre place.
> **L'agenda n'a pas de saisie.** Il lit vos échéances de tâches, vos livraisons attendues, vos
> fins de location, vos ordonnances à préparer. Un agenda qu'on n'alimente pas est un agenda
> qui n'est jamais faux.
>
> **Le planning non plus.** Chacun démarre son compteur en arrivant. L'heure d'arrivée réelle
> s'inscrit sur le planning du jour. L'heure de départ aussi. Personne ne note rien.
>
> **L'historique qualité non plus.** Il n'est pas stocké : il est reconstruit à partir de vos
> contrôles, de vos non-conformités et de vos incidents, avec le nom de qui a fait quoi et
> quand — pris sur la connexion, jamais déclaré dans un formulaire.
>
> *La traçabilité est produite pendant le travail, pas reconstituée avant l'inspection.*

---

### 5.4 — Vos données de santé sortent de WhatsApp 🔒 *l'argument de risque*

**Le mécanisme :** cloisonnement strict par officine sur chaque lecture, chiffrement AES-256-GCM
au repos de la note client d'ordonnance, journal d'accès nominatif et horodaté sur chaque
consultation, image d'ordonnance jamais stockée (traitée en mémoire puis jetée), OCR chez un
fournisseur français, connexion par lien magique sans mot de passe.

**Pourquoi c'est l'argument n°4 :** parce que le titulaire **sait** que le groupe WhatsApp de
l'équipe est un problème, et qu'il n'a jamais eu d'alternative crédible. On ne lui apprend rien,
on lui donne une porte de sortie.

**Copy prête :**
> ### Un groupe WhatsApp n'est pas un outil de travail.
> Il mélange le professionnel et le personnel. Il ne trace rien. Il ne connaît aucun droit
> d'accès. Et il fait transiter des informations qui n'ont rien à y faire.
>
> Dans PharmacoWork : la note client d'une ordonnance est chiffrée en base. Chaque lecture
> écrit une ligne, avec un nom et une heure. L'image de l'ordonnance n'est stockée nulle part —
> elle est lue en mémoire, puis jetée. Et deux officines sur la plateforme ne voient jamais
> rien l'une de l'autre : c'est l'invariant le plus testé du produit.

> ⛔ **Interdits absolus dans cette section :** « conforme RGPD », « certifié », « HDS »,
> « sécurisé » employé seul comme une garantie. On décrit des mécanismes. On ne promet pas
> un état juridique. Voir §8 du contexte produit.

---

### 5.5 — On ne vous vend pas un chiffre 🎯 *le méta-argument, et le vrai différenciateur*

**Le mécanisme :** l'honnêteté, écrite noir sur blanc, à un endroit visible de la page.

**Pourquoi c'est l'argument n°5 — et pourquoi il ne faut surtout pas le couper :** un titulaire
reçoit des plaquettes toutes les semaines. Toutes annoncent « +30 % de productivité ». Il ne les
croit pas, et il a raison. Une page qui dit *« nous n'avons pas encore de mesure et nous
refusons d'en inventer une »* fait exactement l'inverse de ce que fait le marché. Dans un métier
où la rigueur est une valeur professionnelle, c'est le signal de sérieux le plus fort disponible.

Cet argument transforme la contrainte du §15 en **positionnement de marque**.

**Copy prête — à placer juste après le simulateur :**
> ### Ce que nous ne vous dirons pas
> Nous ne vous dirons pas que vous gagnerez cinq heures par semaine. Nous ne l'avons pas mesuré.
> Aucune officine n'utilise encore PharmacoWork assez longtemps pour qu'un tel chiffre veuille
> dire quelque chose — et un chiffre inventé, dans ce métier, se voit tout de suite.
>
> Ce que nous pouvons vous dire, c'est ce que l'application fait. Précisément. Le nom du
> médicament vient du scan. L'agenda n'a pas de saisie. La restitution est refusée tant que la
> location n'est pas soldée. Ce sont des mécanismes, pas des pourcentages : vous pouvez les
> vérifier en dix minutes.
>
> Le jour où nous aurons une mesure, elle sortira avec son échantillon et sa date.

**Argument de rareté à enchaîner immédiatement** (§10 du contexte) :
> ### Chaque officine est validée à la main.
> Vous déposez une demande avec le FINESS de votre établissement. Nous la lisons. Nous savons
> qui est sur la plateforme, et vous aussi.
> Ce n'est pas une inscription en ligne. C'est volontaire.

---

### 5.6 Les arguments de second rang

À traiter en grille ou en liste, sans développement visuel. Ils rassurent, ils ne convertissent
pas :

| Argument | Formulation |
|---|---|
| Rôles configurables | « Sept rôles. Et c'est vous qui réglez la grille des droits de votre officine. » |
| Zéro infrastructure | « Rien à installer, rien à héberger, rien à maintenir. Sur les téléphones que votre équipe a déjà. » |
| Mobile d'abord | « C'est un métier debout, entre le comptoir et le back-office. L'application a été pensée pour un téléphone, pas adaptée à lui. » |
| Connexion sans mot de passe | « Un lien par email. Aucun mot de passe à créer, à retenir ou à faire fuiter. » |
| Onboarding d'un nouvel arrivant | « Le nouvel arrivant lit ce qui est à faire, au lieu de le demander. » — pertinent quand plus de 80 % des officines déclarent des difficultés de recrutement. |

---

## 6. Traitement des objections

À intégrer dans la FAQ ou en section dédiée. Ce sont les six objections qui feront perdre la
vente si elles ne sont pas traitées **sur la page**.

### « J'ai déjà mon LGO. »
> Et vous le garderez. PharmacoWork ne fait ni délivrance, ni facturation, ni télétransmission,
> ni gestion de stock comptable. Il prend ce que votre LGO ne prend pas : ce qui reste à faire,
> ce qui est commandé, qui travaille demain, ce qui a été contrôlé. Le second logiciel de votre
> officine, pas le remplaçant du premier.

### « Mon équipe ne le remplira pas. » — *l'objection décisive*
> C'est l'objection la plus légitime, et c'est pour ça que le produit est construit comme il
> l'est. L'agenda n'a aucun champ de saisie. Le planning se remplit depuis le pointage.
> L'historique qualité est dérivé de vos données. Le nom du médicament vient du scan.
> Ce qu'il reste à faire à la main : cocher une tâche, et scanner une boîte.

### « On a WhatsApp, ça marche. »
> Ça marche jusqu'au jour où il faut retrouver qui a dit quoi. Et ça fait circuler des
> informations de patients dans un groupe où figure aussi le beau-frère de la préparatrice qui
> est partie l'an dernier. La CNIL a sanctionné des professionnels de santé libéraux sur ce
> terrain en 2024.

### « Vous n'avez aucune référence, aucun client. » — *à ne surtout pas esquiver*
> C'est exact. PharmacoWork ouvre ses premières officines. Ce que ça veut dire concrètement :
> vous parlez directement à ceux qui construisent le produit, et ce que vous demandez est
> arbitré la semaine même. C'est le seul moment où une officine peut peser sur un outil qu'elle
> utilisera dix ans.
> Nous n'afficherons pas de faux témoignages en attendant.

### « Combien ça coûte ? »
> L'accès se fait sur demande. Écrivez-nous, nous en parlons.
> ⛔ Ne jamais écrire « gratuit », « essai gratuit », « 30 jours offerts », ni afficher une
> grille. Voir §7 du contexte produit.

### « Et si vous fermez ? »
> Question légitime, à traiter sans détour dans la FAQ. Réponse à arbitrer avec le client —
> l'engagement minimal crédible est une **portabilité de vos données à la demande**. Ne rien
> promettre au-delà de ce qui est réellement engagé.

---

## 7. Ce qui doit apparaître sur la page, et à quel endroit

Complète la structure du §13 du contexte produit. Ajouts et arbitrages :

| Position | Section | Contenu | Nouveau ? |
|---|---|---|---|
| 1 | Hero | Titre descriptif + CTA « Demander l'accès ». Slogan en sur-titre Geist Mono. | — |
| 2 | Le problème | §3 du contexte. Accroche : *« Ce qui se dit à 9 h existe encore à 17 h. »* | — |
| **3** | **Le simulateur** | **§4 de ce document. Le pivot de la page.** | ✅ **Ajout** |
| **4** | **« Ce que nous ne vous dirons pas »** | **§5.5. Juste après le simulateur, c'est là qu'il porte.** | ✅ **Ajout** |
| 5 | Fonctionnalités phares | §5.1 → 5.4 de ce document, **dans cet ordre**. | Ordre modifié |
| 6 | Les modules | Grille, sans « Formation ». | — |
| 7 | Pour toute l'équipe | Les 7 rôles. | — |
| 8 | Vos données | §5.4, développé. | — |
| 9 | Comment ça commence | Les 4 étapes + l'argument de sélection (§5.5 fin). | — |
| 10 | FAQ | §14 du contexte + les 6 objections du §6 ci-dessus. | Enrichi |
| 11 | CTA final | Formulaire pleine largeur. `RIEN NE SE PERD.` en Geist Mono au-dessus. | — |

> **Arbitrage d'ordre important :** le §13 du contexte plaçait le scan CIP13 en premier bloc de
> fonctionnalité. Je recommande de commencer par **la location** (§5.1) : c'est le seul bloc
> qui parle d'argent, et il faut le poser pendant que le visiteur a encore le montant du
> simulateur en tête. Le scan CIP13 vient juste après, en argument de crédibilité.

---

## 8. Sources

Toutes vérifiées et citables sur la page. Chaque chiffre publié doit porter sa source visible.

**Économie de l'officine**
- [10 chiffres pour comprendre l'officine en 2025 — Le Moniteur des pharmacies](https://www.lemoniteurdespharmacies.fr/business/economie/strategie-et-gestion/10-chiffres-pour-comprendre-lofficine-en-2025) — 19 990 officines, CA moyen 2 263 K€, marge brute 29 %, 5,2 salariés, revenu titulaire 64 461 €
- [Le revenu des pharmaciens redynamisé pendant les années de crise sanitaire — INSEE Première n°2036](https://www.insee.fr/fr/statistiques/8341260)
- [Le chiffre d'affaires des officines progresse en 2024, la rentabilité recule — Le Quotidien du Pharmacien](https://www.lequotidiendupharmacien.fr/gestion-de-lofficine/le-chiffre-daffaires-des-officines-progresse-en-2024-la-rentabilite-recule)

**Coût des ruptures**
- [Ruptures de médicaments : toujours 12 heures par semaine à chercher des solutions — Le Moniteur des pharmacies](https://www.lemoniteurdespharmacies.fr/profession/socio-professionnel/ruptures-de-medicaments-toujours-12-heures-par-semaine-a-chercher-des-solutions) — rapport GPUE 2025, 27 pays UE + AELE, présenté au Parlement européen le 3 mars 2026
- [Pénuries de médicaments : les équipes officinales passent 12 heures par semaine — Le Moniteur des pharmacies](https://lemoniteurdespharmacies.fr/actu/actualites/actus-medicaments/penuries-de-medicaments-les-equipes-officinales-passent-12-heures-par-semaine-a-chercher-des-solutions.html) — USPO, P.-O. Variot, France Info, 20 avril 2024
- [L'argent que les ruptures d'approvisionnement vous font perdre — Le Moniteur des pharmacies](https://www.lemoniteurdespharmacies.fr/business/economie/strategie-et-gestion/largent-que-les-ruptures-dapprovisionnement-vous-font-perdre) — étude Offisanté × Le Moniteur : 8 314 €/an de CA perdu en moyenne, médiane 7 940 €, 0,52 % du CA
- [Pénuries de médicaments : que de temps et d'argent perdus pour l'officine — Le Moniteur des pharmacies](https://www.lemoniteurdespharmacies.fr/profession/socio-professionnel/penuries-de-medicaments-que-de-temps-et-dargent-perdus-pour-lofficine) — GPUE 2022 : 6 h 40/semaine
- [Interventions pharmaceutiques en officine : 25 % du temps est dédié à gérer les pénuries — Le Moniteur des pharmacies](https://www.lemoniteurdespharmacies.fr/therapeutique/medicaments/mieux-delivrer/interventions-pharmaceutiques-en-officine-25-du-temps-est-dedie-a-gerer-les-penuries)
- [3 887 alertes en 2025 : les médicaments essentiels toujours en proie aux pénuries — Le Moniteur des pharmacies](https://www.lemoniteurdespharmacies.fr/profession/socio-professionnel/3-887-alertes-en-2025-les-medicaments-essentiels-toujours-sous-pression)
- [Médicaments ayant fait l'objet d'un signalement de rupture ou de risque de rupture de stock — ANSM](https://ansm.sante.fr/page/medicaments-ayant-fait-lobjet-dun-signalement-de-rupture-ou-de-risque-de-rupture-de-stock)
- [Tensions et ruptures de stock de médicaments déclarées par les industriels — DREES, Études et Résultats n°1335, mars 2025](https://drees.solidarites-sante.gouv.fr/publications-communique-de-presse/etudes-et-resultats/250327_ER_ruptures-de-stock-medicaments-declarees-par-les-industriels-ampleur-et-consequences)

**Salaires et coût du travail**
- [Salaire préparateur en pharmacie 2026 — ClubOfficine](https://www.clubofficine.fr/blog/grille-salaires-pharmacie-d-officine/grille-des-salaires-preparateur-en-pharmacie/) — coef. 250 : 1 998,41 € brut/mois après la réforme du 1er novembre 2025
- [Grille salaires pharmacie : les changements 2026 — Factorial](https://factorial.fr/blog/grille-salaire-pharmacie/)
- [Salaire pharmacien officine : adjoint et titulaire 2026 — France Pharmacies](https://france-pharmacies.fr/salaire-pharmacien-officine/) — adjoint coef. 500 : ≈ 3 200 € brut/mois

**MAD et LPPR**
- [Le MAD : un marché à réenchanter — Le Moniteur des pharmacies](https://www.lemoniteurdespharmacies.fr/profession/interpro/le-mad-un-marche-a-reenchanter) — MAD rarement au-delà de 3 % du CA, jusqu'à 10 % sur certains territoires, 25 % en location pure
- [Matériel médical remboursé : LPPR, liste et mutuelle en 2026 — GoodAssur](https://goodassur.com/mutuelle-sante/remboursement/materiel-medical) — base LPPR lit médicalisé 12,60 €/jour
- [Réforme des fauteuils roulants au 1er décembre 2025 — Pharma365](https://www.pharma365.fr/je-me-perfectionne/focus-comptoir/reforme-des-fauteuils-roulants-au-1er-decembre-2025-guide-pratique/)

**Risque réglementaire**
- [Sanctions des professionnels de santé par la CNIL en 2024 : état des lieux — Village de la Justice](https://www.village-justice.com/articles/sanctions-des-professionnels-sante-par-cnil-2024-etat-des-lieux-enseignements,52438.html) — 87 sanctions, 55 M€, libéraux sanctionnés de 3 000 à 5 000 €
- [Données de santé et RGPD : les sanctions CNIL se multiplient — RGPD Kit](https://www.rgpdkit.fr/blog/donnees-sante-rgpd-sanctions-cnil-professionnels)
- [Messageries en santé : le guide pour arrêter de jouer à la roulette russe avec les données patients — CPTS Sel et Eau](https://cpts-sel-et-eau.fr/messageries-en-sante-le-guide-pour-arreter-de-jouer-a-la-roulette-russe-avec-les-donnees-patients/)

**Recrutement**
- [Métiers de l'officine : anatomie d'une pénurie — Le Quotidien du Pharmacien](https://www.lequotidiendupharmacien.fr/exercice-pro/remuneration/metiers-de-lofficine-anatomie-dune-penurie) — plus de 80 % des officines en difficulté de recrutement

---

## 9. Rappel des interdits — à relire avant publication

Repris du §15 du contexte produit, augmenté de ce document :

| Interdit | Ce qu'on écrit à la place |
|---|---|
| « PharmacoWork vous fait gagner X heures » | « Voici ce que le désordre vous coûte. Faites le calcul. » |
| « Réduit de 30 % le temps de gestion des ruptures » | « 12 h par semaine selon l'USPO. On attaque la ressaisie et la re-découverte. » |
| Afficher le résultat du simulateur comme un gain | Le libeller « ce que le désordre vous coûte aujourd'hui » + la clause du §4.1 |
| « Conforme RGPD », « certifié HDS » | Décrire les mécanismes : chiffrement, journal d'accès, cloisonnement |
| « Réduit les erreurs de délivrance » | « Une dénomination scannée ne peut pas être mal orthographiée. » |
| « Remplace votre LGO » | « Le second logiciel de votre officine. » |
| Témoignages, logos clients, compteurs d'officines | « Nous ouvrons nos premières officines. » (§6) |
| « Essai gratuit », toute grille tarifaire | « L'accès se fait sur demande. » |
| « Messagerie instantanée », « temps réel » | « Messagerie interne. » |
| Mettre en avant le module Formation | Le retirer de toutes les grilles |

**Le test à faire passer à chaque phrase de la page :**
*Un titulaire qui lit ça peut-il le vérifier lui-même en moins de dix minutes ?*
Si oui, publiez. Si non, reformulez.
