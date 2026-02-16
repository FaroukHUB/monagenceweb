interface Step {
  number: string;
  title: string;
  description: string;
}

interface StepsSectionProps {
  title?: string;
  subtitle?: string;
  steps: Step[];
}

export default function StepsSection({
  title = "Comment ça marche",
  subtitle = "Un processus simple et efficace",
  steps,
}: StepsSectionProps) {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-4">{title}</h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative text-center">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
            )}

            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white text-2xl font-extrabold mb-6 shadow-lg shadow-primary/25">
              {step.number}
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
            <p className="text-gray-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
