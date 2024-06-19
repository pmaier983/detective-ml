"use client"

import { SuspectCard } from "~/app/_components/SuspectCard/SuspectCard"
import { useCaseStore } from "~/app/_state/caseStore"

export const Talking = () => {
  const { talkingSuspectId, suspects } = useCaseStore((state) => ({
    talkingSuspectId: state.talkingSuspectId,
    suspects: state.suspects,
  }))

  const suspect = suspects.find((suspect) => suspect.id === talkingSuspectId)

  // TODO: error better when no suspect is found
  if (!suspect) return null

  return (
    <div className="flex flex-1 flex-col">
      <SuspectCard variant="FULL" className="w-80" {...suspect} />
    </div>
  )
}
