/**
 * Tutoriels en images, rangés par module.
 *
 * ┌─ COMMENT AJOUTER UN TUTORIEL ─────────────────────────────────────────────┐
 * │ 1. Déposez les captures dans  .screens-sources/tutoriels/  (hors dépôt).   │
 * │ 2. Déclarez-les dans `scripts/preparer-tutoriels.mjs`, puis lancez-le :    │
 * │      node scripts/preparer-tutoriels.mjs                                   │
 * │    Il détoure le fond blanc et écrit les WebP dans public/tutoriels/.      │
 * │ 3. Ajoutez ici le module, le tutoriel et ses étapes.                       │
 * │ La page `/tutoriels` se construit entièrement depuis ce fichier.           │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * ── Ce qu'une légende a le droit de dire ───────────────────────────────────
 * Elle décrit le geste et ce qui est à l'écran. Rien d'autre. Pas de gain de
 * temps annoncé, pas de promesse sur la délivrance ou la sécurité du patient
 * (§15) : un tutoriel est de la documentation, pas de l'argumentaire.
 *
 * Une ou deux phrases par étape. Si une étape en demande trois, c'est qu'elle
 * en cache une deuxième — coupez-la en deux.
 *
 * ⛔ Aucune capture ne doit porter de nom de patient. Celles-ci n'en portent
 * pas : le jeu de démonstration ne contient que « Titulaire Admin » et
 * « Preparateur ».
 */

export type Etape = {
  /** Fichier servi depuis public/tutoriels/. */
  image: string;
  /** Décrit l'écran et le geste désigné — pas le produit. */
  alt: string;
  legende: string;
};

export type Tutoriel = {
  id: string;
  titre: string;
  /** Une phrase, affichée sous le titre quand le tutoriel est replié. */
  resume: string;
  etapes: readonly Etape[];
};

export type ModuleTutoriel = {
  /** Sert d'ancre : /tutoriels#<id>. */
  id: string;
  /** Nom du module dans l'application. */
  nom: string;
  /** Titre de la section — deux propositions courtes séparées par un point. */
  titre: string;
  chapeau: string;
  tutoriels: readonly Tutoriel[];
};

