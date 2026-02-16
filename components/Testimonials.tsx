interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export default function Testimonials({
  title = "Ce que disent nos clients",
  subtitle = "Des résultats concrets pour des entreprises comme la vôtre",
  testimonials,
}: TestimonialsProps) {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-4">{title}</h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
          >
            {/* Stars */}
            {testimonial.rating && (
              <div className="flex gap-1 mb-4" aria-label={`Note : ${testimonial.rating} sur 5`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating! ? "text-accent" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}

            <p className="text-gray-600 leading-relaxed mb-6 italic">
              &ldquo;{testimonial.content}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-dark text-sm">{testimonial.name}</p>
                <p className="text-gray-400 text-xs">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
