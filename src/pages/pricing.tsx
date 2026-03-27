import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth"
import { Button } from "@/components/ui/button"

const plans = [
  {
    id: "hobby",
    name: "Hobby",
    price: "$0",
    period: "forever",
    description: "For personal projects and experiments.",
    features: [
      "5 free components",
      "Community support",
      "MIT license",
    ],
    cta: "Current Plan",
    disabled: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "one-time",
    description: "Full access to every component and future updates.",
    features: [
      "All 50+ components",
      "Priority support",
      "Figma file included",
      "Lifetime updates",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$149",
    period: "one-time",
    description: "Pro access for your entire team, up to 10 seats.",
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "Slack channel access",
      "Custom theming guide",
    ],
    cta: "Get Team",
  },
]

export function PricingPage() {
  const navigate = useNavigate()
  const { selectPlan } = useAuth()

  const handleSelect = (planId: string) => {
    selectPlan(planId)
    navigate("/login")
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-zinc-500 max-w-lg mx-auto">
            One purchase, lifetime access. No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "border-black shadow-xl shadow-zinc-200"
                  : "border-zinc-200"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-black px-3 py-0.5 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold text-black">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-black">
                  {plan.price}
                </span>
                <span className="text-sm text-zinc-400">/{plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-zinc-500">{plan.description}</p>

              <ul className="mt-6 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-600">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-black"
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

              <div className="mt-8">
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                  disabled={plan.disabled}
                  onClick={() => handleSelect(plan.id)}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
