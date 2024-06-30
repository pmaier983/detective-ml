import { useAtom } from "jotai"
import { z } from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select"
import { interactionMethodAtom } from "~/app/_state/atoms"

export const INTERACTION_METHODS = {
  TALK: "TALK",
  ACTION: "ACTION",
} as const

export type InteractionMethod =
  (typeof INTERACTION_METHODS)[keyof typeof INTERACTION_METHODS]

interface InteractionMethodSelectProps {
  className?: string
}

export const InteractionMethodSelect = ({
  className,
}: InteractionMethodSelectProps) => {
  const [interactionMethod, setInteractionMethod] = useAtom(
    interactionMethodAtom,
  )

  return (
    <Select
      value={interactionMethod}
      onValueChange={(newInteractionMethod) => {
        // Ensure the new value is a valid interaction method
        const { success, data } = z
          .nativeEnum(INTERACTION_METHODS)
          .safeParse(newInteractionMethod)

        if (!success) {
          console.error(`Invalid interaction method: ${newInteractionMethod}`)
          return
        }

        setInteractionMethod(data)
      }}
    >
      <SelectTrigger className={`${className}`}>
        <SelectValue placeholder={INTERACTION_METHODS.TALK} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={INTERACTION_METHODS.TALK}>
          {INTERACTION_METHODS.TALK.toLocaleUpperCase()}
        </SelectItem>
        <SelectItem value={INTERACTION_METHODS.ACTION}>
          {INTERACTION_METHODS.ACTION.toLocaleUpperCase()}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
