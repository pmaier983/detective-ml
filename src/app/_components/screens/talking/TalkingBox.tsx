"use client"

import type { Message } from "ai"
import { useAtom } from "jotai"

import { InteractionMethodSelect } from "~/app/_components/screens/talking/InteractionMethodSelect"
import {
  messageDataSchema,
  useChat,
  type MessageData,
} from "~/app/_hooks/useChat"
import { interactionMethodAtom } from "~/app/_state/atoms"

interface MessageWithData extends Omit<Message, "data"> {
  data: MessageData
}

interface TalkingBoxProps {
  className?: string
  suspectName: string
  suspectMainColor: string
}

export const TalkingBox = ({
  className,
  suspectName,
  suspectMainColor,
}: TalkingBoxProps) => {
  const [interactionMethod] = useAtom(interactionMethodAtom)
  const {
    messages: messagesWithUnsureData,
    isLoading,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat({
    system: `Talk to ${suspectName}`,
  })

  const onSubmit = () => {
    handleSubmit()
  }

  // A type guard to ensure that the message.data adheres to the shape of messageDataSchema
  const messages = messagesWithUnsureData.filter(
    (message): message is MessageWithData => {
      return messageDataSchema.safeParse(message.data).success
    },
  )

  const mostRecentToolMessage = messages.find(
    (message) => message.role === "tool",
  )

  return (
    <div
      className={`flex h-full flex-1 flex-col justify-end gap-2 border-4 border-white/10 p-2 ${className}`}
    >
      <div className="flex flex-col overflow-auto">
        <div>
          {messages.map((message) => {
            // tool === message from the AI
            if (message.role === "tool") {
              return (
                <div
                  className="p-3"
                  key={message.id}
                  style={{
                    color: suspectMainColor,
                  }}
                >
                  {message.content}
                </div>
              )
            }

            if (message.role === "user") {
              return (
                <div className="p-3" key={message.id}>
                  {message.content}
                </div>
              )
            }

            console.error("Unknown message role", message)
            return null
          })}
        </div>
      </div>
      <div>{isLoading ? "Thinking..." : mostRecentToolMessage?.data.vibe}</div>
      <form
        className="flex flex-row items-center gap-2 border-[1px] border-white p-2"
        onSubmit={onSubmit}
      >
        <InteractionMethodSelect className="w-min" />
        <textarea
          className="color-b h-[1.5rem] w-full overflow-hidden bg-black"
          value={input}
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
