import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";

export const MODES = {
  VIEWING: "VIEWING",
  TALKING: "TALKING",
  ACCUSING: "ACCUSING",
  INTRO: "INTRO",
} as const;

type Mode = (typeof MODES)[keyof typeof MODES];

export interface Suspect {
  id: string;
  name: string;
  age: number;
  image: string;
  chatLog: string[]; // TODO: figure out the proper way to store the chat log
  prompt: string; // TODO: the prompt might also be part of the chat log?
}

export interface GameStoreContent {
  mode: Mode;
  case?: {
    caseId: string;
    suspects: Suspect[];
    whoDoneItId: string;
    suspectTalkingId: string;
  };
}

interface GameStoreActions {
  restart: () => void;
}

export type gameStoreStore = GameStoreContent & GameStoreActions;

const initialGameStoreContent: GameStoreContent = {
  mode: MODES.INTRO,
};

export const useGameStoreStore = createWithEqualityFn<gameStoreStore>()(
  devtools((set) => ({
    ...initialGameStoreContent,
    restart: () => {
      set(initialGameStoreContent);
    },
  })),
  Object.is,
);
