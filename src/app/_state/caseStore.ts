"use client"
import { createContext, useContext } from "react"
import { createStore, useStore } from "zustand"
import type { CaseContent, CaseMode } from "~/app/_state/caseTypes"

interface CaseActions {
  restart: () => void

  setCaseMode: (mode: CaseMode) => void
}

export type CaseStore = CaseContent & CaseActions

export const initialCaseContent: CaseContent = {
  mode: "INTRO",

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
