"use client"
import { createContext, useContext } from "react"
import { z } from "zod"
import { createStore, useStore } from "zustand"

export const MODES = {
  VIEWING: "VIEWING",
  TALKING: "TALKING",
  INTRO: "INTRO",
} as const

type Mode = (typeof MODES)[keyof typeof MODES]

export const suspectSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  imageUrl: z.string(),
  chatLog: z.array(z.string()),
})

export type Suspect = z.infer<typeof suspectSchema>

export const caseContentSchema = z.object({
  mode: z.nativeEnum(MODES),

  title: z.string(),
  intro: z.string(),

  caseId: z.string(),

  suspects: z.array(suspectSchema),

  whoDoneItId: z.string(),
})

export type CaseContent = z.infer<typeof caseContentSchema>

interface CaseActions {
  restart: () => void

  setCaseMode: (mode: Mode) => void
}

export type CaseStore = CaseContent & CaseActions

export const initialCaseContent: CaseContent = {
  mode: MODES.INTRO,

  title: "Dummy Title",
  intro: "This case should never be seen due to suspense boundaries...",

  caseId: "0",

  suspects: [],

  whoDoneItId: "0",
}

export const getCaseStore = ({
  overrideInitialContent,
}: {
  overrideInitialContent: Partial<CaseContent>
}) =>
  createStore<CaseStore>()((set) => ({
    ...initialCaseContent,
    ...overrideInitialContent,
    restart: () => {
      set(initialCaseContent)
    },
    setCaseMode: (mode) => {
      set({ mode })
    },
  }))

export const CaseStoreContext = createContext<ReturnType<
  typeof getCaseStore
> | null>(null)

type Selector<T> = (state: CaseStore) => T

export const useCaseStore = <T>(selector: Selector<T>): T => {
  const store = useContext(CaseStoreContext)
  if (!store) {
    throw new Error("Missing CaseStoreProvider")
  }
  return useStore(store, selector)
}
