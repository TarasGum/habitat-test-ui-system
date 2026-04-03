# Habitat UI — Getting Started

## Prerequisites

- **Node.js 18** or later
- A package manager (`npm`, `pnpm`, or `yarn`)

---

## New project

### 1. Scaffold with the shadcn CLI

This creates a Vite + React + TypeScript project with Tailwind CSS v4, path aliases, theme CSS, and a `cn` utility — all in one command.

```bash
npx shadcn@latest init -t vite
```

The CLI will prompt you for a project name and configuration. Pick **Radix** base and **Nova** preset (recommended).

```bash
cd my-app
```

### 2. Add the Habitat registry

Open `components.json` and add `@habitat` to the `registries` field:

```json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

Leave the rest of the file as-is — only the `registries` block is new.

### 3. Install components

```bash
npx shadcn@latest add @habitat/button @habitat/agentic-layout
```

This fetches the component source code, installs npm dependencies, and injects required CSS automatically.

### 4. Use it

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

---

## Existing Vite + React project

If you already have a Vite + React project, follow these steps instead.

### 1. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

Replace everything in `src/index.css` with:

```css
@import "tailwindcss";
```

Add the Tailwind plugin to `vite.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
```

### 2. Configure path aliases

Add `baseUrl` and `paths` to **both** `tsconfig.json` and `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 3. Initialize shadcn

```bash
npx shadcn@latest init
```

Pick **Radix** base and **Nova** preset (recommended).

### 4. Add the Habitat registry

Open `components.json` and add `@habitat` to the `registries` field:

```json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

### 5. Install components

```bash
npx shadcn@latest add @habitat/button @habitat/agentic-layout
```

### 6. Use it

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Click me</Button>;
}
```

```bash
npm run dev
```

---

## Available components

| Component | Install command |
|---|---|
| Button | `npx shadcn@latest add @habitat/button` |
| Agentic Layout | `npx shadcn@latest add @habitat/agentic-layout` |
