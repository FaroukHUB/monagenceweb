import HeroSection from "@/components/HeroSection";
import SectionBlock from "@/components/SectionBlock";
import FAQ from "@/components/FAQ";
import { generatePageMetadata } from "@/lib/metadata";
import { generateWebPageSchema, generateFAQSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Contactez Mon Agence Web pour discuter de votre projet digital. Réponse garantie sous 24h. Audit gratuit de votre présence en ligne.",
  path: "/contact",
});

const faqItems = [
  {
    question: "Combien coûte un premier échange ?",
    answer:
      "Le premier échange est entièrement gratuit et sans engagement. Nous prenons le temps de comprendre votre projet et vos objectifs pour vous proposer la solution la plus adaptée.",
  },
  {
    question: "En combien de temps recevrai-je une réponse ?",
    answer:
      "Nous nous engageons à vous répondre sous 24 heures ouvrées maximum. La plupart du temps, vous recevez une réponse dans les 2 heures suivant votre demande.",
  },
  {
    question: "Comment se déroule la prise de contact ?",
    answer:
      "Après réception de votre message, nous vous contactons par email ou par téléphone selon votre préférence. Nous organisons ensuite un appel de 30 minutes pour approfondir votre besoin.",
  },
  {
    question: "Travaillez-vous uniquement en France ?",
    answer:
      "Nous travaillons avec des entreprises francophones partout dans le monde. Nos échanges se font par visioconférence, téléphone ou email, ce qui nous permet de collaborer à distance sans difficulté.",
  },
  {
    question: "Dois-je préparer quelque chose avant notre échange ?",
    answer:
      "Pas nécessairement. Si vous avez un cahier des charges, des exemples de sites qui vous plaisent ou des objectifs chiffrés, n'hésitez pas à les partager. Sinon, nous vous guiderons pendant l'échange.",
  },
];

export default function ContactPage() {
  const pageSchema = generateWebPageSchema(
    "Contact",
    "Contactez Mon Agence Web pour discuter de votre projet digital.",
    "/contact"
  );

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <HeroSection
        title="Parlons de votre projet"
        subtitle="Un premier échange gratuit pour comprendre vos besoins et vous proposer la meilleure solution. Réponse garantie sous 24 heures."
        ctaPrimary={{ label: "Voir nos offres", href: "/offres" }}
        ctaSecondary={{ label: "Nos réalisations", href: "/realisations" }}
        withImage={false}
      />

      {/* Contact form + info */}
      <SectionBlock bg="gray">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-dark mb-2">
                Envoyez-nous un message
              </h2>
              <p className="text-gray-500 mb-8">
                Remplissez le formulaire ci-dessous et nous vous recontactons
                rapidement.
              </p>

              <form
                action="mailto:contact@mon-agenceweb.fr"
                method="GET"
                className="space-y-6"
              >
                {/* Nom */}
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-semibold text-dark mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-dark mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jean@exemple.fr"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-semibold text-dark mb-2"
                  >
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="body"
                    className="block text-sm font-semibold text-dark mb-2"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    required
                    rows={5}
                    placeholder="Décrivez votre projet en quelques lignes..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  Envoyer le message
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Side info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Email */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-1">Email</h3>
              <a
                href="mailto:contact@mon-agenceweb.fr"
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                contact@mon-agenceweb.fr
              </a>
            </div>

            {/* Response time */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-1">
                Temps de réponse
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nous nous engageons à vous répondre sous{" "}
                <span className="font-semibold text-dark">24 heures</span>{" "}
                ouvrées maximum. La plupart du temps, notre réponse arrive dans
                les 2 heures.
              </p>
            </div>

            {/* Engagement */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-1">
                Sans engagement
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Le premier échange est gratuit et sans engagement. Nous prenons
                le temps de comprendre votre projet avant toute proposition
                commerciale.
              </p>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* FAQ */}
      <SectionBlock>
        <FAQ
          title="Questions fréquentes"
          subtitle="Les réponses aux questions que vous vous posez peut-être"
          items={faqItems}
        />
      </SectionBlock>
    </>
  );
}
