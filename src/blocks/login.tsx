import { Artboard } from "@/components/artboard"
import { Button } from "@/components/ui/button"

type LoginProps = {
  theme?: string
  dark?: boolean
}

export function Login({ theme, dark }: LoginProps) {
  return (
    <Artboard name="Mobile — Login" width={390} height={844} theme={theme} dark={dark}>
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
  )
}
