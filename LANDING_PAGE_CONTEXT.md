# PharmacoWork — Contexte produit pour la landing page

> **Destinataire :** l'agent IA qui développera le site vitrine dans un projet séparé.
> **Objectif :** disposer de tout le contexte produit, des arguments de vente, de l'identité
> visuelle et des garde-fous, sans avoir accès au dépôt de l'application.
>
> **Statut de ce document :** rédigé à partir du **code réel** (API NestJS + web Next.js),
> pas d'une plaquette marketing. Tout ce qui est présenté comme un *fait* a été vérifié
> dans le code. Tout ce qui relève de l'estimation est **explicitement étiqueté**.

---

## 0. Comment lire ce document

Trois niveaux d'affirmation, à ne jamais mélanger sur le site :

| Marqueur | Signification | Utilisation en ligne |
|---|---|---|
| ✅ **FAIT** | Vérifié dans le code de l'application | Publiable tel quel |
| 🟡 **ARGUMENT** | Bénéfice logiquement déduit d'un fait, non mesuré | Publiable en formulation qualitative (« sans ressaisie », « en un scan »), **jamais chiffré** |
| ⛔ **À VALIDER** | Hypothèse, ordre de grandeur, calcul à faire confirmer | **Ne pas publier** avant validation client |

La règle : **aucun chiffre de performance (« 5 h gagnées par semaine », « –30 % d'erreurs »)
n'existe aujourd'hui.** Aucune mesure terrain n'a été réalisée. Les inventer exposerait à
une accusation de publicité trompeuse, dans un secteur réglementé qui plus est. La §6 donne
un cadre de calcul honnête ; la §15 dit ce qui est interdit.

---

## 1. Identité produit

| | |
|---|---|
| **Nom** | **PharmacoWork** (un seul mot, C majuscule au W ; l'ancien nom « PharmaWorkspace » est abandonné) |
| **Baseline actuelle (manifest PWA)** | « L'espace de travail de votre officine » |
| **Catégorie** | Espace de travail opérationnel interne pour officine de pharmacie |
| **Marché** | France (officines de ville) |
| **Langue** | Français exclusivement |
| **Plateforme** | Application web **mobile-first**, installable (PWA), utilisable sur desktop |

### Ce que c'est
Un outil **interne d'équipe**. Il rassemble en une seule application tout ce qui se pilote
aujourd'hui à l'oral, sur des post-it, dans un cahier, sur un groupe WhatsApp ou dans trois
fichiers Excel : les tâches, les ordonnances à préparer, les commandes fournisseurs, les
ruptures de stock, les locations de matériel médical, la qualité, le planning, les congés,
l'annuaire, l'agenda, le journal interne et la messagerie de l'équipe.

### Ce que ce n'est PAS — à ne jamais laisser entendre
- ❌ Ce **n'est pas un LGO** (logiciel de gestion d'officine : LGPI, Winpharma, Smart Rx…).
  Il ne fait ni délivrance, ni facturation, ni télétransmission à l'Assurance Maladie,
  ni gestion de stock comptable. Il **complète** le LGO, il ne le remplace pas.
- ❌ Ce **n'est pas une application patient**. Aucun patient n'y a de compte, aucun portail
  grand public, aucun rendez-vous en ligne.
- ❌ Ce **n'est pas un dispositif médical** et il ne donne **aucune consigne de délivrance**
  ni conseil thérapeutique. L'acte pharmaceutique reste entièrement au pharmacien.
- ❌ Ce **n'est pas un outil de télémédecine ni de dossier patient**.



## 2. À qui ça s'adresse

### Décideur / acheteur
Le **titulaire** de l'officine (le pharmacien propriétaire). C'est lui qui dépose la demande,
qui invite son équipe, qui règle les droits de chacun et qui est seul à voir l'administration.

### Utilisateurs quotidiens — 7 rôles, réellement implémentés ✅ FAIT
Ordre hiérarchique tel qu'affiché dans l'application :

| Rôle | Profil | Droits par défaut |
|---|---|---|
| **Étudiant** | Étudiant en pharmacie | Consultation seule — voit tout, ne modifie rien |
| **Stagiaire** | Stagiaire | Consultation seule |
| **Rayonniste** | Mise en rayon / réassort | Commandes + ruptures ; ni ordonnances ni locations |
| **Préparateur/trice** | Préparateur en pharmacie | Ordonnances, commandes, locations ; pas de tâches ni d'actualités |
| **Collaborateur** | Pharmacien collaborateur | Identique à l'adjoint |
| **Adjoint(e)** | Pharmacien adjoint | Opérationnel complet, sans administration |
| **Titulaire** | Propriétaire | Tout, **plus** RH, planning, paramètres et permissions |

> 🟡 **ARGUMENT vendeur :** ces rôles ne sont pas cosmétiques. Ils sont appliqués côté serveur,
> et le titulaire peut **reconfigurer la grille de droits de sa propre officine** depuis
> l'écran « Rôles & permissions ». Une officine qui laisse ses préparateurs gérer les commandes
> et une autre qui les réserve aux pharmaciens sont toutes deux servies par le même produit.

### Taille d'officine
Trois paliers, qui déterminent **uniquement le nombre de comptes** (pas de prix) :
- **Petite officine** — jusqu'à 3 personnes
- **Officine moyenne** — 4 à 8 personnes
- **Grande officine** — 9 personnes et plus

---

## 3. Le problème que le produit adresse

À utiliser comme matière première pour la section « problème » de la landing page.
Chacun de ces points correspond à une fonctionnalité réellement construite.

1. **L'information de l'officine est éparpillée.** Le LGO gère la vente ; tout le reste — ce
   qui reste à faire, ce qui est commandé, ce qui est en rupture, qui travaille demain —
   vit sur des supports qui ne se parlent pas.
2. **Ce qui se dit à l'oral se perd.** Une consigne donnée au comptoir à 9 h n'existe plus
   à 17 h pour l'équipe du soir.
3. **WhatsApp n'est pas un outil de travail.** Les groupes mélangent le professionnel et le
   personnel, ne tracent rien, ne donnent aucun droit d'accès et font transiter des données
   sensibles hors de tout cadre.
4. **La ressaisie coûte cher.** Le nom d'un médicament est retapé à la main à chaque rupture
   déclarée, chaque commande, chaque ordonnance.
5. **Le suivi des locations de matériel est un trou de trésorerie.** Sans échéancier, un
   fauteuil roulant loué au mois se rend sans que le dernier terme ait été encaissé.
6. **La qualité est vécue comme une contrainte administrative** parce que la traçabilité est
   reconstituée après coup, à la main, au moment de l'inspection.
7. **Le nouvel arrivant met des semaines à être autonome** — rien n'est écrit.

---

## 4. Les modules — ce que fait réellement l'application ✅ FAIT

L'application est organisée en 5 onglets (`Accueil · Tâches · ➕ · Chat · Plus`), les modules
secondaires vivant sous « Plus », rangés en 4 sections.

### Accueil (tableau de bord)
- Compteur de **pointage personnel** démarré/arrêté d'un geste, **stocké côté serveur** :
  il suit le compte, pas le navigateur, et reste cohérent entre le téléphone et l'ordinateur.
  Plafond de 12 h/jour, remise à zéro quotidienne.
- **KPI temps réel** de l'officine : tâches ouvertes et en retard, ruptures ouvertes,
  locations à rendre, ordonnances à servir.
- **Carte Équipe** : qui est en poste en ce moment, depuis combien de temps, et sa charge de
  tâches ouvertes.

### Section « Officine »
- **Ordonnances** — enregistrement des ordonnances à préparer, avec **scan par OCR**,
  statut (à traiter / en attente / traitée), priorité, date de préparation, et gestion des
  **duplications** (renouvellements successifs décomptés un par un).
- **Commandes** — commandes fournisseurs avec liste de produits, date de livraison attendue,
  et cycle réception / annulation / réouverture.
- **Ruptures** — déclaration d'une rupture de stock, **levée par scan de code-barres**,
  propositions d'alternatives, et croisement automatique avec les **ruptures nationales ANSM**.
- **Locations** — location de matériel médical avec **échéancier de périodes**, registre des
  paiements, solde restant dû, et **blocage de la restitution tant que le matériel n'est pas
  soldé**.
- **Qualité** — contrôles qualité, non-conformités, incidents (avec niveau de gravité),
  tableau de bord (taux de conformité, contrôles dus, incidents du mois) et **historique
  horodaté et nominatif** de toute l'activité du module.

### Section « Organisation »
- **Agenda** — vue chronologique unique qui **agrège tout ce qui a une date** dans
  l'application : échéances de tâches, livraisons attendues, fins de location, préparations
  d'ordonnances. Chaque ligne renvoie à sa fiche d'origine.
- **Planning** — planning d'équipe avec **créneaux définis par l'officine** (pas de créneaux
  imposés), disponibilités (normal / partiel / absent), et **heures d'arrivée et de départ
  réelles remontées automatiquement depuis le pointage**.
- **Congés** — demandes de congé déposées par le membre, approuvées ou refusées par le titulaire.
- **Annuaire** — répertoire des contacts professionnels (fournisseurs, confrères, juridique,
  urgences), avec recherche libre et marquage « urgence ».

### Section « Équipe »
- **Actualités** — journal interne de l'officine (note, article, vidéo, document) avec
  pièces jointes ; toute publication notifie l'équipe.
- **Chat** — messagerie interne : canaux thématiques et conversations directes, compteurs de
  non-lus, pièces jointes.
- **Notre officine** — fiche de l'officine (nom, adresse, téléphone, email, RPPS).
- **Mon profil** — identité, préférences, thème clair/sombre, notifications, sessions de
  connexion actives.
- **Formation** — ⚠️ **stub non fonctionnel** (catalogue + classement de façade, sans back-end).
  **Ne pas le mettre en avant sur la landing page.**

### Section « Administration » (titulaire uniquement)
- **Gestion RH** — équipe, invitations par email, activation/désactivation, changement de
  rôle, quota de sièges, demandes de congés.
- **Paramètres** — profil de l'officine et **matrice « Rôles & permissions »** configurable.

### Transverse
- **Notifications** — cloche in-app **et notifications push** (Web Push) : tâche assignée,
  ordonnance enregistrée, actualité publiée, rupture signalée, message de chat, alerte ANSM.
- **Recherche globale** — une seule barre pour chercher à travers les modules.
- **PWA** — installable sur l'écran d'accueil du téléphone, icône et écran de démarrage propres.
- **Mode sombre** complet, et respect de la préférence système « mouvement réduit ».

---

## 5. Les 10 caractéristiques phares — le cœur de la landing page

Classées par pouvoir de conviction. Ce sont les huit à dix blocs à développer visuellement.

### 1. Scanner une boîte suffit ✅ FAIT
L'application embarque le **référentiel national des médicaments** issu de la base publique
de l'ANSM (BDPM) : **plus de 20 800 présentations** identifiées par leur code CIP13, importées
et tenues à jour. Le scanner lit le **code-barres EAN-13 et le Data Matrix GS1** directement
avec la caméra du téléphone, sans matériel supplémentaire.

Concrètement : on scanne la boîte, le nom du médicament et son laboratoire s'inscrivent seuls.
Et l'inverse fonctionne aussi — on tape le début d'un nom, le CIP13 se remplit, ce qui rend la
levée d'une rupture par scan possible sans avoir rien tapé au départ.

> 🟡 **ARGUMENT :** zéro ressaisie, zéro faute de frappe sur une dénomination de médicament.
> La recherche est mesurée à **5 à 7 ms** sur les 20 869 lignes du référentiel ✅ FAIT.

### 2. Les ruptures nationales de l'ANSM, mais seulement celles qui vous concernent ✅ FAIT
L'application synchronise **chaque nuit** le fichier officiel de disponibilité des médicaments
publié par l'ANSM (tensions d'approvisionnement, ruptures, remises à disposition, arrêts de
commercialisation).

