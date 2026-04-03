# Habitat UI — Getting Started

## 1. Create a Vite + React project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## 2. Initialize shadcn

Run this inside the project. It adds Tailwind CSS, path aliases, theme CSS, and a `cn` utility.

```bash
npx shadcn@latest init
```

When prompted, pick **Radix Nova** style (recommended) and **Neutral** base color.

## 3. Configure the Habitat registry

Open `components.json` and add the registry:

```json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
```

## 4. Install components

```bash
npx shadcn@latest add @habitat/button
npx shadcn@latest add @habitat/agentic-layout
```

## 5. Use it

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
