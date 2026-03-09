# Design Canvas

Tired of paying $20/mo for a design tool that screenshots at 46% zoom and calls it a feature? Us too.

**Design Canvas** is an infinite canvas design environment built on pure web tech. No Figma, no Pencil, no Paper, no MCP call limits, no subscriptions. Just Vite + React + Tailwind + shadcn/ui.

## Why

Design tools like Pencil and Paper are just Electron apps wrapping a web renderer — then charging you for MCP API calls to read your own designs. We cut out the middleman:

- **Designs are JSX** — version controlled, diffable, composable
- **Infinite canvas** — pan, zoom, multiple artboards side by side
- **Resizable artboards** — drag edges to test responsive layouts
- **Scoped themes** — same component, different themes, zero JS overhead
- **Screenshots** — it's a browser, `Cmd+Shift+4` works at any resolution
- **No limits** — no API calls, no tokens, no vendor lock-in

## Quick Start

```bash
bun install
bun run dev
```

Open `http://localhost:3000`. Scroll to zoom, Shift+scroll to pan, Alt+drag to pan.

## Adding Designs

Create a file in `src/blocks/`, write normal JSX + Tailwind, drop it onto the canvas:

```tsx
// src/blocks/my-design.tsx
import { Artboard } from "@/components/artboard"

export function MyDesign() {
  return (
    <Artboard name="My Design" width={390} height={844} theme="rose" dark>
      {/* just write Tailwind */}
    </Artboard>
  )
}
```

## Scoped Themes

Each artboard can run its own theme independently:

```tsx
<Artboard name="Light" width={390}>...</Artboard>
<Artboard name="Dark" width={390} dark>...</Artboard>
<Artboard name="Rose" width={390} theme="rose">...</Artboard>
<Artboard name="Rose Dark" width={390} theme="rose" dark>...</Artboard>
```

Add new themes in `src/styles/themes/`. Just CSS variables scoped to `[data-theme='your-theme']`.

## Stack

- [Vite](https://vite.dev) + [TanStack Start](https://tanstack.com/start)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (a0 preset)
- [Lucide](https://lucide.dev) icons