Le point remarquable est le **filtrage** : une officine n'est alertée que pour un médicament
**qu'elle suit déjà** — c'est-à-dire sur lequel elle a une rupture ouverte, ou qu'elle a
proposé comme alternative. Sans ce filtre, l'activation aurait envoyé ~474 alertes d'un coup
à chaque officine. Une alternative qui part elle-même en tension est précisément
l'information qu'il faut savoir.

> ⚠️ **Nuance à respecter dans la copie :** l'ANSM déclare au niveau du **médicament**
> (spécialité), pas de la boîte. Écrire « ce **médicament** fait l'objet d'une tension »,
> jamais « cette boîte est en rupture ».

### 3. L'ordonnance se saisit en la photographiant ✅ FAIT
L'OCR extrait automatiquement le nom, le prénom du patient et la liste des médicaments avec
leur posologie depuis une photo ou un PDF d'ordonnance. Le moteur utilisé est **Mistral**,
un fournisseur **français**.

**Et l'image n'est jamais stockée** : elle est traitée en mémoire le temps de la requête, puis
jetée. C'est un choix d'architecture, pas un réglage.

### 4. Les données de santé sont traitées comme telles ✅ FAIT
Trois mécanismes réellement en place :
- **Chiffrement au repos** de la note client de l'ordonnance (AES-256-GCM) ; en base de
  données, elle est illisible.
