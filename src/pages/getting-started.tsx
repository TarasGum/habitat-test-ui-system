import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { DocLayout, DocHeader, DocSection } from "@/components/docs/doc-layout"
import { CodeBlock, CommandBlock, InlineCode } from "@/components/docs/code-block"
import { Steps, Step } from "@/components/docs/steps"
import { Callout } from "@/components/docs/callout"
import { useAuth } from "@/context/auth"
import { Button } from "@/components/ui/button"

function LockedBlock({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="relative cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-400 select-none">
        npx shadcn add ••••••••••••••••••••
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-xl">
        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black shadow-lg ring-1 ring-zinc-200 group-hover:scale-105 transition-transform">
          Unlock with Pro
        </span>
      </div>
    </div>
  )
}

function LockedCodeBlock({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="relative cursor-pointer group"
      onClick={onClick}
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-3.5 rounded bg-zinc-200/60"
              style={{ width: `${50 + Math.random() * 40}%` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-zinc-50/80 backdrop-blur-[2px]">
        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black shadow-lg ring-1 ring-zinc-200 group-hover:scale-105 transition-transform">
          Unlock with Pro
        </span>
      </div>
    </div>
  )
}

export function GettingStartedPage() {
  const { hasProAccess } = useAuth()
  const navigate = useNavigate()
  const [showPaywall, setShowPaywall] = React.useState(false)

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
            <li><strong>Node.js 18</strong> or later</li>
            <li>A package manager (<InlineCode>npm</InlineCode>, <InlineCode>pnpm</InlineCode>, or <InlineCode>yarn</InlineCode>)</li>
          </ul>
        </Callout>
      </DocSection>

      <DocSection id="installation" title="Installation">
        <Steps>
          <Step title="Create a Vite + React project">
            <CommandBlock command="npm create vite@latest my-app -- --template react-ts" />
            <CommandBlock command="cd my-app && npm install" />
          </Step>

          <Step title="Add Tailwind CSS v4">
            <CommandBlock command="npm install tailwindcss @tailwindcss/vite" />
            <p>Replace everything in <InlineCode>src/index.css</InlineCode> with:</p>
            <CodeBlock filename="src/index.css" lang="css" code={`@import "tailwindcss";`} />
          </Step>

          <Step title="Configure path aliases">
            <p>Add <InlineCode>baseUrl</InlineCode> and <InlineCode>paths</InlineCode> to <strong>both</strong> <InlineCode>tsconfig.json</InlineCode> and <InlineCode>tsconfig.app.json</InlineCode>:</p>
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
            <p>Update <InlineCode>vite.config.ts</InlineCode> to resolve the alias and add the Tailwind plugin:</p>
            <CodeBlock
              filename="vite.config.ts"
              lang="ts"
              code={`import path from "path"
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
})`}
            />
          </Step>

          <Step title="Initialize shadcn">
            <CommandBlock command="npx shadcn@latest init" />
            <p>When prompted, pick <strong>Radix</strong> base and <strong>Nova</strong> preset (recommended).</p>
          </Step>

          <Step title="Add the Habitat registry">
            <p>
              Open the generated <InlineCode>components.json</InlineCode> and add <InlineCode>@habitat</InlineCode> to the <InlineCode>registries</InlineCode> field. Leave the rest of the file as-is.
            </p>
            {hasProAccess ? (
              <CodeBlock
                filename="components.json"
                lang="json"
                code={`{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}`}
              />
            ) : (
              <LockedCodeBlock onClick={() => setShowPaywall(true)} />
            )}
          </Step>

          <Step title="Install Habitat components">
            <p>Install components using the <InlineCode>@habitat</InlineCode> namespace. This fetches the source code, installs npm dependencies, and injects required CSS automatically.</p>
            {hasProAccess ? (
              <>
                <CommandBlock command="npx shadcn@latest add @habitat/button @habitat/agentic-layout" />
                <Callout type="note" title="Available components">
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li><InlineCode>@habitat/button</InlineCode> — Animated button with ripple, particles, magnetic hover</li>
                    <li><InlineCode>@habitat/agentic-layout</InlineCode> — Chat layout with sidebar, message thread, and input</li>
                  </ul>
                </Callout>
              </>
            ) : (
              <LockedBlock onClick={() => setShowPaywall(true)} />
            )}
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

      {showPaywall && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowPaywall(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-zinc-900">
              Pro Access Required
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Get access to the registry URL, install commands, and all component
              source code with a Pro plan.
            </p>

            <div className="mt-6 rounded-xl border border-zinc-200 p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-black">Pro Plan</span>
                <span className="text-2xl font-bold text-black">$49</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-600">
                {[
                  "All 50+ components",
                  "Copy & paste code access",
                  "Lifetime updates",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg
                      className="h-3.5 w-3.5 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => {
                  setShowPaywall(false)
                  navigate("/pricing")
                }}
              >
                Buy Pro
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowPaywall(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </DocLayout>
  )
}
