import packageJson from "~/../package.json"

import styles from "./layout.module.css"
import { CaseProvider } from "~/app/_state/CaseProvider"
import { CaseHeader } from "~/app/_components/CaseHeader"

import case1 from "~/../public/case-1.json"
import { caseContentSchema } from "~/app/_state/caseTypes"

const CaseLayout = async ({ children }: { children: React.ReactNode }) => {
  /* 
    TODO: in the future this is where we should fetch the case data
    & also setup some suspense loading. 
    For now we have just once case.
  */
  // TODO: setup generateStaticParams for this page as well!

  const { data: currentCase, success } = caseContentSchema.safeParse(case1)

  if (!success) throw new Error("Failed to parse case data")

  return (
    <CaseProvider initialCaseStateOverride={currentCase}>
      <div className={styles.container}>
        <div className={styles.screenCase}>
          <div className={styles.screen}>
            <CaseHeader />
            {children}
          </div>
          <div className={styles.screenFooter}>
            DetectiveML v{packageJson.version}
          </div>
        </div>
      </div>
    </CaseProvider>
  )
}

export default CaseLayout
