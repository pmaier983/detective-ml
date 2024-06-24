import type React from "react"

import { SuspectCardFull } from "~/app/_components/suspectCard/SuspectCardFull"
import { SuspectCardPreview } from "~/app/_components/suspectCard/SuspectCardPreview"
import { SuspectCardWrapper } from "~/app/_components/suspectCard/SuspectCardWrapper"
import type { SuspectCardVariant } from "~/app/_components/suspectCard/suspectCardTypes"
import type { Suspect } from "~/app/_state/caseTypes"

type SuspectCardProps = {
  variant: SuspectCardVariant
  className?: string
} & Suspect &
  React.HTMLAttributes<HTMLDivElement>

export const SuspectCard = (props: SuspectCardProps) => {
  const { variant, ...rest } = props

  switch (variant) {
    case "PREVIEW":
      return (
        <SuspectCardWrapper {...props}>
          <SuspectCardPreview {...rest} />
        </SuspectCardWrapper>
      )
    case "FULL":
      return (
        <SuspectCardWrapper {...props}>
          <SuspectCardFull {...rest} />
        </SuspectCardWrapper>
      )
    default:
      console.error("Invalid SuspectCard Variant", variant)
      return null
  }
}
