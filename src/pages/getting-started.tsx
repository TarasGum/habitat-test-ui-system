import * as React from "react";
import { Link, NavLink } from "react-router-dom";

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded-md border border-zinc-700 bg-zinc-900/90 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="w-full min-w-0 max-w-full overflow-x-auto p-3 pt-10 sm:p-4 sm:pt-11 text-xs sm:text-sm leading-relaxed text-zinc-100">
        <code className="block whitespace-pre">{children}</code>
      </pre>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-0 sm:pl-10">
      <div className="mb-2 sm:mb-0 sm:absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs font-bold">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-black mb-3">{title}</h3>
      <div className="space-y-4 text-zinc-600 leading-relaxed">{children}</div>
    </div>
  );
}

export function GettingStartedPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-zinc-100 py-8 pl-6 pr-4">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-4">
          Documentation
        </p>
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/docs/getting-started"
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-zinc-100 font-medium text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`
            }
          >
            Getting Started
          </NavLink>
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2 px-3">
              Components
            </p>
            <NavLink
              to="/docs/components/button"
              className={({ isActive }) =>
                `block rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-medium text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`
              }
            >
              Button
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-black mb-2">
          Habitat UI &mdash; Getting Started
        </h1>
        <p className="text-zinc-500 mb-10">
          Set up a new project with Habitat components in under five minutes.
        </p>

        {/* Prerequisites */}
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-6 mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-3">
            Prerequisites
          </h2>
          <ul className="list-disc list-inside text-zinc-600 space-y-1 text-sm">
            <li>Node.js 18+</li>
            <li>A React project (or create one below)</li>
          </ul>
        </div>

        <div className="space-y-12">
          <Step number={1} title="Create a React project">
            <CodeBlock>{`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`}</CodeBlock>
          </Step>

          <Step number={2} title="Install Tailwind CSS v4">
            <CodeBlock>npm install tailwindcss @tailwindcss/vite</CodeBlock>
            <p>
              Update{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-zinc-800">
                vite.config.ts
              </code>
              :
            </p>
            <CodeBlock>{`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});`}</CodeBlock>
            <p>
              Replace everything in{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-zinc-800">
                src/index.css
              </code>{" "}
              with:
            </p>
            <CodeBlock>@import "tailwindcss";</CodeBlock>
          </Step>

          <Step number={3} title="Set up path alias">
            <p>
              Add to{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-zinc-800">
                tsconfig.json
              </code>{" "}
              (the root one, not tsconfig.app.json):
            </p>
            <CodeBlock>{`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}</CodeBlock>
          </Step>

          <Step number={4} title="Initialize shadcn">
            <CodeBlock>npx shadcn@latest init</CodeBlock>
            <p>Select:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Radix component library</li>
              <li>Nova preset (or any)</li>
            </ul>
            <p className="text-sm text-zinc-500">
              This creates{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-800">
                components.json
              </code>
              , the{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-800">
                cn
              </code>{" "}
              utility at{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-800">
                src/lib/utils.ts
              </code>
              , and updates your CSS with theme variables.
            </p>
          </Step>

          <Step number={5} title="Add Habitat components">
            <p>
              Install the Habitat button (and any other components) via the
              registry:
            </p>
            <CodeBlock>
              npx shadcn add https://habitat-ui-system.vercel.app/r/button.json
            </CodeBlock>
            <p className="text-sm text-zinc-500">
              That&rsquo;s it. Import{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-800">
                Button
              </code>{" "}
              from{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-800">
                @/components/ui/button
              </code>{" "}
              and start building.
            </p>
          </Step>
        </div>

        <div className="mt-16 rounded-xl border border-zinc-100 bg-zinc-50/50 p-6 text-center">
          <p className="text-zinc-500 mb-3">Ready to explore components?</p>
          <Link
            to="/docs/components/button"
            className="inline-flex h-9 items-center rounded-lg bg-black px-4 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
          >
            View Button Component
          </Link>
        </div>
      </div>
    </div>
  );
}