export const MODULES_TUTORIELS = [
  {
    id: "session",
    nom: "Accueil",
    titre: "Ouvrir la journée. Fermer la journée.",
    chapeau:
      "La session dit à l'équipe qui est en poste. C'est le premier geste du matin, et le dernier du soir.",
    tutoriels: [
      {
        id: "demarrer-la-session",
        titre: "Démarrer votre session",
        resume: "Le geste d'arrivée, depuis l'écran d'accueil.",
        etapes: [
          {
            image: "/tutoriels/session-demarrer-1.webp",
            alt: "Écran d'accueil de l'application : le bouton « Démarrer la session » est désigné, au-dessus des compteurs de tâches, de ruptures, de locations et d'ordonnances.",
            legende:
              "Sur l'accueil, appuyez sur « Démarrer la session ». Le bouton est au-dessus des quatre compteurs du jour.",
          },
          {
            image: "/tutoriels/session-demarrer-2.webp",
            alt: "Écran d'accueil après ouverture : un bandeau vert affiche la durée de la session en cours et un bouton « Clôturer ».",
            legende:
              "La session est lancée : sa durée s'affiche, et la carte Équipe vous montre en ligne. « Clôturer » la referme le soir.",
          },
        ],
      },
    ],
  },
  {
    id: "taches",
    nom: "Tâches",
    titre: "Prendre une tâche. La rendre.",
    chapeau:
      "Ce qui reste à faire, assigné et daté. Quatre gestes couvrent la vie d'une tâche, de sa création à son archivage.",
    tutoriels: [
      {
        id: "consulter-une-tache",
        titre: "Consulter une tâche",
        resume: "Ouvrir une tâche et lire ce qu'elle demande.",
        etapes: [
          {
            image: "/tutoriels/tache-consulter-1.webp",
            alt: "Onglet Tâches, liste « À faire » : chaque ligne porte sa priorité, son échéance et la personne à qui elle est assignée.",
            legende:
              "L'onglet Tâches s'ouvre sur « À faire ». Chaque ligne porte sa priorité, son échéance et la personne assignée.",
          },
          {
            image: "/tutoriels/tache-consulter-2.webp",
            alt: "Détail d'une tâche : son intitulé, son statut, son échéance, la personne assignée, et le lien « Modifier » en haut à droite.",
            legende:
              "Le détail reprend le statut, l'échéance et le responsable. « Modifier », en haut à droite, permet de les corriger.",
          },
        ],
      },
      {
        id: "demarrer-une-tache",
        titre: "Démarrer une tâche",
        resume: "Signaler que vous vous en occupez.",
        etapes: [
          {
            image: "/tutoriels/tache-demarrer-1.webp",
            alt: "Détail d'une tâche : la pastille de statut « À faire », sous l'intitulé, est désignée.",
            legende:
              "La pastille sous l'intitulé porte le statut. Elle se déroule pour le changer à la main.",
          },
          {
            image: "/tutoriels/tache-demarrer-2.webp",
            alt: "Détail d'une tâche : le bouton vert « Démarrer », au milieu de l'écran, est désigné.",
            legende:
              "« Démarrer » fait la même chose en un seul geste : la tâche passe en cours.",
          },
        ],
      },
      {
        id: "terminer-une-tache",
        titre: "Terminer et archiver",
        resume: "Clore la tâche, et savoir où la retrouver.",
        etapes: [
          {
            image: "/tutoriels/tache-terminer-1.webp",
            alt: "Détail d'une tâche en cours : le bandeau « Tâche démarrée » en haut, et le bouton « Marquer terminé » désigné.",
            legende:
              "La tâche est en cours. Une fois faite, appuyez sur « Marquer terminé ».",
          },
          {
            image: "/tutoriels/tache-terminer-2.webp",
            alt: "Détail d'une tâche terminée : une ligne indique qui l'a terminée, le jour et l'heure, suivie des actions « Archiver » et « Supprimer la tâche ».",
            legende:
              "La tâche garde qui l'a terminée, le jour et l'heure. « Archiver » la sort de la liste sans l'effacer.",
          },
          {
            image: "/tutoriels/tache-terminer-3.webp",
            alt: "Onglet Tâches, filtre « Terminé » : la tâche close apparaît seule dans la liste.",
            legende:
              "Elle reste consultable à tout moment dans l'onglet « Terminé ».",
          },
        ],
      },
      {
        id: "creer-une-tache",
        titre: "Créer une tâche",
        resume: "Sortir une consigne de l'oral et du post-it.",
        etapes: [
          {
            image: "/tutoriels/tache-creer-1.webp",
            alt: "Barre de navigation du bas : le bouton vert « + », au centre, est désigné.",
            legende:
              "Le « + » au centre de la barre ouvre la création. Il est disponible depuis n'importe quel écran.",
          },
          {
            image: "/tutoriels/tache-creer-2.webp",
            alt: "Menu « Créer » : nouvelle tâche, nouvelle ordonnance, nouvelle commande, nouvelle location, nouvelle rupture, nouveau contact, nouvelle actualité, nouvelle non-conformité, demande de congés.",
            legende:
              "Le menu liste tout ce qui se crée dans l'application. Choisissez « Nouvelle tâche ».",
          },
          {
            image: "/tutoriels/tache-creer-3.webp",
            alt: "Formulaire « Nouvelle tâche » : intitulé, description, priorité haute, moyenne ou basse, pièces jointes, mémo vocal et échéance.",
            legende:
              "Intitulé, priorité, pièces jointes, mémo vocal, échéance. « Créer », en haut à droite, enregistre la tâche.",
          },
        ],
      },
    ],
  },
  {
    id: "ordonnances",
    nom: "Ordonnances",
    titre: "Photographier l'ordonnance. Laisser remplir.",
    chapeau:
      "L'ordonnance à préparer s'enregistre depuis une photo ou un PDF. Les champs se remplissent à partir du document.",
    tutoriels: [
      {
        id: "enregistrer-une-ordonnance",
        titre: "Enregistrer une ordonnance",
        resume: "Depuis une photo, plutôt qu'à la main.",
        etapes: [
          {
            image: "/tutoriels/ordonnance-creer-1.webp",
            alt: "Menu « Créer » : l'entrée « Nouvelle ordonnance », deuxième de la liste, est désignée.",
            legende:
              "Le « + » de la barre du bas ouvre le menu de création. Choisissez « Nouvelle ordonnance ».",
          },
          {
            image: "/tutoriels/ordonnance-creer-2.webp",
            alt: "Formulaire « Nouvelle ordonnance » : la zone « Photo / Importer », qui accepte JPG, PNG et PDF, est désignée ; en dessous, les champs patient, médicaments et date de préparation.",
            legende:
              "« Photo / Importer » accepte une photo ou un PDF, et la lecture automatique remplit les médicaments et la note. L'encart bleu le dit sans détour : les ordonnances imprimées passent bien, l'écriture manuscrite est mal reconnue.",
          },
        ],
      },
    ],
  },
  {
    id: "commandes",
    nom: "Commandes",
    titre: "Une commande. Un bon, un fournisseur, une date.",
    chapeau:
      "La commande fournisseur se saisit produit par produit, ou se dépose telle quelle depuis son bon.",
    tutoriels: [
      {
        id: "creer-une-commande",
        titre: "Créer une commande",
        resume: "Le fournisseur, les produits, la livraison attendue.",
        etapes: [
          {
            image: "/tutoriels/commande-creer-1.webp",
            alt: "Menu « Créer » : l'entrée « Nouvelle commande », troisième de la liste, est désignée.",
            legende:
              "Depuis le « + », choisissez « Nouvelle commande ».",
          },
          {
            image: "/tutoriels/commande-creer-2.webp",
            alt: "Formulaire « Nouvelle commande » : la zone d'import du bon de commande est désignée, suivie du choix du fournisseur, des produits attendus avec quantité, prix HT et remise, puis de la livraison prévue.",
            legende:
              "Le bon de commande se dépose en photo ou en PDF — c'est facultatif. Restent le fournisseur, les produits attendus et la livraison prévue.",
          },
        ],
      },
      {
        id: "receptionner-une-commande",
        titre: "Réceptionner une commande",
        resume: "Ce qui est attendu, et ce qui est arrivé.",
        etapes: [
          {
            image: "/tutoriels/commande-recevoir-1.webp",
            alt: "Liste des commandes, onglet « À recevoir » : pour chacune, le fournisseur, le nombre de produits, la date, et un bouton « Réception ».",
            legende:
              "L'onglet « À recevoir » liste ce qui est attendu : le fournisseur, le nombre de produits et la date. Le bouton « Réception » bascule la commande dans « Reçues ».",
          },
        ],
      },
    ],
  },
  {
    id: "locations",
    nom: "Locations",
    titre: "Le matériel prêté. Et ce qu'il reste dû.",
    chapeau:
      "Chaque location porte son échéancier et son solde. Le module s'ouvre depuis l'onglet « Plus », comme tous les autres.",
    tutoriels: [
      {
        id: "ouvrir-les-locations",
        titre: "Ouvrir le module Locations",
        resume: "Où sont rangés les modules qui ne sont pas dans la barre.",
        etapes: [
          /* La grille de l'onglet « Plus » montre tous les modules, dont celui
             de Formation. §15 : on ne le met pas en avant — ni dans la légende,
             ni dans le texte alternatif, qui s'en tiennent aux familles. */
          {
            image: "/tutoriels/location-ouvrir-1.webp",
            alt: "Barre de navigation du bas : l'onglet « Plus », à droite, est désigné. Il ouvre une grille de modules rangés en trois familles — officine, organisation, équipe.",
            legende:
              "La barre du bas ne porte que les quatre écrans les plus fréquents. Tout le reste est dans « Plus », rangé par famille.",
          },
          {
            image: "/tutoriels/location-ouvrir-2.webp",
            alt: "Grille des modules : la tuile « Locations », dans la famille Officine, est désignée.",
            legende:
              "Dans la famille Officine, appuyez sur « Locations ».",
          },
          /* ⚠️ Cette capture porte des PRÉNOMS en face d'un matériel médical.
             Même lecture que pour `location` dans `lib/screens.ts` : prénom
             seul, colonne « client » et non « patient », location et non
             délivrance — on reste en deçà du §15. Au premier doute sur
             l'origine de ces lignes, rejouer la capture avec des prénoms
             manifestement fictifs et relancer le script. */
          {
            image: "/tutoriels/location-ouvrir-3.webp",
            alt: "Liste des locations en cours : pour chacune, le client, le matériel prêté, la date de retour attendue, le montant, la caution et une barre d'avancement des périodes écoulées.",
            legende:
              "Les locations en cours, avec la date de retour, le montant, la caution et les périodes déjà écoulées. L'onglet « Terminées » garde les précédentes.",
          },
        ],
      },
      {
        id: "creer-une-location",
        titre: "Créer une location",
        resume: "Le matériel, le client, la périodicité de facturation.",
        etapes: [
          {
            image: "/tutoriels/location-creer-1.webp",
            alt: "Formulaire « Nouvelle location » : équipement, client, téléphone, périodicité de facturation hebdomadaire ou mensuelle, dates de début et de fin, caution et montant total.",
            legende:
              "Depuis le « + », « Nouvelle location ». L'équipement, le client, la périodicité de facturation, les dates, la caution et le montant : c'est ce qui alimente ensuite l'échéancier et le solde.",
          },
        ],
      },
    ],
  },
  {
    id: "profil",
    nom: "Mon profil",
    titre: "Votre compte. Vos réglages.",
    chapeau:
      "Votre fiche personnelle, et la porte des préférences de l'application.",
    tutoriels: [
      {
        id: "ouvrir-les-preferences",
        titre: "Ouvrir vos préférences",
        resume: "Où se règle l'apparence de l'application.",
        etapes: [
          /* ⛔ La capture livrée portait une adresse e-mail réelle, lisible
             dans le champ « Email ». Elle est floutée à la conversion, via la
             table `MASQUES` de `scripts/preparer-tutoriels.mjs` — le fichier
             source, lui, n'est pas modifié. À remplacer par une capture prise
             depuis un compte de démonstration dès que possible : un masque
             est un garde-fou, pas une capture propre. */
          {
            image: "/tutoriels/profil-preferences-1.webp",
            alt: "Écran « Mon profil » : prénom, nom et adresse d'identification, puis quatre entrées — préférences, notifications, sécurité et activité. « Préférences » est désignée.",
            legende:
              "« Mon profil » porte votre fiche, puis quatre entrées. « Préférences » ouvre les réglages d'apparence de l'application.",
          },
        ],
      },
    ],
  },
] as const satisfies readonly ModuleTutoriel[];

/** Nombre total de tutoriels publiés — affiché en tête de page. */
export const NOMBRE_TUTORIELS = MODULES_TUTORIELS.reduce(
  (total, module) => total + module.tutoriels.length,
  0,
);
