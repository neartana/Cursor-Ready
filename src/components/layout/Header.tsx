import { useState } from "react";
import { brand } from "../../lib/brand";
import { translations, type Locale } from "../../lib/i18n";
import { Button, EditionBar } from "../ui/primitives";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  locale: Locale;
  setLocale: (l: Locale) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ locale, setLocale, currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[locale].nav;

  const navItems = [
    { key: "home", label: t.home },
    { key: "workspace", label: t.workspace },
    { key: "dashboard", label: t.dashboard },
    { key: "community", label: t.community },
  ];

  return (
    <header className="border-b-4 border-ink bg-paper sticky top-0 z-50">
      <EditionBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1 cursor-pointer"
            aria-label="Cursor Ready home"
          >
            <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-ink">
              {brand.name}
            </span>
            <span className="inline-block w-3 h-5 bg-ink cursor-blink" aria-hidden="true" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`font-sans text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                  currentPage === item.key
                    ? "text-accent"
                    : "text-ink hover:text-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-4 border-l border-muted pl-4">
              <button
                onClick={() => setLocale(locale === "en" ? "id" : "en")}
                className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-ink transition-colors cursor-pointer"
              >
                {locale === "en" ? "ID" : "EN"}
              </button>
              <Button size="sm" onClick={() => onNavigate("workspace")}>
                {t.getStarted}
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-ink bg-paper">
          <nav className="flex flex-col p-4 gap-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { onNavigate(item.key); setMobileOpen(false); }}
                className={`font-sans text-sm uppercase tracking-widest text-left py-2 min-h-[44px] cursor-pointer ${
                  currentPage === item.key ? "text-accent" : "text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-4 pt-3 border-t border-muted">
              <button
                onClick={() => setLocale(locale === "en" ? "id" : "en")}
                className="font-mono text-xs uppercase tracking-widest text-neutral-500 cursor-pointer"
              >
                {locale === "en" ? "Bahasa Indonesia" : "English"}
              </button>
              <Button size="full" onClick={() => { onNavigate("workspace"); setMobileOpen(false); }}>
                {t.getStarted}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
