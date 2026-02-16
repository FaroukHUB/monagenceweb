import SectionBlock from "@/components/SectionBlock";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site Mon Agence Web. Informations sur l'éditeur, l'hébergement, la propriété intellectuelle et les données personnelles.",
  path: "/legal",
  noIndex: true,
});

export default function LegalPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark leading-tight">
            Mentions légales
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Dernière mise à jour : février 2026
          </p>
        </div>
      </section>

      <SectionBlock>
        <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
          {/* Éditeur du site */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-dark mb-4">
              Éditeur du site
            </h2>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-2 text-gray-600">
              <p>
                <span className="font-semibold text-dark">
                  Raison sociale :
                </span>{" "}
                Mon Agence Web
              </p>
              <p>
                <span className="font-semibold text-dark">
                  Forme juridique :
                </span>{" "}
                SAS au capital de 10 000 euros
              </p>
              <p>
                <span className="font-semibold text-dark">
                  Numéro SIRET :
                </span>{" "}
                XXX XXX XXX XXXXX
              </p>
              <p>
                <span className="font-semibold text-dark">
                  Numéro TVA intracommunautaire :
                </span>{" "}
                FR XX XXX XXX XXX
              </p>
              <p>
                <span className="font-semibold text-dark">Siège social :</span>{" "}
                [Adresse complète], France
              </p>
              <p>
                <span className="font-semibold text-dark">Téléphone :</span>{" "}
                [Numéro de téléphone]
              </p>
              <p>
                <span className="font-semibold text-dark">Email :</span>{" "}
                <a
                  href="mailto:contact@mon-agenceweb.fr"
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  contact@mon-agenceweb.fr
                </a>
              </p>
              <p>
                <span className="font-semibold text-dark">
                  Directeur de la publication :
                </span>{" "}
                [Nom du directeur de la publication]
              </p>
            </div>
          </section>

          {/* Hébergement */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-dark mb-4">
              Hébergement
            </h2>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-2 text-gray-600">
              <p>
                Le site{" "}
                <span className="font-semibold text-dark">
                  mon-agenceweb.fr
                </span>{" "}
                est hébergé par :
              </p>
              <p>
                <span className="font-semibold text-dark">
                  Raison sociale :
                </span>{" "}
                Vercel Inc.
              </p>
              <p>
                <span className="font-semibold text-dark">Adresse :</span> 340
                S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              </p>
              <p>
                <span className="font-semibold text-dark">Site web :</span>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-dark mb-4">
              Propriété intellectuelle
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                L'ensemble du contenu de ce site (textes, images, graphismes,
                logo, icônes, vidéos, logiciels, bases de données...) est
                protégé par le droit d'auteur et le droit de la propriété
                intellectuelle, conformément aux dispositions du Code de la
                propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication,
                adaptation de tout ou partie des éléments du site, quel que soit
                le moyen ou le procédé utilisé, est interdite, sauf
                autorisation écrite préalable de Mon Agence Web.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l'un quelconque
                des éléments qu'il contient sera considérée comme constitutive
                d'une contrefaçon et poursuivie conformément aux dispositions
                des articles L.335-2 et suivants du Code de la propriété
                intellectuelle.
              </p>
            </div>
          </section>

          {/* Données personnelles */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-dark mb-4">
              Données personnelles
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978
                modifiée, vous disposez des droits suivants concernant vos
                données personnelles :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p>
                Les données personnelles collectées via le formulaire de contact
                (nom, email, téléphone, message) sont utilisées uniquement pour
                répondre à votre demande. Elles ne sont ni cédées ni vendues à
                des tiers.
              </p>
              <p>
                Les données sont conservées pendant une durée maximale de 3 ans
                à compter du dernier contact. Passé ce délai, elles sont
                supprimées automatiquement.
              </p>
              <p>
                Pour exercer vos droits, vous pouvez nous contacter par email à{" "}
                <a
                  href="mailto:contact@mon-agenceweb.fr"
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  contact@mon-agenceweb.fr
                </a>{" "}
                ou par courrier à l'adresse du siège social mentionnée
                ci-dessus.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-dark mb-4">
              Cookies
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Le site mon-agenceweb.fr peut être amené à utiliser des cookies
                pour améliorer l'expérience de navigation des utilisateurs. Un
                cookie est un petit fichier texte déposé sur votre terminal
                (ordinateur, tablette, smartphone) lors de la visite d'un site
                web.
              </p>
              <p>Les cookies utilisés sur ce site sont de deux types :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <span className="font-semibold text-dark">
                    Cookies techniques :
                  </span>{" "}
                  nécessaires au bon fonctionnement du site. Ils ne requièrent
                  pas votre consentement.
                </li>
                <li>
                  <span className="font-semibold text-dark">
                    Cookies analytiques :
                  </span>{" "}
                  utilisés pour mesurer l'audience du site et améliorer nos
                  services. Ces cookies sont soumis à votre consentement.
                </li>
              </ul>
              <p>
                Vous pouvez à tout moment modifier vos préférences en matière de
                cookies via les paramètres de votre navigateur ou en nous
                contactant directement.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-dark mb-4">
              Contact
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Pour toute question relative aux présentes mentions légales ou
                au fonctionnement du site, vous pouvez nous contacter :
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-2">
                <p>
                  <span className="font-semibold text-dark">Par email :</span>{" "}
                  <a
                    href="mailto:contact@mon-agenceweb.fr"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    contact@mon-agenceweb.fr
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-dark">
                    Par courrier :
                  </span>{" "}
                  Mon Agence Web, [Adresse complète], France
                </p>
              </div>
            </div>
          </section>
        </div>
      </SectionBlock>
    </>
  );
}
