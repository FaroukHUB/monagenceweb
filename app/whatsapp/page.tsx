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
  title: "WhatsApp Business Automation",
  description:
    "Automatisez votre communication client avec WhatsApp Business. Réponses instantanées, catalogues produits, et campagnes ciblées pour booster vos ventes.",
  path: "/whatsapp",
});

const faqItems = [
  {
    question: "Faut-il un numéro de téléphone dédié pour WhatsApp Business ?",
    answer:
      "Oui, nous vous aidons à configurer un numéro professionnel dédié pour votre compte WhatsApp Business. Cela permet de séparer vos communications personnelles et professionnelles, et de bénéficier de toutes les fonctionnalités avancées comme le profil entreprise vérifié.",
  },
  {
    question: "Est-ce que mes clients doivent installer une application spéciale ?",
    answer:
      "Non, vos clients utilisent simplement WhatsApp, l'application qu'ils ont déjà sur leur téléphone. Aucune installation supplémentaire n'est nécessaire de leur côté. C'est l'un des grands avantages : vous touchez vos clients là où ils sont déjà.",
  },
  {
    question: "Combien de messages puis-je envoyer par mois ?",
    answer:
      "Le nombre de messages dépend de votre formule. La formule Starter inclut jusqu'à 1 000 conversations par mois, la formule Growth jusqu'à 5 000, et la formule Pro est illimitée. Chaque conversation correspond à un échange de 24h avec un client.",
  },
  {
    question: "Peut-on intégrer WhatsApp à notre site web ou CRM existant ?",
    answer:
      "Absolument. Nous intégrons WhatsApp Business à votre site web avec un bouton de chat, et nous pouvons connecter l'outil à votre CRM, votre outil de facturation ou votre plateforme e-commerce pour centraliser toute votre relation client.",
  },
  {
    question: "Quel est le délai de mise en place ?",
    answer:
      "La mise en place complète prend entre 5 et 10 jours ouvrés selon la formule choisie. Cela inclut la configuration du compte, la création des réponses automatiques, l'intégration à vos outils existants et la formation de votre équipe.",
  },
  {
    question: "Est-ce conforme au RGPD ?",
    answer:
      "Oui, nous mettons en place toutes les mesures nécessaires pour respecter le RGPD : consentement explicite des contacts, politique de confidentialité adaptée, et possibilité de désinscription à tout moment. Vos données restent hébergées en Europe.",
  },
];

