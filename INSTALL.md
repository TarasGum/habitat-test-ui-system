# Habitat UI — Getting Started

## Prerequisites

- **Node.js 18** or later
- A package manager (`npm`, `pnpm`, or `yarn`)

## 1. Create a Vite + React project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## 2. Add Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

Replace everything in `src/index.css` with:

```css
@import "tailwindcss";
```

## 3. Configure path aliases

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

Update `vite.config.ts` to resolve the `@` alias:

```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

## 4. Initialize shadcn

```bash
npx shadcn@latest init
```

When prompted, pick **Radix** base and **Nova** preset (recommended).

## 5. Add the Habitat registry

Open the generated `components.json` and add `@habitat` to the `registries` field:

```json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

Leave the rest of the file as-is — only the `registries` block is new.

## 6. Install components

```bash
npx shadcn@latest add @habitat/button @habitat/agentic-layout
```

This fetches the component source code, installs npm dependencies, and injects required CSS automatically.

## 7. Use it

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

## Available components

| Component | Install command |
|---|---|
| Button | `npx shadcn@latest add @habitat/button` |
| Agentic Layout | `npx shadcn@latest add @habitat/agentic-layout` |
