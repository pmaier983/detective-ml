import { SuspectCardFull } from "~/app/_components/SuspectCard/SuspectCardFull"
import { SuspectCardPreview } from "~/app/_components/SuspectCard/SuspectCardPreview"
import { SuspectCardWrapper } from "~/app/_components/SuspectCard/SuspectCardWrapper"
import type { SuspectCardVariant } from "~/app/_components/SuspectCard/suspectCardTypes"
import type { Suspect } from "~/app/_state/caseTypes"

interface SuspectCardProps extends Suspect {
  variant: SuspectCardVariant
  className?: string
}

export const SuspectCard = (props: SuspectCardProps) => {
  const { variant } = props

  switch (variant) {
    case "PREVIEW":
      return (
        <SuspectCardWrapper {...props}>
          <SuspectCardPreview />
        </SuspectCardWrapper>
      )
    case "FULL":
      return (
        <SuspectCardWrapper {...props}>
          <SuspectCardFull />
        </SuspectCardWrapper>
      )
    default:
      console.error("Invalid SuspectCard Variant", variant)
      return null
  }
}
