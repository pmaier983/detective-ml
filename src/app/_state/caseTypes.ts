import { z } from "zod"

export const CASE_MODES = {
  VIEWING: "VIEWING",
  TALKING: "TALKING",
  INTRO: "INTRO",
} as const

export type CaseMode = (typeof CASE_MODES)[keyof typeof CASE_MODES]

// TODO: get these case types from the db schema!
export const suspectSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  imageUrl: z.string(),
  chatLog: z.array(z.string()),

  // We should compute these on the server side in the future!
  colorHex: z.string(),
  textColorHex: z.string(),
})

export type Suspect = z.infer<typeof suspectSchema>

// TODO: get these case types from the db schema!
export const caseContentSchema = z.object({
  mode: z.nativeEnum(CASE_MODES),

  title: z.string(),
  intro: z.string(),

  caseId: z.string(),

  suspects: z.array(suspectSchema),

  whoDoneItId: z.string(),
  talkingSuspectId: z.string().optional(),
})

export type CaseContent = z.infer<typeof caseContentSchema>
