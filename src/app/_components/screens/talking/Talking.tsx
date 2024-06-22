"use client"

import { SuspectCard } from "~/app/_components/SuspectCard/SuspectCard"
import { TalkingBox } from "~/app/_components/screens/talking/TalkingBox"
import { TalkingInformation } from "~/app/_components/screens/talking/TalkingInformation"
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
    <div className="flex h-full flex-1 items-center">
      <div className="flex h-full flex-1 items-center gap-2">
        <SuspectCard variant="FULL" {...suspect} />
        <TalkingBox />
        <TalkingInformation />
      </div>
    </div>
  )
}
