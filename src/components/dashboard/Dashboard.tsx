import { translations, type Locale } from "../../lib/i18n";
import { Button, Card, Badge, SectionLabel, Rule, Stat } from "../ui/primitives";
import { Plus, ArrowRight, Clock, Zap } from "lucide-react";

interface DashboardProps {
  locale: Locale;
  onNavigate: (page: string) => void;
}

export function Dashboard({ locale, onNavigate }: DashboardProps) {
  const isEn = locale === "en";

  const recentProjects = [
    { id: 1, name: "Recipe AI", progress: 5, total: 8, updated: "2 hours ago", status: "active" },
    { id: 2, name: "Fitness Tracker", progress: 8, total: 8, updated: "1 day ago", status: "complete" },
    { id: 3, name: "E-commerce Platform", progress: 3, total: 8, updated: "3 days ago", status: "active" },
  ];

  const templates = [
    { name: isEn ? "SaaS App" : "Aplikasi SaaS", desc: isEn ? "Multi-tenant web app" : "Aplikasi web multi-tenant" },
    { name: isEn ? "Marketplace" : "Marketplace", desc: isEn ? "Buyer + seller platform" : "Platform pembeli + penjual" },
    { name: isEn ? "Mobile App" : "Aplikasi Mobile", desc: isEn ? "React Native project" : "Proyek React Native" },
    { name: isEn ? "Internal Tool" : "Tool Internal", desc: isEn ? "Admin dashboard" : "Dasbor admin" },
    { name: isEn ? "AI App" : "Aplikasi AI", desc: isEn ? "LLM-powered application" : "Aplikasi bertenaga LLM" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <SectionLabel className="mb-2 block">{isEn ? "The Front Page" : "Halaman Depan"}</SectionLabel>
          <h1 className="font-serif text-3xl sm:text-4xl font-black">
            {isEn ? "Dashboard" : "Dasbor"}
          </h1>
        </div>
        <Button onClick={() => onNavigate("workspace")}>
          <Plus size={14} className="mr-1" />
          {isEn ? "New Project" : "Proyek Baru"}
        </Button>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-ink mb-8">
        <Stat label={isEn ? "Projects" : "Proyek"} value={3} />
        <Stat label={isEn ? "Steps Done" : "Langkah Selesai"} value="16/24" />
        <Stat label={isEn ? "Tokens Used" : "Token Terpakai"} value="48K" />
        <Stat label={isEn ? "Est. Cost" : "Est. Biaya"} value="$0.00" />
      </div>

      {/* Recent Projects */}
      <div className="mb-12">
        <SectionLabel className="mb-4 block">{isEn ? "Recent Projects" : "Proyek Terbaru"}</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink">
          {recentProjects.map((project) => (
            <Card key={project.id} cardVariant="interactive" padding="lg" className="bg-paper">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-serif text-xl font-bold">{project.name}</h3>
                {project.status === "complete" ? (
                  <Badge badgeVariant="filled">{isEn ? "DONE" : "SELESAI"}</Badge>
                ) : (
                  <Badge>{isEn ? "ACTIVE" : "AKTIF"}</Badge>
                )}
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: project.total }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 ${
                        i < project.progress ? "bg-ink" : "bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-neutral-500 mt-1 block">
                  {project.progress}/{project.total} {isEn ? "steps" : "langkah"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-neutral-500 flex items-center gap-1">
                  <Clock size={10} />
                  {project.updated}
                </span>
                <button
                  onClick={() => onNavigate("workspace")}
                  className="font-mono text-[10px] uppercase tracking-widest text-ink hover:text-accent transition-colors cursor-pointer flex items-center gap-1"
                >
                  {isEn ? "Continue" : "Lanjut"}
                  <ArrowRight size={10} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <SectionLabel className="mb-4 block">{isEn ? "Quick Actions" : "Aksi Cepat"}</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card cardVariant="interactive" padding="lg">
            <Zap size={20} strokeWidth={1.5} className="mb-2" />
            <h3 className="font-serif text-lg font-bold mb-1">
              {isEn ? "Continue Where You Left Off" : "Lanjutkan Dari Terakhir"}
            </h3>
            <p className="font-body text-sm text-neutral-600 mb-3">
              Recipe AI — {isEn ? "Step 5 of 8" : "Langkah 5 dari 8"}
            </p>
            <Button variant="secondary" size="sm" onClick={() => onNavigate("workspace")}>
              {isEn ? "Open" : "Buka"}
            </Button>
          </Card>
          <Card cardVariant="interactive" padding="lg">
            <Plus size={20} strokeWidth={1.5} className="mb-2" />
            <h3 className="font-serif text-lg font-bold mb-1">
              {isEn ? "Start New Project" : "Mulai Proyek Baru"}
            </h3>
            <p className="font-body text-sm text-neutral-600 mb-3">
              {isEn ? "Turn a rough idea into a build-ready plan" : "Ubah ide mentah jadi rencana siap bangun"}
            </p>
            <Button size="sm" onClick={() => onNavigate("workspace")}>
              {isEn ? "Start" : "Mulai"}
            </Button>
          </Card>
        </div>
      </div>

      {/* Templates */}
      <div>
        <SectionLabel className="mb-4 block">{isEn ? "Starter Templates" : "Template Awal"}</SectionLabel>
        <div className="grid-collapse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {templates.map((template, i) => (
            <div key={i} className="p-4 hard-shadow-hover bg-paper cursor-pointer" onClick={() => onNavigate("workspace")}>
              <h4 className="font-serif text-sm font-bold mb-1">{template.name}</h4>
              <p className="font-body text-xs text-neutral-500">{template.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
