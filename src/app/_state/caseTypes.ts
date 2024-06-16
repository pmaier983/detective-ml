import { z } from "zod"

export const CASE_MODES = {
  VIEWING: "VIEWING",
  TALKING: "TALKING",
  INTRO: "INTRO",
} as const

export type CaseMode = (typeof CASE_MODES)[keyof typeof CASE_MODES]

export const suspectSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  imageUrl: z.string(),
  chatLog: z.array(z.string()),
  colorHex: z.string(),
})

export type Suspect = z.infer<typeof suspectSchema>

export const caseContentSchema = z.object({
  mode: z.nativeEnum(CASE_MODES),

  title: z.string(),
  intro: z.string(),

  caseId: z.string(),

  suspects: z.array(suspectSchema),

  whoDoneItId: z.string(),
})

export type CaseContent = z.infer<typeof caseContentSchema>
