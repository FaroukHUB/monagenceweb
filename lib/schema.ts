export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mon Agence Web",
    url: "https://mon-agenceweb.fr",
    email: "contact@mon-agenceweb.fr",
    description:
      "Agence web spécialisée dans la création de sites internet performants, le référencement Google, et les solutions digitales pour entreprises.",
    sameAs: [],
  };
}

export function generateWebPageSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `https://mon-agenceweb.fr${url}`,
    publisher: generateOrganizationSchema(),
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `https://mon-agenceweb.fr${url}`,
    provider: generateOrganizationSchema(),
  };
}

export function generateFAQSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