- **Journal d'accès** : chaque lecture d'une note d'ordonnance écrit une ligne nominative
  et horodatée. On sait qui a consulté quoi, et quand.
- **Cloisonnement strict par officine** : chaque ligne de données porte l'identifiant de son
  officine et **toute** lecture est filtrée dessus. Deux pharmacies sur la même plateforme ne
  voient jamais rien l'une de l'autre — c'est l'invariant le plus testé du produit.

### 5. Un échéancier de location qui ferme le robinet ✅ FAIT
Les locations de matériel médical (fauteuils, lits, tire-lait, concentrateurs…) sont suivies
avec un **découpage en périodes** — hebdomadaires ou mensuelles — qui **avance avec le
calendrier**. Chaque paiement est enregistré au centime près, le solde restant dû est calculé
en permanence, et le statut passe automatiquement à « soldée » quand le compte y est.

Le verrou : **la restitution du matériel est refusée tant que la location n'est pas soldée**,
avec le montant manquant affiché. Le matériel ne ressort pas sans que la caisse suive.

> 🟡 **ARGUMENT :** c'est la fonctionnalité qui a le rapport le plus direct à l'argent.
> Un impayé de location n'est pas un impayé oublié : c'est un impayé que **personne n'a vu**.

### 6. Le pointage alimente le planning tout seul ✅ FAIT
Chaque membre démarre et arrête son compteur depuis l'accueil. Ce compteur est **serveur, lié
au compte** : changer de téléphone n'y change rien, et deux comptes sur le même navigateur ne
se marchent plus dessus.

Le démarrage inscrit l'**heure d'arrivée réelle** sur l'entrée de planning du jour (la
première arrivée est conservée), l'arrêt inscrit l'**heure de départ** (le dernier départ
gagne). Le planning affiche donc le réalisé, sans que personne ne le saisisse.

### 7. L'agenda ne se remplit jamais à la main ✅ FAIT
L'agenda n'a **aucune saisie propre**. C'est une vue qui agrège automatiquement tout ce qui
porte une date ailleurs dans l'application : échéance de tâche, livraison attendue d'une
commande, fin de location, préparation d'ordonnance. Une seule liste chronologique, chaque
ligne cliquable vers sa fiche d'origine.

> 🟡 **ARGUMENT :** un agenda qu'on n'alimente pas est un agenda qui n'est jamais faux.

### 8. La traçabilité qualité est un sous-produit du travail ✅ FAIT
Contrôles, non-conformités et incidents portent le **nom de l'acteur** et l'horodatage, pris
au jeton d'authentification — jamais déclarés par le formulaire. L'historique du module est
**dérivé à la lecture** depuis les données elles-mêmes : il ne peut pas diverger de la réalité,
puisqu'il n'est stocké nulle part. Un contrôle clôturé ce matin remonte en tête, même s'il
avait été ouvert l'an dernier.

