import { Link, Outlet, useLocation } from "react-router-dom"
import { HabitatLogo } from "./habitat-logo"
import { useAuth } from "@/context/auth"

const navLinks = [
  { to: "/docs/getting-started", label: "Docs" },
  { to: "/docs/components/button", label: "Components" },
  { to: "/pricing", label: "Pricing" },
]

export function AppLayout() {
  const location = useLocation()
  const { isLoggedIn, logout } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <HabitatLogo className="h-5 w-auto text-black" />
            <span className="text-sm font-semibold tracking-tight text-black">
              Habitat Test UI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  location.pathname.startsWith(link.to)
                    ? "text-black font-medium bg-zinc-100"
                    : "text-zinc-500 hover:text-black hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-sm text-zinc-500 hover:text-black transition-colors"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm text-zinc-500 hover:text-black transition-colors"
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
          </div>
        </div>
      </header>

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
