import { useState, useCallback, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./components/landing/LandingPage";
import { Workspace } from "./components/workspace/Workspace";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Community } from "./components/community/Community";
import { CommandPalette } from "./components/ui/CommandPalette";
import { ToastProvider } from "./components/ui/Toast";
import type { Locale } from "./lib/i18n";

type Page = "home" | "workspace" | "dashboard" | "community";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [locale, setLocale] = useState<Locale>("en");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  }, []);

  // Global Cmd+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <ToastProvider>
    <div className="min-h-screen bg-paper text-ink font-sans">
      <Header
        locale={locale}
        setLocale={setLocale}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === "home" && (
        <LandingPage locale={locale} onNavigate={handleNavigate} />
      )}

      {currentPage === "workspace" && (
        <Workspace locale={locale} />
      )}

      {currentPage === "dashboard" && (
        <Dashboard locale={locale} onNavigate={handleNavigate} />
      )}

      {currentPage === "community" && (
        <Community locale={locale} />
      )}

      {currentPage !== "workspace" && <Footer locale={locale} />}

      {/* Command Palette (Cmd/Ctrl + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
    </ToastProvider>
  );
}
