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
  title: "Campagnes Emailing Professionnelles",
  description:
    "Des campagnes email qui arrivent en boîte de réception et génèrent des ventes. Conception, rédaction et envoi de vos emailings pour 80€ TTC par campagne.",
  path: "/mailing",
});

const faqItems = [
  {
    question: "Qu'est-ce qui est inclus dans les 80€ TTC ?",
    answer:
      "Le tarif de 80€ TTC comprend tout : la conception graphique de votre email, la rédaction du contenu, l'intégration technique, les tests de compatibilité sur tous les appareils, l'envoi à votre liste de contacts et un rapport détaillé des résultats (taux d'ouverture, clics, conversions).",
  },
  {
    question: "Faut-il déjà avoir une liste de contacts ?",
    answer:
      "Oui, vous devez disposer d'une liste de contacts qui ont donné leur accord pour recevoir vos communications (c'est une obligation RGPD). Si vous n'avez pas encore de liste, nous pouvons vous aider à la constituer avec des formulaires d'inscription sur votre site web.",
  },
  {
    question: "Combien de contacts puis-je atteindre par campagne ?",
    answer:
      "Notre formule à 80€ TTC inclut l'envoi jusqu'à 5 000 contacts. Au-delà, un supplément est appliqué. Contactez-nous pour un devis personnalisé si votre liste est plus importante.",
  },
  {
    question: "Mes emails ne vont pas finir en spam ?",
    answer:
      "Nous prenons toutes les mesures techniques pour maximiser la délivrabilité de vos emails : configuration des enregistrements SPF, DKIM et DMARC, nettoyage de votre liste de contacts, respect des bonnes pratiques anti-spam. Notre taux de délivrabilité moyen est supérieur à 95%.",
  },
  {
    question: "Combien de temps faut-il pour préparer une campagne ?",
    answer:
      "Comptez 3 à 5 jours ouvrés entre la validation de votre brief et l'envoi de la campagne. Cela inclut la création graphique, la rédaction, les tests et les ajustements. Pour les campagnes urgentes, nous proposons un délai express sous 48h.",
  },
  {
    question: "Puis-je voir le résultat avant l'envoi ?",
    answer:
      "Bien sûr. Vous recevez un aperçu complet de votre campagne pour validation avant l'envoi. Vous pouvez demander des modifications jusqu'à ce que le résultat vous convienne parfaitement. Nous envoyons aussi un email test sur votre boîte pour que vous puissiez vérifier le rendu.",
  },
];

export default function MailingPage() {
  const serviceSchema = generateServiceSchema(
    "Campagnes Emailing Professionnelles",
    "Des campagnes email qui arrivent en boîte de réception et génèrent des ventes. Conception, rédaction et envoi de vos emailings pour 80€ TTC par campagne.",
    "/mailing"
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
        title="Des campagnes email qui génèrent des ventes"
        highlight="80€ TTC par campagne, tout compris."
        subtitle="On conçoit, on rédige et on envoie vos campagnes email. Vous n'avez rien à faire, sauf encaisser les ventes. Zéro abonnement, zéro engagement."
        ctaPrimary={{ label: "Lancer ma première campagne", href: "/contact" }}
        ctaSecondary={{ label: "En savoir plus", href: "#comment-ca-marche" }}
      />

      {/* Features */}
      <SectionBlock bg="gray">
        <FeatureCards
          title="Pourquoi l'email reste le canal le plus rentable"
          subtitle="Un retour sur investissement imbattable pour toucher vos clients directement"
          features={[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "36€ de retour pour 1€ investi",
              description:
                "L'emailing est le canal marketing avec le meilleur retour sur investissement. Chaque euro dépensé en rapporte en moyenne 36. Aucun autre canal ne fait mieux.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: "Design professionnel",
              description:
                "Des emails au design soigné et adapté à tous les écrans. Votre marque est mise en valeur avec un visuel qui donne envie de cliquer et d'acheter.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Délivrabilité optimale",
              description:
                "Vos emails arrivent en boîte de réception, pas en spam. Nous configurons les protocoles techniques (SPF, DKIM, DMARC) et respectons les bonnes pratiques.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ),
              title: "Rédaction persuasive",
              description:
                "Nos rédacteurs écrivent des textes qui donnent envie d'agir. Objets accrocheurs, messages clairs et appels à l'action efficaces pour maximiser vos conversions.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Rapport détaillé",
              description:
                "Après chaque envoi, vous recevez un rapport complet : taux d'ouverture, taux de clics, meilleures performances. Vous savez exactement ce qui fonctionne.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              ),
              title: "Compatible tous appareils",
              description:
                "Vos emails s'affichent parfaitement sur mobile, tablette et ordinateur. Plus de 60% des emails sont lus sur mobile : nous optimisons chaque campagne en conséquence.",
            },
          ]}
        />
      </SectionBlock>

      {/* Steps */}
      <SectionBlock id="comment-ca-marche">
        <StepsSection
          title="Comment ça marche"
          subtitle="Une campagne email professionnelle en 4 étapes simples"
          steps={[
            {
              number: "1",
              title: "Votre brief",
              description:
                "Dites-nous votre objectif (promotion, actualité, lancement) et on s'occupe du reste. Un simple email ou appel suffit.",
            },
            {
              number: "2",
              title: "Conception et rédaction",
              description:
                "On crée le design, on rédige le contenu et on prépare tout. Vous validez avant l'envoi, bien sûr.",
            },
            {
              number: "3",
              title: "Tests et envoi",
              description:
                "On teste la compatibilité sur tous les appareils et clients email, puis on envoie au moment optimal pour vos clients.",
            },
            {
              number: "4",
              title: "Résultats et rapport",
              description:
                "Vous recevez un rapport complet avec les statistiques de votre campagne et nos recommandations pour la suite.",
            },
          ]}
        />
      </SectionBlock>

      {/* Pricing — Single card */}
      <SectionBlock bg="gray" id="tarif">
        <PricingCards
          title="Un tarif simple et transparent"
          subtitle="Tout est inclus, pas de frais cachés ni d'abonnement"
          plans={[
            {
              name: "Campagne email cl\u00E9 en main",
              price: "80\u202F\u20AC TTC",
              description:
                "Le prix d'une campagne complète : conception, rédaction, envoi et rapport. Sans engagement ni abonnement.",
              features: [
                "Design professionnel sur-mesure",
                "Rédaction du contenu (objet + corps)",
                "Envoi jusqu'à 5 000 contacts",
                "Compatible mobile, tablette et desktop",
                "Tests anti-spam et délivrabilité",
                "Rapport de performance détaillé",
                "1 aller-retour de modification inclus",
                "Livraison sous 3 à 5 jours ouvrés",
              ],
              highlighted: true,
              ctaLabel: "Lancer ma campagne",
              ctaHref: "/contact",
            },
          ]}
        />
      </SectionBlock>

      {/* FAQ */}
      <SectionBlock>
        <FAQ
          title="Vos questions sur nos campagnes email"
          subtitle="Tout ce que vous devez savoir avant de lancer votre première campagne"
          items={faqItems}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Prêt à envoyer votre prochaine campagne ?"
        subtitle="Dites-nous votre objectif, on s'occupe de tout. Première campagne livrée en 5 jours."
        ctaLabel="Lancer ma campagne pour 80€"
        ctaHref="/contact"
        variant="primary"
      />
    </>
  );
}