### 9. Le titulaire règle les droits de son officine ✅ FAIT
Une matrice **7 rôles × permissions**, configurable par le titulaire depuis son écran
« Rôles & permissions », **appliquée côté serveur** sur chaque écriture. Ce n'est pas de
l'affichage conditionnel : un rôle sans droit reçoit un refus de l'API.

Les rôles d'apprentissage (étudiant, stagiaire) sont en consultation seule par défaut —
**mais la matrice prime** : si le titulaire décide d'ouvrir un droit précis à ses étudiants,
ça fonctionne. Le produit ne se substitue pas à son jugement.

### 10. Une application, pas un site web de plus ✅ FAIT
Pensée **mobile d'abord** — c'est un métier debout, entre le comptoir et le back-office.
Installable sur l'écran d'accueil (PWA), **notifications push** réelles, mode sombre complet,
mémo vocal enregistré au micro pour dicter une consigne plutôt que la taper, pièces jointes
jusqu'à 10 Mo, et une interface volontairement calme (« Clean Clinical ») dans un métier qui
ne l'est pas.

---

## 6. Gains de temps — cadre honnête

### ⛔ Ce que nous n'avons pas
**Aucune mesure terrain, aucun pilote chiffré, aucun témoignage client.** Il n'existe
aujourd'hui aucune donnée permettant d'écrire « X heures gagnées par semaine ». **Ne publiez
aucun chiffre de ce type.**

### 🟡 Ce qui est défendable, en formulation qualitative
Ces phrases sont vraies par construction et peuvent être écrites telles quelles :

| Formulation publiable | Fait qui la fonde |
|---|---|
| « Le nom du médicament s'écrit tout seul : scannez la boîte. » | Référentiel CIP13 + scanner caméra |
| « Une ordonnance se saisit en la photographiant. » | OCR Mistral synchrone |
| « L'agenda se remplit tout seul — il n'a pas de saisie. » | Agrégation multi-modules |
| « Vos heures d'arrivée et de départ arrivent dans le planning sans que personne les note. » | Pointage → `clockIn`/`clockOut` |
| « L'historique qualité est déjà écrit quand l'inspection arrive. » | Historique dérivé + acteurs nominatifs |
| « Une seule application au lieu d'un cahier, d'un tableau Excel et d'un groupe WhatsApp. » | Périmètre fonctionnel |
| « Le nouvel arrivant lit ce qui est à faire au lieu de le demander. » | Tâches assignées + actualités + procédures |
| « On ne vous alerte que sur les médicaments que vous suivez. » | Filtrage ciblé des alertes ANSM |

### ⛔ Cadre de calcul — à faire valider avant toute publication
Si vous voulez un jour un chiffre, voici la **méthode** à appliquer, pas un résultat. Chaque
ligne est une hypothèse à confirmer auprès de 3 à 5 officines pilotes :

```
Gain hebdomadaire = Σ (fréquence hebdo × temps unitaire économisé)

Postes à mesurer, un par un :
  · saisie d'une dénomination de médicament (rupture / commande)  → scan vs frappe
  · saisie d'une ordonnance à préparer                            → photo vs frappe
  · reconstitution du planning réalisé en fin de mois             → auto vs relevé manuel
  · recherche d'une information « qui a fait quoi, quand »        → recherche vs reconstitution
  · préparation d'une inspection qualité                          → historique vs classeur
  · relance d'un impayé de location                               → alerte vs découverte tardive
```

**Règle de publication :** un chiffre ne sort qu'accompagné de sa source et de son échantillon
(« mesuré sur 4 officines pilotes, mars 2026 »). Sinon, il ne sort pas.

---

## 7. Gains d'argent — cadre honnête

### ⛔ Aucun chiffre disponible. Même règle qu'en §6.

### 🟡 Les quatre mécanismes de valeur économique, défendables qualitativement

**1. Les impayés de location cessent d'être invisibles.**
C'est le levier le plus direct. Échéancier par périodes, solde restant dû calculé en
permanence, **restitution bloquée tant que le solde n'est pas nul**. Un matériel ne repart pas
sans que le compte soit soldé.
> Formulation publiable : « Le matériel ne se rend pas tant qu'il n'est pas payé. »

**2. Le risque qualité et réglementaire est amorti.**
Traçabilité nominative et horodatée, historique impossible à falsifier après coup parce qu'il
est dérivé des données. Non-conformités et incidents suivis jusqu'à résolution.
> Formulation publiable : « La traçabilité est produite pendant le travail, pas reconstituée
> avant l'inspection. »
> ⛔ **Interdit :** promettre la conformité à une norme ou garantir le passage d'une inspection.

**3. Les erreurs de saisie disparaissent à la source.**
Une dénomination scannée ne peut pas être mal orthographiée. Une commande passée sur le bon
produit n'est pas une commande à reprendre.
> ⛔ **Interdit :** parler de « réduction des erreurs de délivrance » ou de sécurité du patient.
> Le produit ne touche pas à l'acte de délivrance. C'est la ligne rouge du secteur.

**4. Le temps de l'équipe est du salaire.**
Chaque heure administrative rendue est une heure au comptoir. C'est le raisonnement de fond,
mais il ne se chiffre que sur mesure terrain.

**5. Zéro coût d'infrastructure côté officine.**
Rien à installer, rien à héberger, rien à maintenir. Ça marche sur les téléphones que
l'équipe a déjà, sans lecteur code-barres à acheter — la caméra suffit.

