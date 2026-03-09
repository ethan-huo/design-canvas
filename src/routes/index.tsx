import { createFileRoute } from "@tanstack/react-router"
import { Canvas } from "@/components/canvas"
import { Artboard } from "@/components/artboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SkipBack, Play, SkipForward } from "lucide-react"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <Canvas>
      <div className="flex flex-wrap gap-20 p-20">
        {/* Now Playing */}
        <Artboard name="Mobile — Now Playing" width={400}>
          <div className="flex flex-col gap-6 bg-[#0A0A0A] p-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-[32px] font-black leading-tight tracking-tight text-[#FAFAFA]">
                Now Playing
              </h1>
              <p className="text-[13px] text-white/40">
                Design Canvas Stress Test
              </p>
            </div>

            <Card className="border-white/[0.06] bg-[#161616] text-white">
              <CardContent className="flex flex-col gap-4">
                {/* Album art */}
                <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#E84855] via-[#BE3455] to-[#6B2FA0]">
                  <span className="text-5xl text-white/90">♪</span>
                </div>

                {/* Track info */}
                <div className="flex flex-col gap-0.5">
                  <div className="text-lg font-extrabold tracking-tight text-[#FAFAFA]">
                    Midnight Protocol
                  </div>
                  <div className="text-[13px] text-white/45">
                    Paper Orchestra — 2026
                  </div>
                </div>

                {/* Progress slider */}
                <div className="flex flex-col gap-2">
                  <Slider
                    defaultValue={[62]}
                    max={100}
                    className="[&_[data-slot=slider-track]]:bg-white/[0.08] [&_[data-slot=slider-range]]:bg-[#E84855] [&_[data-slot=slider-thumb]]:border-[#E84855] [&_[data-slot=slider-thumb]]:bg-white"
                  />
                  <div className="flex justify-between">
                    <span className="text-[11px] text-white/30">2:14</span>
                    <span className="text-[11px] text-white/30">3:38</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 py-1">
                  <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10">
                    <SkipBack className="size-5" />
                  </Button>
                  <Button size="icon" className="size-12 rounded-full bg-[#FAFAFA] text-[#0A0A0A] hover:bg-white">
                    <Play className="size-5 fill-current" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10">
                    <SkipForward className="size-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Artboard>

        {/* Mobile */}
        <Artboard name="Mobile — Login" width={390} height={844}>
          <div className="flex h-full flex-col items-center justify-center gap-6 p-10">
            <div className="text-3xl font-bold tracking-tight">Welcome</div>
            <p className="text-center text-sm text-muted-foreground">
              Sign in to continue
            </p>
            <div className="flex w-full flex-col gap-3">
              <input
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
                placeholder="Email"
              />
              <input
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
                placeholder="Password"
                type="password"
              />
              <Button className="w-full">Sign In</Button>
            </div>
          </div>
        </Artboard>

        {/* Desktop */}
        <Artboard name="Desktop — Dashboard" width={1440} height={900}>
          <div className="flex h-full">
            <aside className="flex w-56 flex-col gap-1 border-r border-border p-4">
              <div className="mb-4 text-sm font-semibold">Acme Inc</div>
              {["Dashboard", "Projects", "Settings"].map((item) => (
                <div
                  key={item}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent"
                >
                  {item}
                </div>
              ))}
            </aside>
            <main className="flex-1 p-8">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Welcome back
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {["Revenue", "Users", "Orders"].map((label) => (
                  <div
                    key={label}
                    className="rounded-lg border border-border p-5"
                  >
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="mt-1 text-2xl font-bold">--</div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </Artboard>

        {/* Tablet */}
        <Artboard name="Tablet — Settings" width={768} height={1024}>
          <div className="flex h-full flex-col gap-6 p-8">
            <h1 className="text-xl font-bold">Settings</h1>
            <div className="flex flex-col gap-4">
              {["Profile", "Notifications", "Appearance", "Security"].map(
                (section) => (
                  <div
                    key={section}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <span className="text-sm font-medium">{section}</span>
                    <span className="text-xs text-muted-foreground">→</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </Artboard>
      </div>
    </Canvas>
  )
}
