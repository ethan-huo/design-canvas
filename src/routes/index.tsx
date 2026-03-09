import { createFileRoute } from "@tanstack/react-router"
import { Canvas } from "@/components/canvas"
import { NowPlaying } from "@/blocks/now-playing"
import { Login } from "@/blocks/login"
import { Dashboard } from "@/blocks/dashboard"
import { Settings } from "@/blocks/settings"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <Canvas>
      <div className="flex flex-wrap gap-20 p-20">
        <NowPlaying />
        <Login />
        <Dashboard />
        <Settings />
      </div>
    </Canvas>
  )
}
