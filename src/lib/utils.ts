import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import case1 from "~/../public/case-1.json"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// currently the system prompt is just the suspect object
export const getSystemPromptFromSuspectName = (suspectName: string) => {
  const suspect = case1.suspects.find((suspect) => suspect.name === suspectName)
  if (!suspect)
    throw new Error(`Could not find suspect with name: ${suspectName}`)

  const characterBlob = JSON.stringify(suspect)

  return `interpret the following JSON and use it to guide your behaviors and action in an interrogation like setting. Your responses should containing the following:

response: your verbal response to the question or statement given.
emotion: (Optional) any visible emotional response or state displayed by your character when responding.
action: (Optional) any visible action taken by your character when responding.
aggravation: a score from 0-10 representing how irritated your character is by the previous question or statement. Keep the scores low and use the description below to guide what comments your character would find more aggravating. general conversation should reflect a score of 0 in almost all cases.

Here is your character description:
${characterBlob}

Here is an overview of the case:
${case1.overview}
`
}
