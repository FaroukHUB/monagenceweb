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
  title: "Création de sites web qui vendent — Sites internet sur-mesure",
  description:
    "Faites créer un site web professionnel qui convertit vos visiteurs en clients. Design moderne, contenu optimisé, adapté mobile. À partir de 490€ HT.",
  path: "/sites-qui-vendent",
});

const faqItems = [
  {
    question: "Combien de temps faut-il pour créer mon site ?",
    answer:
      "En général, un site vitrine est prêt en 2 à 3 semaines. Un site plus complexe avec des fonctionnalités avancées peut prendre 4 à 6 semaines. On vous donne un planning précis dès le départ.",
  },
  {
    question: "Est-ce que je pourrai modifier mon site moi-même ?",
    answer:
      "Oui, absolument. On vous livre un site avec une interface simple pour modifier vos textes, images et contenus sans aucune compétence technique. Et si vous avez besoin d'aide, on est là.",
  },
  {
    question: "Mon site sera-t-il adapté aux téléphones ?",
    answer:
      "C'est la base. Tous nos sites sont conçus en \"mobile-first\", c'est-à-dire qu'ils sont d'abord pensés pour les téléphones, puis adaptés aux tablettes et ordinateurs. Plus de 60% du trafic vient du mobile, on ne fait aucun compromis là-dessus.",
  },
  {
    question: "Qu'est-ce qui est inclus dans le prix ?",
    answer:
      "Chaque formule inclut le design sur-mesure, le développement, l'hébergement la première année, le certificat SSL (sécurité), l'optimisation pour Google et la mise en ligne. Les formules supérieures ajoutent des fonctionnalités comme le blog, les formulaires avancés ou le suivi statistique.",
  },
  {
    question: "Et si je ne suis pas satisfait du résultat ?",
    answer:
      "On travaille avec vous à chaque étape. Vous validez les maquettes avant le développement et vous pouvez demander des modifications tout au long du projet. Notre objectif, c'est que vous soyez fier de votre site.",
  },
  {
    question: "Est-ce que vous vous occupez aussi du référencement Google ?",
    answer:
      "Chaque site est optimisé techniquement pour Google (vitesse, structure, balises). Pour un travail de référencement plus poussé (création de contenu, stratégie de mots-clés, suivi mensuel), consultez notre offre dédiée au référencement Google.",
  },
];

