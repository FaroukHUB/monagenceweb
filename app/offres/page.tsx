import HeroSection from "@/components/HeroSection";
import SectionBlock from "@/components/SectionBlock";
import PricingCards from "@/components/PricingCards";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { generatePageMetadata } from "@/lib/metadata";
import { generateWebPageSchema, generateFAQSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Nos offres et tarifs",
  description:
    "Des offres claires et transparentes pour la création de sites web, le référencement Google, WhatsApp Business, l'intelligence artificielle et les campagnes mailing. À partir de 80 € TTC.",
  path: "/offres",
});

const faqItems = [
  {
    question: "Les prix affichés sont-ils définitifs ?",
    answer:
      "Oui, nos tarifs sont transparents et sans surprise. Le prix indiqué est le prix que vous payez. Aucun frais caché ne sera ajouté en cours de projet.",
  },
  {
    question: "Puis-je changer de formule en cours de route ?",
    answer:
      "Absolument. Vous pouvez passer à une formule supérieure à tout moment. Nous ajustons simplement la différence de tarif au prorata.",
  },
  {
    question: "Proposez-vous des facilités de paiement ?",
    answer:
      "Oui, pour les projets de création de site web, nous proposons un paiement en 2 ou 3 fois sans frais. Pour les abonnements mensuels, le prélèvement est automatique chaque mois.",
  },
  {
    question: "Y a-t-il un engagement sur les formules mensuelles ?",
    answer:
      "Nos formules SEO, WhatsApp et IA sont sans engagement de durée. Nous recommandons cependant un minimum de 3 mois pour observer des résultats significatifs.",
  },
  {
    question: "Que se passe-t-il si mes besoins ne correspondent à aucune formule ?",
    answer:
      "Contactez-nous pour un devis sur-mesure. Nous adaptons nos services à vos besoins spécifiques et à votre budget.",
  },
  {
    question: "Les formules incluent-elles le support technique ?",
    answer:
      "Oui, chaque formule inclut un support par email. Les formules Growth et Pro bénéficient en plus d'un accompagnement prioritaire et d'un interlocuteur dédié.",
  },
];

