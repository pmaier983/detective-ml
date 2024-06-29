import { SuspectCardWrapper } from "~/app/_components/suspectCard/SuspectCardWrapper"
import type { Suspect } from "~/app/_state/caseTypes"

export const SuspectCardPreview = (suspect: Suspect) => {
  return (
    <SuspectCardWrapper {...suspect} className="hover:cursor-pointer">
      <div className="z-10 flex flex-col gap-0 text-sm leading-4 lg:text-lg xl:text-xl">
        <h4 className="lg:text-2xl xl:text-4xl">{suspect.name}</h4>
        <span>Age: {suspect.age}</span>
      </div>
    </SuspectCardWrapper>
  )
}
