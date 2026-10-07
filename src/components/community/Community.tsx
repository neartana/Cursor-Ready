import { useState } from "react";
import { translations, type Locale } from "../../lib/i18n";
import { Button, Card, Badge, SectionLabel, Rule, Input } from "../ui/primitives";
import { Search, Heart, MessageSquare, Bookmark, GitFork, Flag } from "lucide-react";

interface CommunityProps {
  locale: Locale;
}

export function Community({ locale }: CommunityProps) {
  const isEn = locale === "en";
  const [activeFilter, setActiveFilter] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const posts = [
    {
      id: 1,
      title: isEn ? "AI-Powered Study Planner for Indonesian Students" : "Perencana Belajar AI untuk Mahasiswa Indonesia",
      author: "rizky.dev",
      category: "Education",
      tags: ["Next.js", "Supabase", "AI"],
      likes: 24,
      comments: 8,
      forks: 12,
      date: "2h ago",
    },
    {
      id: 2,
      title: isEn ? "Halal Restaurant Finder with Real-time Reviews" : "Pencari Restoran Halal dengan Ulasan Real-time",
      author: "sarah_builds",
      category: "Marketplace",
      tags: ["React Native", "Maps API", "Firebase"],
      likes: 41,
      comments: 15,
      forks: 7,
      date: "5h ago",
    },
    {
      id: 3,
      title: isEn ? "Freelancer Invoice & Payment Tracker" : "Pelacak Invoice & Pembayaran Freelancer",
      author: "andi.codes",
      category: "SaaS",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      likes: 18,
      comments: 5,
      forks: 21,
      date: "1d ago",
    },
    {
      id: 4,
      title: isEn ? "Community Garden Management Platform" : "Platform Manajemen Kebun Komunitas",
      author: "maya.tech",
      category: "Internal Tool",
      tags: ["Vue.js", "Supabase", "Charts"],
      likes: 9,
      comments: 3,
      forks: 4,
      date: "2d ago",
    },
    {
      id: 5,
      title: isEn ? "Bahasa Learning Chatbot with AI Tutor" : "Chatbot Belajar Bahasa dengan Tutor AI",
      author: "dimas.ai",
      category: "AI App",
      tags: ["OpenAI", "Next.js", "Tailwind"],
      likes: 56,
      comments: 22,
      forks: 31,
      date: "3d ago",
    },
  ];

  const filters = [
    { key: "newest", label: isEn ? "Newest" : "Terbaru" },
    { key: "popular", label: isEn ? "Popular" : "Populer" },
    { key: "saas", label: "SaaS" },
    { key: "marketplace", label: "Marketplace" },
    { key: "ai", label: "AI" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <SectionLabel className="mb-2 block">{isEn ? "The Classifieds" : "Klasifikasi"}</SectionLabel>
        <h1 className="font-serif text-3xl sm:text-4xl font-black mb-2">
          {isEn ? "Community" : "Komunitas"}
        </h1>
        <p className="font-body text-neutral-600">
          {isEn
            ? "Discover and fork project plans from the community."
            : "Temukan dan fork rencana proyek dari komunitas."}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? "Search projects..." : "Cari proyek..."}
            className="w-full bg-transparent border-b-2 border-ink font-mono text-sm py-2 pl-6 pr-2 focus:outline-none focus:bg-neutral-100 placeholder:text-neutral-400"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-2 border transition-colors cursor-pointer ${
                activeFilter === filter.key
                  ? "bg-ink text-paper border-ink"
                  : "border-ink text-ink hover:bg-neutral-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <Rule variant="heavy" className="mb-8" />

      {/* Posts Feed */}
      <div className="space-y-0">
        {posts.map((post, i) => (
          <article key={post.id} className="border-b border-ink pb-6 mb-6 last:border-b-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Main content */}
              <div className="lg:col-span-9">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{post.category}</Badge>
                  <span className="font-mono text-[10px] text-neutral-500">{post.date}</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2 hover:text-accent transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-xs text-neutral-500">
                    {isEn ? "by" : "oleh"} <span className="text-ink font-bold">{post.author}</span>
                  </span>
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 border border-muted px-1.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end gap-3 lg:gap-2 lg:text-right">
                <button className="flex items-center gap-1 font-mono text-xs text-neutral-500 hover:text-accent transition-colors cursor-pointer">
                  <Heart size={14} strokeWidth={1.5} /> {post.likes}
                </button>
                <button className="flex items-center gap-1 font-mono text-xs text-neutral-500 hover:text-accent transition-colors cursor-pointer">
                  <MessageSquare size={14} strokeWidth={1.5} /> {post.comments}
                </button>
                <button className="flex items-center gap-1 font-mono text-xs text-neutral-500 hover:text-ink transition-colors cursor-pointer">
                  <GitFork size={14} strokeWidth={1.5} /> {post.forks}
                </button>
                <button className="flex items-center gap-1 font-mono text-xs text-neutral-500 hover:text-ink transition-colors cursor-pointer">
                  <Bookmark size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Fig caption style */}
            <div className="mt-3 font-mono text-[9px] uppercase tracking-widest text-neutral-400">
              Fig. {i + 1}.{post.id} — {isEn ? "Community Project" : "Proyek Komunitas"}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-muted">
        <Button variant="ghost" size="sm" disabled>
          {isEn ? "Previous" : "Sebelumnya"}
        </Button>
        <span className="font-mono text-xs px-3">1 / 5</span>
        <Button variant="ghost" size="sm">
          {isEn ? "Next" : "Selanjutnya"}
        </Button>
      </div>
    </main>
  );
}
