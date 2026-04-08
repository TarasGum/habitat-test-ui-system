import * as React from "react"
import { useNavigate } from "react-router-dom"
import { DocLayout, DocHeader, DocSection } from "@/components/docs/doc-layout"
import { CodeBlock, CommandBlock, InlineCode } from "@/components/docs/code-block"
import { Steps, Step } from "@/components/docs/steps"
import { Callout } from "@/components/docs/callout"
import { useAuth } from "@/context/auth"
import { Button } from "@/components/ui/button"

function LockedCodeBlock({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-3.5 rounded bg-zinc-200/60"
              style={{ width: `${40 + Math.random() * 50}%` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-zinc-50/80 backdrop-blur-[2px]">
        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black shadow-lg ring-1 ring-zinc-200 group-hover:scale-105 transition-transform">
          Unlock with Pro
        </span>
      </div>
    </div>
  )
}

const SKILL_CONTENT = `---
name: habitat-ui
description: >-
  Habitat UI component registry built on shadcn/ui. Covers registry format,
  Tailwind v4 CSS, component install flow, and the Vite + React stack.
---

# Habitat UI

## Registry URL

\\\`\\\`\\\`
https://habitat-ui-system.vercel.app/r/{name}.json
\\\`\\\`\\\`

## Install components

\\\`\\\`\\\`bash
npx shadcn@latest add @habitat/button
npx shadcn@latest add @habitat/agentic-layout
\\\`\\\`\\\`

## components.json registry config

\\\`\\\`\\\`json
{
  "registries": {
    "@habitat": "https://habitat-ui-system.vercel.app/r/{name}.json"
  }
}
\\\`\\\`\\\`

## Available components

| Name              | Type                 | Features                                                  |
|-------------------|----------------------|-----------------------------------------------------------|
| button            | registry:component   | Ripple, particle burst, magnetic hover, orbiting border   |
| agentic-layout    | registry:block       | Chat layout with sidebar, message thread, glassmorphism   |

## Stack requirements

- Vite + React + TypeScript
- Tailwind CSS v4 (\\@tailwindcss/vite plugin)
- shadcn/ui (Radix base, Nova preset)
- Path alias: @/* → ./src/*`

export function SkillDocsPage() {
  const { hasProAccess } = useAuth()
  const navigate = useNavigate()
  const [showPaywall, setShowPaywall] = React.useState(false)

  return (
    <DocLayout>
      <DocHeader
        title="AI Skill"
        description="Give your AI editor full context on Habitat UI — registry, commands, components, and stack — in one file."
        badge="Pro"
      />

      <DocSection id="what" title="What is this?">
        <p className="text-[15px] text-zinc-600 leading-relaxed">
          An <strong>AI Skill</strong> is a markdown file you drop into your project that teaches
          AI coding agents about Habitat UI. Once added, your editor knows the registry URL,
          install commands, component list, and stack requirements — no need to explain it every chat.
        </p>
        <Callout type="note" title="Works with">
          <ul className="list-disc list-inside space-y-1 mt-1 text-[13px]">
            <li><strong>Cursor</strong> — place in <InlineCode>.cursor/skills/habitat-ui/SKILL.md</InlineCode></li>
            <li><strong>Windsurf</strong> — place in <InlineCode>.windsurf/rules/habitat-ui.md</InlineCode></li>
            <li><strong>GitHub Copilot</strong> — place in <InlineCode>.github/copilot-instructions.md</InlineCode></li>
            <li><strong>Any AI editor</strong> — paste into your project-level instructions or context file</li>
          </ul>
        </Callout>
      </DocSection>

      <DocSection id="setup" title="Add the skill to your project">
        <Steps>
          <Step title="Create the file">
            <p>Pick the path for your editor:</p>
            <CommandBlock command="mkdir -p .cursor/skills/habitat-ui" />
            <p className="text-[13px] text-zinc-500 mt-1">Or use <InlineCode>.windsurf/rules/</InlineCode>, <InlineCode>.github/</InlineCode>, etc.</p>
          </Step>

          <Step title="Paste the skill content">
            <p>Copy the following into the file:</p>
            {hasProAccess ? (
              <CodeBlock
                filename="SKILL.md"
                lang="markdown"
                code={SKILL_CONTENT}
              />
            ) : (
              <LockedCodeBlock onClick={() => setShowPaywall(true)} />
            )}
          </Step>

          <Step title="Done">
            <p>
              Your AI editor will automatically pick up the file. Next time you ask it to
              add a Habitat component or set up the registry, it already knows how.
            </p>
          </Step>
        </Steps>
      </DocSection>

      <DocSection id="what-it-includes" title="What the skill includes">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: "Registry URL", desc: "The production endpoint so the agent can configure components.json" },
            { title: "Install commands", desc: "Exact npx commands for every available component" },
            { title: "Component catalog", desc: "Names, types, and feature summaries for each component" },
            { title: "Stack requirements", desc: "Vite, React, Tailwind v4, shadcn — so it picks the right setup" },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-zinc-200 p-4 transition-colors hover:border-zinc-300"
            >
              <div className="text-sm font-semibold text-zinc-900">{card.title}</div>
              <p className="mt-1 text-[13px] text-zinc-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="try-it" title="Try it out">
        <Callout type="note" title="Example prompts">
          <ul className="list-disc list-inside space-y-1 mt-1 text-[13px]">
            <li>&ldquo;Add the Habitat button to my project&rdquo;</li>
            <li>&ldquo;Set up the @habitat registry in my app&rdquo;</li>
            <li>&ldquo;What Habitat components are available?&rdquo;</li>
          </ul>
        </Callout>
        <p className="text-[15px] text-zinc-600 leading-relaxed">
          With the skill in place, your AI editor will handle the registry config, install command, and
          import — without you having to copy-paste anything from the docs.
        </p>
      </DocSection>

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
              Get the AI Skill file, registry URL, and all component
              source code with a Pro plan.
            </p>

            <div className="mt-6 rounded-xl border border-zinc-200 p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-black">Pro Plan</span>
                <span className="text-2xl font-bold text-black">$49</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-600">
                {[
                  "All 50+ components",
                  "AI Skill file",
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
