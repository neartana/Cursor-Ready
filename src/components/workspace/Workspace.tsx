import { useState, useEffect, useCallback, useRef } from "react";
import { translations, type Locale } from "../../lib/i18n";
import { pipelineSteps, targetTools } from "../../lib/pipeline";
import { models, defaultModel } from "../../lib/models";
import { Button, Card, Badge, SectionLabel, Rule, Input, Textarea } from "../ui/primitives";
import { generateCursorPack } from "../../lib/exports";
import {
  Lightbulb,
  FileText,
  ListChecks,
  Network,
  Database,
  Globe,
  ListTodo,
  Terminal,
  Check,
  AlertTriangle,
  RefreshCw,
  Download,
  Copy,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

interface WorkspaceProps {
  locale: Locale;
}

const stepIcons = [Lightbulb, FileText, ListChecks, Network, Database, Globe, ListTodo, Terminal];

// Mock content for each step
const mockContent: Record<string, string> = {
  idea: `# Project Brief

## Core Concept
An AI-powered recipe discovery and meal planning application that helps users find recipes based on available ingredients, dietary preferences, and cooking skill level.

## Target Audience
- Home cooks aged 25-45
- Busy professionals who want healthy meals
- People with dietary restrictions

## Platform
- Web application (responsive)
- Mobile-first design
- PWA capabilities for offline access

## Must-Have Features
- Ingredient-based recipe search
- Meal planning calendar
- Dietary preference filters
- Shopping list generation
- Cooking timer integration

## Constraints
- MVP in 8 weeks
- Budget: $5,000
- Solo developer
- Must support English and Bahasa Indonesia

## Preferred Stack
- Next.js + TypeScript
- Supabase (auth, DB, storage)
- Tailwind CSS
- Vercel deployment`,

  prd: `# Product Requirements Document

## 1. Overview
Recipe AI is a web application that transforms how people discover and plan meals. Users input available ingredients and receive personalized recipe suggestions with step-by-step instructions.

## 2. Problem Statement
Home cooks waste time searching for recipes that match their available ingredients and dietary needs. Existing solutions don't intelligently combine ingredient matching with meal planning.

## 3. Goals
- Reduce meal planning time by 60%
- Support 10,000+ recipes at launch
- Achieve 4.5/5 user satisfaction
- Launch MVP within 8 weeks

## 4. User Stories
| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| US-01 | Home cook | Search recipes by ingredients | I use what I have | Must |
| US-02 | Busy professional | Plan meals for the week | I save time | Must |
| US-03 | User with allergies | Filter by dietary needs | I eat safely | Must |
| US-04 | Organized cook | Generate shopping lists | I buy efficiently | Should |
| US-05 | Beginner | See difficulty ratings | I pick appropriate recipes | Should |
| US-06 | Social cook | Share recipes with friends | We cook together | Could |

## 5. Non-Functional Requirements
- Page load < 2s
- Mobile responsive
- WCAG AA accessible
- Bilingual (EN/ID)`,

  features: `# Feature List — MoSCoW Priority

## MUST HAVE (MVP)
| Feature | Description | Effort |
|---------|-------------|--------|
| Ingredient Search | Search recipes by available ingredients | 3 days |
| Recipe Detail | Full recipe view with steps & timer | 2 days |
| Auth (Email) | Sign up, login, password reset | 2 days |
| Dietary Filters | Vegetarian, vegan, gluten-free, halal | 1 day |
| Meal Planner | Weekly calendar with drag-drop | 4 days |
| Responsive UI | Mobile-first, works on all devices | 3 days |

**MVP Cut Line** ────────────────────────

## SHOULD HAVE (v1.1)
| Feature | Description | Effort |
|---------|-------------|--------|
| Shopping List | Auto-generate from meal plan | 2 days |
| Favorites | Save and organize recipes | 1 day |
| Cooking Timer | Built-in step timer | 1 day |
| Recipe Submit | Users add own recipes | 3 days |

## COULD HAVE (v1.2)
| Feature | Description | Effort |
|---------|-------------|--------|
| Social Sharing | Share recipes via link | 1 day |
| AI Suggestions | "You might also like" | 2 days |
| Import Recipes | From URLs | 2 days |

## WON'T HAVE (This Version)
- Native mobile apps
- Video content
- Social network features
- Payment processing`,

  architecture: `# System Architecture

## High-Level Diagram

\`\`\`mermaid
graph TB
    subgraph Client
        A[Next.js App] --> B[React Components]
        A --> C[Tailwind CSS]
    end
    
    subgraph API
        D[API Routes] --> E[Server Actions]
        D --> F[Edge Functions]
    end
    
    subgraph Services
        G[Supabase Auth]
        H[Supabase DB]
        I[Supabase Storage]
        J[AI Provider API]
    end
    
    Client --> API
    API --> Services
    F --> J
\`\`\`

## Component Architecture

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + CSS Modules
- **State**: React Server Components + TanStack Query
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js on Vercel Edge
- **API**: Next.js API Routes + Server Actions
- **Auth**: Supabase Auth (email + OAuth)
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Storage (images)
- **AI**: Vercel AI SDK (multi-provider)

### Data Flow
1. User submits ingredient list
2. Client validates with Zod
3. Server Action queries Supabase
4. Results streamed to client
5. UI updates with React Query cache`,

  database: `# Database Schema

## ER Diagram

\`\`\`mermaid
erDiagram
    users ||--o{ recipes : creates
    users ||--o{ meal_plans : owns
    users ||--o{ favorites : has
    recipes ||--o{ recipe_ingredients : contains
    recipes ||--o{ recipe_steps : has
    ingredients ||--o{ recipe_ingredients : in
    meal_plans ||--o{ meal_plan_entries : includes
    recipes ||--o{ meal_plan_entries : scheduled

    users {
        uuid id PK
        text email
        text name
        text avatar_url
        timestamp created_at
    }
    recipes {
        uuid id PK
        uuid user_id FK
        text title
        text description
        text instructions
        int servings
        int prep_time_min
        int cook_time_min
        text difficulty
        text image_url
        timestamp created_at
    }
    ingredients {
        uuid id PK
        text name
        text category
        text unit
    }
    meal_plans {
        uuid id PK
        uuid user_id FK
        text week_start
        timestamp created_at
    }
\`\`\`

## SQL Migrations

\`\`\`sql
-- Users extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Recipes table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  servings INTEGER DEFAULT 4,
  prep_time_min INTEGER,
  cook_time_min INTEGER,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Ingredients table
CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  unit TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe-Ingredients join
CREATE TABLE recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id),
  quantity DECIMAL NOT NULL,
  unit TEXT,
  notes TEXT
);

-- Indexes
CREATE INDEX idx_recipes_user ON recipes(user_id);
CREATE INDEX idx_recipes_created ON recipes(created_at DESC);
CREATE INDEX idx_ingredients_name ON ingredients(name);
\`\`\``,

  api: `# API Specification

## Base URL
\`\`\`
https://api.recipe-ai.app/v1
\`\`\`

## Authentication
All endpoints require Bearer token from Supabase Auth.

\`\`\`
Authorization: Bearer <supabase-access-token>
\`\`\`

## Endpoints

### Recipes

#### GET /recipes
List recipes with filtering.

| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search query |
| ingredients | string[] | Filter by ingredients |
| diet | string | Dietary filter |
| difficulty | string | easy/medium/hard |
| page | number | Pagination (default: 1) |
| limit | number | Items per page (default: 20) |

**Response 200:**
\`\`\`json
{
  "data": [{ "id": "uuid", "title": "...", ... }],
  "meta": { "total": 150, "page": 1, "limit": 20 }
}
\`\`\`

#### POST /recipes
Create a new recipe.

**Body:**
\`\`\`json
{
  "title": "Nasi Goreng",
  "description": "...",
  "servings": 4,
  "prep_time_min": 15,
  "cook_time_min": 20,
  "difficulty": "easy",
  "ingredients": [{ "id": "uuid", "quantity": 2, "unit": "cups" }],
  "steps": [{ "order": 1, "instruction": "...", "timer_min": null }]
}
\`\`\`

#### GET /recipes/:id
Get recipe details.

#### PUT /recipes/:id
Update recipe (owner only).

#### DELETE /recipes/:id
Soft delete recipe (owner only).

### Meal Plans

#### GET /meal-plans
List user's meal plans.

#### POST /meal-plans
Create weekly meal plan.

#### POST /meal-plans/:id/entries
Add recipe to meal plan day.

### AI

#### POST /ai/suggest
Get AI recipe suggestions based on ingredients.

**Body:**
\`\`\`json
{
  "ingredients": ["rice", "egg", "soy sauce"],
  "diet": "halal",
  "count": 5
}
\`\`\`

**Response 200 (streaming):**
\`\`\`
data: {"text": "Here are recipes you can make..."}
data: {"text": "1. Nasi Goreng Kampung..."}
\`\`\``,

  tasks: `# Task Breakdown

## Phase 1: Foundation (Week 1-2)
| Task | Estimate | Dependencies |
|------|----------|-------------|
| Project setup (Next.js, Tailwind, Supabase) | 4h | None |
| Auth flow (signup, login, reset) | 6h | Project setup |
| Database migrations + seed data | 4h | Project setup |
| Layout + navigation shell | 4h | Project setup |

## Phase 2: Core Features (Week 3-5)
| Task | Estimate | Dependencies |
|------|----------|-------------|
| Recipe list page + search | 8h | Auth, DB |
| Recipe detail page | 6h | Recipe list |
| Ingredient search (AI-powered) | 12h | Auth, DB |
| Dietary filter system | 4h | Recipe list |
| Meal planner calendar | 12h | Auth, Recipe detail |

## Phase 3: Polish (Week 6-7)
| Task | Estimate | Dependencies |
|------|----------|-------------|
| Shopping list generation | 6h | Meal planner |
| Favorites system | 4h | Auth, Recipe detail |
| Responsive optimization | 8h | All features |
| i18n (EN/ID) | 6h | All features |
| Accessibility audit | 4h | All features |

## Phase 4: Launch (Week 8)
| Task | Estimate | Dependencies |
|------|----------|-------------|
| Performance optimization | 4h | All features |
| SEO + metadata | 2h | All pages |
| Error handling + edge cases | 4h | All features |
| Deploy + monitoring setup | 2h | Everything |

---
**Total estimated effort**: ~150 hours
**Buffer**: 20% → ~180 hours total`,

  prompt: `# Coding Prompt — Cursor Kickoff

## Target Tool: Cursor

### Kickoff Prompt

\`\`\`
You are building "Recipe AI" — a meal planning web app.

## Context
Read the following files for full context:
- PRD.md — product requirements
- schema.sql — database schema
- TASKS.md — phased task breakdown

## Current Task: Phase 1 — Foundation

Set up the project with:
1. Next.js 15 (App Router) with TypeScript
2. Tailwind CSS configured with our design tokens
3. Supabase client initialized (auth + db)
4. Basic layout with navigation
5. Auth pages (signup, login)

## Conventions
- Use Server Components by default
- Client Components only when needed (mark with "use client")
- All types in /lib/types.ts
- API routes in /app/api/
- Follow the schema in schema.sql exactly
- Use Zod for all validation

## Rules
- No inline styles
- No rounded corners (sharp design system)
- Bilingual support from the start (EN/ID)
- Every component needs proper aria labels
- Test auth flow end-to-end before moving on

Start by creating the project structure and the layout component.
\`\`\`

---

## Phased Prompts

### Phase 2: Core Features
After Phase 1 is complete, use the prompt in \`prompts/phase-2-features.md\`

### Phase 3: Polish  
After Phase 2, use the prompt in \`prompts/phase-3-polish.md\`

### Phase 4: Launch
After Phase 3, use the prompt in \`prompts/phase-4-launch.md\``,
};

export function Workspace({ locale }: WorkspaceProps) {
  const t = translations[locale].workspace;
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatus, setStepStatus] = useState<Record<number, "pending" | "generating" | "done" | "stale" | "error">>(
    Object.fromEntries(pipelineSteps.map((s) => [s.id, "pending"]))
  );
  const [stepContent, setStepContent] = useState<Record<number, string>>({});
  const [displayedContent, setDisplayedContent] = useState<Record<number, string>>({});
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [selectedTool, setSelectedTool] = useState("cursor");
  const [isStreaming, setIsStreaming] = useState(false);
  const [ideaInput, setIdeaInput] = useState("");
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate streaming generation
  const generateStep = useCallback((stepId: number) => {
    const stepKey = pipelineSteps[stepId].key;
    const content = mockContent[stepKey] || `# ${t.steps[stepId]}\n\nContent generated for step ${stepId}...`;
    
    setStepStatus((prev) => ({ ...prev, [stepId]: "generating" }));
    setIsStreaming(true);
    setDisplayedContent((prev) => ({ ...prev, [stepId]: "" }));
    setStepContent((prev) => ({ ...prev, [stepId]: content }));

    let index = 0;
    const chunkSize = 3;
    
    streamRef.current = setInterval(() => {
      if (index < content.length) {
        const nextChunk = content.slice(index, index + chunkSize);
        setDisplayedContent((prev) => ({
          ...prev,
          [stepId]: (prev[stepId] || "") + nextChunk,
        }));
        index += chunkSize;
      } else {
        if (streamRef.current) clearInterval(streamRef.current);
        setStepStatus((prev) => ({ ...prev, [stepId]: "done" }));
        setIsStreaming(false);
      }
    }, 15);
  }, [t.steps]);

  // Auto-generate first step when idea is submitted
  const handleStartProject = () => {
    if (ideaInput.trim()) {
      generateStep(0);
    }
  };

  const handleApprove = () => {
    if (currentStep < 7) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (stepStatus[nextStep] === "pending") {
        generateStep(nextStep);
      }
    }
  };

  const handleRegenerate = () => {
    if (streamRef.current) clearInterval(streamRef.current);
    generateStep(currentStep);
  };

  const handleExport = () => {
    generateCursorPack(stepContent, locale);
  };

  const handleCopyPrompt = () => {
    const promptContent = stepContent[7] || mockContent.prompt;
    navigator.clipboard.writeText(promptContent);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) clearInterval(streamRef.current);
    };
  }, []);

  const CurrentIcon = stepIcons[currentStep];

  return (
    <div className="min-h-screen bg-paper">
      {/* Workspace Header */}
      <div className="border-b-2 border-ink bg-paper sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SectionLabel>Workspace</SectionLabel>
            <span className="font-mono text-xs text-neutral-500">
              {locale === "en" ? "Project" : "Proyek"}: Recipe AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleExport}>
              <Download size={14} className="mr-1" />
              {locale === "en" ? "Export .md" : "Ekspor .md"}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Step Strip */}
      <div className="lg:hidden border-b-2 border-ink bg-paper overflow-x-auto">
        <div className="flex items-center gap-0 px-2 py-2 min-w-max">
          {pipelineSteps.map((step, i) => {
            const Icon = stepIcons[i];
            const status = stepStatus[i];
            const isActive = i === currentStep;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(i)}
                className={`flex flex-col items-center gap-1 px-3 py-2 min-w-[60px] transition-colors cursor-pointer ${
                  isActive ? "bg-neutral-100" : ""
                }`}
              >
                <Icon size={16} strokeWidth={1.5} className={isActive ? "text-ink" : "text-neutral-400"} />
                <span className={`font-mono text-[9px] ${isActive ? "font-bold text-ink" : "text-neutral-500"}`}>
                  {String(i).padStart(2, "0")}
                </span>
                {status === "done" && <Check size={8} className="text-ink" />}
                {status === "generating" && <span className="inline-block w-1.5 h-2.5 bg-ink cursor-blink" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* ═══ Left Rail — Step Navigation (Desktop) ═══ */}
          <aside className="hidden lg:block lg:col-span-3 lg:border-r border-ink lg:pr-6 mb-6 lg:mb-0">
            <SectionLabel className="mb-3 block">
              {locale === "en" ? "Pipeline" : "Pipeline"}
            </SectionLabel>
            <nav className="space-y-0">
              {pipelineSteps.map((step, i) => {
                const Icon = stepIcons[i];
                const status = stepStatus[i];
                const isActive = i === currentStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-200 border-b border-muted cursor-pointer ${
                      isActive ? "bg-neutral-100 border-l-4 border-l-ink" : "hover:bg-neutral-100"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-neutral-400 w-4">
                      {String(i).padStart(2, "0")}
                    </span>
                    <Icon size={16} strokeWidth={1.5} className={isActive ? "text-ink" : "text-neutral-400"} />
                    <span className={`font-sans text-xs flex-1 ${isActive ? "font-bold text-ink" : "text-neutral-600"}`}>
                      {t.steps[i]}
                    </span>
                    {status === "done" && <Check size={12} className="text-ink" />}
                    {status === "generating" && (
                      <span className="inline-block w-2 h-3 bg-ink cursor-blink" />
                    )}
                    {status === "stale" && (
                      <Badge badgeVariant="accent" className="text-[8px] px-1 py-0">
                        {t.stale}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ═══ Main Content ═══ */}
          <div className="lg:col-span-6 lg:px-8 lg:border-r border-ink">
            {/* Step Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <SectionLabel>
                  Step {String(currentStep).padStart(2, "0")} / 07
                </SectionLabel>
                {stepStatus[currentStep] === "stale" && (
                  <Badge badgeVariant="accent">
                    <AlertTriangle size={10} className="mr-1" />
                    {t.stale}
                  </Badge>
                )}
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-ink flex items-center gap-3">
                <CurrentIcon size={24} strokeWidth={1.5} />
                {t.steps[currentStep]}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="lg:hidden bg-transparent border border-ink font-mono text-[10px] py-1 px-2 focus:outline-none cursor-pointer"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  <span>Model: {models.find((m) => m.id === selectedModel)?.name}</span>
                  <span>•</span>
                  <span>{locale === "en" ? "English" : "Bahasa Indonesia"}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Rule variant="heavy" className="mb-6" />

            {/* Step 0: Idea Input */}
            {currentStep === 0 && stepStatus[0] === "pending" && (
              <div className="mb-6">
                <label className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 block">
                  {locale === "en" ? "Describe your idea" : "Jelaskan ide Anda"}
                </label>
                <Textarea
                  value={ideaInput}
                  onChange={(e) => setIdeaInput(e.target.value)}
                  placeholder={locale === "en" 
                    ? "e.g., An AI-powered recipe app that suggests meals based on available ingredients..."
                    : "contoh: Aplikasi resep bertenaga AI yang menyarankan makanan berdasarkan bahan yang tersedia..."}
                  className="min-h-[160px]"
                />
                <Button size="md" className="mt-4" onClick={handleStartProject} disabled={!ideaInput.trim()}>
                  {locale === "en" ? "Generate Brief" : "Buat Brief"}
                  <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>
            )}

            {/* Content Area */}
            {(stepStatus[currentStep] === "generating" || stepStatus[currentStep] === "done" || stepStatus[currentStep] === "stale") && (
              <div className="prose-newsprint mb-8">
                <div className="relative">
                  {displayedContent[currentStep]?.split("\n").map((line, i) => (
                    <p key={i} className="font-mono text-xs leading-relaxed text-ink whitespace-pre-wrap mb-0">
                      {line || "\u00A0"}
                    </p>
                  ))}
                  {stepStatus[currentStep] === "generating" && (
                    <span className="inline-block w-2 h-4 bg-ink cursor-blink ml-0.5 align-middle" />
                  )}
                </div>
              </div>
            )}

            {/* Loading skeleton */}
            {stepStatus[currentStep] === "generating" && !displayedContent[currentStep] && (
              <div className="space-y-4 mb-8">
                <div className="skeleton-block h-6 w-3/4" />
                <div className="skeleton-block h-4 w-full" />
                <div className="skeleton-block h-4 w-5/6" />
                <div className="skeleton-block h-4 w-4/6" />
                <div className="skeleton-block h-20 w-full mt-4" />
                <div className="skeleton-block h-4 w-full" />
                <div className="skeleton-block h-4 w-3/4" />
              </div>
            )}

            {/* Empty state */}
            {stepStatus[currentStep] === "pending" && currentStep !== 0 && (
              <div className="text-center py-16 border-2 border-dashed border-muted">
                <div className="halftone w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {locale === "en" ? "Waiting for previous step..." : "Menunggu langkah sebelumnya..."}
                </p>
                <Button variant="ghost" size="sm" className="mt-4" onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(currentStep - 1);
                  }
                }}>
                  {locale === "en" ? "Go back" : "Kembali"}
                </Button>
              </div>
            )}

            {/* Error state */}
            {stepStatus[currentStep] === "error" && (
              <div className="text-center py-16 border-2 border-accent">
                <AlertTriangle size={32} strokeWidth={1.5} className="mx-auto mb-4 text-accent" />
                <p className="font-mono text-sm text-accent mb-2">
                  {locale === "en" ? "Generation failed" : "Generasi gagal"}
                </p>
                <p className="font-body text-xs text-neutral-500 mb-4">
                  {locale === "en" ? "Something went wrong. Please try again." : "Terjadi kesalahan. Silakan coba lagi."}
                </p>
                <Button variant="secondary" size="sm" onClick={handleRegenerate}>
                  <RefreshCw size={14} className="mr-1" />
                  {t.regenerate}
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-muted">
              {stepStatus[currentStep] === "done" && currentStep < 7 && (
                <Button onClick={handleApprove}>
                  {t.approve}
                  <ChevronRight size={14} className="ml-1" />
                </Button>
              )}
              {(stepStatus[currentStep] === "done" || stepStatus[currentStep] === "stale") && (
                <Button variant="secondary" onClick={handleRegenerate}>
                  <RefreshCw size={14} className="mr-1" />
                  {t.regenerate}
                </Button>
              )}
              {stepStatus[currentStep] === "done" && currentStep >= 1 && (
                <Button variant="accent" onClick={handleExport}>
                  <Download size={14} className="mr-1" />
                  {t.cursorPack}
                </Button>
              )}
              {currentStep === 7 && stepStatus[7] === "done" && (
                <Button variant="secondary" onClick={handleCopyPrompt}>
                  <Copy size={14} className="mr-1" />
                  {t.copyPrompt}
                </Button>
              )}
              {currentStep > 0 && (
                <Button variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>
                  <ArrowLeft size={14} className="mr-1" />
                  {locale === "en" ? "Previous" : "Sebelumnya"}
                </Button>
              )}
            </div>
          </div>

          {/* ═══ Right Column — Controls (Desktop) ═══ */}
          <aside className="hidden lg:block lg:col-span-3 lg:pl-6 mt-6 lg:mt-0">
            {/* Model Selector */}
            <div className="mb-6">
              <SectionLabel className="mb-2 block">
                {locale === "en" ? "Model" : "Model"}
              </SectionLabel>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-transparent border-b-2 border-ink font-mono text-xs py-2 focus:outline-none focus:bg-neutral-100 cursor-pointer"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
              <p className="font-body text-xs text-neutral-500 mt-1">
                {models.find((m) => m.id === selectedModel)?.description[locale]}
              </p>
            </div>

            {/* Target Tool */}
            <div className="mb-6">
              <SectionLabel className="mb-2 block">
                {locale === "en" ? "Target Tool" : "Tool Target"}
              </SectionLabel>
              <div className="space-y-1">
                {targetTools.map((tool) => (
                  <label
                    key={tool.id}
                    className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-colors ${
                      selectedTool === tool.id ? "bg-neutral-100" : "hover:bg-neutral-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="targetTool"
                      value={tool.id}
                      checked={selectedTool === tool.id}
                      onChange={(e) => setSelectedTool(e.target.value)}
                      className="accent-ink"
                    />
                    <span className="font-mono text-xs">{tool.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Version History */}
            <div className="mb-6">
              <SectionLabel className="mb-2 block">
                {locale === "en" ? "Version History" : "Riwayat Versi"}
              </SectionLabel>
              <div className="border border-ink p-3">
                {stepStatus[currentStep] === "done" ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px]">v1.0 — current</span>
                      <Badge>v1</Badge>
                    </div>
                    <div className="font-mono text-[10px] text-neutral-500">
                      {new Date().toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <p className="font-mono text-[10px] text-neutral-400">
                    {locale === "en" ? "No versions yet" : "Belum ada versi"}
                  </p>
                )}
              </div>
            </div>

            {/* Usage */}
            <div>
              <SectionLabel className="mb-2 block">
                {locale === "en" ? "Usage This Session" : "Penggunaan Sesi Ini"}
              </SectionLabel>
              <div className="border border-ink p-3 space-y-2">
                <div className="flex justify-between font-mono text-[10px]">
                  <span>Tokens In</span>
                  <span>{Object.keys(stepContent).length * 2400}</span>
                </div>
                <div className="flex justify-between font-mono text-[10px]">
                  <span>Tokens Out</span>
                  <span>{Object.values(displayedContent).reduce((a, c) => a + c.length, 0)}</span>
                </div>
                <div className="flex justify-between font-mono text-[10px]">
                  <span>Est. Cost</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
