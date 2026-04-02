import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth"
import {
  DocLayout,
  DocHeader,
  DocSection,
  DocSubSection,
} from "@/components/docs/doc-layout"
import { CodeBlock, CommandBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { Callout } from "@/components/docs/callout"
import { cn } from "@/lib/utils"

type Variant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "brand"
type Size = "xs" | "sm" | "default" | "lg" | "xl"

const variants: Variant[] = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "brand",
]
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

const buttonProps = [
  {
    name: "variant",
    type: '"default" | "outline" | "secondary" | "ghost" | "destructive" | "brand"',
    default: '"default"',
    description: "The visual style of the button.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "default" | "lg" | "xl" | "icon"',
    default: '"default"',
    description: "The size of the button.",
  },
  {
    name: "magnetic",
    type: "boolean",
    default: "false",
    description: "Enables magnetic hover effect that follows the cursor.",
  },
  {
    name: "orbit",
    type: "boolean",
    default: "false",
    description: "Adds an animated orbiting conic-gradient border.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a loading spinner and disables the button.",
  },
  {
    name: "showLogo",
    type: "boolean",
    default: "false",
    description: "Displays the brand logo inside the button.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button, preventing clicks and dimming it.",
  },
]

function ToggleChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
        active
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-colors",
          active ? "bg-emerald-400" : "bg-zinc-300"
        )}
      />
      {label}
    </button>
  )
}

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
  const [showPaywall, setShowPaywall] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const isBrand = variant === "brand"
  const installCmd = `npx shadcn add ${import.meta.env.VITE_REGISTRY_URL}/button.json`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DocLayout>
      <DocHeader
        title="Button"
        description="Animated button with ripple effects, particle bursts, magnetic hover, orbiting borders, and a brand logo variant."
        badge="Component"
      />

      {/* Install */}
      <DocSection id="installation" title="Installation">
        {hasProAccess ? (
          <CommandBlock command={installCmd} />
        ) : (
          <div
            className="relative cursor-pointer group"
            onClick={() => setShowPaywall(true)}
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
        )}

        <CodeBlock
          lang="tsx"
          code={`import { Button } from "@/components/ui/button"`}
        />
      </DocSection>

      {/* Source Code */}
      <DocSection id="source" title="Source">
        {hasProAccess ? (
          <div className="relative">
            <CodeBlock code={BUTTON_SOURCE} lang="tsx" filename="components/ui/button.tsx" />
            <button
              onClick={() => handleCopy(BUTTON_SOURCE)}
              className="absolute right-3 top-12 z-20 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              {copied ? "Copied!" : "Copy all"}
            </button>
          </div>
        ) : (
          <div
            className="relative cursor-pointer group"
            onClick={() => setShowPaywall(true)}
          >
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 blur-[3px] select-none pointer-events-none">
              <pre className="p-4 text-[13px] leading-relaxed text-zinc-400 max-h-[300px] overflow-hidden">
                <code>{BUTTON_SOURCE}</code>
              </pre>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-zinc-950/50 backdrop-blur-[1px]">
              <div className="text-center">
                <p className="text-white font-semibold mb-1">
                  Pro access required
                </p>
                <p className="text-sm text-zinc-400 mb-4">
                  Unlock full source code for all components.
                </p>
                <span className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black shadow-lg group-hover:scale-105 transition-transform inline-block">
                  Unlock with Pro
                </span>
              </div>
            </div>
          </div>
        )}
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <ComponentPreview
          code={`<Button variant="default">Click me</Button>`}
          lang="tsx"
        >
          <Button>Click me</Button>
        </ComponentPreview>
      </DocSection>

      {/* Playground */}
      <DocSection id="playground" title="Playground">
        <p className="text-[15px] text-zinc-500">
          Experiment with every prop combination in real time.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200">
          {/* Preview area */}
          <div
            className="flex min-h-[200px] items-center justify-center p-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(0 0% 90%) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
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

          {/* Controls */}
          <div className="border-t border-zinc-200 bg-zinc-50/50 p-5 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Variant
              </label>
              <div className="flex flex-wrap gap-1.5">
                {variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                      variant === v
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                      size === s
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Features
              </label>
              <div className="flex flex-wrap gap-1.5">
                <ToggleChip label="Magnetic" active={magnetic} onClick={() => setMagnetic(!magnetic)} />
                <ToggleChip label="Orbit" active={orbit} onClick={() => setOrbit(!orbit)} />
                <ToggleChip label="Loading" active={loading} onClick={() => setLoading(!loading)} />
                <ToggleChip label="Show Logo" active={showLogo} onClick={() => setShowLogo(!showLogo)} />
                <ToggleChip label="Disabled" active={disabled} onClick={() => setDisabled(!disabled)} />
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <DocSubSection id="variants" title="Variants">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {variants.map((v) => (
              <div
                key={v}
                className="flex flex-col items-center gap-3 rounded-xl border border-zinc-100 bg-white p-6"
              >
                <Button variant={v} size="lg">
                  {v === "brand"
                    ? undefined
                    : v.charAt(0).toUpperCase() + v.slice(1)}
                </Button>
                <span className="text-xs font-medium text-zinc-400">{v}</span>
              </div>
            ))}
          </div>
        </DocSubSection>

        <DocSubSection id="sizes" title="Sizes">
          <div className="flex flex-wrap items-end justify-center gap-4 rounded-xl border border-zinc-100 bg-white p-8">
            {sizes.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Button size={s}>{s.toUpperCase()}</Button>
                <span className="text-xs text-zinc-400">{s}</span>
              </div>
            ))}
          </div>
        </DocSubSection>

        <DocSubSection id="magnetic-hover" title="Magnetic Hover">
          <ComponentPreview
            code={`<Button magnetic size="lg">Hover me</Button>`}
            lang="tsx"
          >
            <Button magnetic size="lg">
              Hover me
            </Button>
          </ComponentPreview>
        </DocSubSection>

        <DocSubSection id="orbit-border" title="Orbit Border">
          <ComponentPreview
            code={`<Button orbit size="lg">Orbiting</Button>`}
            lang="tsx"
          >
            <Button orbit size="lg">
              Orbiting
            </Button>
          </ComponentPreview>
        </DocSubSection>

        <DocSubSection id="loading-state" title="Loading State">
          <ComponentPreview
            code={`<Button loading size="lg">Loading...</Button>`}
            lang="tsx"
          >
            <Button loading size="lg">
              Loading...
            </Button>
          </ComponentPreview>
        </DocSubSection>

        <DocSubSection id="brand-logo" title="Brand Logo">
          <ComponentPreview
            code={`<Button variant="brand" size="lg" />`}
            lang="tsx"
          >
            <Button variant="brand" size="lg" />
          </ComponentPreview>
        </DocSubSection>

        <DocSubSection id="with-icon" title="Combined Features">
          <ComponentPreview
            code={`<Button magnetic orbit size="lg">All Effects</Button>`}
            lang="tsx"
          >
            <div className="flex flex-wrap gap-3">
              <Button magnetic orbit size="lg">
                All Effects
              </Button>
              <Button showLogo size="lg">
                With Logo
              </Button>
            </div>
          </ComponentPreview>
        </DocSubSection>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <PropsTable props={buttonProps} />
        <Callout type="note" title="Extends HTMLButtonElement">
          All standard{" "}
          <code className="rounded bg-blue-100 px-1 py-0.5 text-xs font-mono">
            button
          </code>{" "}
          HTML attributes are also supported via spread props.
        </Callout>
      </DocSection>

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
