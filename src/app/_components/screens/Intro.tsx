"use client"

import { Button } from "~/app/_components/Button"
import { useCaseStore } from "~/app/_state/caseStore"

interface IntroProps {
  description: string
}

export const Intro = ({ description }: IntroProps) => {
  const { setCaseMode } = useCaseStore((state) => ({
    setCaseMode: state.setCaseMode,
  }))

  return (
    <div className="flex flex-1 flex-col">
      <p className="flex max-w-[800px] flex-1 items-center self-center text-4xl">
        {description}
      </p>
      <Button
        onClick={() => {
          setCaseMode("VIEWING")
        }}
      >
        Continue
      </Button>
    </div>
  )
}
