"use client"
import { createContext, useContext } from "react"
import { createStore, useStore } from "zustand"
import type { Case, CaseMode, Suspect } from "~/app/_state/caseTypes"

interface CaseActions {
  restart: () => void

  updateSuspect: ({
    suspectId,
    updatedSuspect,
  }: {
    suspectId: string
    updatedSuspect: Partial<Suspect>
  }) => void

  setCaseMode: (mode: CaseMode) => void
  startTalkingToSuspect: (suspectId: string) => void
  setNotes: (notes: string[]) => void
  setSuspectAggravation: ({
    suspectId,
    aggravation,
  }: {
    suspectId: string
    aggravation: number
  }) => void
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
  createStore<CaseStore>()((set, get) => ({
    ...initialCaseContent,
    ...overrideInitialContent,

    restart: () => {
      set({
        ...initialCaseContent,
        ...overrideInitialContent,
      })
    },

    // TODO: possibly better to use immer produce here
    updateSuspect: ({ suspectId, updatedSuspect }) => {
      const suspect = get().suspects.find((suspect) => suspect.id === suspectId)

      if (!suspect) {
        throw new Error(`Could not find suspect with id: ${suspectId}`)
      }

      const updatedSuspects = get().suspects.map((suspect) =>
        suspect.id === suspectId ? { ...suspect, ...updatedSuspect } : suspect,
      )

      set({ suspects: updatedSuspects })
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
    setSuspectAggravation: ({ suspectId, aggravation }) => {
      const suspect = get().suspects.find((suspect) => suspect.id === suspectId)

      if (!suspect) {
        throw new Error(`Could not find suspect with id: ${suspectId}`)
      }

      const updatedSuspects = {
        ...suspect,
        aggravation,
      }

      get().updateSuspect({ suspectId, updatedSuspect: updatedSuspects })
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
