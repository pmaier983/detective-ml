import packageJson from "~/../package.json"

import styles from "./layout.module.css"
import { type CaseContent } from "~/app/_state/caseStore"
import { CaseProvider } from "~/app/_state/CaseProvider"

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /* 
    TODO: in the future this is where we should fetch the case data
    & also setup some suspense loading. 
    For now we have just once case.
  */

  const currentCase: CaseContent = {
    mode: "INTRO",

    title: "The Case of the Cereal Killer",
    intro:
      'Sugarvale is in a heap of trouble! A breakfast-loving maniac, the "Cereal Killer," is leaving a trail of victims and their signature cereals. Can you sift through the suspects, a bowlful of flakes and braniacs, and decipher the cryptic cereal messages? Prepare for a case that\'s both chilling and a little nutty. Just bring your detective skills (and maybe some Tums).',

    caseId: "1",

    suspects: [],
    whoDoneItId: "0",
  }

  return (
    <CaseProvider initialCaseStateOverride={currentCase}>
      <div className={styles.container}>
        <div className={styles.screenCase}>
          <div className={styles.screen}>{children}</div>
          <div className={styles.screenFooter}>
            DetectiveML v{packageJson.version}
          </div>
        </div>
      </div>
    </CaseProvider>
  )
}
