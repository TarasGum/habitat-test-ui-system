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
import {
  AgenticLayout,
  AgenticSidebar,
  AgenticMain,
  AgenticHeader,
  AgenticMessages,
  AgenticMessage,
  AgenticInput,
  AgenticEmpty,
} from "@/components/ui/agentic-layout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserIcon } from "lucide-react"

const AGENTIC_SOURCE = `import {
  AgenticLayout,
  AgenticSidebar,
  AgenticMain,
  AgenticHeader,
  AgenticMessages,
  AgenticMessage,
  AgenticInput,
  AgenticEmpty,
} from "@/components/ui/agentic-layout"

export default function ChatPage() {
  const [messages, setMessages] = React.useState([])

  return (
    <AgenticLayout>
      <AgenticSidebar
        conversations={[
          { id: "1", title: "Help me with React", active: true },
          { id: "2", title: "Write a blog post" },
        ]}
        onNewChat={() => setMessages([])}
        footer={<UserAvatar />}
      />
      <AgenticMain>
        <AgenticHeader title="New conversation" model="GPT-4o" />
        {messages.length === 0 ? (
          <AgenticEmpty />
        ) : (
          <AgenticMessages>
            {messages.map((m) => (
              <AgenticMessage key={m.id} role={m.role}>
                {m.content}
              </AgenticMessage>
            ))}
          </AgenticMessages>
        )}
        <AgenticInput
          onSubmit={(value) => {
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), role: "user", content: value },
            ])
          }}
        />
      </AgenticMain>
    </AgenticLayout>
  )
}`

const PREVIEW_CODE = `<AgenticLayout>
  <AgenticSidebar
    conversations={conversations}
    onNewChat={() => {}}
    footer={<UserAvatar />}
  />
  <AgenticMain>
    <AgenticHeader title="New conversation" model="GPT-4o" />
    <AgenticMessages>
      <AgenticMessage role="user">
        How do I center a div?
      </AgenticMessage>
      <AgenticMessage role="assistant">
        Use flexbox: display: flex, align-items: center...
      </AgenticMessage>
    </AgenticMessages>
    <AgenticInput onSubmit={handleSubmit} />
  </AgenticMain>
</AgenticLayout>`

const layoutProps = [
  {
    name: "defaultSidebarOpen",
    type: "boolean",
    default: "true",
    description: "Whether the sidebar is initially expanded.",
  },
  {
    name: "className",
    type: "string",
    default: "-",
    description: "Additional classes for the root container.",
  },
]

const sidebarProps = [
  {
    name: "conversations",
    type: '{ id: string; title: string; active?: boolean }[]',
    default: "[]",
    description: "List of conversation entries for the sidebar.",
  },
  {
    name: "onNewChat",
    type: "() => void",
    default: "-",
    description: "Callback when the new chat button is clicked.",
  },
  {
    name: "onSelectConversation",
    type: "(id: string) => void",
    default: "-",
    description: "Callback when a conversation is selected.",
  },
  {
    name: "onDeleteConversation",
    type: "(id: string) => void",
    default: "-",
    description: "Callback when a conversation is deleted.",
  },
  {
    name: "onRenameConversation",
    type: "(id: string) => void",
    default: "-",
    description: "Callback when a conversation rename is triggered.",
  },
  {
    name: "header",
    type: "React.ReactNode",
    default: "-",
    description: "Custom content rendered above the conversation list.",
  },
  {
    name: "footer",
    type: "React.ReactNode",
    default: "-",
    description: "Custom content rendered at the bottom of the sidebar.",
  },
]

const messageProps = [
  {
    name: "role",
    type: '"user" | "assistant"',
    default: "-",
    description: "Determines the message alignment and bubble style.",
  },
  {
    name: "avatar",
    type: "React.ReactNode",
    default: "-",
    description: "Custom avatar element. Falls back to a default icon.",
  },
  {
    name: "timestamp",
    type: "string",
    default: "-",
    description: "Optional timestamp shown below the message.",
  },
]

