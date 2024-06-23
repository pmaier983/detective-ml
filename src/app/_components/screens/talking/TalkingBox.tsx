"use client"

import { useState } from "react"

export const TalkingBox = () => {
  const [talkingText, setTalkingText] = useState("")

  const onSubmit = () => {
    console.log("submitting:", talkingText)
    setTalkingText("")
  }

  return (
    <div className="flex h-full flex-1 flex-col border-4 border-white/10">
      <div className="flex flex-1 flex-col-reverse overflow-y-auto">
        Messages
      </div>
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        {/* TODO Dropdown */}
        <button></button>
        <textarea
          className="h-8 flex-1"
          value={talkingText}
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