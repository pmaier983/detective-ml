import { useState } from "react"
import { GameStoreContext, gameStore } from "~/app/_state/gameStore"
import { TRPCReactProvider } from "~/trpc/react"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => gameStore)

  return (
    <TRPCReactProvider>
      <GameStoreContext.Provider value={store}>
        {children}
      </GameStoreContext.Provider>
    </TRPCReactProvider>
  )
}
