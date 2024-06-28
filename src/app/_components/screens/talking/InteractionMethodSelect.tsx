import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select"

export const INTERACTION_METHODS = {
  TALK: "TALK",
  ACTION: "ACTION",
} as const

export type InteractionMethod =
  (typeof INTERACTION_METHODS)[keyof typeof INTERACTION_METHODS]

interface InteractionMethodSelectProps {
  className?: string
  value: InteractionMethod
  onValueChange: (value: InteractionMethod) => void
}

export const InteractionMethodSelect = ({
  value,
  onValueChange,
  className,
}: InteractionMethodSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
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