export default function OffresPage() {
  const pageSchema = generateWebPageSchema(
    "Nos offres et tarifs",
    "Des offres claires et transparentes pour tous vos besoins digitaux.",
    "/offres"
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
        title="Des offres claires, adaptées à vos ambitions"
        subtitle="Des tarifs transparents, sans surprise. Choisissez la formule qui correspond à vos objectifs et à votre budget. Chaque euro investi est un euro qui travaille pour votre croissance."
        ctaPrimary={{ label: "Parler de mon projet", href: "/contact" }}
        ctaSecondary={{ label: "Voir nos services", href: "/services" }}
        withImage={false}
      />

      {/* Sites web */}
      <SectionBlock bg="gray" id="sites-web">
        <PricingCards
          title="Création de sites web"
          subtitle="Un site professionnel qui convertit vos visiteurs en clients"
          plans={[
            {
              name: "Starter",
              price: "490 €",
              period: "HT",
              description:
                "Idéal pour les indépendants et les petites entreprises qui veulent une présence en ligne efficace.",
              features: [
                "Site one-page responsive",
                "Design moderne et professionnel",
                "Formulaire de contact",
                "Optimisation SEO de base",
                "Hébergement 1 an inclus",
                "Mise en ligne sous 7 jours",
              ],
              ctaLabel: "Choisir Starter",
              ctaHref: "/contact",
            },
            {
              name: "Growth",
              price: "990 €",
              period: "HT",
              description:
                "Pour les entreprises qui veulent un site complet avec plusieurs pages et des fonctionnalités avancées.",
              features: [
                "Site multi-pages (jusqu'à 5 pages)",
                "Design sur-mesure premium",
                "Blog intégré",
                "Formulaires avancés",
                "Optimisation SEO complète",
                "Hébergement 1 an inclus",
                "Formation à la gestion du site",
                "Support prioritaire 3 mois",
              ],
              highlighted: true,
              ctaLabel: "Choisir Growth",
              ctaHref: "/contact",
            },
            {
              name: "Pro",
              price: "1 890 €",
              period: "HT",
              description:
                "La solution complète pour les entreprises ambitieuses avec des besoins spécifiques.",
              features: [
                "Site sur-mesure illimité",
                "Design premium exclusif",
                "Fonctionnalités avancées (réservation, paiement...)",
                "Blog et espace ressources",
                "SEO technique approfondi",
                "Hébergement 1 an inclus",
                "Formation complète",
                "Support prioritaire 6 mois",
                "Intégration outils métier",
              ],
              ctaLabel: "Choisir Pro",
              ctaHref: "/contact",
            },
          ]}
        />
      </SectionBlock>

      {/* SEO Google */}
      <SectionBlock id="seo">
        <PricingCards
          title="Référencement Google (SEO)"
          subtitle="Apparaissez en première page de Google et attirez des clients qualifiés"
          plans={[
            {
              name: "Starter",
              price: "290 €",
              period: "HT / mois",
              description:
                "Pour démarrer votre visibilité sur Google avec les fondamentaux du référencement.",
              features: [
                "Audit SEO initial",
                "Optimisation de 5 pages",
                "Recherche de mots-clés",
                "Optimisation technique de base",
                "Rapport mensuel de performance",
                "1 article de blog optimisé / mois",
              ],
              ctaLabel: "Choisir Starter",
              ctaHref: "/contact",
            },
            {
              name: "Growth",
              price: "590 €",
              period: "HT / mois",
              description:
                "Une stratégie SEO complète pour dominer votre marché local ou national.",
              features: [
                "Audit SEO approfondi",
                "Optimisation de 15 pages",
                "Stratégie de mots-clés avancée",
                "Optimisation technique complète",
                "Netlinking (5 backlinks / mois)",
                "4 articles de blog optimisés / mois",
                "Rapport bi-mensuel détaillé",
                "Accompagnement stratégique",
              ],
              highlighted: true,
              ctaLabel: "Choisir Growth",
              ctaHref: "/contact",
            },
            {
              name: "Pro",
              price: "990 €",
              period: "HT / mois",
              description:
                "Le référencement haut de gamme pour les entreprises qui visent la première place.",
              features: [
                "Audit SEO complet + concurrentiel",
                "Optimisation illimitée",
                "Stratégie de contenu sur-mesure",
                "Optimisation technique avancée",
                "Netlinking premium (15 backlinks / mois)",
                "8 articles de blog optimisés / mois",
                "Rapport hebdomadaire",
                "Consultant SEO dédié",
                "Veille concurrentielle",
              ],
              ctaLabel: "Choisir Pro",
              ctaHref: "/contact",
            },
          ]}
        />
      </SectionBlock>

      {/* WhatsApp Business */}
      <SectionBlock bg="gray" id="whatsapp">
        <PricingCards
          title="WhatsApp Business"
          subtitle="Transformez WhatsApp en un canal de vente et de relation client performant"
          plans={[
            {
              name: "Starter",
              price: "190 €",
              period: "HT",
              description:
                "Configuration initiale de votre compte WhatsApp Business pour bien démarrer.",
              features: [
                "Configuration du compte WhatsApp Business",
                "Création du catalogue produits",
                "Messages automatiques de bienvenue",
                "Réponses rapides prédéfinies",
                "Formation à l'utilisation",
                "Guide des bonnes pratiques",
              ],
              ctaLabel: "Choisir Starter",
              ctaHref: "/contact",
            },
            {
              name: "Growth",
              price: "390 €",
              period: "HT / mois",
              description:
                "Une stratégie WhatsApp complète pour automatiser et développer vos ventes.",
              features: [
                "Tout le pack Starter inclus",
                "Chatbot intelligent personnalisé",
                "Scénarios de vente automatisés",
                "Intégration CRM",
                "Campagnes de diffusion ciblées",
                "Tableau de bord analytique",
                "Support et optimisation mensuelle",
                "A/B testing des messages",
              ],
              highlighted: true,
              ctaLabel: "Choisir Growth",
              ctaHref: "/contact",
            },
            {
              name: "Pro",
              price: "690 €",
              period: "HT / mois",
              description:
                "La solution complète pour les entreprises avec un fort volume de conversations.",
              features: [
                "Tout le pack Growth inclus",
                "API WhatsApp Business avancée",
                "Multi-agents (jusqu'à 10 opérateurs)",
                "Chatbot IA avancé avec NLP",
                "Automatisation complète du parcours client",
                "Intégrations sur-mesure",
                "Reporting avancé et KPIs",
                "Chef de projet dédié",
                "Support prioritaire 7j/7",
              ],
              ctaLabel: "Choisir Pro",
              ctaHref: "/contact",
            },
          ]}
        />
      </SectionBlock>

      {/* Intelligence Artificielle */}
      <SectionBlock id="ia">
        <PricingCards
          title="Intelligence artificielle"
          subtitle="Des solutions IA sur-mesure pour automatiser et accélérer votre activité"
          plans={[
            {
              name: "Starter",
              price: "390 €",
              period: "HT",
              description:
                "Un premier pas vers l'automatisation avec des outils IA simples et efficaces.",
              features: [
                "Audit des processus automatisables",
                "1 assistant IA personnalisé",
                "Intégration à votre site web",
                "Formation à l'utilisation",
                "Base de connaissances initiale",
                "Support 30 jours inclus",
              ],
              ctaLabel: "Choisir Starter",
              ctaHref: "/contact",
            },
            {
              name: "Growth",
              price: "790 €",
              period: "HT / mois",
              description:
                "Des solutions IA avancées pour automatiser vos tâches répétitives et gagner du temps.",
              features: [
                "Tout le pack Starter inclus",
                "Jusqu'à 3 assistants IA",
                "Chatbot IA avancé pour votre site",
                "Automatisation des workflows",
                "Intégration à vos outils existants",
                "Analyse et reporting IA",
                "Optimisation mensuelle",
                "Support prioritaire",
              ],
              highlighted: true,
              ctaLabel: "Choisir Growth",
              ctaHref: "/contact",
            },
            {
              name: "Pro",
              price: "1 490 €",
              period: "HT / mois",
              description:
                "L'intelligence artificielle au service de toute votre entreprise, sans limite.",
              features: [
                "Tout le pack Growth inclus",
                "Assistants IA illimités",
                "Développement IA sur-mesure",
                "Traitement automatique de documents",
                "Analyse prédictive",
                "Intégrations API personnalisées",
                "Formation équipe complète",
                "Chef de projet IA dédié",
                "SLA garanti 99,9 %",
              ],
              ctaLabel: "Choisir Pro",
              ctaHref: "/contact",
            },
          ]}
        />
      </SectionBlock>

      {/* Mailing */}
      <SectionBlock bg="gray" id="mailing">
        <PricingCards
          title="Campagnes mailing"
          subtitle="Des emails qui arrivent en boîte de réception et génèrent des résultats"
          plans={[
            {
              name: "Campagne mailing",
              price: "80 €",
              period: "TTC",
              description:
                "Une campagne email professionnelle clé en main, de la conception à l'envoi.",
              features: [
                "Design email responsive sur-mesure",
                "Rédaction du contenu",
                "Configuration du domaine d'envoi",
                "Envoi jusqu'à 5 000 contacts",
                "Segmentation de la liste",
                "A/B testing de l'objet",
                "Rapport de performance détaillé",
                "Conseils pour améliorer vos prochaines campagnes",
              ],
              ctaLabel: "Lancer ma campagne",
              ctaHref: "/contact",
            },
          ]}
        />
      </SectionBlock>

      {/* FAQ */}
      <SectionBlock>
        <FAQ
          title="Questions sur nos offres"
          subtitle="Tout ce que vous devez savoir avant de vous lancer"
          items={faqItems}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Vous ne savez pas quelle offre choisir ?"
        subtitle="Contactez-nous pour un échange gratuit. Nous vous conseillerons la formule la plus adaptée à vos objectifs et à votre budget."
        ctaLabel="Parler à un conseiller"
        ctaHref="/contact"
      />
    </>
  );
}
