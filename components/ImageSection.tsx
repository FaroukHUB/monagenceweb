interface ImageSectionProps {
  title: string;
  description: string;
  imageAlt?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function ImageSection({
  title,
  description,
  imageAlt = "Illustration",
  reverse = false,
  children,
}: ImageSectionProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "direction-rtl" : ""}`}>
      {/* Text */}
      <div className={reverse ? "lg:order-2" : ""}>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-6 leading-tight">{title}</h2>
        <p className="text-lg text-gray-500 leading-relaxed mb-8">{description}</p>
        {children}
      </div>

      {/* Image placeholder */}
      <div className={reverse ? "lg:order-1" : ""}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl rotate-2 scale-105" />
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl aspect-[4/3] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium" aria-hidden="true">{imageAlt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