const inputProps = [
  {
    name: "value",
    type: "string",
    default: "-",
    description: "Controlled input value.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "-",
    description: "Change handler for controlled mode.",
  },
  {
    name: "onSubmit",
    type: "(value: string) => void",
    default: "-",
    description: "Called with the trimmed message on Enter or send click.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Send a message..."',
    description: "Input placeholder text.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the input and send button.",
  },
  {
    name: "actions",
    type: "React.ReactNode",
    default: "-",
    description: "Additional actions rendered below the input field.",
  },
]

const headerProps = [
  {
    name: "title",
    type: "string",
    default: "-",
    description: "Title shown in the header bar.",
  },
  {
    name: "model",
    type: "string",
    default: "-",
    description: "Model name shown as a badge.",
  },
  {
    name: "actions",
    type: "React.ReactNode",
    default: "-",
    description: "Custom actions on the right side of the header.",
  },
]

const emptyProps = [
  {
    name: "title",
    type: "string",
    default: '"How can I help you today?"',
    description: "Heading text.",
  },
  {
    name: "description",
    type: "string",
    default: "-",
    description: "Subtext below the heading.",
  },
  {
    name: "icon",
    type: "React.ReactNode",
    default: "-",
    description: "Custom icon element. Falls back to a sparkles icon.",
  },
]

const DEMO_CONVERSATIONS = [
  { id: "1", title: "Help me with React hooks", active: true },
  { id: "2", title: "Write a blog post about AI" },
  { id: "3", title: "Debug my TypeScript error" },
  { id: "4", title: "Design system best practices" },
]

function DemoPreview() {
  const [messages, setMessages] = React.useState([
    { id: "1", role: "user" as const, content: "How do I center a div in CSS?" },
    {
      id: "2",
      role: "assistant" as const,
      content:
        "There are several ways to center a div! The most modern approach is using flexbox:\n\n```css\n.parent {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n```\n\nThis works for both horizontal and vertical centering. You can also use `place-items: center` with CSS Grid for a one-liner.",
    },
  ])
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50" style={{ clipPath: 'inset(0 round 0.75rem)' }}>
      <AgenticLayout className="!h-full">
        <AgenticSidebar
          conversations={DEMO_CONVERSATIONS}
          onNewChat={() => setMessages([])}
          onDeleteConversation={() => {}}
          footer={
            <div className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarFallback className="bg-zinc-200 text-xs">
                  <UserIcon className="size-3.5" />
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-zinc-600">demo@habitat.dev</span>
            </div>
          }
        />
        <AgenticMain>
          <AgenticHeader title="Help me with React hooks" model="GPT-4o" />
          <AgenticMessages>
            {messages.map((m) => (
              <AgenticMessage key={m.id} role={m.role}>
                {m.content}
              </AgenticMessage>
            ))}
          </AgenticMessages>
          <AgenticInput
            onSubmit={(value) => {
              setMessages((prev) => [
                ...prev,
                { id: String(Date.now()), role: "user" as const, content: value },
              ])
            }}
          />
        </AgenticMain>
      </AgenticLayout>
    </div>
  )
}

function DemoEmptyState() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50" style={{ clipPath: 'inset(0 round 0.75rem)' }}>
      <AgenticLayout className="!h-full">
        <AgenticSidebar conversations={[]} onNewChat={() => {}} />
        <AgenticMain>
          <AgenticHeader model="GPT-4o" />
          <AgenticEmpty
            title="How can I help you today?"
            description="Start a conversation by typing a message below."
          />
          <AgenticInput onSubmit={() => {}} />
        </AgenticMain>
      </AgenticLayout>
    </div>
  )
}

