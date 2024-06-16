import { createContext, useContext } from "react"
import { createStore, useStore } from "zustand"

export const MODES = {
  VIEWING: "VIEWING",
  TALKING: "TALKING",
  INTRO: "INTRO",
} as const

type Mode = (typeof MODES)[keyof typeof MODES]

export interface Suspect {
  id: string
  name: string
  age: number
  image: string
  chatLog: string[] // TODO: figure out the proper way to store the chat log
  prompt: string // TODO: the prompt might also be part of the chat log?
}

export interface CaseContent {
  mode: Mode

  title: string
  intro: string

  caseId: string

  suspects: Suspect[]
  suspectTalkingId?: string

  whoDoneItId: string
}

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
