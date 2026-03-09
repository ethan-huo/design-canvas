import { useRef, useState, useCallback, type PointerEvent } from "react"
import { useCanvasScale } from "./canvas"

type ArtboardProps = {
  name: string
  width: number
  minWidth?: number
  height?: number
  theme?: string
  dark?: boolean
  children: React.ReactNode
}

export function Artboard({
  name,
  width: initialWidth,
  minWidth = 200,
  height,
  theme,
  dark,
  children,
}: ArtboardProps) {
  const [w, setW] = useState(initialWidth)
  const scale = useCanvasScale()
  const dragging = useRef<{ side: "left" | "right"; startX: number; startW: number } | null>(null)

  const onPointerDown = useCallback(
    (side: "left" | "right") => (e: PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragging.current = { side, startX: e.clientX, startW: w }
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    },
    [w],
  )

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return
    // Divide by scale so screen pixels map to canvas pixels correctly
    const dx = (e.clientX - dragging.current.startX) / scale
    const delta = dragging.current.side === "right" ? dx : -dx
    setW(Math.max(minWidth, dragging.current.startW + delta))
  }, [minWidth, scale])

  const onPointerUp = useCallback(() => {
    dragging.current = null
  }, [])

  const handle = (side: "left" | "right") => (
    <div
      className="group/handle flex w-3 cursor-col-resize items-center justify-center"
      onPointerDown={onPointerDown(side)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="h-8 w-1 rounded-full bg-neutral-300 opacity-0 transition-opacity group-hover/handle:opacity-100 dark:bg-neutral-600" />
    </div>
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {name}
        </span>
        <span className="text-[10px] tabular-nums text-neutral-400 dark:text-neutral-500">
          {Math.round(w)}px
        </span>
      </div>
      <div className="flex items-stretch">
        {handle("left")}
        <div
          className={`overflow-hidden rounded-sm bg-background text-foreground shadow-sm ${dark ? "dark" : ""}`}
          data-theme={theme}
          style={{ width: w, height }}
        >
          {children}
        </div>
        {handle("right")}
      </div>
    </div>
  )
}
