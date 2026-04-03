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

## 3. Set up path aliases

Add to `tsconfig.app.json` (inside `compilerOptions`):

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
- Style: **Radix Nova** (recommended) or any
- Base color: **Neutral** (or your preference)
- CSS variables: **Yes**

This creates `components.json`, the `cn` utility at `src/lib/utils.ts`, and updates your CSS with theme variables.

## 5. Configure the Habitat registry

Add the registry to `components.json`:

```json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

## 6. Install Habitat UI components

```bash
# Install the button
npx shadcn@latest add @habitat/button

# Install the agentic chat layout
npx shadcn@latest add @habitat/agentic-layout
```

This automatically installs all needed dependencies and copies components to `src/components/ui/`.

## 7. Use it

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

## 8. Run

```bash
npm run dev
```

That's it.
