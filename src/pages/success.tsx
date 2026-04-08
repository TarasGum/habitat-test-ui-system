import * as React from "react"
import { Link } from "react-router-dom"
import { HabitatLogo } from "@/components/habitat-logo"
import { Button } from "@/components/ui/button"

function CopyCommand({ command, label }: { command: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group">
      {label && (
        <div className="mb-1.5 text-xs font-medium text-zinc-400">{label}</div>
      )}
      <div className="relative flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
        <span className="mr-2 select-none text-zinc-600">$</span>
        <code className="flex-1 overflow-x-auto text-[13px] font-medium text-zinc-200">
          {command}
        </code>
        <button
          onClick={handleCopy}
          className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 text-zinc-400 opacity-0 transition-all hover:bg-zinc-700 hover:text-zinc-200 group-hover:opacity-100"
        >
          {copied ? (
            <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

function RegistrySnippet() {
  const [copied, setCopied] = React.useState(false)
  const code = `"registries": {
  "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group">
      <div className="mb-1.5 text-xs font-medium text-zinc-400">
        Add to components.json
      </div>
      <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 text-zinc-400 opacity-0 transition-all hover:bg-zinc-700 hover:text-zinc-200 group-hover:opacity-100"
        >
          {copied ? (
            <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export function SuccessPage() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex justify-center px-6 py-16 sm:py-24">
      <div
        className="w-full max-w-xl transition-all duration-700 ease-out"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(12px)",
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
            <svg
              className="h-7 w-7 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <HabitatLogo className="h-5 w-auto text-black mx-auto mb-3" />

          <h1 className="text-3xl font-bold tracking-tight text-black">
            You&rsquo;re in.
          </h1>
          <p className="mt-2 text-[15px] text-zinc-500">
            Pro access is active. Here&rsquo;s everything you need to start building.
          </p>
        </div>

        {/* Quick start card */}
        <div
          className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-700 delay-200 ease-out"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-white text-xs font-bold">
              1
            </div>
            <span className="text-sm font-semibold text-zinc-900">Quick start</span>
          </div>

          <div className="space-y-3">
            <CopyCommand
              label="Set up your project"
              command="npm create vite@latest my-app -- --template react-ts && cd my-app && npm install"
            />
            <CopyCommand
              label="Add Tailwind CSS v4 + shadcn"
              command="npm install tailwindcss @tailwindcss/vite && npx shadcn@latest init"
            />
          </div>
        </div>

        {/* Registry card */}
        <div
          className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-700 delay-300 ease-out"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-white text-xs font-bold">
              2
            </div>
            <span className="text-sm font-semibold text-zinc-900">Connect the registry</span>
          </div>

          <RegistrySnippet />
        </div>

        {/* Install card */}
        <div
          className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-700 delay-[400ms] ease-out"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-white text-xs font-bold">
              3
            </div>
            <span className="text-sm font-semibold text-zinc-900">Install components</span>
          </div>

          <div className="space-y-3">
            <CopyCommand command="npx shadcn@latest add @habitat/button" />
            <CopyCommand command="npx shadcn@latest add @habitat/agentic-layout" />
          </div>

          <div className="mt-4 rounded-xl bg-zinc-50 border border-zinc-100 p-3.5">
            <div className="flex items-start gap-2.5">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[13px] text-zinc-500 leading-relaxed">
                Each command fetches the source code, installs dependencies, and injects required CSS. No manual wiring needed.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 transition-all duration-700 delay-500 ease-out"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <Link to="/docs/getting-started" className="w-full sm:flex-1">
            <Button size="lg" className="w-full">
              Full setup guide
            </Button>
          </Link>
          <Link to="/docs/components/button" className="w-full sm:flex-1">
            <Button variant="outline" size="lg" className="w-full">
              Browse components
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Stuck? Check the{" "}
          <Link to="/docs/getting-started" className="underline underline-offset-2 hover:text-zinc-600 transition-colors">
            getting started guide
          </Link>
          {" "}for the full walkthrough.
        </p>
      </div>
    </div>
  )
}
