import type { Metadata } from "next";
import {
  LegalBloc,
  LegalIncomplet,
  LegalListe,
  LegalPage,
} from "@/components/sections/legal-page";
import { editeur, hebergeur } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, directeur de la publication, hébergeur et propriété intellectuelle du site pharmacowork.fr.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <LegalPage
      eyebrow="Informations"
      titre="Mentions légales."
      chapeau="Qui édite ce site, qui l'héberge, et à qui écrire."
    >
      <LegalBloc titre="Éditeur du site">
        {editeur ? (
          <LegalListe
            entrees={[
              { terme: "Dénomination sociale", valeur: editeur.denomination },
              { terme: "Forme juridique", valeur: editeur.formeJuridique },
              ...(editeur.capital
                ? [{ terme: "Capital social", valeur: editeur.capital }]
                : []),
              { terme: "Siège social", valeur: editeur.siege },
              {
                terme: "Immatriculation",
                valeur: `RCS ${editeur.rcsVille} — SIREN ${editeur.siren}`,
              },
              ...(editeur.tva
                ? [{ terme: "TVA intracommunautaire", valeur: editeur.tva }]
                : []),
              {
                terme: "Directeur de la publication",
                valeur: editeur.directeurPublication,
              },
              ...(editeur.telephone
                ? [{ terme: "Téléphone", valeur: editeur.telephone }]
                : []),
              {
                terme: "Contact",
                valeur: (
                  <a
                    href={`mailto:${editeur.email}`}
                    className="text-primary-deep underline underline-offset-4 hover:text-primary-strong"
                  >
                    {editeur.email}
                  </a>
                ),
              },
            ]}
          />
        ) : (
          <LegalIncomplet />
        )}
      </LegalBloc>

      <LegalBloc titre="Hébergeur">
        <p>
          Le site est hébergé par {hebergeur.nom}, {hebergeur.adresse}.
        </p>
        <p className="text-ink-3">
          {hebergeur.nom} diffuse les pages depuis le point de présence le plus
          proche du visiteur. L&apos;application {site.name}, distincte de ce
          site, s&apos;appuie sur une infrastructure européenne.
        </p>
      </LegalBloc>

      <LegalBloc titre="Objet du site">
        <p>
          Ce site présente {site.name}, un espace de travail interne destiné aux
          officines de pharmacie. Il est purement informatif : aucune vente,
          aucune commande et aucune prise de commande n&apos;y est effectuée.
        </p>
        <p>
          {site.name} ne réalise ni délivrance, ni facturation, ni
          télétransmission. Ce n&apos;est pas un logiciel de gestion
          d&apos;officine et ce n&apos;est pas un dispositif médical.
        </p>
      </LegalBloc>

      <LegalBloc titre="Propriété intellectuelle">
        <p>
          Les textes, la charte graphique, le logo et les captures
          d&apos;écran présentés sur ce site sont protégés. Toute reproduction
          ou représentation, totale ou partielle, sans autorisation écrite
          préalable est interdite.
        </p>
      </LegalBloc>

      <LegalBloc titre="Liens sortants">
        <p>
          Ce site renvoie vers l&apos;application, à l&apos;adresse{" "}
          <a
            href={site.urls.app}
            className="text-primary-deep underline underline-offset-4 hover:text-primary-strong"
          >
            {site.urls.app.replace("https://", "")}
          </a>
          , qui dispose de ses propres conditions d&apos;utilisation.
        </p>
      </LegalBloc>

      <LegalBloc titre="Données personnelles">
        <p>
          Ce site ne dépose aucun cookie de mesure d&apos;audience ni de
          publicité, et ne contient aucun formulaire. Le détail des traitements
          figure dans la{" "}
          <a
            href="/confidentialite"
            className="font-medium text-primary-deep underline underline-offset-4 hover:text-primary-strong"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </LegalBloc>
    </LegalPage>
  );
}
