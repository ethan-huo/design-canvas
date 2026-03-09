# Design Canvas

Agent-first design environment built on Vite + React + Tailwind + shadcn/ui. No Figma, no MCP, no subscriptions — just code.

## Architecture

```
src/
├── components/
│   ├── canvas.tsx      # Infinite canvas — pan/zoom viewport with ScaleContext
│   ├── artboard.tsx    # Resizable artboard container with drag handles
│   └── ui/             # shadcn/ui components (button, slider, card, etc.)
├── routes/
│   └── index.tsx       # Main canvas page — all artboards live here
├── styles.css          # Tailwind + shadcn theme tokens (oklch)
└── router.tsx          # TanStack Router setup
```

## Core Concepts

- **Canvas** (`canvas.tsx`): Infinite pan/zoom surface. Scroll = zoom toward cursor, Shift+scroll = pan, Alt+drag or middle-click drag = pan. Exposes `useCanvasScale()` context for children that need scale-aware behavior.
- **Artboard** (`artboard.tsx`): Fixed-width container with left/right drag handles for responsive testing. Displays name + current width. `minWidth` defaults to 200px. Height can be fixed or auto.
- **Designs are just JSX**: Each artboard contains normal React components with Tailwind classes. No special DSL, no node trees, no serialization layer.

## How to Design

1. Add an `<Artboard>` in `index.tsx` with a name and initial width
2. Write normal JSX + Tailwind inside it — use shadcn/ui components for interactive elements
3. Drag artboard handles to test responsive behavior
4. Standard device widths: Mobile 390px, Tablet 768px, Desktop 1440px

## Conventions

- Use shadcn/ui components (`Button`, `Card`, `Slider`, etc.) for anything interactive — they have proper hover/focus/active states
- Use `lucide-react` for icons
- Prefer Tailwind classes over inline styles
- Keep artboard content self-contained — each artboard is an independent design surface
- Don't use `grid` layout inside artboards for now (flexbox only, matching the canvas constraints)

## Commands

```bash
bun run dev          # Start dev server on :3000
bun run build        # Production build
bun run typecheck    # Type check
```

## Adding shadcn Components

```bash
bunx --bun shadcn@latest add <component>
```

## Canvas Controls

| Action | Input |
|--------|-------|
| Zoom | Scroll wheel |
| Pan | Shift + scroll / Alt + drag / Middle-click drag |
| Trackpad zoom | Pinch gesture |
| Resize artboard | Drag left/right edge handles |
