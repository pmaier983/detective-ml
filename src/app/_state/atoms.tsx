import { atom } from "jotai"
import type { InteractionMethod } from "~/app/_components/screens/talking/InteractionMethodSelect"

export const interactionMethodAtom = atom<InteractionMethod>("TALK")