export default function WhatsAppPage() {
  const serviceSchema = generateServiceSchema(
    "WhatsApp Business Automation",
    "Automatisez votre communication client avec WhatsApp Business. Réponses instantanées, catalogues produits, et campagnes ciblées pour booster vos ventes.",
    "/whatsapp"
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
        title="Transformez WhatsApp en machine à vendre"
        highlight="Automatisez, engagez, vendez."
        subtitle="Vos clients sont déjà sur WhatsApp. Utilisez-le pour répondre instantanément, envoyer vos offres et conclure des ventes — même quand vous dormez."
        ctaPrimary={{ label: "Lancer mon projet WhatsApp", href: "/contact" }}
        ctaSecondary={{ label: "Voir les tarifs", href: "#tarifs" }}
      />

      {/* Features */}
      <SectionBlock bg="gray">
        <FeatureCards
          title="Pourquoi WhatsApp Business change la donne"
          subtitle="Un canal direct, personnel et ultra-efficace pour communiquer avec vos clients"
          features={[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Réponses instantanées 24h/24",
              description:
                "Ne laissez plus jamais un client sans réponse. Des messages automatiques intelligents répondent à vos clients en quelques secondes, jour et nuit.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Relation client personnalisée",
              description:
                "Chaque client reçoit des messages adaptés à ses besoins. Segmentez vos contacts et envoyez le bon message à la bonne personne au bon moment.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              ),
              title: "Catalogue produits intégré",
              description:
                "Présentez vos produits et services directement dans WhatsApp. Vos clients parcourent, choisissent et commandent sans quitter la conversation.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Taux d'ouverture de 98%",
              description:
                "Contrairement aux emails qui finissent en spam, vos messages WhatsApp sont lus quasi systématiquement. C'est le canal avec le meilleur taux d'engagement.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
              title: "Campagnes automatisées",
              description:
                "Programmez des campagnes de relance, des offres promotionnelles ou des rappels de rendez-vous. Tout se fait automatiquement selon vos scénarios.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Profil vérifié et professionnel",
              description:
                "Affichez un profil d'entreprise vérifié avec votre logo, vos horaires et votre adresse. Vos clients savent immédiatement qu'ils parlent à une entreprise sérieuse.",
            },
          ]}
        />
      </SectionBlock>

      {/* Steps */}
      <SectionBlock>
        <StepsSection
          title="Comment on met en place votre WhatsApp Business"
          subtitle="Un processus simple pour être opérationnel rapidement"
          steps={[
            {
              number: "1",
              title: "Audit de vos besoins",
              description:
                "On analyse votre activité, vos clients et vos objectifs pour définir la meilleure stratégie WhatsApp.",
            },
            {
              number: "2",
              title: "Configuration complète",
              description:
                "On crée votre profil professionnel, vos réponses automatiques et vos scénarios de messages.",
            },
            {
              number: "3",
              title: "Intégration à vos outils",
              description:
                "On connecte WhatsApp à votre site web, votre CRM et vos autres outils pour tout centraliser.",
            },
            {
              number: "4",
              title: "Formation et lancement",
              description:
                "On forme votre équipe et on lance le tout. Vous êtes autonome, et on reste disponible si besoin.",
            },
          ]}
        />
      </SectionBlock>

      {/* Pricing */}
      <SectionBlock bg="gray" id="tarifs">
        <PricingCards
          title="Des formules adaptées à chaque entreprise"
          subtitle="Choisissez l'offre qui correspond à vos besoins et votre volume de clients"
          plans={[
            {
              name: "Starter",
              price: "190\u202F\u20AC HT",
              period: "/mois",
              description:
                "Idéal pour les petites entreprises qui veulent démarrer sur WhatsApp Business.",
              features: [
                "Profil WhatsApp Business vérifié",
                "Jusqu'à 1 000 conversations/mois",
                "5 réponses automatiques personnalisées",
                "Bouton WhatsApp sur votre site web",
                "Catalogue produits de base",
                "Support par email",
              ],
              ctaLabel: "Commencer avec Starter",
              ctaHref: "/contact",
            },
            {
              name: "Growth",
              price: "390\u202F\u20AC HT",
              period: "/mois",
              description:
                "Pour les entreprises en croissance qui veulent automatiser leur relation client.",
              features: [
                "Tout ce qui est inclus dans Starter",
                "Jusqu'à 5 000 conversations/mois",
                "Scénarios de relance automatisés",
                "Segmentation de vos contacts",
                "Campagnes promotionnelles ciblées",
                "Intégration CRM",
                "Statistiques détaillées",
                "Support prioritaire",
              ],
              highlighted: true,
              ctaLabel: "Choisir Growth",
              ctaHref: "/contact",
            },
            {
              name: "Pro",
              price: "690\u202F\u20AC HT",
              period: "/mois",
              description:
                "La solution complète pour les entreprises qui veulent tout automatiser.",
              features: [
                "Tout ce qui est inclus dans Growth",
                "Conversations illimitées",
                "Chatbot intelligent avec IA",
                "Intégration e-commerce avancée",
                "Multi-agents (plusieurs opérateurs)",
                "API personnalisée",
                "Rapports et analytics avancés",
                "Account manager dédié",
              ],
              ctaLabel: "Passer au Pro",
              ctaHref: "/contact",
            },
          ]}
        />
      </SectionBlock>

      {/* FAQ */}
      <SectionBlock>
        <FAQ
          title="Vos questions sur WhatsApp Business"
          subtitle="Tout ce que vous devez savoir avant de vous lancer"
          items={faqItems}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Prêt à vendre sur WhatsApp ?"
        subtitle="Discutons de votre projet et mettons en place votre solution WhatsApp Business en moins de 10 jours."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/contact"
        variant="primary"
      />
    </>
  );
}
