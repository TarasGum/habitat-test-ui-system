import { Link } from "react-router-dom"
import { DocLayout, DocHeader, DocSection } from "@/components/docs/doc-layout"
import { CodeBlock, CommandBlock, InlineCode } from "@/components/docs/code-block"
import { Steps, Step } from "@/components/docs/steps"
import { Callout } from "@/components/docs/callout"

export function GettingStartedPage() {
  return (
    <DocLayout>
      <DocHeader
        title="Getting Started"
        description="Set up a new project with Habitat UI components in under five minutes."
        badge="Docs"
      />

      <DocSection id="prerequisites" title="Prerequisites">
        <Callout type="note" title="Before you begin">
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Node.js 18 or later</li>
          </ul>
        </Callout>
      </DocSection>

      <DocSection id="new-project" title="New Project">
        <p className="text-sm text-zinc-600 mb-4">
          The fastest way to get started. This creates a Vite + React project with Tailwind CSS,
          path aliases, and shadcn/ui configured in one command.
        </p>
        <Steps>
          <Step title="Create a new project with shadcn">
            <CommandBlock command="npx shadcn@latest init -t vite" />
            <p>Follow the prompts — pick <strong>Radix Nova</strong> style (recommended) and <strong>Neutral</strong> base color.</p>
            <Callout type="tip" title="What this does">
              Sets up Vite, Tailwind CSS v4, path aliases, <InlineCode>components.json</InlineCode>,
              and a <InlineCode>cn</InlineCode> utility — all in one step.
            </Callout>
          </Step>

          <Step title="Configure the Habitat registry">
            <p>
              Open <InlineCode>components.json</InlineCode> and add the Habitat registry:
            </p>
            <CodeBlock
              filename="components.json"
              lang="json"
              code={`{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}`}
            />
          </Step>

          <Step title="Add Habitat components">
            <p>Install components using the <InlineCode>@habitat</InlineCode> namespace:</p>
            <CommandBlock command="npx shadcn@latest add @habitat/button" />
            <Callout type="note" title="Available components">
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li><InlineCode>@habitat/button</InlineCode> — Animated button with ripple, particles, magnetic hover</li>
                <li><InlineCode>@habitat/agentic-layout</InlineCode> — Chat layout with sidebar, message thread, and input</li>
              </ul>
            </Callout>
          </Step>

          <Step title="Start building">
            <p>Import the component and you're ready to go.</p>
            <CodeBlock
              filename="src/App.tsx"
              lang="tsx"
              code={`import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="brand" />
      <Button magnetic>Magnetic</Button>
    </div>
  );
}

export default App;`}
            />
            <CommandBlock command="npm run dev" />
          </Step>
        </Steps>
      </DocSection>

      <DocSection id="existing-project" title="Existing Project">
        <p className="text-sm text-zinc-600 mb-4">
          Already have a Vite + React project? Follow these steps to add Habitat UI to it.
        </p>
        <Steps>
          <Step title="Install Tailwind CSS v4">
            <p>Skip this if Tailwind is already configured.</p>
            <CommandBlock command="npm install tailwindcss @tailwindcss/vite" />
            <p>
              Add the plugin to <InlineCode>vite.config.ts</InlineCode>:
            </p>
            <CodeBlock
              filename="vite.config.ts"
              lang="ts"
              code={`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});`}
            />
          </Step>

          <Step title="Set up path aliases">
            <p>
              Skip this if the <InlineCode>@/</InlineCode> alias is already configured.
              Add to both <InlineCode>tsconfig.json</InlineCode> and <InlineCode>tsconfig.app.json</InlineCode>:
            </p>
            <CodeBlock
              filename="tsconfig.app.json"
              lang="json"
              code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
            />
          </Step>

          <Step title="Initialize shadcn">
            <p>This configures shadcn in your <strong>existing</strong> project — it does not create a new one.</p>
            <CommandBlock command="npx shadcn@latest init" />
            <p>Pick <strong>Radix Nova</strong> style (recommended), <strong>Neutral</strong> base color, and enable CSS variables.</p>
          </Step>

          <Step title="Configure the Habitat registry">
            <p>
              Open <InlineCode>components.json</InlineCode> and add the registry:
            </p>
            <CodeBlock
              filename="components.json"
              lang="json"
              code={`{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}`}
            />
          </Step>

          <Step title="Install components">
            <CommandBlock command="npx shadcn@latest add @habitat/button" />
            <CommandBlock command="npx shadcn@latest add @habitat/agentic-layout" />
          </Step>
        </Steps>
      </DocSection>

      <DocSection id="next-steps" title="Next Steps">
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            to="/docs/components/button"
            className="group rounded-xl border border-zinc-200 p-5 transition-all hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-100"
          >
            <div className="text-sm font-semibold text-zinc-900 group-hover:text-black">
              Button Component
            </div>
            <p className="mt-1 text-[13px] text-zinc-500">
              Explore all variants, sizes, and interactive features.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors">
              Read more
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zinc-200 p-5 transition-all hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-100"
          >
            <div className="text-sm font-semibold text-zinc-900 group-hover:text-black">
              shadcn/ui Docs
            </div>
            <p className="mt-1 text-[13px] text-zinc-500">
              Learn more about the registry and CLI system.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors">
              Visit site
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
        </div>
      </DocSection>
    </DocLayout>
  )
}