### Sur le prix : ne rien annoncer
Le produit **ne facture pas aujourd'hui** et le module de facturation a été retiré. La landing
page ne doit afficher **ni tarif, ni grille, ni « gratuit »**, ni « essai gratuit ».
La bonne formulation est celle de l'accès : *« L'accès se fait sur demande. »*
Voir §10.

---

## 8. Confiance, sécurité, conformité — les preuves réelles ✅ FAIT

À utiliser dans une section « Vos données » ou dans la FAQ. Tout est vérifié dans le code.

| Sujet | Ce qui est vrai |
|---|---|
| **Cloisonnement** | Chaque donnée porte son officine ; toute lecture est filtrée dessus. Testé automatiquement, module par module. |
| **Chiffrement** | Note client des ordonnances chiffrée au repos en AES-256-GCM. |
| **Journal d'accès santé** | Chaque lecture d'une note d'ordonnance est tracée, nominativement et horodatée. |
| **Image d'ordonnance** | Jamais stockée. Traitée en mémoire, puis jetée. |
| **OCR** | Fournisseur **français** (Mistral). |
| **Authentification** | Lien magique par email — pas de mot de passe à retenir ni à faire fuiter. Jeton d'accès court (15 min) + jeton de rafraîchissement rotatif, révocable. Seule l'empreinte des jetons est stockée, jamais le jeton. |
| **Sessions** | L'utilisateur voit ses sessions de connexion actives et peut les révoquer. |
| **Non-énumération** | Une demande de connexion répond exactement pareil que le compte existe ou non. |
| **Limitation de débit** | Les points d'entrée publics sont protégés contre l'abus. |
| **Droits** | Trois couches indépendantes : rôles réservés, matrice de permissions par officine, mode consultation seule. |
| **Traçabilité des tâches** | Suppression douce : une tâche supprimée disparaît de l'application mais la ligne est conservée avec l'auteur de la suppression. |
| **Fichiers actifs** | Un SVG ou un HTML déposé en pièce jointe n'est jamais rendu par le navigateur — téléchargement forcé. |
| **Tests** | Plus de 215 tests d'intégration bout-en-bout, exécutés contre une vraie base de données. |

### ⛔ Points à ne PAS transformer en promesse
- **Hébergement HDS** (Hébergeur de Données de Santé) : **non certifié à ce jour**.
  Ne l'affirmez pas, ne le sous-entendez pas, n'utilisez pas le mot « HDS ».
- **RGPD** : le produit applique de bonnes pratiques (minimisation, journal d'accès,
  chiffrement), mais aucun audit ni certification n'a été réalisé. Écrire « conçu dans le
  respect des principes du RGPD » est acceptable ; « conforme RGPD, certifié » ne l'est pas.
- **Hébergement** : infrastructure européenne. Ne pas promettre de localisation précise sans
  vérification.

---

## 9. Différenciateurs — face à quoi on se positionne

| Alternative actuelle | Sa limite | Ce que PharmacoWork apporte |
|---|---|---|
| **Le LGO** | Fait la vente, pas l'organisation de l'équipe | Complémentaire — tout ce que le LGO ne fait pas |
| **WhatsApp / SMS** | Rien n'est tracé, tout se mélange, droits inexistants, données sensibles hors cadre | Chat interne cloisonné, avec des droits et un historique |
| **Cahier / post-it** | Se perd, ne se cherche pas, ne survit pas au changement d'équipe | Écrit, cherchable, assigné, daté |
| **Excel partagé** | Une seule personne le tient, personne d'autre ne l'ouvre sur téléphone | Mobile, multi-utilisateur, avec des rôles |
| **Outils génériques (Trello, Notion, Slack)** | Ne connaissent ni le CIP13, ni l'ANSM, ni l'ordonnance, ni le pharmacien | **Métier** : référentiel médicament, flux ANSM, OCR d'ordonnance, rôles d'officine |

> **L'angle le plus fort :** un outil générique ne saura jamais scanner une boîte de Doliprane
> et vous dire que l'ANSM a déclaré une tension dessus cette nuit. C'est ce qui sépare
> PharmacoWork d'un Trello qu'on aurait bricolé.

---

## 10. Le parcours d'entrée — le CTA de la landing page 🔴 CRITIQUE

**Ne proposez ni « Essai gratuit », ni « S'inscrire », ni « Acheter », ni « Voir les tarifs ».**
Le seul parcours est une **demande d'inscription** instruite manuellement.

### Le vrai enchaînement ✅ FAIT
```
Landing page
   └─ Formulaire « Demander l'accès »
        └─ La demande part en attente (aucun compte créé à ce stade)
             └─ L'administrateur de la plateforme l'accepte et affecte un palier
                  └─ Le demandeur reçoit un email d'activation (valable 7 jours)
                       └─ Il ouvre son officine, devient titulaire et invite son équipe
                            └─ Chaque invité reçoit un email et rejoint l'officine
```

### Libellés de CTA recommandés
- Principal : **« Demander l'accès »** (ou « Demander une démonstration » si vous préférez
  un premier contact humain)
- Secondaire : « Voir ce que fait l'application » (ancre vers les fonctionnalités)
- Après envoi : **« Demande envoyée. Nous revenons vers vous par email. »**

