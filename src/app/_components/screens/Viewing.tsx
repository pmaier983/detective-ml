"use client"

import { SuspectCard } from "~/app/_components/SuspectCard/SuspectCard"
import { useCaseStore } from "~/app/_state/caseStore"

export const Viewing = () => {
  const { suspects } = useCaseStore((state) => ({
    suspects: state.suspects,
  }))

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center gap-1">
        {suspects.map((suspect) => (
          <SuspectCard
            variant="PREVIEW"
            {...suspect}
            key={suspect.id}
            className="h-1/2"
          />
        ))}
      </div>
      <h4 className="text-center text-4xl">Choose a suspect to interview.</h4>
    </div>
  )
}
