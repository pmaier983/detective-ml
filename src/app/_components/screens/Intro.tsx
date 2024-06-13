"use client"

import { useCaseStore } from "~/app/_state/caseStore"

interface IntroProps {
  title: string
  description: string
}

export const Intro = ({ title, description }: IntroProps) => {
  const { setCaseMode } = useCaseStore((state) => ({
    setCaseMode: state.setCaseMode,
  }))

  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-center text-5xl">{title}</h2>
      <p className="flex max-w-[800px] flex-1 items-center self-center text-4xl">
        {description}
      </p>
      <button
        className="text-center text-3xl"
        onClick={() => {
          setCaseMode("VIEWING")
        }}
      >
        [Continue]
      </button>
    </div>
  )
}
