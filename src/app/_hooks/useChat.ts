"use client"

import { createOpenAI } from "@ai-sdk/openai"
import { useQuery } from "@tanstack/react-query"
import { generateId, generateObject, type Message } from "ai"
import { useAtom } from "jotai"
import { useEffect, useState, type FormEvent } from "react"
import SuperJSON from "superjson"
import { z } from "zod"
import { interactionMethodAtom } from "~/app/_state/atoms"

export const messageDataSchema = z.object({
  text: z.string(),
  vibe: z.string(),
  aggravationPercent: z.number(),
})

export type MessageData = z.infer<typeof messageDataSchema>

const openai = createOpenAI({
  // custom settings, e.g.
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  compatibility: "strict", // strict mode, enable when using the OpenAI API
})

interface UseChatProps {
  system: string
}

// This is built to mimic https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
// We should probably transition to using the SDK when we setup a FE Server
export const useChat = ({ system }: UseChatProps) => {
  const [interactionMethod] = useAtom(interactionMethodAtom)
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])

  const { data, isPending, refetch } = useQuery({
    queryKey: ["talking"],
    queryFn: async () => {
      return generateObject({
        model: openai("gpt-3.5-turbo"),
        system,
        schema: messageDataSchema,
        prompt: `${interactionMethod === "TALK" ? "User Says" : "User does"}: ${input}`,
      }).catch((error) => {
        console.error(error)

        const failedMessage = messages.slice(0, -1)
        setMessages(failedMessage)
      })
    },

    enabled: false,
  })

  /** Store all the messages for historical purposes */
  useEffect(() => {
    if (!data) return

    const message = {
      id: generateId(),
      createdAt: new Date(),
      content: data.object.text,
      role: "tool",
      // TODO: is there a better way to do this?
      data: SuperJSON.parse(SuperJSON.stringify(data)),
    } as Message

    setMessages((prev) => [...prev, message])
  }, [data])

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value === "") return
    setInput(e.target.value)
  }

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    // we don't want the page to refresh lol.
    e?.preventDefault()

    // Add the user message to the chat
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        createdAt: new Date(),
        content: input,
        role: "user",
      },
    ])

    void refetch()
  }

  return {
    messages,
    input,
    isLoading: isPending,
    handleInputChange,
    handleSubmit,
  }
}
