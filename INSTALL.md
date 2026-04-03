# Habitat UI — Getting Started

## Option A: New project (recommended)

### 1. Create a new project with shadcn

```bash
npx shadcn@latest init -t vite
```

Follow the prompts — pick your style (Radix Nova recommended), base color, etc. This sets up Vite, Tailwind CSS v4, path aliases, and `components.json` in one step.

### 2. Configure the Habitat registry

Open `components.json` and add the registry:

```json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

### 3. Install components

```bash
npx shadcn@latest add @habitat/button
npx shadcn@latest add @habitat/agentic-layout
```

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

---

## Option B: Existing Vite + React project

### 1. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

Add the plugin to `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

### 2. Set up path aliases

Add to both `tsconfig.json` and `tsconfig.app.json` (inside `compilerOptions`):

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

This configures shadcn in your existing project — it does **not** create a new one.

```bash
npx shadcn@latest init
```

Pick your style (Radix Nova recommended), base color, and enable CSS variables.

### 4. Configure the Habitat registry

Open `components.json` and add the registry:

```json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

### 5. Install components

```bash
npx shadcn@latest add @habitat/button
npx shadcn@latest add @habitat/agentic-layout
```

That's it.
