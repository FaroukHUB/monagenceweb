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
  title: "Solutions Intelligence Artificielle",
  description:
    "Automatisez votre business avec l'intelligence artificielle. Chatbots, analyse de données, automatisation des tâches et solutions IA sur-mesure pour PME.",
  path: "/ia",
});

const faqItems = [
  {
    question: "L'IA, c'est vraiment utile pour une petite entreprise ?",
    answer:
      "Absolument. L'IA n'est plus réservée aux grandes entreprises. Aujourd'hui, un artisan, un commerce ou une PME peut automatiser ses réponses clients, trier ses emails, générer du contenu ou analyser ses ventes grâce à des outils IA simples et accessibles. Le retour sur investissement est souvent visible dès le premier mois.",
  },
  {
    question: "Est-ce que l'IA va remplacer mes employés ?",
    answer:
      "Non, l'objectif n'est pas de remplacer votre équipe mais de la libérer des tâches répétitives. L'IA gère les demandes simples, le tri d'informations et les relances automatiques, pendant que vos collaborateurs se concentrent sur ce qui a vraiment de la valeur : la relation client, la créativité et la prise de décision.",
  },
  {
    question: "Combien de temps faut-il pour mettre en place une solution IA ?",
    answer:
      "Cela dépend de la complexité du projet. Un chatbot simple peut être opérationnel en une semaine. Une solution d'automatisation complète avec intégration à vos outils prend généralement 2 à 4 semaines. Nous travaillons par étapes pour que vous puissiez voir des résultats rapidement.",
  },
  {
    question: "Mes données sont-elles protégées ?",
    answer:
      "La sécurité de vos données est notre priorité absolue. Toutes les solutions que nous déployons respectent le RGPD. Vos données sont hébergées en Europe, chiffrées et ne sont jamais partagées avec des tiers. Vous gardez le contrôle total sur vos informations.",
  },
  {
    question: "Faut-il des compétences techniques pour utiliser les outils IA ?",
    answer:
      "Non, nous concevons des solutions simples à utiliser au quotidien. Nous formons votre équipe et fournissons une documentation claire. L'interface est pensée pour que n'importe quel membre de votre équipe puisse l'utiliser sans formation technique.",
  },
  {
    question: "Peut-on intégrer l'IA à nos outils existants ?",
    answer:
      "Oui, c'est même notre spécialité. Nous connectons les solutions IA à vos outils actuels : CRM, site web, plateforme e-commerce, logiciel de facturation, outils de communication. L'objectif est de créer un écosystème fluide sans changer vos habitudes de travail.",
  },
];

