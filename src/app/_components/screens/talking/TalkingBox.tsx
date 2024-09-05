"use client"

import { useAtom } from "jotai"

import { InteractionMethodSelect } from "~/app/_components/screens/talking/InteractionMethodSelect"
import {
  findLastMessageWithData,
  isMessageWithData,
  useChat,
} from "~/app/_hooks/useChat"
import { interactionMethodAtom } from "~/app/_state/atoms"

import styles from "./TalkingBox.module.css"
import { useEffect, useRef } from "react"
import { getSystemPromptFromSuspectName } from "~/lib/utils"
import { useCaseStore } from "~/app/_state/caseStore"
import { stat } from "fs"
import { MAX_SUSPECT_AGGRAVATION_SCORE } from "~/lib/constants"
import type { Suspect } from "~/app/_state/caseTypes"

interface TalkingBoxProps {
  className?: string
  suspect: Suspect
}

export const TalkingBox = ({ className, suspect }: TalkingBoxProps) => {
  const scrollAreaEndDivRef = useRef<HTMLDivElement>(null)
  const [interactionMethod] = useAtom(interactionMethodAtom)

  const { setSuspectAggravation } = useCaseStore((state) => ({
    setSuspectAggravation: state.setSuspectAggravation,
  }))

  const { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat({
      system: getSystemPromptFromSuspectName(suspect.name),
      // TODO: setup a better ID then a name...
      id: suspect.name,
      onSuccess: (message) => {
        if (!message) return
        if (!isMessageWithData(message)) return

        setSuspectAggravation({
          suspectId: suspect.id,
          aggravation: message.data.aggravation,
        })
      },
    })

  const onSubmit = () => {
    handleSubmit()
  }

  // When a new message is added to the chat, scroll to the bottom of the chat area
  useEffect(() => {
    scrollAreaEndDivRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const mostRecentToolMessage = findLastMessageWithData(messages)

  // TODO: do we need to do this check? Is there a single render cycle
  // between the message updating and the onSuccess being called?
  const hasMaxedOutAggravation =
    (mostRecentToolMessage?.data.aggravation ?? 0) >=
      MAX_SUSPECT_AGGRAVATION_SCORE ||
    suspect.aggravation >= MAX_SUSPECT_AGGRAVATION_SCORE

  return (
    <div
      className={`flex h-full flex-1 flex-col justify-end gap-2 border-4 border-white/10 p-4 ${className}`}
    >
      <div className={`flex flex-col overflow-auto ${styles.chatScrollArea}`}>
        <div className={`flex flex-col gap-3`}>
          {messages.map((message) => {
            // assistant === message from the AI
            if (message.role === "assistant" && isMessageWithData(message)) {
              return (
                <div className="flex flex-col" key={message.id}>
                  <div
                    key={message.id}
                    style={{
                      color: suspect.colorHex,
                    }}
                  >
                    {suspect.name}
                  </div>
                  <div>{message.content}</div>
                </div>
              )
            }

            if (message.role === "user") {
              return (
                <div className="flex flex-col text-end" key={message.id}>
                  <div className="text-purple-500">Detective Mel</div>
                  <div>{message.content}</div>
                </div>
              )
            }

            console.error("Unknown message role", message)
            return null
          })}
          <div ref={scrollAreaEndDivRef} />
        </div>
      </div>
      <div className="p-3 text-center opacity-50">
        {isLoading
          ? "Thinking..."
          : (mostRecentToolMessage?.data.emotion ??
            `${suspect.name} seems calm but somewhat uneasy.`)}
      </div>
      <form
        className="flex flex-row items-center gap-2 border-[1px] border-white p-2"
        onSubmit={onSubmit}
      >
        <InteractionMethodSelect className="w-min" />
        <textarea
          className="color-b h-[1.5rem] w-full overflow-hidden bg-black pl-1 pr-1"
          value={input}
          placeholder={(() => {
            if (hasMaxedOutAggravation) {
              return `${suspect.name} is too aggravated to talk with you anymore.`
            }

            switch (interactionMethod) {
              case "TALK":
                return `Talk to ${suspect.name}`
              case "ACTION":
                return `Interact with ${suspect.name}`
              default:
                throw Error("Unknown interaction method")
            }
          })()}
          disabled={hasMaxedOutAggravation}
          onChange={handleInputChange}
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
