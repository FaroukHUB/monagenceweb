import HeroSection from "@/components/HeroSection";
import SectionBlock from "@/components/SectionBlock";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { generatePageMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Nos réalisations",
  description:
    "Découvrez nos projets : sites web performants, stratégies SEO, solutions WhatsApp et IA pour des entreprises françaises. Des résultats concrets et mesurables.",
  path: "/realisations",
});

const projects = [
  {
    name: "Boulangerie Dorée",
    description:
      "Création d'un site vitrine moderne avec système de commande en ligne pour une boulangerie artisanale parisienne. Le site a généré une augmentation de 40 % des commandes en 3 mois.",
    tags: ["Site web", "E-commerce", "SEO local"],
    category: "Artisanat",
  },
  {
    name: "Cabinet Conseil Horizon",
    description:
      "Refonte complète du site web et stratégie SEO pour un cabinet de conseil en management. Passage de la page 5 à la première page de Google en 4 mois.",
    tags: ["Site web", "SEO", "Référencement"],
    category: "Services B2B",
  },
  {
    name: "Clinique Vétérinaire du Parc",
    description:
      "Site web avec prise de rendez-vous en ligne et chatbot WhatsApp pour gérer les urgences. Réduction de 60 % des appels grâce à l'automatisation.",
    tags: ["Site web", "WhatsApp", "Automatisation"],
    category: "Santé",
  },
  {
    name: "Agence Immobilière Prestige",
    description:
      "Plateforme de présentation de biens immobiliers avec visite virtuelle et système de qualification automatique des prospects via intelligence artificielle.",
    tags: ["Site web", "IA", "Génération de leads"],
    category: "Immobilier",
  },
  {
    name: "Restaurant Le Comptoir",
    description:
      "Campagnes mailing hebdomadaires pour fidéliser la clientèle et promouvoir les événements. Taux d'ouverture moyen de 42 %, bien au-dessus de la moyenne du secteur.",
    tags: ["Mailing", "Fidélisation", "Communication"],
    category: "Restauration",
  },
  {
    name: "Studio Yoga Sérénité",
    description:
      "Solution digitale complète : site web avec réservation en ligne, référencement local Google et notifications WhatsApp automatiques pour les cours.",
    tags: ["Site web", "SEO local", "WhatsApp"],
    category: "Bien-être",
  },
];

export default function RealisationsPage() {
  const pageSchema = generateWebPageSchema(
    "Nos réalisations",
    "Découvrez les projets réalisés par Mon Agence Web pour des entreprises françaises.",
    "/realisations"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <HeroSection
        title="Nos réalisations"
        highlight="Des résultats concrets."
        subtitle="Chaque projet est unique. Découvrez comment nous avons aidé des entreprises comme la vôtre à se démarquer en ligne et à atteindre leurs objectifs."
        ctaPrimary={{ label: "Démarrer mon projet", href: "/contact" }}
        ctaSecondary={{ label: "Voir nos offres", href: "/offres" }}
        withImage={false}
      />

      {/* Projects grid */}
      <SectionBlock bg="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-4">
            Nos derniers projets
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Des solutions sur-mesure pour des entreprises de tous secteurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                <div className="text-center p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-7 h-7 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    {project.category}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Testimonials */}
      <SectionBlock>
        <Testimonials
          title="Ils nous ont fait confiance"
          subtitle="Ce que nos clients disent de leur expérience avec nous"
          testimonials={[
            {
              name: "Sophie Martin",
              role: "Gérante, Boulangerie Dorée",
              content:
                "Notre nouveau site nous apporte en moyenne 15 nouveaux clients par semaine. Le retour sur investissement a été immédiat. L'équipe est réactive et professionnelle.",
              rating: 5,
            },
            {
              name: "Marc Lefèvre",
              role: "Directeur, Cabinet Conseil Horizon",
              content:
                "Passer de la page 5 à la première page de Google a transformé notre acquisition client. Nous recevons désormais des demandes qualifiées chaque jour.",
              rating: 5,
            },
            {
              name: "Julie Moreau",
              role: "Fondatrice, Studio Yoga Sérénité",
              content:
                "La solution complète site + WhatsApp a changé notre quotidien. Les réservations sont automatiques et nos élèves reçoivent leurs rappels sans qu'on ait rien à faire.",
              rating: 5,
            },
            {
              name: "Pierre Durand",
              role: "Gérant, Restaurant Le Comptoir",
              content:
                "Les campagnes mailing nous permettent de remplir notre restaurant chaque semaine. Le taux d'ouverture est excellent et les résultats sont au rendez-vous.",
              rating: 5,
            },
            {
              name: "Isabelle Roux",
              role: "Directrice, Clinique Vétérinaire du Parc",
              content:
                "Le chatbot WhatsApp gère les demandes courantes et les urgences sont redirigées vers nous. On a gagné un temps considérable au quotidien.",
              rating: 5,
            },
            {
              name: "Antoine Bernard",
              role: "Directeur commercial, Agence Prestige",
              content:
                "La qualification automatique des prospects par IA nous a permis de doubler notre taux de conversion. Un investissement très rentable.",
              rating: 5,
            },
          ]}
        />
      </SectionBlock>

      {/* CTA */}
      <CTASection
        title="Votre projet sera le prochain ?"
        subtitle="Discutons ensemble de vos objectifs. Premier échange gratuit et sans engagement."
        ctaLabel="Parler de mon projet"
        ctaHref="/contact"
      />
    </>
  );
}