### Champs du formulaire — exactement ceux attendus par l'application ✅ FAIT
Si vous rebranchez le formulaire directement sur l'API, respectez ce contrat :

| Champ | Type | Contrainte | Libellé FR |
|---|---|---|---|
| `officineName` | texte | 1–200 caractères, **requis** | Nom de l'officine |
| `address` | texte | 1–500 caractères, **requis** | Adresse |
| `finess` | texte | **9 caractères**, format `NN[N/A/B]NNNNNN` (A/B pour la Corse), **requis** | N° FINESS de l'établissement |
| `requesterName` | texte | 1–200 caractères, **requis** | Votre nom |
| `requesterEmail` | email | 255 max, **requis** | Votre email professionnel |
| `requesterRole` | choix | `titulaire` \| `adjoint` \| `preparateur` uniquement | Votre rôle |
| `teamSize` | entier | 1 à 200, **requis** | Effectif de l'équipe |

- Endpoint : `POST /api/registration-requests` — **public**, limité à **3 requêtes par minute**.
- La réponse est **toujours** `{ ok: true }`, que l'email soit déjà connu ou non
  (anti-énumération). L'interface ne doit donc **jamais** afficher « cet email existe déjà ».
- ⚠️ Le champ **FINESS** est le meilleur filtre anti-spam du formulaire : il qualifie
  d'emblée un vrai établissement. Mettez une aide contextuelle (« 9 chiffres, figurant sur
  votre licence d'exploitation »), le rejet côté serveur est sec.

### Alternative plus simple
Si vous préférez ne pas rebrancher l'API depuis le site vitrine, faites pointer le CTA vers
la page `/inscription` de l'application, qui porte déjà ce formulaire et ses validations.

---

## 11. Identité visuelle — « Clean Clinical »

L'application a un système de design établi. **La landing page doit s'y reconnaître** :
un visiteur qui clique sur le CTA ne doit pas avoir l'impression de changer de produit.

### Principe
Calme, digne de confiance, aéré. **Un seul accent** : le vert médical. Fond quasi blanc,
ombres douces, cartes arrondies, beaucoup de blanc. Pas de dégradés lourds, pas de surfaces
sombres agressives, pas de 3D, pas d'illustrations « startup ».

### Palette ✅ FAIT — valeurs exactes de l'application

**Vert de marque**
| Rôle | Hex |
|---|---|
| primary | `#1B9D58` |
| primary-strong (pressé, texte sur teinte) | `#116F3E` |
| primary-deep (titres de section) | `#15894C` |
| primary-tint (badges, pastilles d'icône) | `#D2F0DE` |
| primary-tint-2 (lignes sélectionnées) | `#EAF8F0` |

**Neutres et surfaces**
| Rôle | Hex |
|---|---|
| fond de page | `#F7F9F6` |
| surface / cartes | `#FFFFFF` |
| surface atténuée | `#F1F4F1` |
| bordure | `#E8ECEA` |
| texte principal | `#0E1414` |
| texte secondaire | `#3D4646` |
| texte tertiaire | `#5A6563` |
| texte discret | `#7F8889` |
| placeholder | `#A8AEAD` |

**Sémantique**
| Rôle | Base | Teinte |
|---|---|---|
| danger | `#E11D48` | `#FAD7D7` |
| avertissement | `#F59E0B` | `#FBE5CB` |
| information | `#1A74CE` | `#CFE4FA` |
| succès | `#16A34A` | `#D2F0DE` |

### Typographie ✅ FAIT
- **Sans : `Geist`** (repli `system-ui`) — tout le corps de texte.
- **Mono : `Geist Mono`** — c'est la **signature visuelle du produit**. Réservée aux
  micro-libellés en majuscules (interlettrage `.05–.1em`), aux compteurs, aux chiffres de KPI,
  aux horaires, aux dates et aux identifiants. **Reprenez-la sur la landing page** pour les
  sur-titres de section et les chiffres : c'est ce qui fera reconnaître le produit.
- Graisses employées : 400, 500, 600, 700.

### Formes
- Rayons : **cartes 14 px**, champs 10 px, **boutons et pastilles complètement arrondis
  (999 px)**, feuilles du bas 24 px.
- Ombre de carte : `0 1px 2px rgba(14,20,20,.05)`.
- Ombre du bouton principal : `0 8px 18px rgba(27,157,88,.35)`.
- Espacements sur une base 4/8. Marge d'écran 16 px, marge de carte 14 px.

### Logo
> ⚠️ **Mis à jour le 3 août 2026 — ce paragraphe était périmé.**
> Le logo en vigueur, celui que porte l'application, est une **corolle orange de douze
> pétales avec une croix verte au centre** : la fleur dit « outil de travail », la croix
> ancre l'officine. Il est reproduit en SVG dans `components/ui/logo.tsx` et `app/icon.svg`.
> Couleurs figées : orange `#EE8B33`, vert `#1E8749` — une marque ne se recolore pas
> avec le thème.
>
> La consigne précédente (« une fleur, pas une croix verte ») est abandonnée, et
> l'interdiction correspondante du §15 ne s'applique plus au logo.

Icônes disponibles en 192 et 512 px, avec des variantes « maskable » (le logo y est posé plus
petit pour ne pas être rogné par les lanceurs Android).

### Mode sombre
L'application le gère intégralement. **Prévoyez-le sur la landing page**, ainsi que le respect
de `prefers-reduced-motion` — l'application le respecte (elle remplace ses animations par un
halo fixe plutôt que de supprimer le signal).

