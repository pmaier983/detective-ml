"use client"

import { SuspectCard } from "~/app/_components/suspectCard/SuspectCard"
import { TalkingBox } from "~/app/_components/screens/talking/TalkingBox"
import { TalkingInformation } from "~/app/_components/screens/talking/TalkingInformation"
import { useCaseStore } from "~/app/_state/caseStore"
import {
  ASPECT_RATIO_HEIGHT,
  ASPECT_RATIO_WIDTH,
} from "~/app/_components/suspectCard/SuspectCardWrapper"

export const Talking = () => {
  const { talkingSuspectId, suspects } = useCaseStore((state) => ({
    talkingSuspectId: state.talkingSuspectId,
    suspects: state.suspects,
  }))

  const suspect = suspects.find((suspect) => suspect.id === talkingSuspectId)

  // TODO: error better when no suspect is found
  if (!suspect) return null

  return (
    // An aspect ratio of 3x the card
    <div className="flex h-full flex-1 items-center">
      <div
        className={`flex h-auto max-h-full max-w-full flex-1 items-center gap-2 p-5`}
        // TODO: how to move this aspect ratio into tailwind?
        style={{
          aspectRatio: `${ASPECT_RATIO_WIDTH * 3}/${ASPECT_RATIO_HEIGHT}`,
        }}
      >
        <SuspectCard variant="FULL" {...suspect} />
        <TalkingBox
          suspectName={suspect.name}
          suspectMainColor={suspect.colorHex}
        />
        <TalkingInformation suspectName={suspect.name} />
      </div>
    </div>
  )
}
