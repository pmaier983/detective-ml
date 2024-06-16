"use client"
import { Button } from "~/app/_components/Button"
// TODO: I'm curious if this is the best way to do this...

import { useCaseStore } from "~/app/_state/caseStore"

// Should I be using some weird Next.js layout stuff instead?
export const CaseHeader = () => {
  const { setCaseMode, title } = useCaseStore((state) => ({
    title: state.title,
    setCaseMode: state.setCaseMode,
  }))

  return (
    <div className="flex">
      <div className="flex-1">
        <Button onClick={() => setCaseMode("INTRO")}>Exit</Button>
      </div>
      <h2 className="text-center text-4xl">{title}</h2>
      <div className="flex flex-1 justify-end"></div>
    </div>
  )
}