### Iconographie
`lucide-react`, trait fin. Restez-y pour la cohérence.

---

## 12. Ton de voix

L'application est écrite dans un français **sobre, direct, sans jargon marketing**. La landing
page doit s'y tenir.

**Règles :**
- Phrases courtes. Un fait par phrase.
- Le « vous » professionnel, jamais le tutoiement.
- Vocabulaire métier exact : *officine* (pas « pharmacie » quand on parle de l'établissement),
  *titulaire*, *adjoint*, *préparateur*, *rupture*, *ordonnance*, *délivrance*, *FINESS*, *CIP13*.
- On décrit ce que ça fait, pas ce que ça « révolutionne ».
- On peut être précis et concret — c'est ce qui rassure ce public.

**Bons exemples :**
> « Scannez la boîte, le nom s'écrit tout seul. »
> « Le matériel ne se rend pas tant qu'il n'est pas payé. »
> « L'agenda n'a pas de saisie : il lit vos échéances. »
> « On ne vous alerte que sur les médicaments que vous suivez déjà. »

**À bannir :**
> ❌ « Révolutionnez votre officine » · ❌ « La solution tout-en-un nouvelle génération »
> ❌ « Boostez votre productivité » · ❌ « Propulsé par l'IA » (l'OCR est un outil, pas un argument)
> ❌ « +40 % d'efficacité » (aucun chiffre)

---

## 13. Structure de landing page recommandée

Ordre proposé, avec l'intention de chaque section.

**1. Hero**
- Sur-titre (Geist Mono, majuscules, vert) : `ESPACE DE TRAVAIL POUR OFFICINE`
- Titre : *« Tout ce que votre officine fait, hors du LGO — dans une seule application. »*
- Sous-titre : *« Tâches, ordonnances à préparer, commandes, ruptures, locations, qualité,
  planning et messagerie d'équipe. Sur le téléphone que votre équipe a déjà. »*
- CTA principal : **Demander l'accès** · CTA secondaire : *Voir les fonctionnalités*
- Visuel : maquette d'écran mobile (l'application se conçoit dans un cadre 375×812 —
  un mockup de téléphone est cohérent avec le produit)

**2. Le problème** — 3 ou 4 cartes, matière en §3

**3. Les fonctionnalités phares** — 6 à 8 blocs alternés texte/visuel, matière en §5.
Ordre d'impact recommandé : *scan CIP13 → alertes ANSM ciblées → OCR ordonnance →
échéancier de location → pointage vers planning → agenda auto-alimenté → traçabilité qualité →
rôles et permissions*

**4. Le tour des modules** — grille des 15 modules avec leurs icônes lucide, une ligne chacun.
⚠️ **Retirer « Formation » de cette grille** (non fonctionnel).

**5. Pour toute l'équipe** — les 7 rôles et ce que chacun y trouve (§2)

**6. Vos données** — section confiance, matière en §8, **sans dépasser les faits**

**7. Comment ça commence** — les 4 étapes du parcours d'entrée (§10), qui expliquent
pourquoi le CTA est une demande et non un achat. C'est un **atout** à assumer :
*« Chaque officine est validée manuellement. On sait qui est sur la plateforme. »*

**8. FAQ** — matière en §14

**9. CTA final** — le formulaire de demande d'accès, en pleine largeur

**Ne pas mettre :** section tarifs, témoignages inventés, logos de clients, compteurs
d'utilisateurs, badges de certification.

---

## 14. FAQ — réponses vérifiées

**Est-ce que ça remplace mon LGO ?**
Non. PharmacoWork ne fait ni délivrance, ni facturation, ni télétransmission. Il prend en
charge tout ce que votre LGO ne fait pas : l'organisation de l'équipe et le suivi de ce qui
reste à faire.

**Faut-il installer quelque chose ?**
Non. L'application s'ouvre dans le navigateur et s'installe en un geste sur l'écran d'accueil
du téléphone. Rien à héberger, rien à maintenir.

**Faut-il un lecteur de code-barres ?**
Non. La caméra du téléphone lit les codes-barres EAN-13 et les Data Matrix des boîtes.

**Comment on se connecte ?**
Par un lien reçu par email. Aucun mot de passe à créer, à retenir ou à faire fuiter.

**Est-ce que mes confrères voient mes données ?**
Non. Chaque officine est cloisonnée : ses données portent son identifiant et toute lecture est
filtrée dessus. C'est vérifié automatiquement à chaque livraison.

**Où sont les ordonnances scannées ?**
L'image n'est stockée nulle part. Elle est lue en mémoire pour en extraire le texte, puis
jetée. La note liée au client est chiffrée en base, et chaque lecture est tracée nominativement.

**Qui peut faire quoi ?**
Vous. Sept rôles sont prévus, et vous réglez vous-même la grille des droits de votre officine.
Les étudiants et stagiaires sont en consultation seule par défaut.

**D'où viennent les informations de rupture nationale ?**
Du fichier de disponibilité publié par l'ANSM, rechargé chaque nuit. Vous n'êtes alerté que
sur les médicaments que vous suivez déjà.

**Combien ça coûte ?**
⛔ *À trancher avec le client avant publication.* La réponse honnête aujourd'hui est :
« L'accès se fait sur demande, contactez-nous. » Ne pas écrire « gratuit ».

