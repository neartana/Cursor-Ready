import { brand } from "../../lib/brand";
import { translations, type Locale } from "../../lib/i18n";
import { Rule } from "../ui/primitives";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = translations[locale].footer;

  return (
    <footer className="bg-paper border-t-4 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 mb-3">
              <span className="font-serif text-2xl font-black tracking-tight text-ink">
                {brand.name}
              </span>
              <span className="inline-block w-3 h-5 bg-ink" aria-hidden="true" />
            </div>
            <p className="font-body text-sm text-neutral-600 max-w-md leading-relaxed">
              {brand.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
              Product
            </h4>
            <ul className="space-y-2">
              <li><span className="font-sans text-sm text-ink hover:text-accent transition-colors cursor-pointer">Workspace</span></li>
              <li><span className="font-sans text-sm text-ink hover:text-accent transition-colors cursor-pointer">Pricing</span></li>
              <li><span className="font-sans text-sm text-ink hover:text-accent transition-colors cursor-pointer">Community</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
              Resources
            </h4>
            <ul className="space-y-2">
              <li><span className="font-sans text-sm text-ink hover:text-accent transition-colors cursor-pointer">Documentation</span></li>
              <li><span className="font-sans text-sm text-ink hover:text-accent transition-colors cursor-pointer">API Reference</span></li>
              <li><span className="font-sans text-sm text-ink hover:text-accent transition-colors cursor-pointer">Cursor Rules Format</span></li>
            </ul>
          </div>
        </div>

        <Rule variant="heavy" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            {t.edition}: {brand.edition.volume}.{brand.edition.version} | {t.printed}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            © {new Date().getFullYear()} {brand.name}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-4 border-t border-muted">
          <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 text-center">
            {brand.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
