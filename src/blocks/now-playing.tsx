import { Artboard } from "@/components/artboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SkipBack, Play, SkipForward } from "lucide-react"

export function NowPlaying() {
  return (
    <Artboard name="Mobile — Now Playing" width={400}>
      <div className="flex flex-col gap-6 bg-[#0A0A0A] p-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-black leading-tight tracking-tight text-[#FAFAFA]">
            Now Playing
          </h1>
          <p className="text-[13px] text-white/40">Design Canvas Stress Test</p>
        </div>

        <Card className="border-white/[0.06] bg-[#161616] text-white">
          <CardContent className="flex flex-col gap-4">
            <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#E84855] via-[#BE3455] to-[#6B2FA0]">
              <span className="text-5xl text-white/90">♪</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="text-lg font-extrabold tracking-tight text-[#FAFAFA]">
                Midnight Protocol
              </div>
              <div className="text-[13px] text-white/45">
                Paper Orchestra — 2026
              </div>
            </div>

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

            <div className="flex items-center justify-center gap-4 py-1">
              <Button variant="ghost" size="icon" className="text-white/50 hover:bg-white/10 hover:text-white">
                <SkipBack className="size-5" />
              </Button>
              <Button size="icon" className="size-12 rounded-full bg-[#FAFAFA] text-[#0A0A0A] hover:bg-white">
                <Play className="size-5 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/50 hover:bg-white/10 hover:text-white">
                <SkipForward className="size-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Artboard>
  )
}
