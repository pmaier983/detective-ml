"use client"

import { Intro } from "~/app/_components/screens/Intro"
import { useCaseStore } from "~/app/_state/caseStore"

export const Case = () => {
  const { mode, title, intro } = useCaseStore((state) => ({
    mode: state.mode,
    title: state.title,
    intro: state.intro,
  }))

  switch (mode) {
    case "INTRO":
      return <Intro title={title} description={intro} />
    default:
      console.error("Invalid mode", mode)
      return <div>Something went wrong...</div>
  }
}
