"use client"

import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { generateId, generateObject, type CoreMessage, type Message } from "ai"
import { useAtom } from "jotai"
import { useEffect, useState, type FormEvent } from "react"
import { z } from "zod"
import { interactionMethodAtom } from "~/app/_state/atoms"

export const findLastMessageWithData = (messages: Message[]) => {
  return messages.filter(isMessageWithData).slice(-1).pop()
}

const ACCEPTED_ROLES = ["user", "assistant"] satisfies Message["role"][]

interface MessageWithData extends Omit<Message, "data" | "role"> {
  role: (typeof ACCEPTED_ROLES)[number]
  data: MessageData
}

export const isMessageWithData = (
  message: Message,
): message is MessageWithData => {
  return messageDataSchema.safeParse(message.data).success
}

export const messageToCoreMessage = (
  message: MessageWithData | Message,
): CoreMessage | undefined => {
  if (message.role === "function") return undefined
  if (message.role === "data") return undefined
  if (message.role === "system") return undefined
  if (message.role === "tool") return undefined

  return {
    content: message.content,
    role: message.role,
  }
}

export const messageDataSchema = z.object({
  response: z.string(),
  emotion: z.string(),
  aggravation: z.number(),
})

export type MessageData = z.infer<typeof messageDataSchema>

const google = createGoogleGenerativeAI({
  // custom settings, e.g.
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
})

interface UseChatProps {
  id: string

  system?: string
  onSuccess?: (message?: Message) => void
}

// This is built to mimic https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
// We should probably transition to using the SDK when we setup a FE Server
export const useChat = ({ id, system, onSuccess }: UseChatProps) => {
  const queryClient = useQueryClient()
  const [interactionMethod] = useAtom(interactionMethodAtom)

  // TODO: replace with hook form to avoid constant re-renders on each input change
  const [input, setInput] = useState<string>("")

  const chatMessagesQueryKey = ["chat", "messages", id]

  const { data: messages } = useQuery({
    queryKey: chatMessagesQueryKey,
    queryFn: async () =>
      await Promise.resolve(false as unknown as MessageWithData[]),
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: [],
  })

  const {
    data: newMessage,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["chat", id],
    queryFn: async () => {
      return generateObject({
        model: google("models/gemini-1.5-flash-latest"),
        system,
        messages: [
          ...messages.map(messageToCoreMessage).filter(Boolean),
          {
            role: "user",
            content: `${interactionMethod === "TALK" ? "Detective Says" : "Detective does"}: ${input}`,
          },
        ] satisfies CoreMessage[],
        schema: messageDataSchema,
      })
        .then((data) => {
          const newMessage = {
            id: generateId(),
            createdAt: new Date(),
            content: data.object.response,
            role: "assistant",
            data: data.object,
          } satisfies MessageWithData

          onSuccess?.(newMessage)

          return newMessage
        })
        .catch((error) => {
          console.error(error)

          const failedMessage = messages.slice(0, -1)
          queryClient.setQueryData(chatMessagesQueryKey, failedMessage)
        })
    },

    enabled: false,
  })

  // TODO: replace this useEffect & the two useQueries
  // with either a useInfiniteQuery or a laggard query
  // https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries
  // https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery
  /** Store all the messages for historical purposes */
  useEffect(() => {
    if (!newMessage) return

    // Avoid adding the same message twice
    if (newMessage.id === messages.at(-1)?.id) return

    // Add all unique values to the chat
    queryClient.setQueryData(chatMessagesQueryKey, [...messages, newMessage])
  }, [newMessage])

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInput(e.target.value ?? "")
  }

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    // we don't want the page to refresh lol.
    e?.preventDefault()

    // Add the user message to the chat
    queryClient.setQueryData(chatMessagesQueryKey, [
      ...messages,
      {
        id: generateId(),
        createdAt: new Date(),
        content: input,
        role: "user",
      },
    ])

    setInput("") // Clear the input field after submitting

    void refetch()
  }

  return {
    messages,
    input,
    isLoading: isFetching,
    handleInputChange,
    handleSubmit,
  }
}
