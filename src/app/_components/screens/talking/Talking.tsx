"use client"

import { SuspectCard } from "~/app/_components/suspectCard/SuspectCard"
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
    // TODO: turn the card aspect ratio into a reusable constant!
    // An aspect ratio of 3x the card
    <div className="flex h-full flex-1 items-center">
      <div className="flex aspect-[624/324] h-auto max-h-full flex-1 items-center gap-2 p-5">
        <SuspectCard variant="FULL" {...suspect} />
        {/* Talking box needs a lower height  */}
        <TalkingBox />
        <TalkingInformation />
      </div>
    </div>
  )
}
