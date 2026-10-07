# Cursor Ready

**From rough idea to Cursor-ready plan.**

Turn your rough idea into a complete, build-ready development plan, ending with a coding prompt and a rules pack you can drop straight into Cursor (and other AI coding tools).

---

## Overview

Cursor Ready is a SaaS web application that guides solo founders, students, and indie developers through an 8-step pipeline:

0. **Idea Clarifier** — AI asks targeted questions to build a project brief
1. **PRD** — Structured product requirements document
2. **Feature List** — MoSCoW prioritized with MVP cut line
3. **Architecture** — System design with Mermaid diagrams
4. **Database Schema** — ER diagrams and SQL migrations
5. **API Spec** — OpenAPI-style endpoint documentation
6. **Task Breakdown** — Phased tasks sized for single AI sessions
7. **Coding Prompt** — Kickoff prompt + phased prompts + Cursor Pack

Every step streams output, supports editing, versioning, and regeneration. The final export is a **Cursor Pack** ZIP ready to drop into your IDE.

## Tech Stack

- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS v4 with custom Newsprint design system
- **Icons**: lucide-react
- **Animation**: react-fast-marquee (ticker)
- **Export**: JSZip + FileSaver (Cursor Pack ZIP generation)
- **Utilities**: class-variance-authority, tailwind-merge

## Design System: "Newsprint"

The entire app uses a newspaper-inspired design language:

- **Philosophy**: "All the News That's Fit to Print" — stark geometry, high information density, typographic drama
- **Colors**: Off-white (#F9F9F7) background, ink black (#111111) foreground, editorial red (#CC0000) accent
- **Typography**: Playfair Display (headlines), Lora (body), Inter (UI), JetBrains Mono (data/code)
- **Shape**: Zero border-radius everywhere, hard offset shadows, no gradients or blur
- **Motion**: 200ms ease-out, mechanical transitions, respects prefers-reduced-motion

### Design Tokens

All tokens are centralized in `src/index.css` as CSS custom properties via Tailwind v4's `@theme` directive:

```css
@theme {
  --color-paper: #F9F9F7;
  --color-ink: #111111;
  --color-muted: #E5E5E0;
  --color-accent: #CC0000;
  --font-serif: "Playfair Display", Georgia, serif;
  --font-body: "Lora", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
}
```

### Reusable Primitives

Located in `src/components/ui/primitives.tsx`:

- **Button** — primary/secondary/ghost/link/accent variants
- **Card** — default/interactive/inverted/newsprint variants
- **Input** — bottom-border only, mono font
- **Textarea** — bordered, mono font
- **Badge** — default/accent/filled/breaking variants
- **SectionLabel** — uppercase mono tracking
- **Rule** — single/double/heavy horizontal dividers
- **Ornament** — "✧ ✧ ✧" decorative divider
- **EditionBar** — Vol/date/city metadata bar
- **Stat** — bordered stat cell
- **GridCell** — collapsed grid cell

## Brand Configuration

All brand strings are in `src/lib/brand.ts`:

```typescript
export const brand = {
  name: "Cursor Ready",
  tagline: "From rough idea to Cursor-ready plan.",
  domain: "cursorready.dev",
  // ...
  disclaimer: "Cursor Ready is an independent product and is not affiliated with or endorsed by Cursor or Anysphere.",
};
```

No hardcoded brand strings in components.

## Internationalization

English and Bahasa Indonesia support in `src/lib/i18n.ts`. User-selectable per session.

## Cursor Pack Format

The exported ZIP contains:

```
cursor-pack/
├── PRD.md                    # Product requirements
├── schema.sql                # Database schema
├── openapi.yaml              # API specification
├── TASKS.md                  # Phased task breakdown
├── AGENTS.md                 # Cross-tool instructions
├── CLAUDE.md                 # Claude Code config
├── .cursor/
│   └── rules/
│       ├── project-overview.mdc   # Always-apply rules
│       ├── tech-stack.mdc         # Stack conventions
│       ├── database-rules.mdc     # DB/API rules
│       └── task-workflow.mdc      # Dev process rules
└── prompts/
    ├── kickoff.md            # Initial prompt
    ├── phase-1-setup.md      # Foundation tasks
    ├── phase-2-features.md   # Core features
    ├── phase-3-polish.md     # Polish & i18n
    └── phase-4-launch.md     # Deploy
```

### .cursor/rules Format

Rules follow Cursor's current MDC (Markdown with frontmatter) format:

```markdown
---
description: What this rule covers
globs: **/*.tsx
alwaysApply: false
---

# Rule Title

Rule content in markdown...
```

## Model Configuration

AI models are configured in `src/lib/models.ts`. To add a new provider:

1. Add the model to the `models` array in `src/lib/models.ts`
2. Include: id, name, provider, description (en/id), speed, cost, quality, contextWindow
3. The model selector in the workspace will automatically pick it up

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Deployment

The app is a static SPA that can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting

Build output is in `dist/`.

## Project Structure

```
src/
├── App.tsx                          # Main app with page routing
├── main.tsx                         # Entry point
├── index.css                        # Design system tokens + utilities
├── lib/
│   ├── brand.ts                     # Brand configuration (single source of truth)
│   ├── i18n.ts                      # English + Bahasa Indonesia translations
│   ├── models.ts                    # AI model configuration table
│   ├── pipeline.ts                  # Pipeline step definitions
│   └── exports.ts                   # Cursor Pack ZIP generation
├── components/
│   ├── ui/
│   │   └── primitives.tsx           # Newsprint design system components
│   ├── layout/
│   │   ├── Header.tsx               # Masthead with nav + edition bar
│   │   └── Footer.tsx               # Footer with disclaimer
│   ├── landing/
│   │   └── LandingPage.tsx          # Full landing page
│   ├── workspace/
│   │   └── Workspace.tsx            # 8-step pipeline workspace
│   ├── dashboard/
│   │   └── Dashboard.tsx            # "The Front Page" project dashboard
│   └── community/
│       └── Community.tsx            # "The Classifieds" community feed
public/
└── favicon.svg                      # Block cursor favicon
```

## Accessibility

- WCAG AA minimum (ink on paper achieves AAA)
- Semantic HTML throughout
- aria-label on icon-only buttons
- aria-expanded on accordions
- Full keyboard support
- Focus-visible rings on all interactive elements
- Min 44x44px touch targets
- Respects prefers-reduced-motion

## Notes & Defaults

- **No auth/DB wired up**: This is a frontend demo. In production, connect Supabase or Neon + Auth.js.
- **Mock AI streaming**: The workspace simulates streaming with pre-written content. In production, connect Vercel AI SDK to your chosen provider.
- **Light mode only**: The design system is intentionally light-mode only per the Newsprint philosophy.
- **No rounded corners**: Enforced globally via `* { border-radius: 0 !important; }` in CSS.
- **Indonesian audience**: IDR pricing toggle and full Bahasa Indonesia translations included.

## License

MIT

---

*Cursor Ready is an independent product and is not affiliated with or endorsed by Cursor or Anysphere.*
