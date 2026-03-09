import { Artboard } from "@/components/artboard"

export function Dashboard() {
  return (
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
          <p className="mt-1 text-sm text-muted-foreground">Welcome back</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {["Revenue", "Users", "Orders"].map((label) => (
              <div key={label} className="rounded-lg border border-border p-5">
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="mt-1 text-2xl font-bold">--</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Artboard>
  )
}
