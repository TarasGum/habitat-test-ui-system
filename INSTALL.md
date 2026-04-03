# Habitat UI — Getting Started

## Prerequisites

- **Node.js 18** or later
- A package manager (`npm`, `pnpm`, or `yarn`)

## 1. Create a new project with shadcn

The fastest way to start is with the shadcn CLI. It scaffolds a Vite + React + TypeScript project with Tailwind CSS v4, path aliases, theme CSS, and a `cn` utility — all in one step.

```bash
npx shadcn@latest init -t vite my-app
cd my-app
```

When prompted, pick **Radix Nova** style (recommended) and **Neutral** base color.

> **Already have a Vite + React project?** Run `npx shadcn@latest init` inside it instead — the CLI auto-detects Vite and configures everything for you.

## 2. Add the Habitat registry

Open the generated `components.json` and add `@habitat` to the `registries` field:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

Only the `registries` block is new — leave the rest of the file as-is.

## 3. Install components

```bash
npx shadcn@latest add @habitat/button @habitat/agentic-layout
```

This fetches the component source code, installs any npm dependencies, and injects required CSS — no manual wiring needed.

### Available components

| Component | Install command |
|---|---|
| Button | `npx shadcn@latest add @habitat/button` |
| Agentic Layout | `npx shadcn@latest add @habitat/agentic-layout` |

## 4. Use it

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Click me</Button>;
}
```

```bash
npm run dev
```

That's it.
