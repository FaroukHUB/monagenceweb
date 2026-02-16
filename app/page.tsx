import HeroSection from "@/components/HeroSection";
import SectionBlock from "@/components/SectionBlock";
import FeatureCards from "@/components/FeatureCards";
import StepsSection from "@/components/StepsSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import IconCards from "@/components/IconCards";
import { generateWebPageSchema } from "@/lib/schema";

export default function HomePage() {
  const pageSchema = generateWebPageSchema(
    "Mon Agence Web — Création de sites web performants",
    "Agence web spécialisée dans la création de sites internet qui convertissent, le référencement Google, et les solutions digitales modernes.",
    "/"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <HeroSection
        title="Votre site web doit faire plus que juste exister."
        highlight="Il doit vendre."
        subtitle="Nous créons des sites web modernes et performants qui transforment vos visiteurs en clients. Design sur-mesure, référencement Google, solutions digitales complètes."
        ctaPrimary={{ label: "Obtenir un audit gratuit", href: "/contact" }}
        ctaSecondary={{ label: "Découvrir nos services", href: "/services" }}
      />

      {/* Services overview */}
      <SectionBlock bg="gray">
        <IconCards
          title="Tout ce qu'il faut pour réussir en ligne"
          subtitle="Des solutions complètes pour développer votre activité sur internet"
          cards={[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: "Sites qui vendent",
              description: "Des sites web pensés pour convertir vos visiteurs en clients, pas juste pour faire joli.",
              href: "/sites-qui-vendent",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
              title: "Référencement Google",
              description: "Apparaissez en première page de Google et attirez des clients qui vous cherchent déjà.",
              href: "/google",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ),
              title: "WhatsApp Business",
              description: "Transformez WhatsApp en un canal de vente puissant pour votre entreprise.",
              href: "/whatsapp",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              title: "Intelligence artificielle",
              description: "Automatisez votre business avec des solutions IA sur-mesure qui travaillent pour vous 24h/24.",
              href: "/ia",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: "Campagnes mailing",
              description: "Des campagnes email qui arrivent en boîte de réception et génèrent des ventes.",
              href: "/mailing",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Offres sur-mesure",
              description: "Des formules claires et transparentes, adaptées à votre budget et vos objectifs.",
              href: "/offres",
            },
          ]}
          columns={3}
        />
      </SectionBlock>

      {/* Why us */}
      <SectionBlock>
        <FeatureCards
          title="Pourquoi les entreprises nous choisissent"
          subtitle="Ce qui nous différencie des autres agences"
          features={[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Résultats rapides",
              description: "Votre site est en ligne rapidement avec des résultats mesurables dès les premières semaines.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              title: "Zéro prise de tête",
              description: "On s'occupe de tout, de A à Z. Vous n'avez rien de technique à gérer.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Accompagnement humain",
              description: "Un interlocuteur dédié qui comprend vos besoins et vous accompagne à chaque étape.",
            },
          ]}
        />
      </SectionBlock>

      {/* Steps */}
      <SectionBlock bg="gray">
        <StepsSection
          title="Comment ça marche"
          subtitle="4 étapes simples pour transformer votre présence en ligne"
          steps={[
            {
              number: "1",
              title: "Échange gratuit",
              description: "On discute de votre projet et de vos objectifs. Pas de jargon, juste du concret.",
            },
            {
              number: "2",
              title: "Proposition claire",
              description: "Vous recevez une proposition détaillée avec un prix fixe, sans surprise.",
            },
            {
              number: "3",
              title: "Création sur-mesure",
              description: "Notre équipe construit votre solution avec des points réguliers pour valider ensemble.",
            },
            {
              number: "4",
              title: "Mise en ligne",
              description: "Votre site est lancé et on reste disponible pour vous accompagner dans la durée.",
            },
          ]}
        />
      </SectionBlock>

      {/* Testimonials */}
      <SectionBlock>
        <Testimonials
          testimonials={[
            {
              name: "Sophie Martin",
              role: "Gérante, Boulangerie Dorée",
              content: "Notre nouveau site nous apporte en moyenne 15 nouveaux clients par semaine. Le retour sur investissement a été immédiat.",
              rating: 5,
            },
            {
              name: "Thomas Dupont",
              role: "Fondateur, TechStart",
              content: "Professionnels et à l'écoute. Ils ont compris notre vision et l'ont traduite en un site qui reflète parfaitement notre entreprise.",
              rating: 5,
            },
            {
              name: "Marie Lefèvre",
              role: "Directrice, Cabinet Conseil ML",
              content: "Depuis que notre site est référencé sur Google, nous recevons des demandes qualifiées chaque jour. Excellent travail.",
              rating: 5,
            },
          ]}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Prêt à passer au niveau supérieur ?"
        subtitle="Recevez un audit gratuit de votre présence en ligne en moins de 24h."
        ctaLabel="Obtenir mon audit gratuit"
      />
    </>
  );
}
