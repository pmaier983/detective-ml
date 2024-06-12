import "~/styles/globals.css"

import { VT323 } from "next/font/google"

import packageJson from "~/../package.json"

import styles from "./layout.module.css"
import { Providers } from "~/app/_state/providers"

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
})

export const metadata = {
  title: "DetectiveML",
  description: "An AI Detective Game", // TODO: ask for a better description
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={vt323.className}>
      <body>
        <Providers>
          <div className={styles.container}>
            <div className={styles.screenCase}>
              <div className={styles.screen}>{children}</div>
              <div className={styles.screenFooter}>
                DetectiveML v{packageJson.version}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
