import * as React from "react"

interface AuthState {
  isLoggedIn: boolean
  hasProAccess: boolean
  selectedPlan: string | null
  redirectPath: string
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => void
  logout: () => void
  selectPlan: (plan: string) => void
  completePurchase: () => void
  setRedirectPath: (path: string) => void
}

const STORAGE_KEY = "habitat-auth"

function loadState(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {
    isLoggedIn: false,
    hasProAccess: false,
    selectedPlan: null,
    redirectPath: "/docs/components/button",
  }
}

function persist(state: AuthState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>(loadState)

  const update = (patch: Partial<AuthState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch }
      persist(next)
      return next
    })
  }

  const value: AuthContextValue = {
    ...state,
    login: () => update({ isLoggedIn: true }),
    logout: () =>
      update({
        isLoggedIn: false,
        hasProAccess: false,
        selectedPlan: null,
      }),
    selectPlan: (plan) => update({ selectedPlan: plan }),
    completePurchase: () => update({ hasProAccess: true }),
    setRedirectPath: (path) => update({ redirectPath: path }),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
