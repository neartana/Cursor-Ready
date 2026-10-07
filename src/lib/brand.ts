/**
 * CURSOR READY — Brand Configuration
 * Single source of truth for all brand strings.
 * No hardcoded brand names in components.
 */

export const brand = {
  name: "Cursor Ready",
  tagline: "From rough idea to Cursor-ready plan.",
  domain: "cursorready.dev",
  url: "https://cursorready.dev",
  social: {
    twitter: "@cursorready",
    github: "cursorready",
  },
  email: {
    support: "support@cursorready.dev",
    hello: "hello@cursorready.dev",
  },
  edition: {
    volume: "Vol. 1",
    city: "Jakarta",
    version: "1.0",
  },
  disclaimer:
    "Cursor Ready is an independent product and is not affiliated with or endorsed by Cursor or Anysphere.",
  ogImage: "/og-image.png",
} as const;

export type Brand = typeof brand;
