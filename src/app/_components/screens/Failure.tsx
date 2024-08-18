import { optimusPrinceps } from "~/app/fonts"
import { cn } from "~/lib/utils"

export const Failure = () => {
  return (
    <h2
      className={cn(
        optimusPrinceps.className,
        "h-full content-center self-center text-8xl text-red-800",
      )}
    >
      You Lose
    </h2>
  )
}
