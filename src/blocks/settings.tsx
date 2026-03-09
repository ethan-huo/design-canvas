import { Artboard } from "@/components/artboard"

export function Settings() {
  return (
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
  )
}