export default function SitesQuiVendentPage() {
  const serviceSchema = generateServiceSchema(
    "Création de sites web qui vendent",
    "Création de sites internet professionnels et performants qui convertissent vos visiteurs en clients. Design sur-mesure, optimisation mobile et référencement inclus.",
    "/sites-qui-vendent"
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
        title="Des sites web qui convertissent vos visiteurs en clients"
        subtitle="Votre site web est votre meilleur commercial. Il travaille pour vous 24h/24, 7j/7. Encore faut-il qu'il soit bien fait. On crée des sites modernes, rapides et pensés pour générer des résultats concrets."
        ctaPrimary={{ label: "Demander un devis gratuit", href: "/contact" }}
        ctaSecondary={{ label: "Voir les tarifs", href: "#tarifs" }}
      />

      {/* Features */}
      <SectionBlock bg="gray">
        <FeatureCards
          title="Ce qui fait la différence de nos sites"
          subtitle="Un site web ne doit pas juste être beau. Il doit vous rapporter des clients."
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
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              ),
              title: "Conçu pour convertir",
              description:
                "Chaque page est structurée pour guider vos visiteurs vers l'action : demande de devis, appel, achat. Pas de design qui fait joli pour rien.",
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              ),
              title: "Parfait sur mobile",
              description:
                "Plus de 60% de vos visiteurs viennent du téléphone. Nos sites s'affichent parfaitement sur tous les écrans, sans aucun compromis.",
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
              title: "Ultra rapide",
              description:
                "Un site lent fait fuir les visiteurs. Nos sites se chargent en moins de 2 secondes grâce aux technologies les plus performantes du marché.",
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              ),
              title: "Optimisé pour Google",
              description:
                "Structure technique propre, balises optimisées, vitesse de chargement maximale. Votre site est prêt à bien se positionner sur Google dès le premier jour.",
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              ),
              title: "Modifiable facilement",
              description:
                "Vous pouvez modifier vos textes, ajouter des photos et mettre à jour votre site vous-même. Aucune compétence technique requise.",
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ),
              title: "Sécurisé et fiable",
              description:
                "Certificat SSL, sauvegardes automatiques, mises à jour de sécurité. Votre site et les données de vos clients sont protégés.",
            },
          ]}
          columns={3}
        />
      </SectionBlock>

      {/* Pricing */}
      <SectionBlock id="tarifs">
        <PricingCards
          title="Des formules adaptées à chaque projet"
          subtitle="Tous nos prix sont clairs et définitifs. Pas de coût caché."
          plans={[
            {
              name: "Starter",
              price: "490€ HT",
              description:
                "Idéal pour les indépendants et les petites entreprises qui veulent une présence en ligne professionnelle.",
              features: [
                "Site vitrine jusqu'à 5 pages",
                "Design moderne et sur-mesure",
                "Adapté mobile, tablette et ordinateur",
                "Formulaire de contact",
                "Optimisation de base pour Google",
                "Certificat SSL inclus",
                "Hébergement 1 an inclus",
                "Mise en ligne sous 2 semaines",
              ],
              ctaLabel: "Choisir Starter",
              ctaHref: "/contact",
            },
            {
              name: "Growth",
              price: "990€ HT",
              description:
                "Pour les entreprises qui veulent un site complet avec des fonctionnalités avancées pour générer plus de clients.",
              features: [
                "Tout ce qui est dans Starter",
                "Jusqu'à 10 pages",
                "Blog intégré",
                "Formulaires avancés (devis, réservation)",
                "Intégration Google Analytics",
                "Optimisation SEO poussée",
                "Galerie photos et vidéos",
                "Pages légales (CGV, mentions légales)",
                "Support prioritaire 3 mois",
              ],
              highlighted: true,
              ctaLabel: "Choisir Growth",
              ctaHref: "/contact",
            },
            {
              name: "Pro",
              price: "1 890€ HT",
              description:
                "La solution complète pour les entreprises ambitieuses qui veulent dominer leur marché en ligne.",
              features: [
                "Tout ce qui est dans Growth",
                "Pages illimitées",
                "Espace client / espace membre",
                "Système de réservation en ligne",
                "Intégration outils métier (CRM, paiement...)",
                "Animations et interactions avancées",
                "Stratégie de contenu initiale",
                "Formation à la gestion du site",
                "Support prioritaire 6 mois",
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
          title="Votre nouveau site en 4 étapes"
          subtitle="Un processus simple et transparent, sans prise de tête"
          steps={[
            {
              number: "1",
              title: "On fait connaissance",
              description:
                "Un premier échange gratuit pour comprendre votre activité, vos objectifs et vos besoins. On vous écoute vraiment.",
            },
            {
              number: "2",
              title: "On vous propose un plan",
              description:
                "Vous recevez une proposition détaillée avec les maquettes, le planning et le prix. Tout est clair avant de commencer.",
            },
            {
              number: "3",
              title: "On construit votre site",
              description:
                "Notre équipe crée votre site avec des points réguliers pour vous montrer l'avancement et intégrer vos retours.",
            },
            {
              number: "4",
              title: "Votre site est en ligne",
              description:
                "On met votre site en ligne, on vous forme à son utilisation et on reste disponible pour vous accompagner.",
            },
          ]}
        />
      </SectionBlock>

      {/* FAQ */}
      <SectionBlock>
        <FAQ
          title="Questions fréquentes sur la création de site"
          subtitle="Tout ce que vous devez savoir avant de vous lancer"
          items={faqItems}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Prêt à avoir un site qui vous rapporte des clients ?"
        subtitle="Recevez un devis personnalisé en moins de 24h. C'est gratuit et sans engagement."
        ctaLabel="Demander mon devis gratuit"
        ctaHref="/contact"
      />
    </>
  );
}
