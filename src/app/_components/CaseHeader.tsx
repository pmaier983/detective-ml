"use client"
import { Button } from "~/app/_components/Button"

import { useCaseStore } from "~/app/_state/caseStore"

// Should I be using some weird Next.js layout stuff instead?
// We can create layered layout to show the different states?
export const CaseHeader = () => {
  const { setCaseMode, title, mode } = useCaseStore((state) => ({
    title: state.title,
    setCaseMode: state.setCaseMode,
    mode: state.mode,
  }))

  return (
    <div className="flex">
      <div className="flex flex-1 items-center">
        <Button onClick={() => setCaseMode("INTRO")}>Exit</Button>
      </div>
      <h2 className="text-center text-3xl">{title}</h2>
      <div className="flex flex-1 items-center justify-end gap-4">
        {mode === "TALKING" && (
          <>
            <Button onClick={() => console.log("TODO")} className="text-xl">
              Give Up
            </Button>
            <Button onClick={() => console.log("TODO")} className="text-xl">
              Make Accusation
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