export default function IAPage() {
  const serviceSchema = generateServiceSchema(
    "Solutions Intelligence Artificielle",
    "Automatisez votre business avec l'intelligence artificielle. Chatbots, analyse de données, automatisation des tâches et solutions IA sur-mesure pour PME.",
    "/ia"
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
        title="L'intelligence artificielle au service de votre business"
        highlight="Travaillez moins, vendez plus."
        subtitle="Automatisez les tâches répétitives, répondez à vos clients 24h/24 et prenez de meilleures décisions grâce à des solutions IA conçues pour les PME."
        ctaPrimary={{ label: "Découvrir nos solutions IA", href: "/contact" }}
        ctaSecondary={{ label: "Voir les tarifs", href: "#tarifs" }}
      />

      {/* Features */}
      <SectionBlock bg="gray">
        <FeatureCards
          title="Ce que l'IA peut faire pour votre entreprise"
          subtitle="Des solutions concrètes qui transforment votre façon de travailler au quotidien"
          features={[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              ),
              title: "Chatbot intelligent",
              description:
                "Un assistant virtuel qui répond à vos clients en langage naturel, qualifie les demandes et prend des rendez-vous. Disponible 24h/24, 7j/7.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
              title: "Automatisation des tâches",
              description:
                "Libérez votre équipe des tâches répétitives : tri des emails, relances clients, mise à jour de fichiers, génération de rapports. L'IA s'en charge.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Analyse prédictive",
              description:
                "Anticipez les tendances de votre marché, identifiez vos meilleurs clients et optimisez vos stocks grâce à l'analyse intelligente de vos données.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ),
              title: "Génération de contenu",
              description:
                "Créez des descriptions produits, des articles de blog, des posts réseaux sociaux et des emails marketing en quelques clics grâce à l'IA.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              ),
              title: "Qualification des leads",
              description:
                "L'IA analyse et classe automatiquement vos prospects selon leur potentiel. Votre équipe commerciale se concentre sur les contacts les plus chauds.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "Intégration sur-mesure",
              description:
                "Nos solutions s'intègrent à vos outils existants : CRM, e-commerce, comptabilité, planning. Pas besoin de tout changer, on s'adapte à votre façon de travailler.",
            },
          ]}
        />
      </SectionBlock>

      {/* Steps */}
      <SectionBlock>
        <StepsSection
          title="Comment on intègre l'IA dans votre entreprise"
          subtitle="Une approche progressive et sans risque pour adopter l'intelligence artificielle"
          steps={[
            {
              number: "1",
              title: "Diagnostic gratuit",
              description:
                "On identifie ensemble les tâches que l'IA peut automatiser dans votre entreprise et le retour sur investissement attendu.",
            },
            {
              number: "2",
              title: "Solution sur-mesure",
              description:
                "On conçoit la solution adaptée à vos besoins, avec un planning clair et un budget défini sans surprise.",
            },
            {
              number: "3",
              title: "Déploiement progressif",
              description:
                "On met en place la solution par étapes, avec des tests et validations à chaque phase pour garantir le résultat.",
            },
            {
              number: "4",
              title: "Formation et suivi",
              description:
                "On forme votre équipe et on assure un suivi régulier pour optimiser les performances de votre solution IA.",
            },
          ]}
        />
      </SectionBlock>

      {/* Pricing */}
      <SectionBlock bg="gray" id="tarifs">
        <PricingCards
          title="Investissez dans l'IA, récoltez les résultats"
          subtitle="Des formules claires pour intégrer l'intelligence artificielle dans votre quotidien"
          plans={[
            {
              name: "Starter",
              price: "390\u202F\u20AC HT",
              period: "/mois",
              description:
                "Pour les entreprises qui veulent démarrer avec un chatbot et des automatisations simples.",
              features: [
                "Chatbot IA pour votre site web",
                "Jusqu'à 500 conversations/mois",
                "5 scénarios d'automatisation",
                "Réponses personnalisées",
                "Tableau de bord de suivi",
                "Support par email",
              ],
              ctaLabel: "Commencer avec Starter",
              ctaHref: "/contact",
            },
            {
              name: "Growth",
              price: "790\u202F\u20AC HT",
              period: "/mois",
              description:
                "Pour les entreprises qui veulent automatiser davantage et exploiter leurs données.",
              features: [
                "Tout ce qui est inclus dans Starter",
                "Jusqu'à 2 000 conversations/mois",
                "Automatisations illimitées",
                "Intégration CRM et outils métier",
                "Qualification automatique des leads",
                "Génération de contenu IA",
                "Analyse de données et rapports",
                "Support prioritaire",
              ],
              highlighted: true,
              ctaLabel: "Choisir Growth",
              ctaHref: "/contact",
            },
            {
              name: "Pro",
              price: "1\u202F490\u202F\u20AC HT",
              period: "/mois",
              description:
                "La solution IA complète pour les entreprises ambitieuses qui veulent tout automatiser.",
              features: [
                "Tout ce qui est inclus dans Growth",
                "Conversations illimitées",
                "IA entraînée sur vos données métier",
                "Analyse prédictive avancée",
                "Intégrations API sur-mesure",
                "Multi-canaux (web, WhatsApp, email)",
                "Formation équipe approfondie",
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
          title="Vos questions sur nos solutions IA"
          subtitle="Tout ce que vous devez savoir avant de vous lancer"
          items={faqItems}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Prêt à automatiser votre business avec l'IA ?"
        subtitle="Réservez un diagnostic gratuit et découvrez comment l'IA peut transformer votre entreprise en moins de 30 jours."
        ctaLabel="Obtenir mon diagnostic gratuit"
        ctaHref="/contact"
        variant="dark"
      />
    </>
  );
}
