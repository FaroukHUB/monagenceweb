import HeroSection from "@/components/HeroSection";
import SectionBlock from "@/components/SectionBlock";
import IconCards from "@/components/IconCards";
import FeatureCards from "@/components/FeatureCards";
import CTASection from "@/components/CTASection";
import { generatePageMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Nos services — Création web, SEO, WhatsApp, IA & Mailing",
  description:
    "Découvrez tous nos services pour développer votre activité en ligne : sites web qui vendent, référencement Google, WhatsApp Business, intelligence artificielle et campagnes mailing.",
  path: "/services",
});

export default function ServicesPage() {
  const pageSchema = generateWebPageSchema(
    "Nos services — Mon Agence Web",
    "Découvrez tous nos services pour développer votre activité en ligne : sites web qui vendent, référencement Google, WhatsApp Business, intelligence artificielle et campagnes mailing.",
    "/services"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <HeroSection
        title="Nos services"
        highlight="pour faire grandir votre business"
        subtitle="Chaque entreprise est différente. C'est pourquoi nous proposons des solutions sur-mesure qui s'adaptent à vos besoins et à votre budget. Du site internet au référencement, en passant par l'IA et le mailing, on s'occupe de tout."
        ctaPrimary={{ label: "Parler de mon projet", href: "/contact" }}
        ctaSecondary={{ label: "Voir nos tarifs", href: "/offres" }}
        withImage={false}
      />

      {/* All services */}
      <SectionBlock bg="gray">
        <IconCards
          title="Des solutions complètes pour votre réussite en ligne"
          subtitle="Chaque service est pensé pour vous apporter des résultats concrets et mesurables"
          cards={[
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
              title: "Sites qui vendent",
              description:
                "Des sites web modernes, rapides et pensés pour convertir vos visiteurs en clients. Design professionnel, contenu optimisé et expérience utilisateur soignée.",
              href: "/sites-qui-vendent",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              ),
              title: "Référencement Google",
              description:
                "Apparaissez en première page quand vos futurs clients cherchent vos produits ou services. Un trafic qualifié, durable et gratuit.",
              href: "/google",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              ),
              title: "WhatsApp Business",
              description:
                "Transformez WhatsApp en un vrai canal de vente. Répondez à vos clients en temps réel, automatisez vos messages et générez plus de ventes.",
              href: "/whatsapp",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              ),
              title: "Intelligence artificielle",
              description:
                "Gagnez du temps et de l'argent grâce à des solutions IA sur-mesure. Chatbots, automatisations, analyse de données : l'IA travaille pour vous 24h/24.",
              href: "/ia",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
              title: "Campagnes mailing",
              description:
                "Des campagnes email qui arrivent en boite de réception (pas en spam) et qui donnent envie de cliquer. Fidélisez vos clients et boostez vos ventes.",
              href: "/mailing",
            },
          ]}
          columns={3}
        />
      </SectionBlock>

      {/* Why choose us */}
      <SectionBlock>
        <FeatureCards
          title="Pourquoi travailler avec nous ?"
          subtitle="Ce qui nous rend différents"
          features={[
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: "Des prix clairs, sans surprise",
              description:
                "Vous savez exactement ce que vous payez avant de commencer. Pas de frais cachés, pas de mauvaise surprise en fin de projet.",
            },
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
              title: "Des résultats, pas du blabla",
              description:
                "On ne vous vend pas du vent. Chaque action est pensée pour vous apporter des clients, du chiffre d'affaires et de la croissance.",
            },
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ),
              title: "Un vrai accompagnement humain",
              description:
                "Vous avez un interlocuteur dédié qui parle votre langue (pas de jargon technique) et qui est disponible quand vous avez besoin.",
            },
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Livraison rapide",
              description:
                "On sait que votre temps est précieux. Nos projets sont livrés dans les délais annoncés, sans traîner.",
            },
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              ),
              title: "Technologies modernes",
              description:
                "On utilise les dernières technologies du marché pour vous garantir un site rapide, sécurisé et qui évolue avec votre activité.",
            },
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              ),
              title: "Suivi et reporting",
              description:
                "Des rapports clairs et réguliers pour suivre vos performances. Vous savez toujours exactement où vous en êtes.",
            },
          ]}
          columns={3}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Vous ne savez pas par où commencer ?"
        subtitle="Pas de souci. Prenez 15 minutes avec nous, on vous aide à définir la meilleure stratégie pour votre entreprise. C'est gratuit et sans engagement."
        ctaLabel="Prendre rendez-vous"
        ctaHref="/contact"
      />
    </>
  );
}
