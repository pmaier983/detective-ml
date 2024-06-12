import { createContext, useContext } from "react"
import { createStore, useStore } from "zustand"
import { devtools } from "zustand/middleware"

export const MODES = {
  VIEWING: "VIEWING",
  TALKING: "TALKING",
  ACCUSING: "ACCUSING",
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

export interface GameContent {
  mode: Mode
  case?: {
    caseId: string
    suspects: Suspect[]
    whoDoneItId: string
    suspectTalkingId: string
  }
}

interface GameActions {
  restart: () => void

  setGameMode: (mode: Mode) => void
}

export type GameStore = GameContent & GameActions

export const initialGameContent: GameContent = {
  mode: MODES.INTRO,
}

export const gameStore = createStore<GameStore>()((set) => ({
  ...initialGameContent,
  restart: () => {
    set(initialGameContent)
  },
  setGameMode: (mode) => {
    set({ mode })
  },
}))

export const GameStoreContext = createContext<typeof gameStore | null>(null)

type Selector<T> = (state: GameStore) => T

export const useGameStore = <T>(selector: Selector<T>): T => {
  const store = useContext(GameStoreContext)
  if (!store) {
    throw new Error("Missing GameStoreProvider")
  }
  return useStore(store, selector)
}
