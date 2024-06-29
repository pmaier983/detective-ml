import packageJson from "~/../package.json"

import styles from "./layout.module.css"
import { CaseProvider } from "~/app/_state/CaseProvider"
import { CaseHeader } from "~/app/_components/CaseHeader"

import case1 from "~/../public/case-1.json"
import { caseSchema } from "~/app/_state/caseTypes"

const CaseLayout = async ({ children }: { children: React.ReactNode }) => {
  /* 
    TODO: in the future this is where we should fetch the case data
    & also setup some suspense loading. 
  */
  // TODO: setup generateStaticParams for this page as well!

  // TODO: consider re-enabling when we move to the server...
  // The hard part will be actually getting the most common color of the image
  // colorthief might work? https://lokeshdhakar.com/projects/color-thief

  // const enhancedSuspects = await Promise.all(
  //   case1.suspects.map((suspect) =>
  //     new Vibrant(suspect.imageUrl, {
  //       quantizer: Vibrant.Quantizer.WebWorker ?? undefined,
  //     }).
  //       .getPalette()
  //       .then((palette) => {
  //         const mainPalette = palette.LightMuted

  //         if (!mainPalette) {
  //           throw new Error(
  //             "Failed to get the most Vibrant color from the main image",
  //           )
  //         }

  //         const colorHex = mainPalette.hex
  //         const textColorHex = mainPalette.getBodyTextColor()

  //         return { ...suspect, colorHex, textColorHex }
  //       }),
  //   ),
  // )

  const { data: currentCase, success, error } = caseSchema.safeParse(case1)

  if (!success) throw new Error(JSON.stringify(error, null, 2))

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
