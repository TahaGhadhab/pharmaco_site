import type { Metadata } from "next";
import {
  LegalBloc,
  LegalIncomplet,
  LegalPage,
} from "@/components/sections/legal-page";
import { editeur, hebergeur } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Ce site ne dépose aucun traceur et ne contient aucun formulaire. Détail des traitements, durées de conservation et exercice de vos droits.",
  alternates: { canonical: "/confidentialite" },
};

/**
 * Politique de confidentialité de la **vitrine**, pas de l'application.
 *
 * Le périmètre est volontairement rappelé dès le premier bloc : l'application
 * traite des données d'officine, ce site n'en traite aucune. Les confondre
 * donnerait un texte faux dans les deux sens.
 *
 * L'état des lieux est vérifié dans le code : aucun script de mesure
 * d'audience, aucun pixel, aucun formulaire, un seul `localStorage`
 * (`pw-theme`) qui ne quitte jamais l'appareil.
 */
export default function Confidentialite() {
  return (
    <LegalPage
      eyebrow="Informations"
      titre="Politique de confidentialité."
      chapeau="Ce site ne vous suit pas. Voici ce que cela veut dire, précisément."
    >
      <LegalBloc titre="Ce que couvre ce texte">
        <p>
          Cette politique porte sur le site {site.name} que vous consultez. Elle
          ne porte pas sur l&apos;application, accessible à une autre adresse,
          qui dispose de ses propres engagements et traite les données de votre
          officine.
        </p>
      </LegalBloc>

      <LegalBloc titre="Responsable du traitement">
        {editeur ? (
          <p>
            {editeur.denomination}, {editeur.siege}. Contact :{" "}
            <a
              href={`mailto:${editeur.email}`}
              className="text-primary-deep underline underline-offset-4 hover:text-primary-strong"
            >
              {editeur.email}
            </a>
            .
          </p>
        ) : (
          <LegalIncomplet />
        )}
      </LegalBloc>

      <LegalBloc titre="Aucune collecte active">
        <p>
          Ce site ne contient aucun formulaire, aucun espace de connexion et
          aucun bouton de réseau social. Vous pouvez le consulter en entier sans
          qu&apos;aucune information ne vous soit demandée.
        </p>
        <p>
          Il ne comporte ni outil de mesure d&apos;audience, ni pixel
          publicitaire, ni traceur tiers d&apos;aucune sorte.
        </p>
      </LegalBloc>

      <LegalBloc titre="Cookies">
        <p>
          Aucun cookie n&apos;est déposé. Le site enregistre une seule
          information sur votre appareil, dans le stockage local du navigateur :
          votre préférence de thème clair ou sombre, sous la clé{" "}
          <code className="u-numeric rounded-field bg-surface-muted px-1.5 py-0.5 text-[0.85em] text-ink">
            pw-theme
          </code>
          .
        </p>
        <p>
          Cette information ne quitte jamais votre appareil, n&apos;est transmise
          à personne et ne permet pas de vous identifier. Strictement nécessaire
          au fonctionnement du service que vous demandez, elle ne requiert pas
          votre consentement préalable. Vous l&apos;effacez en vidant les données
          de site de votre navigateur.
        </p>
      </LegalBloc>

      <LegalBloc titre="Journaux techniques">
        <p>
          Comme tout site accessible en ligne, celui-ci génère des journaux de
          connexion tenus par son hébergeur, {hebergeur.nom} : adresse IP, date
          et heure de la requête, page demandée, type de navigateur. Ils servent
          à assurer le fonctionnement du service et sa sécurité, notamment
          contre les attaques.
        </p>
        <p>
          Base légale : l&apos;intérêt légitime à maintenir un service
          disponible et sûr. Ces journaux sont conservés pour une durée limitée
          par l&apos;hébergeur, puis supprimés.
        </p>
        <p className="text-ink-3">
          {hebergeur.nom} est une société établie aux États-Unis. Le traitement
          de ces journaux techniques est susceptible d&apos;impliquer un
          transfert hors de l&apos;Union européenne, encadré par les engagements
          contractuels de l&apos;hébergeur.
        </p>
      </LegalBloc>

      <LegalBloc titre="Si vous nous écrivez">
        <p>
          Le site affiche une adresse de courrier électronique. Si vous
          l&apos;utilisez, nous traitons votre adresse et le contenu de votre
          message dans le seul but de vous répondre, sur la base de votre
          démarche. Ces échanges sont conservés le temps de la relation, puis
          archivés ou supprimés.
        </p>
      </LegalBloc>

      <LegalBloc titre="Destinataires">
        <p>
          Aucune donnée issue de ce site n&apos;est vendue, louée ni transmise à
          des fins commerciales. Seul l&apos;hébergeur intervient, en qualité de
          sous-traitant technique.
        </p>
      </LegalBloc>

      <LegalBloc titre="Vos droits">
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de limitation, d&apos;opposition et de portabilité
          sur les données vous concernant. Vous pouvez les exercer à
          l&apos;adresse de contact indiquée ci-dessus.
        </p>
        <p>
          Si la réponse ne vous satisfait pas, vous pouvez introduire une
          réclamation auprès de la CNIL, 3 place de Fontenoy, TSA 80715, 75334
          Paris Cedex 07, ou sur{" "}
          <a
            href="https://www.cnil.fr"
            className="text-primary-deep underline underline-offset-4 hover:text-primary-strong"
            rel="noopener noreferrer"
            target="_blank"
          >
            cnil.fr
          </a>
          .
        </p>
      </LegalBloc>

      <LegalBloc titre="Modifications">
        <p>
          Ce texte peut évoluer avec le site. La date de dernière mise à jour
          figure en haut de cette page.
        </p>
      </LegalBloc>
    </LegalPage>
  );
}
