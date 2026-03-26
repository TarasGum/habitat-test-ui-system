# Habitat UI — Getting Started

## 1. Create a React project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## 2. Install Tailwind CSS v4

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

Replace everything in `src/index.css` with:

```css
@import "tailwindcss";
```

## 3. Set up path alias

Add to `tsconfig.json` (the root one, inside `compilerOptions`):

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

```bash
npx shadcn@latest init
```

Follow the prompts:
- Style: **New York**
- Base color: **Neutral** (or your preference)
- CSS variables: **Yes**

This creates `components.json`, the `cn` utility at `src/lib/utils.ts`, and updates your CSS.

## 5. Install Habitat UI components

```bash
npx shadcn add https://habitat-ui-system.vercel.app/r/button.json
```

This will automatically install any needed dependencies (`class-variance-authority`, etc.) and copy the component to `src/components/ui/button.tsx`.

## 6. Use it

```tsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="brand" />
      <Button loading>Loading</Button>
    </div>
  );
}

export default App;
```

## 7. Run

```bash
npm run dev
```

That's it.
