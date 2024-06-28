"use client"

import { useState } from "react"
import {
  InteractionMethodSelect,
  type InteractionMethod,
} from "~/app/_components/screens/talking/InteractionMethodSelect"

interface TalkingBoxProps {
  className?: string
  suspectName: string
}

export const TalkingBox = ({ className, suspectName }: TalkingBoxProps) => {
  const [interactionMethod, setInteractionMethod] =
    useState<InteractionMethod>("TALK")
  const [talkingText, setTalkingText] = useState("")

  const onSubmit = () => {
    console.log("submitting:", talkingText)
    setTalkingText("")
  }

  return (
    <div
      className={`flex h-full flex-1 flex-col justify-end gap-2 border-4 border-white/10 p-2 ${className}`}
    >
      <div>Messages</div>
      <div>Vibe</div>
      <form
        className="flex flex-row items-center gap-2 border-[1px] border-white p-2"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <InteractionMethodSelect
          className="w-min"
          value={interactionMethod}
          onValueChange={setInteractionMethod}
        />
        <textarea
          className="color-b h-[1.5rem] w-full overflow-hidden bg-black p-2"
          value={talkingText}
          placeholder={(() => {
            switch (interactionMethod) {
              case "TALK":
                return `Talk to ${suspectName}`
              case "ACTION":
                return `Interact with ${suspectName}`
              default:
                throw Error("Unknown interaction method")
            }
          })()}
          onChange={(e) => {
            setTalkingText(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              onSubmit()
            }
          }}
        />
      </form>
    </div>
  )
}
