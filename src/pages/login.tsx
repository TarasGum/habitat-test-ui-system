import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth"
import { Button } from "@/components/ui/button"
import { HabitatLogo } from "@/components/habitat-logo"

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
    navigate("/checkout")
  }

  return (
    <div className="flex items-center justify-center py-24 px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <HabitatLogo className="h-6 w-auto text-black mx-auto mb-4" />
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Sign in to complete your purchase
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
            />
          </div>

          <Button type="submit" size="lg" className="w-full mt-2">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Enter any credentials &mdash; this is a demo login.
        </p>
      </div>
    </div>
  )
}
