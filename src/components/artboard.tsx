import { useRef, useState, useCallback, type PointerEvent } from "react"
import { toPng } from "html-to-image"
import { Camera, Check } from "lucide-react"
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
  const [copied, setCopied] = useState(false)
  const scale = useCanvasScale()
  const boardRef = useRef<HTMLDivElement>(null)
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
    const dx = (e.clientX - dragging.current.startX) / scale
    const delta = dragging.current.side === "right" ? dx : -dx
    setW(Math.max(minWidth, dragging.current.startW + delta))
  }, [minWidth, scale])

  const onPointerUp = useCallback(() => {
    dragging.current = null
  }, [])

  const copyScreenshot = useCallback(async () => {
    if (!boardRef.current) return
    const dataUrl = await toPng(boardRef.current, { pixelRatio: 2 })
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
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
    <div className="group/artboard flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {name}
        </span>
        <span className="text-[10px] tabular-nums text-neutral-400 dark:text-neutral-500">
          {Math.round(w)}px
        </span>
      </div>
      <div className="relative flex items-stretch">
        {handle("left")}
        <div
          ref={boardRef}
          className={`overflow-hidden rounded-sm bg-background text-foreground shadow-sm ${dark ? "dark" : ""}`}
          data-theme={theme}
          style={{ width: w, height }}
        >
          {children}
        </div>
        {handle("right")}

        {/* Toolbar — appears on hover */}
        <div className="pointer-events-none absolute -top-8 right-3 flex gap-1 opacity-0 transition-opacity group-hover/artboard:pointer-events-auto group-hover/artboard:opacity-100">
          <button
            onClick={copyScreenshot}
            className="flex size-6 cursor-pointer items-center justify-center rounded bg-black/70 text-white/80 transition-colors hover:bg-black hover:text-white"
            title="Copy screenshot to clipboard"
          >
            {copied ? <Check className="size-3.5" /> : <Camera className="size-3.5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
