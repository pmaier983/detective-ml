"use client"

import { useState } from "react"
import { CaseStoreContext, getCaseStore } from "~/app/_state/caseStore"
import type { CaseContent } from "~/app/_state/caseTypes"

interface CaseProviderProps {
  children: React.ReactNode
  initialCaseStateOverride: Partial<CaseContent>
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
