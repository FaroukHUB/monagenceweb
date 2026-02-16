import HeroSection from "@/components/HeroSection";
import SectionBlock from "@/components/SectionBlock";
import FeatureCards from "@/components/FeatureCards";
import PricingCards from "@/components/PricingCards";
import StepsSection from "@/components/StepsSection";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { generatePageMetadata } from "@/lib/metadata";
import { generateServiceSchema, generateFAQSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Référencement Google (SEO) — Soyez visible quand ça compte",
  description:
    "Améliorez votre positionnement sur Google et attirez des clients qualifiés. Audit SEO, optimisation technique, création de contenu et suivi mensuel. À partir de 290€ HT/mois.",
  path: "/google",
});

const faqItems = [
  {
    question: "Combien de temps faut-il pour voir des résultats en SEO ?",
    answer:
      "Le référencement est un travail de fond. Les premiers résultats apparaissent généralement entre 2 et 4 mois. Les résultats les plus significatifs arrivent entre 6 et 12 mois. Contrairement à la publicité, les résultats du SEO sont durables et continuent de porter leurs fruits longtemps après.",
  },
  {
    question: "Quelle est la différence entre SEO et publicité Google ?",
    answer:
      "La publicité Google (Google Ads) vous donne des résultats immédiats mais dès que vous arrêtez de payer, vous disparaissez. Le SEO (référencement naturel) prend plus de temps mais les résultats sont durables et le trafic est gratuit. Idéalement, les deux se complètent.",
  },
  {
    question: "Est-ce que vous garantissez la première position sur Google ?",
    answer:
      "Personne ne peut honnêtement garantir la première position sur Google. En revanche, on vous garantit une méthodologie éprouvée, un travail sérieux et des résultats mesurables. Nos clients constatent en moyenne une augmentation de 150% de leur trafic organique en 6 mois.",
  },
  {
    question: "Mon site doit-il déjà exister pour bénéficier du SEO ?",
    answer:
      "Oui, il vous faut un site web pour travailler le référencement. Si vous n'en avez pas encore, on peut combiner la création de votre site et le référencement pour que tout soit optimisé dès le départ. C'est d'ailleurs la meilleure approche.",
  },
  {
    question: "Que comprend le suivi mensuel ?",
    answer:
      "Chaque mois, vous recevez un rapport détaillé avec l'évolution de vos positions, le trafic généré, les mots-clés qui progressent et les actions réalisées. On se retrouve aussi pour un point téléphonique afin de discuter des résultats et ajuster la stratégie si besoin.",
  },
  {
    question: "Est-ce que je suis engagé sur une longue durée ?",
    answer:
      "Nos contrats sont de 6 mois minimum, car c'est le temps nécessaire pour obtenir des résultats significatifs en SEO. Après cette période, vous êtes libre de continuer ou d'arrêter, sans frais de résiliation.",
  },
];

