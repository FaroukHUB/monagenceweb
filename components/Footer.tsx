import Link from "next/link";

const footerLinks = {
  services: [
    { href: "/sites-qui-vendent", label: "Sites qui vendent" },
    { href: "/google", label: "Référencement Google" },
    { href: "/whatsapp", label: "WhatsApp Business" },
    { href: "/ia", label: "Intelligence artificielle" },
    { href: "/mailing", label: "Campagnes mailing" },
  ],
  company: [
    { href: "/offres", label: "Nos offres" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/contact", label: "Contact" },
    { href: "/legal", label: "Mentions légales" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Mon Agence Web - Accueil">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-lg font-bold">
                Mon Agence<span className="text-primary-light">Web</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Votre partenaire digital pour des sites web performants, un référencement efficace et une croissance durable.
            </p>
            <a
              href="mailto:contact@mon-agenceweb.fr"
              className="text-primary-light hover:text-white transition-colors text-sm"
            >
              contact@mon-agenceweb.fr
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Entreprise</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="font-bold text-lg mb-4">Prêt à démarrer ?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Recevez un audit gratuit de votre présence en ligne.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Demander un audit
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Mon Agence Web. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/legal" className="text-gray-500 hover:text-white transition-colors text-sm">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
