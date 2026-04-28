import { Link } from 'react-router-dom';
import { Wrench, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Plomberie',    path: '/listings?type=plomberie' },
    { name: 'Électricité',  path: '/listings?type=electricite' },
    { name: 'Peinture',     path: '/listings?type=peinture' },
    { name: 'Climatisation',path: '/listings?type=climatisation' },
  ],
  company: [
    { name: 'À propos',           path: '/about' },
    { name: 'Comment ça marche',  path: '/#how-it-works' },
    { name: 'Forum',              path: '/forum' },
    { name: 'Contact',            path: '/contact' },
  ],
  legal: [
    { name: "Conditions d'utilisation", path: '/terms' },
    { name: 'Politique de confidentialité', path: '/privacy' },
    { name: 'Mentions légales', path: '/legal' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-blue-500">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Trust<span className="text-blue-500">Serv</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-sm">
              La plateforme de confiance pour trouver les meilleurs prestataires de services de maintenance à domicile en Algérie.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Mail className="h-4 w-4" /><span>contact@trustserv.dz</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Phone className="h-4 w-4" /><span>+213 555 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4" /><span>Alger, Algérie</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">© 2024 TrustServ. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
