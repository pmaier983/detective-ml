"use client"

import { SuspectCard } from "~/app/_components/suspectCard/SuspectCard"
import { useCaseStore } from "~/app/_state/caseStore"

export const Viewing = () => {
  const { suspects, startTalkingToSuspect } = useCaseStore((state) => ({
    suspects: state.suspects,
    startTalkingToSuspect: state.startTalkingToSuspect,
  }))

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center gap-1">
        {suspects.map((suspect) => (
          <SuspectCard
            variant="PREVIEW"
            {...suspect}
            key={suspect.id}
            onClick={() => {
              startTalkingToSuspect(suspect.id)
            }}
          />
        ))}
      </div>
      <h4 className="text-center text-4xl">Choose a suspect to interview.</h4>
    </div>
  )
}
