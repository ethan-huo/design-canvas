import { createContext, useContext, useRef, useState, useCallback, type PointerEvent } from "react"

type Transform = { x: number; y: number; scale: number }

const ScaleContext = createContext(1)
export const useCanvasScale = () => useContext(ScaleContext)

const ZOOM_MIN = 0.05
const ZOOM_MAX = 5
const ZOOM_SPEED = 0.002

export function Canvas({ children }: { children: React.ReactNode }) {
  const [t, setT] = useState<Transform>({ x: 0, y: 0, scale: 0.5 })
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const zoomAt = useCallback((cx: number, cy: number, delta: number) => {
    setT(prev => {
      const factor = Math.exp(-delta * ZOOM_SPEED)
      const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, prev.scale * factor))
      // Keep the canvas point under the cursor fixed
      return {
        scale: next,
        x: cx - (cx - prev.x) * (next / prev.scale),
        y: cy - (cy - prev.y) * (next / prev.scale),
      }
    })
  }, [])

  const wheelHandler = useCallback((e: globalThis.WheelEvent) => {
    e.preventDefault()

    // Normalize delta: line-mode (mouse wheel) uses big steps, pixel-mode (trackpad) is fine
    let dy = e.deltaY
    if (e.deltaMode === 1) dy *= 16 // line mode

    if (e.shiftKey) {
      // Shift + scroll = pan
      setT(prev => ({ ...prev, x: prev.x - dy, y: prev.y - e.deltaX }))
    } else {
      // Zoom toward cursor (works for both trackpad pinch [ctrlKey] and mouse wheel)
      const rect = containerRef.current!.getBoundingClientRect()
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, dy)
    }
  }, [zoomAt])

  // Attach native wheel listener with { passive: false } for preventDefault
  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      const prev = containerRef.current
      if (prev) prev.removeEventListener("wheel", wheelHandler)
      containerRef.current = node
      if (node) node.addEventListener("wheel", wheelHandler, { passive: false })
    },
    [wheelHandler],
  )

  const onPointerDown = useCallback((e: PointerEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault()
      dragging.current = true
      last.current = { x: e.clientX, y: e.clientY }
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
  }, [])

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current = { x: e.clientX, y: e.clientY }
    setT(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }))
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  const pct = Math.round(t.scale * 100)

  return (
    <div
      ref={refCallback}
      className="fixed inset-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: "none" }}
    >
      <ScaleContext value={t.scale}>
        <div
          style={{
            transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
            transformOrigin: "0 0",
          }}
        >
          {children}
        </div>
      </ScaleContext>

      {/* Zoom indicator — click to reset to 100% */}
      <button
        onClick={() => setT(prev => ({ ...prev, scale: 1 }))}
        className="fixed bottom-4 right-4 cursor-pointer rounded-md bg-black/60 px-2.5 py-1 text-xs tabular-nums text-white/70 transition-colors hover:bg-black/80 hover:text-white"
      >
        {pct}%
      </button>
    </div>
  )
}
