import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { HabitatLogo } from "@/components/habitat-logo"
import { useSearchControl } from "@/components/app-layout"
import { useAuth } from "@/context/auth"
import {
  AgenticLayout,
  AgenticSidebar,
  AgenticMain,
  AgenticHeader,
  AgenticMessages,
  AgenticMessage,
  AgenticInput,
} from "@/components/ui/agentic-layout"

type ChatRole = "user" | "assistant"

interface ChatLine {
  id: string
  role: ChatRole
  content: string
}

const DOC_CHATS = [
  { id: "getting-started", title: "Getting started", to: "/docs/getting-started" },
  { id: "button", title: "Button component", to: "/docs/components/button" },
  { id: "agentic-layout", title: "Agentic layout", to: "/docs/components/agentic-layout" },
  { id: "skill", title: "Cursor / AI skill", to: "/docs/skill" },
] as const

const SEED_MESSAGES: ChatLine[] = [
  {
    id: "1",
    role: "user",
    content: "What is Habitat UI?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Habitat UI is a shadcn-compatible component registry: polished React blocks you install with the CLI — animated buttons, magnetic hover, and this agentic chat shell with glassmorphism and noise texture. Drop one command into a Vite or Next app and ship.",
  },
  {
    id: "3",
    role: "user",
    content: "How do I add the chat layout?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Run `npx shadcn@latest add @habitat/agentic-layout` after pointing the CLI at the Habitat registry. You get `AgenticLayout`, sidebar, message thread, and input — composable pieces, same pattern as the snippet in the docs.",
  },
]

function assistantReply(prompt: string): string {
  const q = prompt.toLowerCase()
  if (q.includes("install") || q.includes("shadcn") || q.includes("cli")) {
    return "Add the registry to `components.json`, then run `npx shadcn@latest add @habitat/button` or `@habitat/agentic-layout`. The Getting Started page lists the exact Tailwind v4 setup."
  }
  if (q.includes("price") || q.includes("pro") || q.includes("pay")) {
    return "Pricing lives at /pricing — pro access unlocks the production registry URL and install commands on the docs."
  }
  if (q.includes("button") || q.includes("animate")) {
    return "The Button includes ripple, optional particle burst, magnetic cursor pull, and an orbiting border variant — all with runtime keyframe injection so hosts do not need extra CSS."
  }
  return `Browse the sidebar for doc shortcuts, or open Search (${"\u2318"}K). Everything is TypeScript-first and matches the Radix Nova preset.`
}

export function LandingPage() {
  const navigate = useNavigate()
  const { openSearch } = useSearchControl()
  const { isLoggedIn } = useAuth()
  const [messages, setMessages] = React.useState<ChatLine[]>(SEED_MESSAGES)
  const [activeChat, setActiveChat] = React.useState<string | null>(null)

  const conversations = React.useMemo(
    () =>
      DOC_CHATS.map((c) => ({
        id: c.id,
        title: c.title,
        active: activeChat === c.id,
      })),
    [activeChat]
  )

  const handleSelectConversation = (id: string) => {
    const row = DOC_CHATS.find((c) => c.id === id)
    if (row) {
      setActiveChat(id)
      navigate(row.to)
    }
  }

  const handleSubmit = (value: string) => {
    const userMsg: ChatLine = {
      id: `u-${Date.now()}`,
      role: "user",
      content: value,
    }
    setMessages((prev) => [...prev, userMsg])
    const reply = assistantReply(value)
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: reply },
      ])
    }, 450)
  }

  return (
    <AgenticLayout className="h-dvh min-h-0">
      <AgenticSidebar
        conversations={conversations}
        onNewChat={() => {
          setActiveChat(null)
          setMessages(SEED_MESSAGES)
        }}
        onSelectConversation={handleSelectConversation}
        header={
          <div className="flex flex-col gap-1 px-0.5">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-1 py-0.5 transition-colors hover:bg-white/50"
              onClick={() => setActiveChat(null)}
            >
              <HabitatLogo className="h-6 w-auto text-zinc-900" />
            </Link>
            <p className="text-[11px] leading-snug text-zinc-500">
              Agentic template — glass shell, real components.
            </p>
          </div>
        }
        footer={
          <div className="flex flex-col gap-2 text-[11px]">
            <Link
              to="/pricing"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline"
            >
              Pricing
            </Link>
            {isLoggedIn ? (
              <span className="text-zinc-400">Signed in</span>
            ) : (
              <Link
                to="/login"
                className="text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline"
              >
                Log in
              </Link>
            )}
          </div>
        }
      />
      <AgenticMain>
        <AgenticHeader
          title="Habitat UI"
          model="Live registry demo"
          actions={
            <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
              <button
                type="button"
                onClick={openSearch}
                className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-white/60 hover:text-zinc-900"
              >
                Search
                <kbd className="ml-1 hidden font-mono text-[10px] text-zinc-400 sm:inline">
                  {"\u2318"}K
                </kbd>
              </button>
              <Link
                to="/pricing"
                className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-white/60 hover:text-zinc-900"
              >
                Pricing
              </Link>
              <Link
                to="/docs/getting-started"
                className="rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white shadow-sm transition-colors hover:bg-zinc-800"
              >
                Get started
              </Link>
            </div>
          }
        />
        <AgenticMessages>
          {messages.map((m) => (
            <AgenticMessage key={m.id} role={m.role}>
              {m.content}
            </AgenticMessage>
          ))}
        </AgenticMessages>
        <AgenticInput
          placeholder="Ask about install, components, or pricing…"
          onSubmit={handleSubmit}
        />
      </AgenticMain>
    </AgenticLayout>
  )
}
