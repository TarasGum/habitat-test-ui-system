# Habitat UI — Getting Started

## 1. Create a Vite + React project

Skip this if you already have one.

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## 2. Install Tailwind CSS v4

Skip this if Tailwind is already configured.

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.ts` to include the Tailwind plugin and a path alias:

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

## 3. Set up path aliases

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

## 4. Initialize shadcn

This configures shadcn in your project — it creates `components.json`, a `cn` utility, and sets up your CSS with theme variables.

```bash
npx shadcn@latest init
```

When prompted, pick **Radix Nova** style (recommended), **Neutral** base color, and enable CSS variables.

## 5. Configure the Habitat registry

Open `components.json` and add the registry:

```json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

## 6. Install components

```bash
npx shadcn@latest add @habitat/button
npx shadcn@latest add @habitat/agentic-layout
```

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
