import "~/styles/globals.css"

import { VT323 } from "next/font/google"
import { GeneralProviders } from "~/app/_state/GeneralProviders"

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
        <GeneralProviders>{children}</GeneralProviders>
      </body>
    </html>
  )
}
