"use client"

import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { generateId, generateObject, type Message } from "ai"
import { useAtom } from "jotai"
import { useEffect, useState, type FormEvent } from "react"
import { z } from "zod"
import { interactionMethodAtom } from "~/app/_state/atoms"

export const findLastMessageWithData = (messages: Message[]) => {
  return messages.filter(isMessageWithData).slice(-1).pop()
}

interface MessageWithData extends Omit<Message, "data"> {
  data: MessageData
}

export const isMessageWithData = (
  message: Message,
): message is MessageWithData => {
  return messageDataSchema.safeParse(message.data).success
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
  const [input, setInput] = useState<string>("")

  const chatMessagesQueryKey = ["chat", "messages", id]

  const { data: messages } = useQuery({
    queryKey: chatMessagesQueryKey,
    queryFn: async () => await Promise.resolve(false as unknown as Message[]),
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
        schema: messageDataSchema,
        prompt: `${interactionMethod === "TALK" ? "Detective Says" : "Detective does"}: ${input}`,
      })
        .then((data) => {
          const newMessage = {
            id: generateId(),
            createdAt: new Date(),
            content: data.object.response,
            role: "tool",
            data: data.object,
          } satisfies Message

          onSuccess?.(newMessage)

          return newMessage
        })
        .catch((error) => {
          console.error(error)

          const failedMessage = messages.slice(0, -1)
          queryClient.setQueryData(chatMessagesQueryKey, failedMessage)
          return error
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

  console.log({ messages, input, isFetching })

  return {
    messages,
    input,
    isLoading: isFetching,
    handleInputChange,
    handleSubmit,
  }
}
