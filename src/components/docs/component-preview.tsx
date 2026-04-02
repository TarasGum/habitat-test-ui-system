import * as React from "react"
import { CodeBlock } from "./code-block"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  code: string
  lang?: string
  children: React.ReactNode
  align?: "center" | "start" | "end"
}

export function ComponentPreview({
  code,
  lang = "tsx",
  children,
  align = "center",
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <div className="flex border-b border-zinc-200 bg-zinc-50/50">
        <button
          onClick={() => setTab("preview")}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
            tab === "preview"
              ? "text-zinc-900"
              : "text-zinc-400 hover:text-zinc-600"
          )}
        >
          Preview
          {tab === "preview" && (
            <span className="absolute inset-x-0 -bottom-px h-[2px] bg-zinc-900" />
          )}
        </button>
        <button
          onClick={() => setTab("code")}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
            tab === "code"
              ? "text-zinc-900"
              : "text-zinc-400 hover:text-zinc-600"
          )}
        >
          Code
          {tab === "code" && (
            <span className="absolute inset-x-0 -bottom-px h-[2px] bg-zinc-900" />
          )}
        </button>
      </div>

      <div
        className={cn(
          "min-h-[200px] w-full p-10",
          align === "center" && "items-center justify-center",
          align === "start" && "items-start justify-start",
          align === "end" && "items-end justify-end",
          tab === "preview" ? "flex" : "hidden"
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(0 0% 90%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {children}
      </div>
      <div className={cn(
        "[&_>div]:rounded-none [&_>div]:border-0",
        tab === "code" ? "block" : "hidden"
      )}>
        <CodeBlock code={code} lang={lang} />
      </div>
    </div>
  )
}