export default function GooglePage() {
  const serviceSchema = generateServiceSchema(
    "Référencement Google (SEO)",
    "Service de référencement naturel pour améliorer votre visibilité sur Google. Audit SEO, optimisation technique, création de contenu et suivi mensuel des performances.",
    "/google"
  );

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <HeroSection
        title="Soyez visible sur Google quand vos clients vous cherchent"
        subtitle="93% des expériences en ligne commencent par une recherche Google. Si votre entreprise n'apparaît pas dans les premiers résultats, vos concurrents récupèrent vos clients. On change ça."
        ctaPrimary={{ label: "Obtenir un audit SEO gratuit", href: "/contact" }}
        ctaSecondary={{ label: "Voir les formules", href: "#tarifs" }}
      />

      {/* Features */}
      <SectionBlock bg="gray">
        <FeatureCards
          title="Pourquoi investir dans le référencement Google ?"
          subtitle="Le SEO est le levier le plus rentable pour attirer des clients sur le long terme"
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ),
              title: "Des clients qui viennent à vous",
              description:
                "Les gens qui cherchent sur Google ont déjà un besoin. Ils sont prêts à acheter. Vous n'avez plus à les convaincre, juste à être visible au bon moment.",
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Du trafic gratuit et durable",
              description:
                "Contrairement à la publicité, le trafic SEO ne s'arrête pas quand vous arrêtez de payer. C'est un investissement qui continue de rapporter mois après mois.",
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: "Crédibilité et confiance",
              description:
                "Les gens font confiance aux premiers résultats Google. Être bien positionné, c'est envoyer un signal fort : votre entreprise est sérieuse et reconnue.",
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
              title: "Résultats mesurables",
              description:
                "Positions, trafic, conversions : tout est mesuré et transparent. Vous savez exactement ce que le SEO vous rapporte chaque mois.",
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ),
              title: "Avantage concurrentiel",
              description:
                "Vos concurrents investissent déjà dans le SEO. Chaque jour sans référencement, c'est du terrain perdu. On vous aide à reprendre l'avantage.",
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Visibilité locale et nationale",
              description:
                "Que vos clients soient à côté de chez vous ou partout en France, on optimise votre visibilité là où ça compte pour votre activité.",
            },
          ]}
          columns={3}
        />
      </SectionBlock>

      {/* Pricing */}
      <SectionBlock id="tarifs">
        <PricingCards
          title="Des formules de référencement adaptées à vos ambitions"
          subtitle="Un accompagnement mensuel pour des résultats durables"
          plans={[
            {
              name: "Starter",
              price: "290€ HT",
              period: "/mois",
              description:
                "Pour les entreprises qui veulent poser les bases d'un bon référencement et commencer à attirer du trafic qualifié.",
              features: [
                "Audit SEO complet de votre site",
                "Recherche de mots-clés (jusqu'à 20)",
                "Optimisation technique du site",
                "Optimisation de 5 pages existantes",
                "Inscription Google Business Profile",
                "Rapport mensuel de positionnement",
                "1 point téléphonique par mois",
              ],
              ctaLabel: "Choisir Starter",
              ctaHref: "/contact",
            },
            {
              name: "Growth",
              price: "590€ HT",
              period: "/mois",
              description:
                "Pour les entreprises qui veulent accélérer leur croissance et dominer les résultats de recherche sur leurs mots-clés principaux.",
              features: [
                "Tout ce qui est dans Starter",
                "Recherche de mots-clés (jusqu'à 50)",
                "Optimisation de 10 pages par mois",
                "Rédaction de 4 articles de blog/mois",
                "Stratégie de liens (netlinking)",
                "Optimisation Google Business Profile",
                "Analyse de la concurrence",
                "Rapport détaillé et point hebdomadaire",
              ],
              highlighted: true,
              ctaLabel: "Choisir Growth",
              ctaHref: "/contact",
            },
            {
              name: "Pro",
              price: "990€ HT",
              period: "/mois",
              description:
                "Pour les entreprises ambitieuses qui veulent une stratégie SEO complète et agressive pour conquérir leur marché.",
              features: [
                "Tout ce qui est dans Growth",
                "Mots-clés illimités",
                "Optimisation de pages illimitée",
                "Rédaction de 8 articles de blog/mois",
                "Stratégie de netlinking avancée",
                "Optimisation du taux de conversion",
                "Suivi de la concurrence en temps réel",
                "Consultant SEO dédié",
                "Rapport et point stratégique hebdomadaire",
              ],
              ctaLabel: "Choisir Pro",
              ctaHref: "/contact",
            },
          ]}
        />
      </SectionBlock>

      {/* Steps */}
      <SectionBlock bg="gray">
        <StepsSection
          title="Comment on propulse votre site sur Google"
          subtitle="Une méthode éprouvée en 4 étapes pour des résultats concrets"
          steps={[
            {
              number: "1",
              title: "Audit complet",
              description:
                "On analyse votre site, votre marché et vos concurrents pour identifier les meilleures opportunités de positionnement.",
            },
            {
              number: "2",
              title: "Stratégie sur-mesure",
              description:
                "On définit ensemble les mots-clés prioritaires et le plan d'action pour les mois à venir. Tout est clair et validé.",
            },
            {
              number: "3",
              title: "Optimisation continue",
              description:
                "Chaque mois, on optimise votre site, on crée du contenu de qualité et on développe votre autorité en ligne.",
            },
            {
              number: "4",
              title: "Suivi et ajustement",
              description:
                "On mesure les résultats, on vous les partage et on ajuste la stratégie pour maximiser votre retour sur investissement.",
            },
          ]}
        />
      </SectionBlock>

      {/* FAQ */}
      <SectionBlock>
        <FAQ
          title="Questions fréquentes sur le référencement Google"
          subtitle="Les réponses aux questions que vous vous posez sur le SEO"
          items={faqItems}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Prêt à apparaître en première page de Google ?"
        subtitle="Recevez un audit SEO gratuit de votre site en moins de 48h. On vous montre exactement ce qui vous empêche d'être visible."
        ctaLabel="Obtenir mon audit SEO gratuit"
        ctaHref="/contact"
        variant="dark"
      />
    </>
  );
}
