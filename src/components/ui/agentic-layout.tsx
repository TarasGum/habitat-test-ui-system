"use client"

import * as React from "react"
import {
  MessageSquarePlusIcon,
  SendIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  SparklesIcon,
  UserIcon,
  TrashIcon,
  PencilIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

// ─── Context ──────────────────────────────────────────────────────────
interface AgenticContextValue {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const AgenticContext = React.createContext<AgenticContextValue | null>(null)

function useAgentic() {
  const ctx = React.useContext(AgenticContext)
  if (!ctx) throw new Error("Agentic components must be used within <AgenticLayout>")
  return ctx
}

// ─── Root layout ──────────────────────────────────────────────────────
export interface AgenticLayoutProps {
  children: React.ReactNode
  defaultSidebarOpen?: boolean
  className?: string
}

function AgenticLayout({
  children,
  defaultSidebarOpen = true,
  className,
}: AgenticLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen)

  return (
    <AgenticContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div
        className={cn(
          "relative flex h-screen w-full overflow-hidden bg-zinc-50",
          className
        )}
      >
        {/* gradient orbs */}
        <div
          className="pointer-events-none fixed -top-32 -left-32 size-[500px] rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, #a5b4fc 0%, transparent 70%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none fixed -right-32 -bottom-32 size-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }}
          aria-hidden
        />
        {/* noise texture */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{ backgroundImage: NOISE_SVG, backgroundRepeat: "repeat" }}
          aria-hidden
        />
        {children}
      </div>
    </AgenticContext.Provider>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────
export interface AgenticSidebarProps {
  conversations?: { id: string; title: string; active?: boolean }[]
  onNewChat?: () => void
  onSelectConversation?: (id: string) => void
  onDeleteConversation?: (id: string) => void
  onRenameConversation?: (id: string) => void
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

function AgenticSidebar({
  conversations = [],
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  header,
  footer,
  className,
}: AgenticSidebarProps) {
  const { sidebarOpen, setSidebarOpen } = useAgentic()
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative z-10 flex flex-col border-r border-white/20 transition-all duration-300 ease-out",
          "backdrop-blur-xl bg-white/50 shadow-[inset_-1px_0_0_rgba(0,0,0,0.06)]",
          sidebarOpen ? "w-[260px]" : "w-[52px]",
          className
        )}
      >
        {/* top bar */}
        <div className="flex items-center gap-2 px-3 py-3">
          <Tooltip>
            <TooltipTrigger
              className="flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/60 hover:text-zinc-900"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <PanelLeftCloseIcon className="size-4" />
              ) : (
                <PanelLeftOpenIcon className="size-4" />
              )}
            </TooltipTrigger>
            <TooltipContent side="right">
              {sidebarOpen ? "Close sidebar" : "Open sidebar"}
            </TooltipContent>
          </Tooltip>

          {sidebarOpen && (
            <Tooltip>
              <TooltipTrigger
                className="ml-auto flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/60 hover:text-zinc-900"
                onClick={onNewChat}
              >
                <MessageSquarePlusIcon className="size-4" />
              </TooltipTrigger>
              <TooltipContent>New chat</TooltipContent>
            </Tooltip>
          )}
        </div>

        {header && sidebarOpen && (
          <div className="px-3 pb-2">{header}</div>
        )}

        {sidebarOpen && <Separator className="opacity-50" />}

        {/* conversation list */}
        {sidebarOpen && (
          <ScrollArea className="flex-1 px-2 py-2">
            <div className="flex flex-col gap-0.5">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={cn(
                    "group relative flex items-center rounded-lg px-2.5 py-2 text-sm transition-all duration-150 cursor-pointer",
                    conv.active
                      ? "bg-white/70 text-zinc-900 shadow-sm backdrop-blur-sm"
                      : "text-zinc-600 hover:bg-white/40 hover:text-zinc-900"
                  )}
                  onClick={() => onSelectConversation?.(conv.id)}
                  onMouseEnter={() => setHoveredId(conv.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <span className="truncate flex-1">{conv.title}</span>
                  {hoveredId === conv.id && (
                    <div className="flex items-center gap-0.5 ml-1">
                      {onRenameConversation && (
                        <button
                          className="flex size-6 items-center justify-center rounded-md text-zinc-400 hover:bg-white/60 hover:text-zinc-700 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            onRenameConversation(conv.id)
                          }}
                        >
                          <PencilIcon className="size-3" />
                        </button>
                      )}
                      {onDeleteConversation && (
                        <button
                          className="flex size-6 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteConversation(conv.id)
                          }}
                        >
                          <TrashIcon className="size-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* footer */}
        {sidebarOpen && footer && (
          <>
            <Separator className="opacity-50" />
            <div className="px-3 py-3">{footer}</div>
          </>
        )}
      </div>
    </TooltipProvider>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────
export interface AgenticMainProps {
  children: React.ReactNode
  className?: string
}

function AgenticMain({ children, className }: AgenticMainProps) {
  return (
    <div
      className={cn(
        "relative z-10 flex flex-1 flex-col overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  )
}

// ─── Header bar ───────────────────────────────────────────────────────
export interface AgenticHeaderProps {
  title?: string
  model?: string
  actions?: React.ReactNode
  className?: string
}

function AgenticHeader({ title, model, actions, className }: AgenticHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-white/20 px-4 py-2.5",
        "backdrop-blur-md bg-white/40",
        className
      )}
    >
      {title && (
        <span className="text-sm font-medium text-zinc-800 truncate">
          {title}
        </span>
      )}
      {model && (
        <Badge variant="secondary" className="text-[10px] font-normal">
          {model}
        </Badge>
      )}
      {actions && <div className="ml-auto flex items-center gap-1">{actions}</div>}
    </div>
  )
}

// ─── Messages container ───────────────────────────────────────────────
export interface AgenticMessagesProps {
  children: React.ReactNode
  className?: string
}

function AgenticMessages({ children, className }: AgenticMessagesProps) {
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  })

  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
        {children}
        <div ref={endRef} />
      </div>
    </ScrollArea>
  )
}

// ─── Single message ───────────────────────────────────────────────────
export interface AgenticMessageProps {
  role: "user" | "assistant"
  children: React.ReactNode
  avatar?: React.ReactNode
  timestamp?: string
  className?: string
}

function AgenticMessage({
  role,
  children,
  avatar,
  timestamp,
  className,
}: AgenticMessageProps) {
  const isUser = role === "user"

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {avatar ?? (
        <Avatar className="mt-0.5 shrink-0">
          <AvatarFallback
            className={cn(
              "text-xs",
              isUser
                ? "bg-zinc-900 text-white"
                : "bg-gradient-to-br from-indigo-400 to-purple-500 text-white"
            )}
          >
            {isUser ? (
              <UserIcon className="size-3.5" />
            ) : (
              <SparklesIcon className="size-3.5" />
            )}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-zinc-900/90 text-white shadow-md"
            : "border border-white/40 bg-white/70 text-zinc-800 shadow-sm backdrop-blur-sm"
        )}
      >
        {children}
        {timestamp && (
          <span
            className={cn(
              "mt-1 block text-[10px]",
              isUser ? "text-zinc-400" : "text-zinc-400"
            )}
          >
            {timestamp}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Input area ───────────────────────────────────────────────────────
export interface AgenticInputProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  actions?: React.ReactNode
  className?: string
}

function AgenticInput({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Send a message...",
  disabled = false,
  actions,
  className,
}: AgenticInputProps) {
  const [internalValue, setInternalValue] = React.useState("")
  const value = controlledValue ?? internalValue
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value
    onChange ? onChange(v) : setInternalValue(v)
  }

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit?.(trimmed)
    if (!controlledValue) setInternalValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      className={cn(
        "border-t border-white/30 px-4 py-3",
        "backdrop-blur-md bg-white/60 shadow-[0_-8px_32px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2">
        <div className="relative flex items-end gap-2 rounded-2xl border border-white/40 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-zinc-200/60">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="max-h-32 min-h-[20px] flex-1 resize-none bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 disabled:opacity-50"
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                  value.trim()
                    ? "bg-zinc-900 text-white shadow-sm hover:bg-zinc-700"
                    : "text-zinc-300"
                )}
                onClick={handleSubmit}
                disabled={!value.trim() || disabled}
              >
                <SendIcon className="size-4" />
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {actions && (
          <div className="flex items-center gap-2 px-1">{actions}</div>
        )}
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────
export interface AgenticEmptyProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

function AgenticEmpty({
  title = "How can I help you today?",
  description,
  icon,
  children,
  className,
}: AgenticEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-4 px-4",
        className
      )}
    >
      {icon ?? (
        <div className="flex size-14 items-center justify-center rounded-2xl border border-white/40 bg-white/60 shadow-sm backdrop-blur-sm">
          <SparklesIcon className="size-6 text-zinc-400" />
        </div>
      )}
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-800">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

AgenticLayout.displayName = "AgenticLayout"
AgenticSidebar.displayName = "AgenticSidebar"
AgenticMain.displayName = "AgenticMain"
AgenticHeader.displayName = "AgenticHeader"
AgenticMessages.displayName = "AgenticMessages"
AgenticMessage.displayName = "AgenticMessage"
AgenticInput.displayName = "AgenticInput"
AgenticEmpty.displayName = "AgenticEmpty"

export {
  AgenticLayout,
  AgenticSidebar,
  AgenticMain,
  AgenticHeader,
  AgenticMessages,
  AgenticMessage,
  AgenticInput,
  AgenticEmpty,
}
