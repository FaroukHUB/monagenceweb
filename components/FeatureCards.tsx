interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCardsProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export default function FeatureCards({
  title,
  subtitle,
  features,
  columns = 3,
}: FeatureCardsProps) {
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

      <div className={`grid grid-cols-1 ${colClasses[columns]} gap-8`}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all text-primary">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
            <p className="text-gray-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
