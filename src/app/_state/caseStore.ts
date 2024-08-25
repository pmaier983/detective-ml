"use client"
import { createContext, useContext } from "react"
import { createStore, useStore } from "zustand"
import type { Case, CaseMode } from "~/app/_state/caseTypes"

interface CaseActions {
  restart: () => void

  setCaseMode: (mode: CaseMode) => void
  startTalkingToSuspect: (suspectId: string) => void
  setNotes: (notes: string[]) => void
}

type CaseContent = Case

export type CaseStore = CaseContent & CaseActions

export const initialCaseContent: CaseContent = {
  mode: "INTRO",

  title: "Dummy Title",
  intro: "This case should never be seen due to suspense boundaries...",

  id: "0",

  suspects: [],

  notes: [],

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
      set({
        ...initialCaseContent,
        ...overrideInitialContent,
      })
    },
    setCaseMode: (mode) => {
      set({ mode })
    },
    startTalkingToSuspect: (talkingSuspectId) => {
      set({ mode: "TALKING", talkingSuspectId })
    },
    setNotes: (notes) => {
      set({ notes })
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
