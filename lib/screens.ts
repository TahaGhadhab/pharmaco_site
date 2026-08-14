/**
 * Registre central des captures d'écran de l'application.
 *
 * ┌─ COMMENT AJOUTER UNE CAPTURE ────────────────────────────────────────────┐
 * │ Déposez le fichier dans  public/screens/  au nom indiqué par `src`.       │
 * │ Il s'affiche automatiquement : aucun code à modifier.                     │
 * │ Tant que le fichier est absent, un cadre de réservation s'affiche à sa    │
 * │ place, avec le nom attendu et ce qu'il faut capturer.                     │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * Format : libre. Le cadre s'adapte aux proportions de la capture et l'affiche
 * entière — voir `components/ui/screen-frame.tsx`. Gardez simplement le même
 * cadrage d'une capture à l'autre, pour que la galerie reste régulière.
 *
 * ── Les deux affichages ────────────────────────────────────────────────────
 * La page porte un interrupteur mobile / ordinateur (`ScreenModeToggle`).
 * Chaque écran peut donc exister en deux versions, liées par `alternate` :
 *
 *   slot principal        →  public/screens/<nom>.webp          (celui d'origine)
 *   sa contrepartie       →  public/screens/desktop/<nom>.webp  (vue ordinateur)
 *                        ou  public/screens/mobile/<nom>.webp   (vue mobile)
 *
 * La contrepartie vit toujours dans le sous-dossier de SA variante. Un écran
 * sans `alternate` reste affiché tel quel dans les deux modes : c'est le repli,
 * jamais une erreur.
 *
 * ⛔ §15 : aucune capture ne doit contenir de nom de patient réel.
 *          N'utiliser que des données fictives évidentes.
 */

export type ScreenVariant = "phone" | "desktop";

type ScreenBase = {
  id: string;
  src: string;
  variant: ScreenVariant;
  /** Texte alternatif — décrit l'écran, pas le produit. */
  alt: string;
  /** Ce qu'il faut capturer. Affiché dans le cadre de réservation. */
  brief: string;
};

export type ScreenSlot = ScreenBase & {
  /** Le même écran dans l'autre variante. Absent = pas de bascule pour cet écran. */
  alternate?: ScreenBase;
};

/** L'écran à montrer pour l'affichage demandé. Sans contrepartie, on garde l'original. */
export function resolveScreen(slot: ScreenSlot, mode: ScreenVariant): ScreenSlot {
  if (slot.variant === mode) return slot;
  return slot.alternate ?? slot;
}

