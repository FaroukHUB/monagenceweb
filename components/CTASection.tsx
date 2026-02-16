import Link from "next/link";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "primary" | "dark";
}

export default function CTASection({
  title = "Prêt à booster votre activité en ligne ?",
  subtitle = "Contactez-nous pour un audit gratuit et découvrez comment nous pouvons vous aider.",
  ctaLabel = "Démarrer mon projet",
  ctaHref = "/contact",
  variant = "primary",
}: CTASectionProps) {
  return (
    <section className={`py-20 lg:py-28 ${variant === "primary" ? "gradient-primary" : "gradient-dark"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-white text-primary hover:text-primary-dark px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
        >
          {ctaLabel}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
