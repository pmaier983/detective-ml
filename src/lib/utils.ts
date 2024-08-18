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
  return JSON.stringify(suspect)
}
