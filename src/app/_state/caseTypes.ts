import { z } from "zod"
import { dbCaseSchema, dbSuspectSchema } from "~/server/db/schema"

export const CASE_MODES = {
  VIEWING: "VIEWING",
  TALKING: "TALKING",
  INTRO: "INTRO",
  FAILURE: "FAILURE",
  SUCCESS: "SUCCESS",
} as const

export type CaseMode = (typeof CASE_MODES)[keyof typeof CASE_MODES]

export const clientSideSuspectAdditionsSchema = z.object({
  colorHex: z.string(),
  textColorHex: z.string(),
  facts: z.array(z.string()),
})

export const suspectSchema =
  clientSideSuspectAdditionsSchema.merge(dbSuspectSchema)

export type Suspect = z.infer<typeof suspectSchema>

export const clientSideCaseAdditionsSchema = z.object({
  mode: z.nativeEnum(CASE_MODES),
  talkingSuspectId: z.string().optional(),
  suspects: z.array(suspectSchema),
  notes: z.array(z.string()),
})

export const caseSchema = clientSideCaseAdditionsSchema.merge(dbCaseSchema)

export type Case = z.infer<typeof caseSchema>
