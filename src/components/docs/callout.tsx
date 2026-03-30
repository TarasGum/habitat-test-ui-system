import * as React from "react"
import { cn } from "@/lib/utils"

type CalloutType = "note" | "warning" | "tip" | "danger"

const icons: Record<CalloutType, React.ReactNode> = {
  note: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  tip: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  danger: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const styles: Record<CalloutType, string> = {
  note: "border-blue-200 bg-blue-50/50 text-blue-900 [&_svg]:text-blue-500",
  warning: "border-amber-200 bg-amber-50/50 text-amber-900 [&_svg]:text-amber-500",
  tip: "border-emerald-200 bg-emerald-50/50 text-emerald-900 [&_svg]:text-emerald-500",
  danger: "border-red-200 bg-red-50/50 text-red-900 [&_svg]:text-red-500",
}

const labels: Record<CalloutType, string> = {
  note: "Note",
  warning: "Warning",
  tip: "Tip",
  danger: "Danger",
}

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("rounded-xl border p-4", styles[type])}>
      <div className="flex items-center gap-2">
        {icons[type]}
        <span className="text-sm font-semibold">{title ?? labels[type]}</span>
      </div>
      <div className="mt-2 text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  )
}
