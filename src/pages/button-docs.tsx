import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth"

type Variant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "brand"
type Size = "xs" | "sm" | "default" | "lg" | "xl" | "icon"

const variants: Variant[] = ["default", "outline", "secondary", "ghost", "destructive", "brand"]
const sizes: Size[] = ["xs", "sm", "default", "lg", "xl"]

const BUTTON_SOURCE = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 ...",
  {
    variants: {
      variant: {
        default: "bg-black text-white border border-black hover:bg-zinc-800 ...",
        outline: "bg-transparent text-black border border-black/20 ...",
        secondary: "bg-zinc-100 text-zinc-900 border border-zinc-200 ...",
        ghost: "bg-transparent text-zinc-700 border border-transparent ...",
        destructive: "bg-red-50 text-red-600 border border-red-200 ...",
        brand: "bg-black text-white border-none pr-3 ...",
      },
      size: {
        xs: "h-6 px-2.5 text-xs rounded-md",
        sm: "h-8 px-3 text-sm rounded-lg",
        default: "h-10 px-4 text-sm rounded-xl",
        lg: "h-12 px-6 text-base rounded-xl",
        xl: "h-14 px-8 text-lg rounded-2xl",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  showLogo?: boolean
  loading?: boolean
  magnetic?: boolean
  orbit?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, showLogo, loading, magnetic, orbit, children, ...props }, ref) => {
    // ... ripple, particle, magnetic hooks
    // ... orbiting border wrapper
    return <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>{children}</button>
  }
)

