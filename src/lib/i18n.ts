/**
 * CURSOR READY — Internationalization
 * English and Bahasa Indonesia support
 */

export type Locale = "en" | "id";

export const translations = {
  en: {
    nav: {
      home: "Home",
      workspace: "Workspace",
      dashboard: "Dashboard",
      community: "Community",
      pricing: "Pricing",
      signIn: "Sign In",
      getStarted: "Get Started",
    },
    hero: {
      headline: "From rough idea to Cursor-ready plan.",
      subheadline:
        "Turn your half-formed concept into a complete, build-ready development plan — with a coding prompt and rules pack you can drop straight into Cursor.",
      cta: "Start Your Plan",
      secondaryCta: "See How It Works",
    },
    ticker: {
      steps: "8-STEP PIPELINE",
      models: "MULTI-MODEL AI",
      export: "CURSOR PACK EXPORT",
      rules: ".CURSOR/RULES",
      agents: "AGENTS.MD",
      languages: "EN + BAHASA INDONESIA",
      formats: "MD / PDF / YAML / SQL",
    },
    workflow: {
      title: "How It Works",
      subtitle: "Seven steps from idea to build-ready",
      steps: [
        { num: "01", title: "Idea Clarifier", desc: "AI asks targeted questions to build your project brief." },
        { num: "02", title: "PRD", desc: "Generate a structured product requirements document." },
        { num: "03", title: "Feature List", desc: "MoSCoW prioritized features with MVP cut line." },
        { num: "04", title: "Architecture", desc: "System design with Mermaid diagrams." },
        { num: "05", title: "Database Schema", desc: "ER diagrams and SQL migrations." },
        { num: "06", title: "API Spec", desc: "OpenAPI-style endpoint documentation." },
        { num: "07", title: "Task Breakdown", desc: "Phased tasks sized for single AI sessions." },
      ],
    },
    features: {
      title: "Features",
      items: [
        { title: "Streaming Output", desc: "Watch your plan generate in real-time with the iconic blinking cursor." },
        { title: "Version History", desc: "Every edit is saved. Restore or diff any previous version." },
        { title: "Multi-Model", desc: "Choose from OpenAI, Anthropic, Google, or bring your own key." },
        { title: "Cursor Pack", desc: "Export a ZIP with rules, prompts, schema, and tasks — ready to build." },
        { title: "Bilingual", desc: "Full English and Bahasa Indonesia support in UI and AI output." },
        { title: "Fork & Share", desc: "Share projects publicly or fork community plans to your workspace." },
      ],
    },
    pricing: {
      title: "Pricing",
      subtitle: "Start free. Upgrade when you're ready to build.",
      free: { name: "Free", price: { usd: "$0", idr: "Rp 0" }, features: ["3 projects", "Basic models", "Markdown export", "Community access"] },
      pro: { name: "Pro", price: { usd: "$19/mo", idr: "Rp 299K/mo" }, features: ["Unlimited projects", "All models", "Cursor Pack export", "Version history", "Priority support"] },
      team: { name: "Team", price: { usd: "$49/mo", idr: "Rp 749K/mo" }, features: ["Everything in Pro", "5 team members", "Shared workspace", "Admin dashboard", "SSO"] },
      toggle: { monthly: "Monthly", usd: "USD", idr: "IDR" },
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Do I need Cursor?", a: "No. Cursor Ready works with any AI coding tool. We generate AGENTS.md, CLAUDE.md, and generic prompts alongside Cursor-specific rules." },
        { q: "Does this work with other tools?", a: "Yes! We support Cursor, Claude Code, Lovable, Bolt, v0, and any generic AI coding assistant. The export includes formats for all of them." },
        { q: "What languages are supported?", a: "The UI and AI output support English and Bahasa Indonesia. You choose per project." },
        { q: "Can I bring my own API key?", a: "Yes. Pro and Team plans support BYOK (Bring Your Own Key) for OpenAI, Anthropic, and Google. Keys are encrypted at rest." },
        { q: "What's in the Cursor Pack?", a: "A ZIP containing: PRD.md, schema.sql, openapi.yaml, TASKS.md, AGENTS.md, .cursor/rules/*.mdc files, prompts/ folder, and optionally CLAUDE.md." },
      ],
    },
    footer: {
      printed: "Printed in Jakarta",
      edition: "Edition",
    },
    workspace: {
      steps: [
        "Idea Clarifier",
        "PRD",
        "Features",
        "Architecture",
        "Database",
        "API Spec",
        "Tasks",
        "Coding Prompt",
      ],
      approve: "Approve & Continue",
      regenerate: "Regenerate",
      export: "Export",
      cursorPack: "Download Cursor Pack",
      copyPrompt: "Copy Kickoff Prompt",
      stale: "STALE",
      regenerateDownstream: "Regenerate downstream steps",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      workspace: "Ruang Kerja",
      dashboard: "Dasbor",
      community: "Komunitas",
      pricing: "Harga",
      signIn: "Masuk",
      getStarted: "Mulai Sekarang",
    },
    hero: {
      headline: "Dari ide mentah ke rencana siap Cursor.",
      subheadline:
        "Ubah konsep setengah jadi Anda menjadi rencana pengembangan lengkap — dengan prompt coding dan paket aturan yang bisa langsung dipakai di Cursor.",
      cta: "Mulai Rencana Anda",
      secondaryCta: "Lihat Cara Kerjanya",
    },
    ticker: {
      steps: "PIPELINE 8 LANGKAH",
      models: "AI MULTI-MODEL",
      export: "EKSPOR CURSOR PACK",
      rules: ".CURSOR/RULES",
      agents: "AGENTS.MD",
      languages: "EN + BAHASA INDONESIA",
      formats: "MD / PDF / YAML / SQL",
    },
    workflow: {
      title: "Cara Kerja",
      subtitle: "Tujuh langkah dari ide ke siap bangun",
      steps: [
        { num: "01", title: "Klarifikasi Ide", desc: "AI mengajukan pertanyaan terarah untuk membuat brief proyek." },
        { num: "02", title: "PRD", desc: "Buat dokumen kebutuhan produk terstruktur." },
        { num: "03", title: "Daftar Fitur", desc: "Fitur prioritas MoSCoW dengan garis batas MVP." },
        { num: "04", title: "Arsitektur", desc: "Desain sistem dengan diagram Mermaid." },
        { num: "05", title: "Skema Database", desc: "Diagram ER dan migrasi SQL." },
        { num: "06", title: "Spesifikasi API", desc: "Dokumentasi endpoint gaya OpenAPI." },
        { num: "07", title: "Rincian Tugas", desc: "Tugas bertahap yang pas untuk satu sesi AI." },
      ],
    },
    features: {
      title: "Fitur",
      items: [
        { title: "Output Streaming", desc: "Lihat rencana Anda dibuat secara real-time dengan kursor berkedip ikonik." },
        { title: "Riwayat Versi", desc: "Setiap edit disimpan. Pulihkan atau bandingkan versi sebelumnya." },
        { title: "Multi-Model", desc: "Pilih dari OpenAI, Anthropic, Google, atau bawa kunci Anda sendiri." },
        { title: "Cursor Pack", desc: "Ekspor ZIP berisi aturan, prompt, skema, dan tugas — siap membangun." },
        { title: "Dwibahasa", desc: "Dukungan penuh Bahasa Inggris dan Indonesia di UI dan output AI." },
        { title: "Fork & Bagikan", desc: "Bagikan proyek secara publik atau fork rencana komunitas." },
      ],
    },
    pricing: {
      title: "Harga",
      subtitle: "Mulai gratis. Upgrade saat siap membangun.",
      free: { name: "Gratis", price: { usd: "$0", idr: "Rp 0" }, features: ["3 proyek", "Model dasar", "Ekspor Markdown", "Akses komunitas"] },
      pro: { name: "Pro", price: { usd: "$19/bln", idr: "Rp 299K/bln" }, features: ["Proyek tak terbatas", "Semua model", "Ekspor Cursor Pack", "Riwayat versi", "Dukungan prioritas"] },
      team: { name: "Tim", price: { usd: "$49/bln", idr: "Rp 749K/bln" }, features: ["Semua di Pro", "5 anggota tim", "Ruang kerja bersama", "Dasbor admin", "SSO"] },
      toggle: { monthly: "Bulanan", usd: "USD", idr: "IDR" },
    },
    faq: {
      title: "Pertanyaan Umum",
      items: [
        { q: "Apakah saya butuh Cursor?", a: "Tidak. Cursor Ready bekerja dengan tool coding AI apa pun. Kami menghasilkan AGENTS.md, CLAUDE.md, dan prompt generik selain aturan khusus Cursor." },
        { q: "Apakah ini bekerja dengan tool lain?", a: "Ya! Kami mendukung Cursor, Claude Code, Lovable, Bolt, v0, dan asisten coding AI generik lainnya." },
        { q: "Bahasa apa saja yang didukung?", a: "UI dan output AI mendukung Bahasa Inggris dan Bahasa Indonesia. Anda pilih per proyek." },
        { q: "Bisa pakai API key sendiri?", a: "Ya. Paket Pro dan Tim mendukung BYOK untuk OpenAI, Anthropic, dan Google. Kunci dienkripsi saat disimpan." },
        { q: "Apa isi Cursor Pack?", a: "ZIP berisi: PRD.md, schema.sql, openapi.yaml, TASKS.md, AGENTS.md, file .cursor/rules/*.mdc, folder prompts/, dan opsional CLAUDE.md." },
      ],
    },
    footer: {
      printed: "Dicetak di Jakarta",
      edition: "Edisi",
    },
    workspace: {
      steps: [
        "Klarifikasi Ide",
        "PRD",
        "Fitur",
        "Arsitektur",
        "Database",
        "Spesifikasi API",
        "Tugas",
        "Prompt Coding",
      ],
      approve: "Setujui & Lanjut",
      regenerate: "Generate Ulang",
      export: "Ekspor",
      cursorPack: "Unduh Cursor Pack",
      copyPrompt: "Salin Prompt Awal",
      stale: "USANG",
      regenerateDownstream: "Generate ulang langkah selanjutnya",
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