export function AgenticLayoutDocsPage() {
  const { hasProAccess } = useAuth()
  const navigate = useNavigate()
  const [showPaywall, setShowPaywall] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const installCmd = `npx shadcn add ${import.meta.env.VITE_REGISTRY_URL}/agentic-layout.json`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DocLayout>
      <DocHeader
        title="Agentic Layout"
        description="Agentic chat layout with glassmorphism aesthetics. Includes a collapsible sidebar, scrollable message thread, and input bar."
        badge="Template"
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
          code={`import {
  AgenticLayout,
  AgenticSidebar,
  AgenticMain,
  AgenticHeader,
  AgenticMessages,
  AgenticMessage,
  AgenticInput,
  AgenticEmpty,
} from "@/components/ui/agentic-layout"`}
        />
      </DocSection>

      {/* Source Code */}
      <DocSection id="source" title="Source">
        {hasProAccess ? (
          <div className="relative">
            <CodeBlock
              code={AGENTIC_SOURCE}
              lang="tsx"
              filename="components/ui/agentic-layout.tsx"
            />
            <button
              onClick={() => handleCopy(AGENTIC_SOURCE)}
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
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3.5 rounded bg-zinc-200/60"
                    style={{ width: `${60 + Math.random() * 35}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-zinc-50/80 backdrop-blur-[2px]">
              <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black shadow-lg ring-1 ring-zinc-200 group-hover:scale-105 transition-transform">
                Unlock Source with Pro
              </span>
            </div>
          </div>
        )}
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          lang="tsx"
          code={AGENTIC_SOURCE}
        />
      </DocSection>

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <Callout type="tip">
          This is a fully interactive preview. Try typing a message and pressing Enter.
        </Callout>
        <ComponentPreview code={PREVIEW_CODE}>
          <DemoPreview />
        </ComponentPreview>
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <DocSubSection id="empty-state" title="Empty State">
          <p className="text-sm text-zinc-600">
            Use <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">AgenticEmpty</code> to
            show a placeholder when there are no messages.
          </p>
          <ComponentPreview
            code={`<AgenticLayout>
  <AgenticSidebar conversations={[]} />
  <AgenticMain>
    <AgenticHeader model="GPT-4o" />
    <AgenticEmpty
      title="How can I help you today?"
      description="Start a conversation below."
    />
    <AgenticInput onSubmit={handleSubmit} />
  </AgenticMain>
</AgenticLayout>`}
          >
            <DemoEmptyState />
          </ComponentPreview>
        </DocSubSection>

        <DocSubSection id="collapsed-sidebar" title="Collapsed Sidebar">
          <p className="text-sm text-zinc-600">
            Set <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">defaultSidebarOpen=&#123;false&#125;</code> to
            start with the sidebar collapsed.
          </p>
          <CodeBlock
            lang="tsx"
            code={`<AgenticLayout defaultSidebarOpen={false}>
  <AgenticSidebar conversations={conversations} />
  <AgenticMain>
    {/* ... */}
  </AgenticMain>
</AgenticLayout>`}
          />
        </DocSubSection>

        <DocSubSection id="custom-avatars" title="Custom Avatars">
          <p className="text-sm text-zinc-600">
            Pass a custom <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">avatar</code> prop
            to <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">AgenticMessage</code> for
            branded user/AI avatars.
          </p>
          <CodeBlock
            lang="tsx"
            code={`<AgenticMessage
  role="assistant"
  avatar={
    <Avatar>
      <AvatarImage src="/ai-avatar.png" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  }
>
  Here's the answer to your question...
</AgenticMessage>`}
          />
        </DocSubSection>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="api-layout" title="AgenticLayout">
          <PropsTable props={layoutProps} />
        </DocSubSection>
        <DocSubSection id="api-sidebar" title="AgenticSidebar">
          <PropsTable props={sidebarProps} />
        </DocSubSection>
        <DocSubSection id="api-header" title="AgenticHeader">
          <PropsTable props={headerProps} />
        </DocSubSection>
        <DocSubSection id="api-messages" title="AgenticMessages">
          <Callout type="note">
            AgenticMessages accepts <code>children</code> and <code>className</code> only.
            It auto-scrolls to the latest message.
          </Callout>
        </DocSubSection>
        <DocSubSection id="api-message" title="AgenticMessage">
          <PropsTable props={messageProps} />
        </DocSubSection>
        <DocSubSection id="api-input" title="AgenticInput">
          <PropsTable props={inputProps} />
        </DocSubSection>
        <DocSubSection id="api-empty" title="AgenticEmpty">
          <PropsTable props={emptyProps} />
        </DocSubSection>
      </DocSection>

      {/* Paywall modal */}
      {showPaywall && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowPaywall(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-zinc-900">
              Pro Access Required
            </h3>
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
