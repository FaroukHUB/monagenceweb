import Link from "next/link";

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

interface PricingCardsProps {
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export default function PricingCards({
  title = "Nos formules",
  subtitle = "Choisissez la formule adaptée à vos besoins",
  plans,
}: PricingCardsProps) {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-4">{title}</h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className={`grid grid-cols-1 ${plans.length === 1 ? "max-w-md mx-auto" : "md:grid-cols-3"} gap-8`}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl p-8 transition-all hover:-translate-y-2 ${
              plan.highlighted
                ? "bg-dark text-white shadow-2xl shadow-dark/20 ring-2 ring-primary scale-105 z-10"
                : "bg-white border border-gray-200 shadow-lg shadow-gray-100/50 hover:shadow-xl"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  Populaire
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-dark"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-500"}`}>
                {plan.description}
              </p>
            </div>

            <div className="mb-8">
              <span className={`text-4xl font-extrabold ${plan.highlighted ? "text-white" : "text-dark"}`}>
                {plan.price}
              </span>
              {plan.period && (
                <span className={`text-sm ml-1 ${plan.highlighted ? "text-gray-300" : "text-gray-500"}`}>
                  {plan.period}
                </span>
              )}
            </div>

            <ul className="space-y-3 mb-8" role="list">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? "text-primary-light" : "text-success"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`text-sm ${plan.highlighted ? "text-gray-200" : "text-gray-600"}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.ctaHref || "/contact"}
              className={`block w-full text-center py-3.5 rounded-full font-bold transition-all hover:-translate-y-0.5 ${
                plan.highlighted
                  ? "bg-primary hover:bg-primary-light text-white hover:shadow-lg hover:shadow-primary/25"
                  : "bg-gray-100 hover:bg-primary hover:text-white text-dark"
              }`}
            >
              {plan.ctaLabel || "Choisir cette offre"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
