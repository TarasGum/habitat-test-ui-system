import * as React from "react"

interface StepProps {
  title: string
  children: React.ReactNode
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="relative border-l-2 border-zinc-200 pl-8 pb-10 last:pb-0">
      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-zinc-300 bg-white" />
      <h3 className="text-base font-semibold tracking-tight text-zinc-900 -mt-0.5">
        {title}
      </h3>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-600">
        {children}
      </div>
    </div>
  )
}

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-1 mt-6 space-y-0 [&>div:last-child]:border-l-transparent">
      {children}
    </div>
  )
}
