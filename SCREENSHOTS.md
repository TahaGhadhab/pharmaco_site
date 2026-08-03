# Captures d'écran de l'application

Déposez vos fichiers **ici**, aux noms exacts ci-dessous. Ils s'affichent automatiquement
sur la landing page — aucun code à modifier.

Tant qu'un fichier est absent, un cadre de réservation s'affiche à sa place, avec le nom
attendu et le brief de capture. La page reste donc présentable à tout moment.

## Formats

**Le cadre s'adapte à vos proportions, pas l'inverse.** La capture est affichée
entière, à ses propres proportions — c'est elle qui donne sa hauteur au cadre.
Aucune image n'est rognée, quelle que soit sa taille.

| Type | Cadrage | Remarque |
|---|---|---|
| `phone` | Largeur ~375 px, hauteur libre | Exportez en ×2 (750 px de large) ou ×3 pour un rendu net sur écran Retina. |
| `desktop` | Format paysage, hauteur libre | Affiché dans un chrome de navigateur. |

Une seule vraie contrainte : **gardez le même cadrage d'une capture à l'autre**.
Des captures d'un téléphone à un autre format donneraient des cadres de hauteurs
différentes côte à côte dans la galerie.

PNG ou WebP. Fond opaque : le cadre applique déjà ses propres coins arrondis.

## État actuel

### ✅ En place et affichées

| Fichier | Type | Où |
|---|---|---|
| `accueil.png` | phone | Hero |
| `rupture-creation.png` | phone | Bloc « Scannez la boîte » — le champ CIP et son bouton scanner |
| `ruptures.png` | phone | Bloc alertes ANSM |
| `location.png` | phone | Bloc « Le matériel ne se rend pas tant qu'il n'est pas payé » |
| `planning.png` | phone | Bloc « Écrit à votre place » — les heures réelles du pointage |
| `taches.png` · `commandes.png` · `qualite.png` · `gestion-rh.png` · `chat.png` | phone / desktop | Galerie « Regardez-la travailler » |

### ⚠️ À reprendre — noms de patients

`ordonnance.png` et `ordonnance-ocr.png` sont **présents mais non utilisés**.
Ils affichent des noms de patients (« FERIDE MEHDINE », « lea Dubois », « FERMIER LUCIE »).

Ce sont des données de santé : le §15 l'interdit, et publier ça expose au RGPD
comme au secret professionnel. Rejouez les deux écrans avec des noms
manifestement fictifs — « Martin Test », « Jeanne Exemple » — puis déposez-les sous :

- `ordonnance-anonyme.png`
- `ordonnance-ocr-anonyme.png`

Ils s'afficheront tout seuls. Les fichiers actuels peuvent être supprimés.

### ⬜ Encore manquantes

| Fichier | Type | Ce qu'il faut capturer |
|---|---|---|
| `agenda.png` | phone | Agenda montrant des lignes d'origines différentes le même jour (une tâche, une livraison, une fin de location). |
| `permissions.png` | desktop | L'écran Rôles & permissions, la matrice 7 rôles × permissions. |

## ⛔ Une règle absolue

**Aucun nom de patient réel.** Le §15 du contexte produit l'interdit formellement : ce sont
des données de santé. N'utilisez que des données fictives manifestement inventées
(« Martin Dupont », « Jeanne Test »).

Vérifiez aussi qu'aucune capture ne laisse apparaître le nom d'une officine réelle, une
adresse réelle ou un numéro FINESS réel.
