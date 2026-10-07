import { useState } from "react";
import { brand } from "../../lib/brand";
import { translations, type Locale } from "../../lib/i18n";
import { Button, Card, Badge, SectionLabel, Ornament, Rule, Stat } from "../ui/primitives";
import Marquee from "react-fast-marquee";
import {
  ArrowRight,
  Zap,
  History,
  Cpu,
  Package,
  Languages,
  Share2,
  Check,
} from "lucide-react";

interface LandingPageProps {
  locale: Locale;
  onNavigate: (page: string) => void;
}

export function LandingPage({ locale, onNavigate }: LandingPageProps) {
  const t = translations[locale];
  const [currency, setCurrency] = useState<"usd" | "idr">("usd");

  return (
    <main>
      {/* ═══════════════════════════════════════════════════
          HERO — 8/4 Split
          ═══════════════════════════════════════════════════ */}
      <section className="border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0">
            {/* Left: 8 cols */}
            <div className="lg:col-span-8 lg:border-r border-ink lg:pr-12">
              <SectionLabel className="mb-4 block">Breaking Development</SectionLabel>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-black leading-[0.9] tracking-tighter text-ink mb-4 whitespace-nowrap overflow-x-auto">
                {t.hero.headline}
              </h1>
              {/* Byline */}
              <div className="flex items-center gap-3 mb-6 font-mono text-[10px] uppercase tracking-widest text-neutral-500 border-b border-muted pb-3">
                <span>{locale === "en" ? "By The Cursor Ready Team" : "Oleh Tim Cursor Ready"}</span>
                <span>•</span>
                <span>{locale === "en" ? "Special Report" : "Laporan Khusus"}</span>
                <span>•</span>
                <span>5 {locale === "en" ? "min read" : "menit baca"}</span>
              </div>
              <div className="font-body text-sm sm:text-base leading-relaxed text-neutral-700 mb-8 whitespace-nowrap overflow-x-auto">
                {t.hero.subheadline}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onNavigate("workspace")}>
                  {t.hero.cta} <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => onNavigate("workspace")}>
                  {t.hero.secondaryCta}
                </Button>
              </div>
            </div>

            {/* Right: 4 cols — animated demo */}
            <div className="lg:col-span-4 lg:pl-8 mt-8 lg:mt-0">
              <div className="border-2 border-ink p-4 bg-paper hard-shadow-hover overflow-hidden">
                <div className="flex items-center gap-2 mb-3 border-b border-muted pb-2">
                  <Badge badgeVariant="breaking">LIVE</Badge>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Demo</span>
                </div>
                <div className="font-mono text-xs space-y-2">
                  <div className="text-neutral-500">
                    <span className="text-ink">&gt;</span> idea: "AI-powered recipe app"
                  </div>
                  <div className="text-neutral-500">
                    <span className="text-ink">&gt;</span> analyzing requirements...
                  </div>
                  <div className="text-neutral-500">
                    <span className="text-ink">&gt;</span> generating PRD...
                  </div>
                  <div className="text-neutral-500">
                    <span className="text-ink">&gt;</span> creating architecture...
                  </div>
                  <div className="text-neutral-500">
                    <span className="text-ink">&gt;</span> building schema...
                  </div>
                  <div className="text-accent">
                    <span>✓</span> Cursor Pack ready
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-ink">&gt;</span>
                    <span className="inline-block w-2 h-3.5 bg-ink cursor-blink ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Badge>8 steps</Badge>
                <Badge badgeVariant="accent">.cursor/rules</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TICKER
          ═══════════════════════════════════════════════════ */}
      <section className="bg-ink text-paper py-3 overflow-hidden" data-marquee>
        <Marquee speed={40} gradient={false}>
          <div className="flex items-center gap-8 mx-8">
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.steps}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.models}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.export}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.rules}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.agents}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.languages}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.formats}</span>
            <span className="text-accent">●</span>
          </div>
          <div className="flex items-center gap-8 mx-8">
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.steps}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.models}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.export}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.rules}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.agents}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.languages}</span>
            <span className="text-accent">●</span>
            <span className="font-mono text-xs uppercase tracking-widest">{t.ticker.formats}</span>
            <span className="text-accent">●</span>
          </div>
        </Marquee>
      </section>

      {/* ═══════════════════════════════════════════════════
          WORKFLOW — Inverted Black Section
          ═══════════════════════════════════════════════════ */}
      <section className="bg-ink text-paper border-b-4 border-ink newsprint-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="flex items-baseline justify-between mb-2">
            <SectionLabel className="block text-neutral-400">The Pipeline</SectionLabel>
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
              Fig. 2.1 — Workflow
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black mb-2">
            {t.workflow.title}
          </h2>
          <p className="font-body text-neutral-400 text-lg mb-4">
            {t.workflow.subtitle}
          </p>
          <Rule variant="single" className="border-neutral-700 mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-700">
            {t.workflow.steps.map((step, i) => (
              <div key={i} className="bg-ink p-6 group hover:bg-neutral-700 transition-colors duration-200">
                <div className="font-mono text-3xl font-bold text-accent mb-3">
                  {step.num}
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{step.title}</h3>
                <p className="font-body text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
            {/* Final step - coding prompt */}
            <div className="bg-ink p-6 group hover:bg-neutral-700 transition-colors duration-200 sm:col-span-2 lg:col-span-3">
              <div className="font-mono text-3xl font-bold text-accent mb-3">08</div>
              <h3 className="font-serif text-lg font-bold mb-2">
                {locale === "en" ? "Coding Prompt & Cursor Pack" : "Prompt Coding & Cursor Pack"}
              </h3>
              <p className="font-body text-sm text-neutral-400 leading-relaxed">
                {locale === "en"
                  ? "Generate the final coding prompt, phased prompt sequence, and complete Cursor Pack with rules, schema, and tasks — ready to drop into your IDE."
                  : "Buat prompt coding final, urutan prompt bertahap, dan Cursor Pack lengkap dengan aturan, skema, dan tugas — siap dimasukkan ke IDE Anda."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      {/* ═══════════════════════════════════════════════════
          FEATURES — Collapsed Grid
          ═══════════════════════════════════════════════════ */}
      <section className="border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-12 gap-0 mb-12">
            <div className="col-span-12 lg:col-span-5 lg:border-r border-ink lg:pr-8">
              <SectionLabel className="mb-4 block">What You Get</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black">
                {t.features.title}
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:pl-8 mt-4 lg:mt-0">
              <p className="text-columns font-body text-sm text-neutral-600 leading-relaxed">
                {locale === "en"
                  ? "Every project you create with Cursor Ready goes through a rigorous eight-step pipeline, from initial idea clarification through to a complete Cursor Pack export. Each step builds upon the previous one, ensuring your final development plan is coherent, comprehensive, and ready to hand off to any AI coding tool. The system supports multiple AI providers, bilingual output in English and Bahasa Indonesia, and produces exports that include project rules, phased prompts, database schemas, and task breakdowns — everything you need to start building immediately."
                  : "Setiap proyek yang Anda buat dengan Cursor Ready melewati pipeline delapan langkah yang ketat, dari klarifikasi ide awal hingga ekspor Cursor Pack lengkap. Setiap langkah dibangun di atas langkah sebelumnya, memastikan rencana pengembangan final Anda koheren, komprehensif, dan siap diserahkan ke tool coding AI mana pun. Sistem mendukung beberapa penyedia AI, output dwibahasa dalam Bahasa Inggris dan Indonesia, serta menghasilkan ekspor yang mencakup aturan proyek, prompt bertahap, skema database, dan rincian tugas — semua yang Anda butuhkan untuk langsung mulai membangun."}
              </p>
            </div>
          </div>

          <div className="grid-collapse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((feature, i) => {
              const icons = [Zap, History, Cpu, Package, Languages, Share2];
              const Icon = icons[i];
              return (
                <div key={i} className="p-6 group hard-shadow-hover bg-paper">
                  <div className="w-12 h-12 border-2 border-ink flex items-center justify-center mb-4 group-hover:bg-ink group-hover:text-paper transition-colors duration-200">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="font-body text-sm text-neutral-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Ornament />

      {/* ═══════════════════════════════════════════════════
          EXAMPLE OUTPUT — Newspaper Clipping
          ═══════════════════════════════════════════════════ */}
      <section className="border-b-4 border-ink bg-neutral-100 newsprint-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionLabel className="mb-4 block">Sample Output</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black mb-8">
            {locale === "en" ? "What Your Export Looks Like" : "Seperti Apa Ekspor Anda"}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Markdown file preview */}
            <Card cardVariant="newsprint" padding="lg">
              <div className="flex items-center gap-2 mb-4 border-b border-muted pb-2">
                <Badge badgeVariant="filled">FIG 1.1</Badge>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  project-plan.md
                </span>
              </div>
              <pre className="font-mono text-xs leading-loose text-ink overflow-x-auto">
{`# Project Plan

> Generated by Cursor Ready
> January 15, 2026

---

## Table of Contents

1. [Idea Clarifier](#idea-clarifier)
2. [PRD](#prd)
3. [Features](#features)
4. [Architecture](#architecture)
5. [Database Schema](#database-schema)
6. [API Spec](#api-spec)
7. [Task Breakdown](#task-breakdown)
8. [Coding Prompt](#coding-prompt)

---

## Idea Clarifier

# Project Brief

## Core Concept
An AI-powered recipe discovery and meal
planning application...`}
              </pre>
            </Card>

            {/* Cursor rules section */}
            <Card cardVariant="newsprint" padding="lg">
              <div className="flex items-center gap-2 mb-4 border-b border-muted pb-2">
                <Badge badgeVariant="filled">FIG 1.2</Badge>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  {locale === "en" ? "Includes Cursor Rules" : "Termasuk Aturan Cursor"}
                </span>
              </div>
              <pre className="font-mono text-xs leading-loose text-ink overflow-x-auto">
{`## Cursor Rules

> Drop the rules below into
> .cursor/rules/project.mdc

\`\`\`yaml
---
description: Project conventions
globs: **/*
alwaysApply: true
---

# Project Overview

## Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Supabase (auth, DB, storage)

## Conventions
- PascalCase filenames
- API routes in /app/api/
- No inline styles
- Server Components by default
\`\`\`

---

## Kickoff Prompt

> Copy and paste into Cursor...`}
              </pre>
            </Card>
          </div>
        </div>
      </section>

      <Ornament />

      {/* ═══════════════════════════════════════════════════
          PRICING
          ═══════════════════════════════════════════════════ */}
      <section className="border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionLabel className="mb-4 block">Plans</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black mb-2">
            {t.pricing.title}
          </h2>
          <p className="font-body text-neutral-600 text-lg mb-8">
            {t.pricing.subtitle}
          </p>

          {/* Currency toggle */}
          <div className="flex items-center gap-3 mb-10">
            <button
              onClick={() => setCurrency("usd")}
              className={`font-mono text-xs uppercase tracking-widest px-3 py-1 border-2 transition-colors cursor-pointer ${
                currency === "usd" ? "bg-ink text-paper border-ink" : "border-ink text-ink hover:bg-neutral-100"
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency("idr")}
              className={`font-mono text-xs uppercase tracking-widest px-3 py-1 border-2 transition-colors cursor-pointer ${
                currency === "idr" ? "bg-ink text-paper border-ink" : "border-ink text-ink hover:bg-neutral-100"
              }`}
            >
              IDR
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink">
            {/* Free */}
            <div className="bg-paper p-8">
              <h3 className="font-serif text-2xl font-bold mb-1">{t.pricing.free.name}</h3>
              <div className="font-mono text-3xl font-bold mb-6">
                {currency === "usd" ? t.pricing.free.price.usd : t.pricing.free.price.idr}
              </div>
              <div className="border-t border-dashed border-ink my-6" />
              <ul className="space-y-3 mb-8">
                {t.pricing.free.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 font-body text-sm">
                    <Check size={14} strokeWidth={2} className="text-ink shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" size="full">
                {locale === "en" ? "Start Free" : "Mulai Gratis"}
              </Button>
            </div>

            {/* Pro */}
            <div className="bg-paper p-8 relative">
              <Badge badgeVariant="breaking" className="absolute top-4 right-4">
                {locale === "en" ? "POPULAR" : "POPULER"}
              </Badge>
              <h3 className="font-serif text-2xl font-bold mb-1">{t.pricing.pro.name}</h3>
              <div className="font-mono text-3xl font-bold mb-6">
                {currency === "usd" ? t.pricing.pro.price.usd : t.pricing.pro.price.idr}
              </div>
              <div className="border-t border-dashed border-ink my-6" />
              <ul className="space-y-3 mb-8">
                {t.pricing.pro.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 font-body text-sm">
                    <Check size={14} strokeWidth={2} className="text-ink shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button size="full" onClick={() => onNavigate("workspace")}>
                {t.hero.cta}
              </Button>
            </div>

            {/* Team */}
            <div className="bg-paper p-8">
              <h3 className="font-serif text-2xl font-bold mb-1">{t.pricing.team.name}</h3>
              <div className="font-mono text-3xl font-bold mb-6">
                {currency === "usd" ? t.pricing.team.price.usd : t.pricing.team.price.idr}
              </div>
              <div className="border-t border-dashed border-ink my-6" />
              <ul className="space-y-3 mb-8">
                {t.pricing.team.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 font-body text-sm">
                    <Check size={14} strokeWidth={2} className="text-ink shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" size="full">
                {locale === "en" ? "Contact Sales" : "Hubungi Sales"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      {/* ═══════════════════════════════════════════════════
          FAQ — Horizontal Columns
          ═══════════════════════════════════════════════════ */}
      <section className="border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionLabel className="mb-4 block">FAQ</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black mb-12">
            {t.faq.title}
          </h2>

          <div className="grid-collapse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {t.faq.items.map((item, i) => (
              <div key={i} className="p-5 bg-paper">
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-mono text-xs text-accent font-bold shrink-0 mt-0.5">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-base font-bold leading-snug">{item.q}</h3>
                </div>
                <div className="border-t border-muted pt-3 ml-7">
                  <p className="font-body text-sm text-neutral-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════════ */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <SectionLabel className="mb-4 block text-neutral-400">Ready?</SectionLabel>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-black mb-6 whitespace-nowrap overflow-x-auto">
            {brand.tagline}
          </h2>
          <p className="font-body text-neutral-400 text-base sm:text-lg mb-8 whitespace-nowrap overflow-x-auto">
            {locale === "en"
              ? "Stop guessing. Start building with a plan that's ready for your AI coding tool."
              : "Berhenti menebak. Mulai membangun dengan rencana yang siap untuk tool coding AI Anda."}
          </p>
          <Button variant="accent" size="lg" onClick={() => onNavigate("workspace")}>
            {t.hero.cta} <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>
    </main>
  );
}
