import * as React from "react"
import { codeToHtml } from "shiki"

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  lang = "tsx",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [html, setHtml] = React.useState("")

  React.useEffect(() => {
    let cancelled = false
    codeToHtml(code.trim(), {
      lang,
      theme: "github-dark-default",
    }).then((result) => {
      if (!cancelled) setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [code, lang])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
      {filename && (
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
          <svg
            className="h-3.5 w-3.5 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-xs font-medium text-zinc-400">{filename}</span>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 text-zinc-400 opacity-0 backdrop-blur transition-all hover:bg-zinc-700 hover:text-zinc-200 group-hover:opacity-100"
        style={filename ? { top: "calc(2.5rem + 0.75rem)" } : undefined}
      >
        {copied ? (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </button>
      {html ? (
        <div
          className={`overflow-x-auto [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed [&_code]:!bg-transparent ${showLineNumbers ? "[&_.line]:[counter-increment:line] [&_.line]:before:[content:counter(line)] [&_.line]:before:mr-6 [&_.line]:before:inline-block [&_.line]:before:w-4 [&_.line]:before:text-right [&_.line]:before:text-zinc-600" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-300">
          <code>{code.trim()}</code>
        </pre>
      )}
    </div>
  )
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="relative rounded-md border border-zinc-200 bg-zinc-100 px-[0.4rem] py-[0.15rem] font-mono text-[13px] font-medium text-zinc-800">
      {children}
    </code>
  )
}

export function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
      <span className="mr-2 select-none text-zinc-600">$</span>
      <code className="flex-1 overflow-x-auto text-[13px] font-medium text-zinc-200">
        {command}
      </code>
      <button
        onClick={handleCopy}
        className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 text-zinc-400 opacity-0 transition-all hover:bg-zinc-700 hover:text-zinc-200 group-hover:opacity-100"
      >
        {copied ? (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
  )
}
