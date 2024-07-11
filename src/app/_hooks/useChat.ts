"use client"

import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { useQuery } from "@tanstack/react-query"
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
  system?: string
  id: string
}

// This is built to mimic https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
// We should probably transition to using the SDK when we setup a FE Server
export const useChat = ({ id }: UseChatProps) => {
  const [interactionMethod] = useAtom(interactionMethodAtom)
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["chat", id],
    queryFn: async () => {
      return generateObject({
        model: google("models/gemini-1.5-flash-latest"),
        // TODO: properly setup a system prompt per character
        system:
          'interpret the following JSON and use it to guide your behaviors and action in an interrogation like setting. Your responses should be in valid json containing the following:\n\nresponse: your verbal response to the question or statement given.\nemotion: (Optional) any visible emotional response or state displayed by your character when responding.\naction: (Optional) any visible action taken by your character when responding.\naggravation: a score from 0-10 representing how irritated your character is by the previous question or statement. Keep the scores low and use the description below to guide what comments your character would find more aggravating. general conversation should reflect a score of 0 in almost all cases.\n\nHere is your character description:\n{\n      "name": "Henry Blackwood",\n      "background": "Henry Blackwood was once a close associate of Thomas Ashton, but their relationship soured after Ashton publicly humiliated Blackwood at a business conference several years ago. Blackwood, a skilled botanist with a deep knowledge of various poisons, has been harboring a grudge against Ashton ever since. The recent discovery of Nightshade in Ashton\'s wine has raised suspicions about Blackwood\'s involvement, especially considering his expertise and the history of animosity between them.",\n      "personality": "Blackwood is a reserved and calculating individual, known for his quiet demeanor and sharp intellect. He is deeply passionate about botany and often retreats into his greenhouse to escape the pressures of the world. However, he is also fiercely protective of his reputation and harboring a deep resentment for Ashton\'s past actions. This anger can ignite a cold fury, making him unpredictable and capable of extreme measures.",\n      "knowledge_of_crime": "Blackwood knew Ashton was planning to betray him in a business deal.  He knows about Ashton\'s affair with his wife, but never said anything. He knows the location of the rose bush where Ashton plucked the crimson rose. He knows the origin of the Nightshade used in the poison. He knows how to obtain the poison and administer it.",\n      "relationships": {\n        "thomas_ashton": "Former business associate, enemy",\n        "olivia_blackwood": "Wife",\n        "james_wilson": "Former business partner, friend",\n        "emma_ashton": "Ashton\'s wife"\n      },\n      "evidence": [\n        "A vial containing Nightshade was found in Blackwood\'s greenhouse",\n        "Blackwood\'s fingerprints were found on the wine glass",\n        "A note written in Blackwood\'s handwriting detailing his plan to poison Ashton was found hidden in his study",\n        "Blackwood was seen leaving Ashton Manor the night of the murder",\n        "A crimson rose, identical to the one found on Ashton\'s desk, was found growing in Blackwood\'s greenhouse."\n      ],\n      "weakness": "Blackwood\'s resentment for Ashton, his desire for revenge, and his knowledge of poisons.  If confronted about his past with Ashton,  he may confess.  He may also confess if his wife is threatened.",\n      "locations": [\n        "Blackwood Manor",\n        "Blackwood\'s greenhouse"\n      ],\n      "guilty": true,\n      "alive": true\n    }\n\nHere is an overview of the case:\n{\n  "victim": "Thomas Ashton",\n  "murderer": "Henry Blackwood",\n  "location": "Ashton Manor",\n  "time_of_death": "03/15/2023 22:30",\n  "weapon": "Poisoned Wine",\n  "key_facts": [\n    "The victim was found in his study with a glass of wine by his side.",\n    "The wine was tested and found to contain a rare poison called \'Nightshade\'",\n    "A single, crimson rose was found on the victim\'s desk",\n    "The victim was a successful businessman, known for his ruthless tactics.",\n    "Henry Blackwood, a former business associate of the victim, had a long-standing grudge against him.",\n    "Blackwood had been publicly humiliated by Ashton at a business conference several years prior.",\n    "Blackwood was a skilled botanist with knowledge of various poisons."\n  ],\n  "overview": "Thomas Ashton, a prominent businessman known for his aggressive business practices, was found dead in his study at Ashton Manor. The cause of death was poisoning, with a rare poison called \'Nightshade\' detected in his wine. Henry Blackwood, a former business associate of Ashton, has emerged as a suspect due to a long-standing grudge stemming from a public humiliation inflicted by Ashton years prior. Blackwood is a skilled botanist with knowledge of various poisons, adding fuel to the fire of suspicion. The police are investigating the possibility of a vendetta, exploring the complex relationships and resentments that simmered beneath the surface of Ashton\'s business empire."\n}',
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
      content: data.object.response,
      role: "tool",
      data: data.object,
    } as Message

    setMessages((prev) => [...prev, message])
  }, [data])

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
    isLoading: isFetching,
    handleInputChange,
    handleSubmit,
  }
}