export { Button, buttonVariants }`

export function ButtonDocsPage() {
  const { hasProAccess } = useAuth()
  const navigate = useNavigate()

  const [variant, setVariant] = React.useState<Variant>("default")
  const [size, setSize] = React.useState<Size>("default")
  const [magnetic, setMagnetic] = React.useState(false)
  const [orbit, setOrbit] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [showLogo, setShowLogo] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview")
  const [showPaywall, setShowPaywall] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const isBrand = variant === "brand"

  const handleCodeTab = () => {
    if (!hasProAccess) {
      setShowPaywall(true)
      return
    }
    setActiveTab("code")
  }

  const installCmd = "npx shadcn add https://habitat-ui-system.vercel.app/r/button.json"

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-zinc-100 py-8 pl-6 pr-4 shrink-0">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-4">
          Documentation
        </p>
        <nav className="flex flex-col gap-1">
          <Link
            to="/docs/getting-started"
            className="text-sm text-zinc-500 hover:text-black rounded-lg px-3 py-1.5 transition-colors"
          >
            Getting Started
          </Link>
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2 px-3">
              Components
            </p>
            <Link
              to="/docs/components/button"
              className="text-sm font-medium text-black bg-zinc-100 rounded-lg px-3 py-1.5 block"
            >
              Button
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-black">Button</h1>
          <p className="mt-2 text-zinc-500">
            Animated button with ripple, particles, magnetic hover, orbiting border, and brand logo variant.
          </p>
        </div>

        {/* Install command */}
        <div className="mb-8">
          {hasProAccess ? (
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-950 px-4 py-3">
              <code className="flex-1 text-sm font-mono text-zinc-100 overflow-x-auto">
                {installCmd}
              </code>
              <button
                onClick={() => handleCopy(installCmd)}
                className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : (
            <div
              className="relative flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-950 px-4 py-3 cursor-pointer group"
              onClick={() => setShowPaywall(true)}
            >
              <code className="flex-1 text-sm font-mono text-zinc-100 blur-sm select-none">
                {installCmd}
              </code>
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-zinc-950/60 backdrop-blur-[2px]">
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black shadow-lg group-hover:scale-105 transition-transform">
                  Unlock with Pro
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-1 border-b border-zinc-100">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "preview"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Preview
          </button>
          <button
            onClick={handleCodeTab}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "code"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Code
          </button>
        </div>

        {/* Preview / Code panels */}
        <div className="rounded-xl border border-zinc-200 min-h-[320px]">
          {activeTab === "preview" ? (
            <div className="p-10 flex items-center justify-center">
              <Button
                variant={variant}
                size={size}
                magnetic={magnetic}
                orbit={orbit}
                loading={loading}
                showLogo={showLogo}
                disabled={disabled}
              >
                {isBrand ? undefined : "Button"}
              </Button>
            </div>
          ) : hasProAccess ? (
            <div className="relative">
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed text-zinc-100 bg-zinc-950 rounded-xl">
                <code>{BUTTON_SOURCE}</code>
              </pre>
              <button
                onClick={() => handleCopy(BUTTON_SOURCE)}
                className="absolute top-4 right-4 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : (
            <div className="relative min-h-[320px]">
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed text-zinc-100 bg-zinc-950 rounded-xl blur-sm select-none min-h-[320px]">
                <code>{BUTTON_SOURCE}</code>
              </pre>
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-zinc-950/60 backdrop-blur-[2px]">
                <p className="text-white font-medium mb-3">
                  Pro access required
                </p>
                <button
                  onClick={() => setShowPaywall(true)}
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black shadow-lg hover:scale-105 transition-transform"
                >
                  Unlock with Pro
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-8 rounded-xl border border-zinc-200 p-6">
          <h3 className="text-sm font-semibold text-black mb-5">Props Playground</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Variant */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">
                Variant
              </label>
              <div className="flex flex-wrap gap-1.5">
                {variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      variant === v
                        ? "bg-black text-white border-black"
                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      size === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">
                Toggles
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Magnetic", value: magnetic, set: setMagnetic },
                  { label: "Orbit", value: orbit, set: setOrbit },
                  { label: "Loading", value: loading, set: setLoading },
                  { label: "Show Logo", value: showLogo, set: setShowLogo },
                  { label: "Disabled", value: disabled, set: setDisabled },
                ].map((toggle) => (
                  <button
                    key={toggle.label}
                    onClick={() => toggle.set(!toggle.value)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      toggle.value
                        ? "bg-black text-white border-black"
                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        toggle.value ? "bg-emerald-400" : "bg-zinc-300"
                      }`}
                    />
                    {toggle.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Variant gallery */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-black mb-6">
            All Variants
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map((v) => (
              <div
                key={v}
                className="rounded-xl border border-zinc-100 p-6 flex flex-col items-center gap-3"
              >
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  {v}
                </p>
                <Button variant={v} size="lg">
                  {v === "brand" ? undefined : v.charAt(0).toUpperCase() + v.slice(1)}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Size gallery */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-black mb-6">
            All Sizes
          </h2>
          <div className="flex flex-wrap items-end justify-center gap-4 rounded-xl border border-zinc-100 p-8">
            {sizes.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Button size={s}>{s.toUpperCase()}</Button>
                <span className="text-xs text-zinc-400">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-black mb-6">
            Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-100 p-6 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-zinc-400">
                Magnetic Hover
              </p>
              <Button magnetic size="lg">
                Hover me
              </Button>
            </div>
            <div className="rounded-xl border border-zinc-100 p-6 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-zinc-400">
                Orbit Border
              </p>
              <Button orbit size="lg">
                Orbiting
              </Button>
            </div>
            <div className="rounded-xl border border-zinc-100 p-6 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-zinc-400">
                Loading State
              </p>
              <Button loading size="lg">
                Loading...
              </Button>
            </div>
            <div className="rounded-xl border border-zinc-100 p-6 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-zinc-400">
                Brand Logo
              </p>
              <Button showLogo size="lg">
                With Logo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowPaywall(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-black">
              Unlock Pro Components
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Get access to all component source code, install commands, and
              future updates with a Pro plan.
            </p>

            <div className="mt-6 rounded-xl border border-zinc-200 p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-black">Pro Plan</span>
                <span className="text-2xl font-bold text-black">$49</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-600">
                <li className="flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  All 50+ components
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copy &amp; paste code access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime updates
                </li>
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
    </div>
  )
}
