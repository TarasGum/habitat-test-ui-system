import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth"
import { Button } from "@/components/ui/button"
import { HabitatLogo } from "@/components/habitat-logo"

const planDetails: Record<string, { name: string; price: string }> = {
  pro: { name: "Pro", price: "$49" },
  team: { name: "Team", price: "$149" },
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const { selectedPlan, completePurchase } = useAuth()
  const plan = planDetails[selectedPlan ?? "pro"] ?? planDetails.pro

  const handleConfirm = () => {
    completePurchase()
    navigate("/success")
  }

  return (
    <div className="flex items-center justify-center py-24 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <HabitatLogo className="h-6 w-auto text-black mx-auto mb-4" />
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Review your order and confirm
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 divide-y divide-zinc-100">
          <div className="p-6">
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-4">
              Order Summary
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-black">
                  Habitat UI &mdash; {plan.name}
                </div>
                <div className="text-sm text-zinc-500">
                  Lifetime access, all components
                </div>
              </div>
              <div className="text-2xl font-bold text-black">{plan.price}</div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Card Number
              </label>
              <input
                type="text"
                defaultValue="4242 4242 4242 4242"
                className="w-full h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500"
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Expiry
                </label>
                <input
                  type="text"
                  defaultValue="12/28"
                  className="w-full h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  CVC
                </label>
                <input
                  type="text"
                  defaultValue="123"
                  className="w-full h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <Button size="lg" className="w-full" onClick={handleConfirm}>
              Confirm &amp; Pay {plan.price}
            </Button>
            <p className="mt-3 text-center text-xs text-zinc-400">
              This is a demo checkout. No real payment will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
