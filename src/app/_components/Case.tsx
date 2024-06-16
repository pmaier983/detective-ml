"use client"

import { Intro } from "~/app/_components/screens/Intro"
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
      return <div>Talking</div>
    default:
      console.error("Invalid mode", mode)
      return <div>Something went wrong...</div>
  }
}
