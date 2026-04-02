import * as React from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { HabitatLogo } from "./habitat-logo"
import { useAuth } from "@/context/auth"

const searchItems = [
  { label: "Getting Started", description: "Installation and setup guide", to: "/docs/getting-started", group: "Docs" },
  { label: "Button", description: "Accessible button component with variants", to: "/docs/components/button", group: "Components" },
  { label: "Agentic Layout", description: "T3 Chat-style AI chat interface layout", to: "/docs/components/agentic-layout", group: "Components" },
  { label: "Pricing", description: "Plans and pricing", to: "/pricing", group: "Pages" },
  { label: "Log in", description: "Sign in to your account", to: "/login", group: "Pages" },
]

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const filtered = query.trim()
    ? searchItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.group.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems

  React.useEffect(() => {
    if (open) {
      setQuery("")
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  React.useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleSelect = (to: string) => {
    navigate(to)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      if (filtered[activeIndex]) handleSelect(filtered[activeIndex].to)
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  if (!open) return null

  const groups = Array.from(new Set(filtered.map((i) => i.group)))

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100">
          <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs, components..."
            className="flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-zinc-200 bg-zinc-50 px-1.5 font-mono text-[10px] text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* results */}
        <div className="max-h-[360px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-zinc-400">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            groups.map((group) => {
              const items = filtered.filter((i) => i.group === group)
              return (
                <div key={group} className="mb-1">
                  <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    {group}
                  </div>
                  {items.map((item) => {
                    const idx = filtered.indexOf(item)
                    return (
                      <button
                        key={item.to}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          idx === activeIndex ? "bg-zinc-100" : "hover:bg-zinc-50"
                        }`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => handleSelect(item.to)}
                      >
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{item.label}</div>
                          <div className="text-xs text-zinc-500">{item.description}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

const navLinks = [
  {
    to: "/docs/getting-started",
    label: "Docs",
    isActive: (pathname: string) => pathname.startsWith("/docs"),
  },
  {
    to: "/docs/components/button",
    label: "Components",
    isActive: (pathname: string) => pathname.startsWith("/docs/components"),
  },
  { to: "/pricing", label: "Pricing", isActive: (pathname: string) => pathname.startsWith("/pricing") },
]

export function AppLayout() {
  const location = useLocation()
  const { isLoggedIn, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    if (!isMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  React.useEffect(() => {
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [location.pathname])

  React.useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isMenuOpen])

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-6">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <HabitatLogo className="h-5 w-auto text-black" />
            <span className="hidden sm:inline text-sm font-semibold tracking-tight text-black">
              Habitat UI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  link.isActive(location.pathname)
                    ? "text-black font-medium"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-300 hover:text-zinc-500 w-[200px]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="flex-1 text-left">Search...</span>
            <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-zinc-200 bg-white px-1.5 font-mono text-[10px] font-medium text-zinc-400">
              ⌘K
            </kbd>
          </button>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="hidden sm:inline text-sm text-zinc-500 hover:text-black transition-colors"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline text-sm text-zinc-500 hover:text-black transition-colors"
              >
                Log in
              </Link>
            )}
            <Link
              to="/docs/getting-started"
              className="hidden sm:inline-flex h-8 items-center rounded-lg bg-black px-3.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              Get Started
            </Link>
            <button
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu-panel"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              {isMenuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu-overlay"
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <button
          aria-label="Close menu backdrop"
          className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          className={`absolute right-0 top-0 h-full w-[88vw] max-w-sm border-l border-zinc-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-14 items-center justify-between border-b border-zinc-100 px-4">
            <span className="text-sm font-semibold tracking-tight text-black">Menu</span>
            <button
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-1.5 px-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  link.isActive(location.pathname)
                    ? "bg-zinc-100 font-medium text-black"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                }`}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-1 h-px bg-zinc-100" />
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout()
                  setIsMenuOpen(false)
                }}
                className="rounded-lg px-3 py-2 text-left text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-black"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-black"
              >
                Log in
              </Link>
            )}
            <Link
              to="/docs/getting-started"
              onClick={() => setIsMenuOpen(false)}
              className="mt-1 inline-flex h-9 items-center justify-center rounded-lg bg-black px-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <SearchDialog open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <footer className="border-t border-zinc-100 py-8">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <HabitatLogo className="h-3.5 w-auto" />
            <span>Habitat UI</span>
          </div>
          <p>Built for developers who care about craft.</p>
        </div>
      </footer>
    </div>
  )
}