**Comment on commence ?**
Vous déposez une demande avec le FINESS de votre officine. Elle est validée manuellement.
Vous recevez alors un lien d'activation, vous ouvrez votre officine et vous invitez votre
équipe par email.

---

## 15. Garde-fous — ce qu'il ne faut jamais écrire ⛔

Cette liste n'est pas de la prudence excessive : le secteur est réglementé et le public
est composé de professionnels de santé qui repèrent immédiatement une approximation.

| Interdit | Pourquoi |
|---|---|
| Tout chiffre de gain (« 5 h/semaine », « –30 % d'erreurs », « ×2 ») | Aucune mesure n'existe |
| « Certifié HDS » / « hébergement de données de santé » | Non certifié |
| « Conforme RGPD » / « certifié RGPD » | Aucun audit réalisé |
| « Dispositif médical » / marquage CE | Ce n'en est pas un |
| Toute promesse liée à la **sécurité du patient** ou à la **délivrance** | Le produit ne touche pas à l'acte pharmaceutique |
| « Réduit les erreurs de délivrance » | Idem — ligne rouge absolue |
| « Remplace votre LGO » | Faux et rédhibitoire pour un titulaire |
| Témoignages, logos clients, nombre d'officines équipées | Rien de tel n'existe encore |
| « Essai gratuit », « 30 jours offerts », toute grille tarifaire | Pas de facturation, pas d'essai automatique |
| Mise en avant du module **Formation** | Non fonctionnel |
| « Cette boîte est en rupture » (à propos d'une alerte ANSM) | L'ANSM déclare au niveau du médicament, pas de la présentation |
| Croix verte de pharmacie dans le logo ou les visuels | Choix de marque explicitement abandonné |
| Visuels d'écran contenant des noms de patients | Données de santé — n'utiliser que des données fictives évidentes |

---

## 16. État réel du produit — pour ne rien promettre d'inexistant

### ✅ Construit, testé, en service
Authentification par lien magique · Accueil et KPI temps réel · Pointage serveur et présence
équipe · Tâches (dont mémo vocal et suppression douce) · Ordonnances (OCR, chiffrement, journal
d'accès, duplications) · Commandes · Ruptures (scan, alternatives) · Référentiel produits CIP13
(~20 900 références) · Ruptures nationales ANSM (synchronisation quotidienne, alerte ciblée) ·
Locations (périodes, paiements, verrou de restitution) · Qualité (contrôles, non-conformités,
incidents, historique) · Agenda agrégé · Planning à créneaux configurables · Congés · Annuaire ·
Actualités · Chat · Notifications in-app et push · RH et invitations · Matrice de permissions ·
Profil et sessions de connexion · Recherche globale · PWA · Mode sombre · Pièces jointes (10 Mo)

### ⚠️ Incomplet — à ne pas mettre en avant
- **Formation** — écran de façade, aucun back-end.

### 📌 Limites techniques connues, à ne pas contredire
- Pas de temps réel dans le chat (les messages se chargent à l'ouverture, pas de flux poussé).
  → Ne pas écrire « messagerie instantanée » ni « en temps réel ». Écrire « messagerie interne ».
- Les fichiers joints sont stockés en base, pas sur un stockage objet — dimensionné pour
  l'usage actuel. → Ne pas promettre de « stockage documentaire illimité ».
- Les horaires et plafonds de pointage suivent l'heure serveur, pas le fuseau de chaque officine.
- Suppression douce sur les tâches uniquement.

---

## 17. Pense-bête technique (au cas où)

| | |
|---|---|
| **Application web** | Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript |
| **API** | NestJS 11 · Prisma 6 · PostgreSQL 18 |
| **Scanner** | `zxing-wasm` (EAN-13 + Data Matrix GS1), directement dans le navigateur |
| **Icônes** | `lucide-react` |
| **OCR** | Mistral (fournisseur français) |
| **Emails** | SMTP |
| **Notifications push** | Web Push (VAPID) |
| **Mesure d'audience** | PostHog |
| **Hébergement** | Railway |
| **Cadre de conception mobile** | 375 × 812 px — utile pour cadrer les maquettes du site |

> Pour la landing page elle-même, aucune contrainte technique n'est imposée. Restez cohérent
> avec la palette, la typographie (Geist / Geist Mono) et les rayons de la §11 — c'est ce qui
> compte.

---

## 18. Résumé en une page — si vous ne lisez que ça

**PharmacoWork** est l'espace de travail interne d'une officine française : tout ce que
l'équipe fait en dehors du LGO, dans une seule application mobile.

**Les trois arguments les plus forts, dans l'ordre :**
1. **Il connaît les médicaments.** Référentiel national CIP13 embarqué, scan par la caméra,
   et les tensions d'approvisionnement déclarées à l'ANSM remontées chaque nuit — mais
   uniquement sur les produits que l'officine suit déjà.
2. **Il produit la traçabilité pendant le travail.** Qui a fait quoi, quand, avec quel nom :
   l'historique qualité et le planning réalisé s'écrivent tout seuls.
3. **Il protège l'argent qui fuit.** Les locations de matériel ne se rendent pas tant qu'elles
   ne sont pas soldées.

**Le CTA n'est pas un achat, c'est une demande d'accès** avec le FINESS de l'officine,
validée manuellement. Pas de prix, pas d'essai gratuit, pas de carte bancaire.

**La règle d'or de la rédaction :** aucun chiffre de gain, aucune certification, aucun
témoignage. Le produit est assez précis pour se vendre par ce qu'il fait réellement.
