import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./index.css"
import { AuthProvider } from "./context/auth"
import { AppLayout } from "./components/app-layout"
import { LandingPage } from "./pages/landing"
import { GettingStartedPage } from "./pages/getting-started"
import { ButtonDocsPage } from "./pages/button-docs"
import { AgenticLayoutDocsPage } from "./pages/agentic-layout-docs"
import { PricingPage } from "./pages/pricing"
import { LoginPage } from "./pages/login"
import { CheckoutPage } from "./pages/checkout"
import { SuccessPage } from "./pages/success"
import { SkillDocsPage } from "./pages/skill-docs"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="docs/getting-started" element={<GettingStartedPage />} />
            <Route path="docs/components/button" element={<ButtonDocsPage />} />
            <Route path="docs/components/agentic-layout" element={<AgenticLayoutDocsPage />} />
            <Route path="docs/skill" element={<SkillDocsPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="success" element={<SuccessPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
