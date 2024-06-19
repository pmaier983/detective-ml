"use client"

import { SuspectCard } from "~/app/_components/SuspectCard/SuspectCard"
import { Intro } from "~/app/_components/screens/Intro"
import { Talking } from "~/app/_components/screens/Talking"
import { Viewing } from "~/app/_components/screens/Viewing"
import { useCaseStore } from "~/app/_state/caseStore"

export const Case = () => {
  const { mode, intro } = useCaseStore((state) => ({
    mode: state.mode,
    intro: state.intro,
  }))

  switch (mode) {
    case "INTRO":
      return <Intro description={intro} />
    case "VIEWING":
      return <Viewing />
    case "TALKING":
      return <Talking />
    default:
      console.error("Invalid mode", mode)
      return <div>Something went wrong...</div>
  }
}
