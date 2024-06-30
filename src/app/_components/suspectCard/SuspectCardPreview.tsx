import { SuspectCardWrapper } from "~/app/_components/suspectCard/SuspectCardWrapper"
import type { Suspect } from "~/app/_state/caseTypes"

interface SuspectCardPreviewProps extends Suspect {
  className?: string
}

export const SuspectCardPreview = ({
  className,
  ...suspect
}: SuspectCardPreviewProps) => {
  return (
    <SuspectCardWrapper
      {...suspect}
      className={`hover:cursor-pointer ${className}`}
    >
      <div className="z-10 flex flex-col gap-0 text-sm leading-4 lg:text-lg xl:text-xl">
        <h4 className="lg:text-2xl xl:text-4xl">{suspect.name}</h4>
        <span>Age: {suspect.age}</span>
      </div>
    </SuspectCardWrapper>
  )
}
