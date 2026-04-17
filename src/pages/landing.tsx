import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { HabitatLogo } from "@/components/habitat-logo"
import {
  AgenticLayout,
  AgenticSidebar,
  AgenticMain,
  AgenticHeader,
  AgenticMessages,
  AgenticMessage,
  AgenticInput,
} from "@/components/ui/agentic-layout"

const features = [
  {
    title: "Animated by Default",
    description:
      "Ripple effects, particle bursts, and orbiting borders built right in. No extra libraries needed.",
  },
  {
    title: "Fully Composable",
    description:
      "Mix and match variants, sizes, and behaviors. Every prop is designed to combine cleanly.",
  },
  {
    title: "Zero Config CSS",
    description:
      "Keyframes inject themselves at runtime. Just import the component and go.",
  },
  {
    title: "shadcn Compatible",
    description:
      "Install via the shadcn CLI. Drops into your existing project with full TypeScript support.",
  },
]

const stats = [
  { value: "2.4k", label: "GitHub Stars" },
  { value: "50+", label: "Components" },
  { value: "12ms", label: "Avg Render" },
  { value: "99%", label: "A11y Score" },
]

const testimonials = [
  {
    quote:
      "Habitat buttons feel alive. The ripple and magnetic effects are the best I've used in any React library.",
    author: "Sarah Chen",
    role: "Design Engineer at Linear",
  },
  {
    quote:
      "Dropped it into our design system in under 5 minutes. The shadcn integration is seamless.",
    author: "Marcus Rivera",
    role: "Frontend Lead at Vercel",
  },
  {
    quote:
      "Finally, animated components that don't sacrifice accessibility. This is how UI should be built.",
    author: "Aiko Tanaka",
    role: "Staff Engineer at Stripe",
  },
]

const SHOWCASE_CONVERSATIONS = [
  { id: "1", title: "Product copy ideas", active: true },
  { id: "2", title: "Refactor plan" },
  { id: "3", title: "Weekly summary" },
]

function AgenticShowcase() {
  const [draft, setDraft] = React.useState("")

  return (
    <div className="h-[min(560px,70vh)] min-h-[380px] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-xl">
      <AgenticLayout defaultSidebarOpen className="h-full min-h-0">
        <AgenticSidebar
          conversations={SHOWCASE_CONVERSATIONS}
          onNewChat={() => {}}
        />
        <AgenticMain>
          <AgenticHeader title="New conversation" model="Preview" />
          <AgenticMessages>
            <AgenticMessage role="user">
              Sketch a one-line value prop for a component registry.
            </AgenticMessage>
            <AgenticMessage role="assistant">
              Ship polished React UI blocks in one CLI command — animations,
              accessibility, and composition included.
            </AgenticMessage>
          </AgenticMessages>
          <AgenticInput
            value={draft}
            onChange={setDraft}
            placeholder="Try the input…"
            onSubmit={() => setDraft("")}
          />
        </AgenticMain>
      </AgenticLayout>
    </div>
  )
}

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-28 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-100 via-white to-white" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-zinc-200/50 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute right-8 top-24 h-40 w-40 rounded-full bg-zinc-300/30 blur-3xl animate-[pulse_14s_ease-in-out_infinite]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm text-zinc-600 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Now in public beta
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.05]">
            Components that
            <br />
            feel <span className="italic">alive</span>.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Habitat is a premium React component library with built-in
            animations, magnetic interactions, and orbiting borders.
            Drop-in ready via shadcn CLI.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/docs/getting-started">
              <Button size="lg" className="min-w-[180px]">
                Get Started
              </Button>
            </Link>
            <Link to="/docs/components/button">
              <Button variant="outline" size="lg" className="min-w-[180px]">
                View Components
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Button showcase strip */}
      <section className="border-y border-zinc-100 bg-zinc-50/50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-400 mb-10">
            Interactive button showcase
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="brand" size="lg" />
            <Button variant="default" size="lg">
              Default
            </Button>
            <Button variant="outline" size="lg">
              Outline
            </Button>
            <Button variant="secondary" size="lg">
              Secondary
            </Button>
            <Button variant="ghost" size="lg">
              Ghost
            </Button>
            <Button magnetic size="lg">
              Magnetic
            </Button>
            <Button orbit size="lg">
              Orbit
            </Button>
          </div>
        </div>
      </section>

      {/* Agentic layout showcase */}
      <section className="border-b border-zinc-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-400 mb-10">
            Agentic layout showcase
          </p>
          <AgenticShowcase />
          <p className="mt-8 text-center text-sm text-zinc-500">
            Chat shell with sidebar, thread, and input —{" "}
            <Link
              to="/docs/components/agentic-layout"
              className="font-medium text-zinc-800 underline-offset-4 hover:underline"
            >
              view docs
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight text-black">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-100 py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
              Built different
            </h2>
            <p className="mt-3 text-zinc-500 max-w-xl mx-auto">
              Every detail considered, every animation purposeful.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-zinc-100 p-8 transition-all hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-100"
              >
                <h3 className="text-lg font-semibold text-black">{f.title}</h3>
                <p className="mt-2 text-zinc-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-zinc-100 py-20 bg-zinc-50/30">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-black mb-14">
            Loved by engineers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="rounded-2xl border border-zinc-100 bg-white p-8"
              >
                <p className="text-zinc-600 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <div className="font-medium text-black">{t.author}</div>
                  <div className="text-sm text-zinc-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <HabitatLogo className="h-8 w-auto text-black mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Start building today
          </h2>
          <p className="mt-4 text-zinc-500">
            One CLI command. Zero config. Full control.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-3 font-mono text-sm text-zinc-700">
            <span className="text-zinc-400">$</span>
            npx shadcn@latest init
          </div>
          <div className="mt-8">
            <Link to="/docs/getting-started">
              <Button size="lg">Read the Docs</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
