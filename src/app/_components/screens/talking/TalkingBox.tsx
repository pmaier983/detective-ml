"use client"

import { useState } from "react"

interface TalkingBoxProps {
  className?: string
}

export const TalkingBox = ({ className }: TalkingBoxProps) => {
  const [talkingText, setTalkingText] = useState("")

  const onSubmit = () => {
    console.log("submitting:", talkingText)
    setTalkingText("")
  }

  return (
    <div
      className={`box-content flex h-[calc(100%-4px)] flex-1 flex-col border-4 border-white/10 ${className}`}
    >
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
