---
name: habitat-ui
description: >-
  Habitat UI component registry system built on shadcn/ui. Use when working on
  components, registry JSON, the docs site, install flow, or anything related
  to the Habitat UI project. Covers registry format, Tailwind v4 CSS, component
  authoring, and the Vite + React stack.
---

# Habitat UI — Project Skill

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vite 8 + React 19 + TypeScript 5.9 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin, CSS-based config) |
| Components | shadcn/ui (Radix Nova style, Neutral base color) |
| Registry | shadcn registry v4 — custom `@habitat` namespace |
| Routing | react-router-dom v7 |
| Deployment | Vercel |

## Project layout

```
registry.json          ← source of truth for registry items
public/r/*.json        ← built registry output (npx shadcn build)
components.json        ← shadcn project config
src/
  components/ui/       ← component source (button.tsx, agentic-layout.tsx, …)
  components/docs/     ← doc page primitives (CodeBlock, Steps, Callout, …)
  pages/               ← route pages (landing, getting-started, button-docs, …)
  context/auth.tsx     ← auth + pro-access context
  lib/utils.ts         ← cn() utility
  index.css            ← Tailwind v4 theme + shadcn tokens
INSTALL.md             ← end-user getting-started guide
```

## Registry authoring

### registry.json format

Each item in `registry.json` → `items[]` must follow the shadcn registry-item schema.

**CSS field** — the `css` object uses **flat keys** with the directive + name together:

```json
{
  "css": {
    "@keyframes ripple": {
      "0%": { "transform": "scale(1)", "opacity": "0.5" },
      "100%": { "transform": "scale(20)", "opacity": "0" }
    },
    "@utility animate-ripple": {
      "animation": "ripple 0.65s ease-out forwards"
    }
  }
}
```

NEVER nest names under a bare `"@keyframes"` or `"@utility"` key — that produces invalid CSS in Tailwind v4.

### Building

```bash
npx shadcn@latest build
```

Reads `registry.json`, outputs `public/r/<name>.json` for each item. Always rebuild after editing `registry.json` or component source files.

### Testing locally

1. Run `npm run dev` (serves from `localhost:5173`)
2. In a test project, set the registry to `http://localhost:5173/r/{name}.json`
3. Run `npx shadcn@latest add @habitat/button`

### Production registry URL

```
https://habitat-ui-system.vercel.app/r/{name}.json
```

## Available components

| Name | Type | Key features |
|------|------|-------------|
| `button` | `registry:component` | Ripple, particle burst, magnetic hover, orbiting border, brand logo variant. Uses CVA for variants. |
| `agentic-layout` | `registry:block` | Chat layout with sidebar, message thread, input. Glassmorphism + noise texture. Depends on scroll-area, avatar, separator, tooltip, badge. |

## Component authoring rules

1. Every component file starts with `"use client"`.
2. Use `cn()` from `@/lib/utils` for className merging.
3. Animations that the component needs at runtime should be injected via `useEffect` + `<style>` tag (see `useInjectKeyframes` pattern in button.tsx) so they work even if the host project doesn't have the CSS.
4. Export the component **and** its variants type from CVA when applicable.
5. Use `data-slot="button"` (or relevant name) on the root element for shadcn compatibility.

## End-user install flow

The install guide lives in `INSTALL.md` and `src/pages/getting-started.tsx`.

Steps for a new project:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install
npm install tailwindcss @tailwindcss/vite
# Replace src/index.css with: @import "tailwindcss";
# Add baseUrl + paths to tsconfig.json AND tsconfig.app.json
# Add tailwindcss() plugin + @ alias to vite.config.ts
npx shadcn@latest init          # pick Radix base, Nova preset
# Add registries.@habitat to components.json
npx shadcn@latest add @habitat/button
```

## Tailwind v4 notes

- No `tailwind.config.js` — config is CSS-based (`@theme inline`, `@import`, `@custom-variant`).
- Colors use **oklch** color space.
- Custom utilities use `@utility name { … }` (not `@layer utilities`).
- The Vite plugin (`@tailwindcss/vite`) replaces PostCSS.

## Paywall / auth

- `useAuth()` from `src/context/auth.tsx` provides `hasProAccess`.
- Registry URL and install commands are gated behind pro access on the docs pages.
- Payment flow: `/pricing` → `/checkout` → `/success`.
