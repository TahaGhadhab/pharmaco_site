import {
  BookUser,
  CalendarDays,
  CalendarRange,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Newspaper,
  PackageCheck,
  PackageX,
  ReceiptEuro,
  ScanText,
  ShieldCheck,
  SlidersHorizontal,
  TreePalm,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { IconBadge, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/* ══════════════════════════════════════════════════════════════════════════
   Le tour des modules — section de balayage rapide.

   §4 du contexte produit, moins « Formation » (stub non fonctionnel,
   interdit de mise en avant par le §15). Reste 15 modules.
   Une ligne par module : le visiteur embrasse tout d'un coup d'œil.
   ══════════════════════════════════════════════════════════════════════════ */

type Module = {
  name: string;
  line: string;
  icon: LucideIcon;
};

const MODULES: readonly Module[] = [
  {
    name: "Accueil",
    line: "Pointage, indicateurs du jour, équipe en poste.",
    icon: LayoutDashboard,
  },
  {
    name: "Tâches",
    line: "Assignées, datées, jamais laissées à l'oral.",
    icon: ListChecks,
  },
  {
    name: "Ordonnances",
    line: "Lues par photo, priorisées, suivies.",
    icon: ScanText,
  },
  {
    name: "Commandes",
    line: "Fournisseur, produits, livraison attendue.",
    icon: PackageCheck,
  },
  {
    name: "Ruptures",
    line: "Déclarées, levées au scan, croisées ANSM.",
    icon: PackageX,
  },
  {
    name: "Locations",
    line: "Échéancier, paiements, solde restant dû.",
    icon: ReceiptEuro,
  },
  {
    name: "Qualité",
    line: "Contrôles, non-conformités, incidents.",
    icon: ShieldCheck,
  },
  {
    name: "Agenda",
    line: "Tout ce qui porte une date, en une liste.",
    icon: CalendarDays,
  },
  {
    name: "Planning",
    line: "Vos créneaux, avec les heures réelles.",
    icon: CalendarRange,
  },
  {
    name: "Congés",
    line: "Demandés par l'équipe, validés par le titulaire.",
    icon: TreePalm,
  },
  {
    name: "Annuaire",
    line: "Fournisseurs, confrères, urgences.",
    icon: BookUser,
  },
  {
    name: "Actualités",
    line: "Le journal interne de l'officine.",
    icon: Newspaper,
  },
  {
    name: "Chat",
    line: "Messagerie interne : canaux et conversations.",
    icon: MessageSquare,
  },
  {
    name: "Gestion RH",
    line: "Invitations, rôles, sièges, comptes.",
    icon: UsersRound,
  },
  {
    name: "Paramètres",
    line: "Fiche de l'officine et grille des droits.",
    icon: SlidersHorizontal,
  },
];

export function Modules() {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          eyebrow="Le tour des modules"
          title="Quinze modules. Une seule application."
          lead="Chacun est rangé là où on le cherche. Aucun n'a besoin d'un autre outil pour fonctionner."
        />
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 lg:grid-cols-4 lg:gap-4">
        {MODULES.map(({ name, line, icon: Icon }) => (
          <RevealItem key={name} className="h-full">
            <div className="group flex h-full flex-col gap-3 rounded-card bg-page p-4 ring-1 ring-line transition-[transform,box-shadow,background-color] duration-200 ease-(--ease-out-soft) hover:-translate-y-0.5 hover:bg-surface hover:shadow-raised sm:p-5">
              <IconBadge className="size-9">
                <Icon className="size-4.5" strokeWidth={1.75} aria-hidden />
              </IconBadge>

              <div className="flex flex-col gap-1">
                <h3 className="text-[0.95rem] font-semibold text-ink">{name}</h3>
                <p className="text-[0.82rem] leading-snug text-ink-3">{line}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-8 text-[0.88rem] leading-relaxed text-ink-3">
          Et dans tous les modules : recherche globale, notifications push, mode
          sombre, et une application installable sur l&rsquo;écran
          d&rsquo;accueil du téléphone.
        </p>
      </Reveal>
    </Section>
  );
}
