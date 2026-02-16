interface SectionBlockProps {
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "gray" | "dark" | "primary";
  id?: string;
}

export default function SectionBlock({
  children,
  className = "",
  bg = "white",
  id,
}: SectionBlockProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-dark text-white",
    primary: "gradient-primary text-white",
  };

  return (
    <section id={id} className={`py-20 lg:py-28 ${bgClasses[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
