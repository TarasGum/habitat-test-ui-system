import * as React from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { HabitatLogo } from "./habitat-logo"
import { useAuth } from "@/context/auth"

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
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isMenuOpen])

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <HabitatLogo className="h-5 w-auto text-black" />
            <span className="hidden sm:inline text-sm font-semibold tracking-tight text-black truncate">
              Habitat Test UI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  link.isActive(location.pathname)
                    ? "text-black font-medium bg-zinc-100"
                    : "text-zinc-500 hover:text-black hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

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

      <footer className="border-t border-zinc-100 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <HabitatLogo className="h-3.5 w-auto" />
            <span>Habitat Test UI</span>
          </div>
          <p>Built for developers who care about craft.</p>
        </div>
      </footer>
    </div>
  )
}