export const screens = {
  /* ── Fournies ─────────────────────────────────────────────────────────── */

  accueil: {
    id: "accueil",
    src: "/screens/accueil.webp",
    variant: "phone",
    alt: "Écran d'accueil : bouton de démarrage de session, compteurs de tâches, de ruptures ouvertes, de locations à rendre et d'ordonnances à servir, puis la carte de l'équipe.",
    brief:
      "Accueil — le bouton « Démarrer la session », les quatre compteurs, la carte Équipe.",
    alternate: {
      id: "accueil-desktop",
      src: "/screens/desktop/accueil.webp",
      variant: "desktop",
      alt: "Écran d'accueil sur ordinateur : les quatre compteurs — tâches en cours, ruptures ouvertes, locations à rendre, ordonnances à servir — puis la carte de l'équipe avec les rôles en poste.",
      brief: "Accueil sur ordinateur — les quatre compteurs et la carte Équipe.",
    },
  },
  scan: {
    id: "scan",
    src: "/screens/rupture-creation.webp",
    variant: "phone",
    alt: "Déclaration d'une rupture : champ code-barres CIP avec le bouton de scan par la caméra.",
    brief:
      "Formulaire « Nouvelle rupture », avec le champ CIP et le bouton scanner bien visibles.",
    alternate: {
      id: "scan-desktop",
      src: "/screens/desktop/rupture-creation.webp",
      variant: "desktop",
      alt: "Formulaire « Nouvelle rupture » sur ordinateur : champ médicament, code-barres CIP avec son bouton de scan, portée locale ou nationale, alternative suggérée.",
      brief:
        "Formulaire « Nouvelle rupture » sur ordinateur, champ CIP bien visible.",
    },
  },
  ruptures: {
    id: "ruptures",
    src: "/screens/ruptures.webp",
    variant: "phone",
    alt: "Liste des ruptures de l'officine, avec leur portée et les alternatives proposées.",
    brief:
      "Liste des ruptures ouvertes, si possible avec une ligne portant une alerte ANSM.",
    alternate: {
      id: "ruptures-desktop",
      src: "/screens/desktop/ruptures.webp",
      variant: "desktop",
      alt: "Liste des ruptures sur ordinateur : le produit, l'alternative proposée, la portée locale ou nationale, le statut et la date de signalement.",
      brief:
        "Liste des ruptures sur ordinateur, si possible avec une ligne portant une alerte ANSM.",
    },
  },
  location: {
    id: "location",
    src: "/screens/location.webp",
    variant: "phone",
    alt: "Location de matériel médical : échéancier de périodes, paiements enregistrés et solde restant dû.",
    brief:
      "Fiche location avec l'échéancier, le solde restant dû, et si possible le refus de restitution.",
    alternate: {
      id: "location-desktop",
      src: "/screens/desktop/location.webp",
      variant: "desktop",
      alt: "Locations en cours sur ordinateur : le matériel prêté, l'état de la location, la date de retour attendue et la part déjà réglée sur le total dû.",
      /* ⚠️ La capture livrée porte des PRÉNOMS de clients réels-ou-non en face
         d'un matériel médical. Prénom seul, colonne « client » et non
         « patient », location et non délivrance : on reste en deçà du §15.
         Au premier doute sur l'origine de ces lignes, rejouer avec des
         prénoms manifestement fictifs. */
      brief:
        "Locations en cours sur ordinateur, retour attendu et solde visibles. Prénoms fictifs uniquement.",
    },
  },
  planning: {
    id: "planning",
    src: "/screens/planning.webp",
    variant: "phone",
    alt: "Planning d'équipe affichant les créneaux et les heures d'arrivée et de départ réelles.",
    brief:
      "Planning de la semaine, heures d'arrivée et de départ remontées du pointage bien lisibles.",
    alternate: {
      id: "planning-desktop",
      src: "/screens/desktop/planning.webp",
      variant: "desktop",
      alt: "Planning d'équipe sur ordinateur : la semaine en bandeau, un jour sélectionné, et pour chaque personne son créneau et son état de pointage.",
      brief:
        "Planning de la semaine sur ordinateur, une colonne par jour, heures de pointage lisibles.",
    },
  },
  qualite: {
    id: "qualite",
    src: "/screens/qualite.webp",
    variant: "desktop",
    alt: "Tableau de bord qualité : contrôles à faire, non-conformités, incidents du mois et taux de conformité.",
    brief: "Tableau de bord qualité + l'historique horodaté en dessous.",
    alternate: {
      id: "qualite-mobile",
      src: "/screens/mobile/qualite.webp",
      variant: "phone",
      alt: "Tableau de bord qualité sur mobile : contrôles à faire, non-conformités et taux de conformité empilés.",
      brief: "Tableau de bord qualité sur mobile, les contrôles à faire en tête.",
    },
  },
  taches: {
    id: "taches",
    src: "/screens/taches.webp",
    variant: "phone",
    alt: "Liste des tâches de l'officine, avec leur responsable et leur échéance.",
    brief: "Tâches assignées, avec au moins une échéance et un responsable visibles.",
    alternate: {
      id: "taches-desktop",
      src: "/screens/desktop/taches.webp",
      variant: "desktop",
      alt: "Liste des tâches sur ordinateur : quatre colonnes — la tâche, son statut, son échéance et la personne à qui elle est assignée.",
      brief:
        "Tâches assignées sur ordinateur, avec échéance et responsable en colonnes.",
    },
  },
  commandes: {
    id: "commandes",
    src: "/screens/commandes.webp",
    variant: "phone",
    alt: "Commandes fournisseurs, avec leur liste de produits et la date de livraison attendue.",
    brief: "Commandes en cours, avec une date de livraison attendue.",
    alternate: {
      id: "commandes-desktop",
      src: "/screens/desktop/commandes.webp",
      variant: "desktop",
      alt: "Commandes fournisseurs sur ordinateur : le fournisseur, les produits commandés, l'état de réception et la date.",
      brief:
        "Commandes en cours sur ordinateur, avec une date de livraison attendue et de vrais libellés produit.",
    },
  },
  gestionRh: {
    id: "gestionRh",
    src: "/screens/gestion-rh.webp",
    variant: "phone",
    alt: "Gestion RH : membres de l'équipe, quota de places et accès aux rôles et permissions.",
    brief: "Écran Gestion RH — équipe, quota de sièges, entrée « Rôles & permissions ».",
    alternate: {
      id: "gestionRh-desktop",
      src: "/screens/desktop/gestion-rh.webp",
      variant: "desktop",
      alt: "Gestion RH sur ordinateur : places utilisées sur celles de la formule, invitation d'un membre, l'équipe avec son rôle, puis l'accès aux rôles et permissions.",
      brief:
        "Écran Gestion RH sur ordinateur — équipe, quota de sièges, entrée « Rôles & permissions ».",
    },
  },
  chat: {
    id: "chat",
    src: "/screens/chat2.webp",
    variant: "phone",
    alt: "Messagerie interne de l'officine : canaux thématiques et conversations directes.",
    brief: "Liste des canaux + une conversation ouverte. Aucun contenu patient à l'écran.",
    alternate: {
      id: "chat-desktop",
      src: "/screens/desktop/chat.webp",
      variant: "desktop",
      alt: "Messagerie interne sur ordinateur : les conversations à gauche, le fil à droite, et le rappel de ne pas y partager de données patient.",
      /* Livrée, mais le volet de droite est vide. Une capture avec une
         conversation ouverte — sans contenu patient — serait plus parlante. */
      brief:
        "Canaux à gauche, conversation ouverte à droite. Aucun contenu patient à l'écran.",
    },
  },

  /** Formulaire vide, aucune donnée patient — et il porte à l'écran la mention
      « L'image n'est pas conservée », qui est précisément l'argument du §5.3. */
  ordonnance: {
    id: "ordonnance",
    src: "/screens/ordonnance-creation.webp",
    variant: "phone",
    alt: "Enregistrement d'une ordonnance : dépôt de la photo, lecture automatique en cours, champs patient et médicaments encore vides.",
    brief:
      "Écran « Nouvelle ordonnance », analyse en cours, formulaire vide — sans aucune donnée patient.",
    alternate: {
      id: "ordonnance-desktop",
      src: "/screens/desktop/ordonnance-creation.webp",
      variant: "desktop",
      alt: "Enregistrement d'une ordonnance sur ordinateur : dépôt de la photo ou du PDF, champs patient et médicaments encore vides, note chiffrée, date de préparation.",
      /* Deuxième version, celle-ci. La première était la LISTE des ordonnances,
         avec quatre noms de patients en face de leur traitement — donnée de
         santé nominative, §15 et RGPD. Elle est restée dans .screens-prives/,
         hors dépôt et hors public/. Ne pas la ressortir. */
      brief:
        "Écran « Nouvelle ordonnance » sur ordinateur, formulaire vide — sans aucune donnée patient.",
    },
  },

  /* ── En attente ─────────────────────────────────────────────────────────── */

  ordonnanceOcr: {
    id: "ordonnanceOcr",
    src: "/screens/ordonnance-ocr-anonyme.webp",
    variant: "phone",
    alt: "Résultat de la lecture automatique d'une ordonnance : patient et médicaments extraits.",
    brief:
      "⚠️ À REPRENDRE — la version fournie portait un vrai nom de patient et a été retirée de public/. Rejouer avec des données fictives évidentes, puis déposer sous ce nom.",
  },
  agenda: {
    id: "agenda",
    src: "/screens/agenda.webp",
    variant: "phone",
    alt: "Agenda agrégé : échéances de tâches, livraisons attendues et fins de location sur une seule liste.",
    brief:
      "Agenda montrant des lignes d'origines différentes le même jour (une tâche, une livraison, une fin de location).",
    alternate: {
      id: "agenda-desktop",
      src: "/screens/desktop/agenda.webp",
      variant: "desktop",
      alt: "Agenda agrégé sur ordinateur : le mois en calendrier, des pastilles de couleur sur les jours qui portent une échéance, et les éléments sans date regroupés en dessous.",
      brief:
        "Agenda sur ordinateur, des lignes d'origines différentes le même jour.",
    },
  },
  permissions: {
    id: "permissions",
    src: "/screens/permissions.webp",
    variant: "desktop",
    alt: "Matrice « Rôles & permissions » : sept rôles, droits configurables par le titulaire.",
    brief: "Écran Rôles & permissions, la matrice 7 rôles × permissions.",
    alternate: {
      id: "permissions-mobile",
      src: "/screens/mobile/permissions.webp",
      variant: "phone",
      alt: "Rôles et permissions sur mobile : un rôle ouvert, ses droits en liste.",
      brief: "Écran Rôles & permissions sur mobile, un rôle déplié.",
    },
  },
} as const satisfies Record<string, ScreenSlot>;

export type ScreenId = keyof typeof screens;
