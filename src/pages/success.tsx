import * as React from "react"
import { useNavigate } from "react-router-dom"
import { HabitatLogo } from "@/components/habitat-logo"

export function SuccessPage() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = React.useState(5)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate("/docs/components/button")
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="flex items-center justify-center py-32 px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <svg
            className="h-8 w-8 text-emerald-500"
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
        </div>

        <HabitatLogo className="h-5 w-auto text-black mx-auto mb-4" />

        <h1 className="text-3xl font-bold tracking-tight text-black">
          You&rsquo;re all set!
        </h1>
        <p className="mt-3 text-zinc-500">
          Your Habitat UI Pro access is now active. All components are unlocked.
        </p>

        <div className="mt-8 text-sm text-zinc-400">
          Redirecting to components in{" "}
          <span className="font-mono font-medium text-black">{countdown}s</span>
          &hellip;
        </div>

        <button
          onClick={() => navigate("/docs/components/button")}
          className="mt-4 text-sm font-medium text-black underline underline-offset-4 hover:no-underline"
        >
          Go now
        </button>
      </div>
    </div>
  )
}
