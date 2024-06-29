"use client"

import { useState } from "react"
import { CaseStoreContext, getCaseStore } from "~/app/_state/caseStore"
import type { Case } from "~/app/_state/caseTypes"

interface CaseProviderProps {
  children: React.ReactNode
  initialCaseStateOverride: Partial<Case>
}

export const CaseProvider = ({
  children,
  initialCaseStateOverride,
}: CaseProviderProps) => {
  const [store] = useState(() =>
    getCaseStore({ overrideInitialContent: initialCaseStateOverride }),
  )

  return (
    <CaseStoreContext.Provider value={store}>
      {children}
    </CaseStoreContext.Provider>
  )
}
