"use client"

import { useState } from "react"
import {
  CaseStoreContext,
  getCaseStore,
  type CaseContent,
} from "~/app/_state/caseStore"

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
