import { Button } from "./components/ui/button"

function App() {
  return (
    <div className="min-h-screen bg-white p-12 flex flex-col items-center gap-12">
      <h1 className="text-3xl font-bold tracking-tight">Button Showcase</h1>

      {/* brand with orbit */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-xs text-zinc-400 uppercase tracking-widest">Brand + Orbit</p>
        <div className="flex gap-4 items-center">
          <Button variant="brand" size="lg" />
          <Button variant="brand" size="default" />
          <Button variant="brand" size="sm" />
        </div>
      </section>

      {/* all variants */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-xs text-zinc-400 uppercase tracking-widest">Variants</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      {/* sizes */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-xs text-zinc-400 uppercase tracking-widest">Sizes</p>
        <div className="flex items-center gap-3">
          <Button size="xs">XS</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      {/* magnetic */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-xs text-zinc-400 uppercase tracking-widest">Magnetic Hover</p>
        <div className="flex gap-4">
          <Button magnetic size="lg">Hover me</Button>
          <Button magnetic variant="outline" size="lg">Magnetic</Button>
        </div>
      </section>

      {/* orbit on any variant */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-xs text-zinc-400 uppercase tracking-widest">Orbit Border</p>
        <div className="flex gap-4">
          <Button orbit size="lg">Orbiting</Button>
          <Button orbit variant="outline" size="lg">Outline Orbit</Button>
        </div>
      </section>

      {/* loading + logo */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-xs text-zinc-400 uppercase tracking-widest">States</p>
        <div className="flex gap-4">
          <Button loading size="lg">Loading...</Button>
          <Button showLogo size="lg">With Logo</Button>
          <Button disabled size="lg">Disabled</Button>
        </div>
      </section>
    </div>
  )
}

export default App
