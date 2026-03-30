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
            <li>A React project (or create one below)</li>
          </ul>
        </Callout>
      </DocSection>

      <DocSection id="installation" title="Installation">
        <Steps>
          <Step title="Create a React project">
            <p>Start by creating a new Vite project with the React + TypeScript template.</p>
            <CommandBlock command="npm create vite@latest my-app -- --template react-ts" />
            <CommandBlock command="cd my-app && npm install" />
          </Step>

          <Step title="Install Tailwind CSS v4">
            <p>Install Tailwind CSS and the Vite plugin.</p>
            <CommandBlock command="npm install tailwindcss @tailwindcss/vite" />
            <p>
              Update your <InlineCode>vite.config.ts</InlineCode> to include the Tailwind plugin:
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
            <p>
              Replace everything in <InlineCode>src/index.css</InlineCode> with:
            </p>
            <CodeBlock filename="src/index.css" lang="css" code={`@import "tailwindcss";`} />
          </Step>

          <Step title="Set up path aliases">
            <p>
              Add the following to your root <InlineCode>tsconfig.json</InlineCode> (not{" "}
              <InlineCode>tsconfig.app.json</InlineCode>):
            </p>
            <CodeBlock
              filename="tsconfig.json"
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
            <CommandBlock command="npx shadcn@latest init" />
            <p>When prompted, select:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600">
              <li>Style: <strong>New York</strong> (or any)</li>
              <li>Base color: <strong>Neutral</strong></li>
              <li>CSS variables: <strong>Yes</strong></li>
            </ul>
            <Callout type="tip" title="What this does">
              This creates <InlineCode>components.json</InlineCode>, a{" "}
              <InlineCode>cn</InlineCode> utility at{" "}
              <InlineCode>src/lib/utils.ts</InlineCode>, and updates your CSS with
              theme variables.
            </Callout>
          </Step>

          <Step title="Add Habitat components">
            <p>Install the Habitat button (and any other components) from the registry:</p>
            <CommandBlock command="npx shadcn add https://habitat-ui-system.vercel.app/r/button.json" />
            <p className="text-sm text-zinc-500">
              This automatically installs dependencies like{" "}
              <InlineCode>class-variance-authority</InlineCode> and copies the component
              to <InlineCode>src/components/ui/button.tsx</InlineCode>.
            </p>
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
