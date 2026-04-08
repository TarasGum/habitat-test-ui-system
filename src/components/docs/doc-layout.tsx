import * as React from "react"
import { NavLink, useLocation } from "react-router-dom"

const sidebarNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/getting-started" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Agentic Layout", href: "/docs/components/agentic-layout" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { title: "Cursor Skill", href: "/docs/cursor-skill" },
    ],
  },
]

interface TocItem {
  id: string
  title: string
  level: number
}

function TableOfContents() {
  const [headings, setHeadings] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState("")

  React.useEffect(() => {
    const content = document.getElementById("doc-content")
    if (!content) return

    const observer = new MutationObserver(() => {
      const els = content.querySelectorAll("h2[id], h3[id]")
      const items: TocItem[] = Array.from(els).map((el) => ({
        id: el.id,
        title: el.textContent ?? "",
        level: el.tagName === "H2" ? 2 : 3,
      }))
      setHeadings(items)
    })

    observer.observe(content, { childList: true, subtree: true })

    const els = content.querySelectorAll("h2[id], h3[id]")
    const items: TocItem[] = Array.from(els).map((el) => ({
      id: el.id,
      title: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }))
    setHeadings(items)

    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      const els = document.querySelectorAll("#doc-content h2[id], #doc-content h3[id]")
      let current = ""
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 100) {
          current = el.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-1">
      <p className="text-sm font-semibold text-zinc-900 mb-3">On This Page</p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
          }}
          className={`block text-[13px] transition-colors ${
            h.level === 3 ? "pl-3" : ""
          } ${
            activeId === h.id
              ? "font-medium text-zinc-900"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {h.title}
        </a>
      ))}
    </nav>
  )
}

export function DocLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="mx-auto flex max-w-[1400px] min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="hidden lg:block w-[220px] shrink-0 border-r border-zinc-100">
        <div className="sticky top-14 overflow-y-auto py-8 pl-8 pr-4 max-h-[calc(100vh-3.5rem)]">
          <nav className="space-y-6">
            {sidebarNav.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-semibold text-zinc-900 mb-2">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={() => {
                        const isActive = location.pathname === item.href
                        return `block rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                          isActive
                            ? "bg-zinc-100 font-medium text-zinc-900"
                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                        }`
                      }}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 py-10" id="doc-content">
          {children}
        </div>
      </div>

      {/* Table of Contents */}
      <aside className="hidden xl:block w-[200px] shrink-0">
        <div className="sticky top-14 overflow-y-auto py-8 pl-4 pr-8 max-h-[calc(100vh-3.5rem)]">
          <TableOfContents />
        </div>
      </aside>
    </div>
  )
}

export function DocHeader({
  title,
  description,
  badge,
}: {
  title: string
  description: string
  badge?: string
}) {
  return (
    <div className="mb-8 space-y-2">
      {badge && (
        <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
          {badge}
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        {title}
      </h1>
      <p className="text-base text-zinc-500 leading-relaxed">{description}</p>
    </div>
  )
}

export function DocSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-12 first:mt-0">
      <h2
        id={id}
        className="scroll-mt-20 text-xl font-semibold tracking-tight text-zinc-900 mb-4"
      >
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export function DocSubSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-8">
      <h3
        id={id}
        className="scroll-mt-20 text-base font-semibold tracking-tight text-zinc-900 mb-3"
      >
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
