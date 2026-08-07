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
 * ⛔ §15 : aucune capture ne doit contenir de nom de patient réel.
 *          N'utiliser que des données fictives évidentes.
 */

export type ScreenVariant = "phone" | "desktop";

export type ScreenSlot = {
  id: string;
  src: string;
  variant: ScreenVariant;
  /** Texte alternatif — décrit l'écran, pas le produit. */
  alt: string;
  /** Ce qu'il faut capturer. Affiché dans le cadre de réservation. */
  brief: string;
};

export const screens = {
  /* ── Fournies ─────────────────────────────────────────────────────────── */

  accueil: {
    id: "accueil",
    src: "/screens/accueil.webp",
    variant: "phone",
    alt: "Écran d'accueil : bouton de démarrage de session, compteurs de tâches, de ruptures ouvertes, de locations à rendre et d'ordonnances à servir, puis la carte de l'équipe.",
    brief:
      "Accueil — le bouton « Démarrer la session », les quatre compteurs, la carte Équipe.",
  },
  scan: {
    id: "scan",
    src: "/screens/rupture-creation.webp",
    variant: "phone",
    alt: "Déclaration d'une rupture : champ code-barres CIP avec le bouton de scan par la caméra.",
    brief:
      "Formulaire « Nouvelle rupture », avec le champ CIP et le bouton scanner bien visibles.",
  },
  ruptures: {
    id: "ruptures",
    src: "/screens/ruptures.webp",
    variant: "phone",
    alt: "Liste des ruptures de l'officine, avec leur portée et les alternatives proposées.",
    brief:
      "Liste des ruptures ouvertes, si possible avec une ligne portant une alerte ANSM.",
  },
  location: {
    id: "location",
    src: "/screens/location.webp",
    variant: "phone",
    alt: "Location de matériel médical : échéancier de périodes, paiements enregistrés et solde restant dû.",
    brief:
      "Fiche location avec l'échéancier, le solde restant dû, et si possible le refus de restitution.",
  },
  planning: {
    id: "planning",
    src: "/screens/planning.webp",
    variant: "phone",
    alt: "Planning d'équipe affichant les créneaux et les heures d'arrivée et de départ réelles.",
    brief:
      "Planning de la semaine, heures d'arrivée et de départ remontées du pointage bien lisibles.",
  },
  qualite: {
    id: "qualite",
    src: "/screens/qualite.webp",
    variant: "desktop",
    alt: "Tableau de bord qualité : contrôles à faire, non-conformités, incidents du mois et taux de conformité.",
    brief: "Tableau de bord qualité + l'historique horodaté en dessous.",
  },
  taches: {
    id: "taches",
    src: "/screens/taches.webp",
    variant: "phone",
    alt: "Liste des tâches de l'officine, avec leur responsable et leur échéance.",
    brief: "Tâches assignées, avec au moins une échéance et un responsable visibles.",
  },
  commandes: {
    id: "commandes",
    src: "/screens/commandes.webp",
    variant: "phone",
    alt: "Commandes fournisseurs, avec leur liste de produits et la date de livraison attendue.",
    brief: "Commandes en cours, avec une date de livraison attendue.",
  },
  gestionRh: {
    id: "gestionRh",
    src: "/screens/gestion-rh.webp",
    variant: "phone",
    alt: "Gestion RH : membres de l'équipe, quota de places et accès aux rôles et permissions.",
    brief: "Écran Gestion RH — équipe, quota de sièges, entrée « Rôles & permissions ».",
  },
  chat: {
    id: "chat",
    src: "/screens/chat.webp",
    variant: "phone",
    alt: "Messagerie interne de l'officine : canaux thématiques et conversations directes.",
    brief: "Liste des canaux + une conversation ouverte. Aucun contenu patient à l'écran.",
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
  },
  permissions: {
    id: "permissions",
    src: "/screens/permissions.webp",
    variant: "desktop",
    alt: "Matrice « Rôles & permissions » : sept rôles, droits configurables par le titulaire.",
    brief: "Écran Rôles & permissions, la matrice 7 rôles × permissions.",
  },
} as const satisfies Record<string, ScreenSlot>;

export type ScreenId = keyof typeof screens;
