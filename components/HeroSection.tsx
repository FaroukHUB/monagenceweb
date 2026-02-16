import Link from "next/link";

interface HeroSectionProps {
  title: string;
  highlight?: string;
  subtitle: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  withImage?: boolean;
}

export default function HeroSection({
  title,
  highlight,
  subtitle,
  ctaPrimary = { label: "Démarrer maintenant", href: "/contact" },
  ctaSecondary = { label: "Voir nos offres", href: "/offres" },
  withImage = true,
}: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid ${withImage ? "lg:grid-cols-2" : "lg:grid-cols-1 text-center"} gap-12 items-center`}>
          {/* Text content */}
          <div className={`${!withImage ? "max-w-3xl mx-auto" : ""}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {title}
              {highlight && (
                <>
                  <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {highlight}
                  </span>
                </>
              )}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
              {subtitle}
            </p>
            <div className={`mt-10 flex flex-wrap gap-4 ${!withImage ? "justify-center" : ""}`}>
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                {ctaPrimary.label}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5"
              >
                {ctaSecondary.label}
              </Link>
            </div>
          </div>

          {/* Image placeholder */}
          {withImage && (
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl rotate-3 scale-105" />
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl w-full h-full flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 font-medium">Image placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
