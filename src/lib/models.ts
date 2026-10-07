/**
 * CURSOR READY — Model Configuration
 * Centralized model table. Update model IDs here without code changes.
 */

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  description: { en: string; id: string };
  speed: "fast" | "medium" | "slow";
  cost: "low" | "medium" | "high";
  quality: "good" | "better" | "best";
  contextWindow: number;
  available: boolean;
}

export const models: ModelConfig[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: {
      en: "Fast, versatile, great for most planning tasks",
      id: "Cepat, serbaguna, cocok untuk sebagian besar tugas perencanaan",
    },
    speed: "fast",
    cost: "medium",
    quality: "better",
    contextWindow: 128000,
    available: true,
  },
  {
    id: "claude-sonnet-4-20250514",
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    description: {
      en: "Excellent reasoning, ideal for architecture and schema design",
      id: "Penalaran luar biasa, ideal untuk desain arsitektur dan skema",
    },
    speed: "medium",
    cost: "medium",
    quality: "best",
    contextWindow: 200000,
    available: true,
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    description: {
      en: "Large context, strong at code generation and long documents",
      id: "Konteks besar, kuat dalam generasi kode dan dokumen panjang",
    },
    speed: "medium",
    cost: "medium",
    quality: "best",
    contextWindow: 1000000,
    available: true,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    description: {
      en: "Budget-friendly, good for simple projects",
      id: "Hemat, cocok untuk proyek sederhana",
    },
    speed: "fast",
    cost: "low",
    quality: "good",
    contextWindow: 128000,
    available: true,
  },
  {
    id: "claude-haiku-3.5",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    description: {
      en: "Fastest Claude model, good for quick iterations",
      id: "Model Claude tercepat, bagus untuk iterasi cepat",
    },
    speed: "fast",
    cost: "low",
    quality: "good",
    contextWindow: 200000,
    available: true,
  },
];

export const defaultModel = "claude-sonnet-4-20250514";
