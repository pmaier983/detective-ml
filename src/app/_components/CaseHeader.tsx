"use client"
import { Button } from "~/app/_components/Button"
import { useCaseStore } from "~/app/_state/caseStore"
import case1 from "~/../public/case-1.json"

// Should I be using some weird Next.js layout stuff instead?
// We can create layered layout to show the different states?
export const CaseHeader = () => {
  const { title, mode, talkingSuspectId, setCaseMode } = useCaseStore(
    (state) => ({
      title: state.title,
      mode: state.mode,
      talkingSuspectId: state.talkingSuspectId,
      setCaseMode: state.setCaseMode,
    }),
  )

  return (
    <div className="flex">
      <div className="flex flex-1 items-center">
        <CaseModeInteractionButton />
      </div>
      <h2 className="text-center text-3xl">{title}</h2>
      <div className="flex flex-1 items-center justify-end gap-4">
        {mode === "TALKING" && (
          <>
            <Button onClick={() => setCaseMode("FAILURE")} className="text-xl">
              Give Up
            </Button>
            <Button
              onClick={() => {
                if (!talkingSuspectId) {
                  throw new Error(
                    "Cannot accuse a suspect without talking to them first",
                  )
                }
                const isCorrect = talkingSuspectId === case1.whoDoneItId
                setCaseMode(isCorrect ? "SUCCESS" : "FAILURE")
              }}
              className="text-xl"
            >
              Make Accusation
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

const CaseModeInteractionButton = () => {
  const { mode, setCaseMode, restart } = useCaseStore((state) => ({
    mode: state.mode,
    setCaseMode: state.setCaseMode,
    restart: state.restart,
  }))

  switch (mode) {
    case "VIEWING": {
      return (
        <Button
          onClick={() => {
            setCaseMode("INTRO")
          }}
          className="text-xl"
        >
          Exit
        </Button>
      )
    }
    case "TALKING": {
      return (
        <Button
          onClick={() => {
            setCaseMode("VIEWING")
          }}
          className="text-xl"
        >
          Back
        </Button>
      )
    }
    case "FAILURE": {
      return (
        <Button
          onClick={() => {
            restart()
          }}
          className="text-xl"
        >
          Try Again
        </Button>
      )
    }
    case "SUCCESS": {
      return (
        <Button
          onClick={() => {
            restart()
          }}
          className="text-xl"
        >
          Restart
        </Button>
      )
    }
  }

  return null
}
