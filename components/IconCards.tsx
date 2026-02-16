import Link from "next/link";

interface IconCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

interface IconCardsProps {
  title?: string;
  subtitle?: string;
  cards: IconCard[];
  columns?: 2 | 3 | 4;
}

export default function IconCards({
  title,
  subtitle,
  cards,
  columns = 3,
}: IconCardsProps) {
  const colClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div>
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-4">{title}</h2>}
          {subtitle && <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className={`grid grid-cols-1 ${colClasses[columns]} gap-6`}>
        {cards.map((card, index) => {
          const cardContent = (
            <>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all text-primary">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-1 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
                </div>
              </div>
              {card.href && (
                <div className="absolute top-6 right-6 text-gray-300 group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </>
          );

          const className = "group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all hover:-translate-y-1 cursor-pointer";

          return card.href ? (
            <Link key={index} href={card.href} className={className}>
              {cardContent}
            </Link>
          ) : (
            <div key={index} className={className}>
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
