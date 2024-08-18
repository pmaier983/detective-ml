import { VT323 } from "next/font/google"
import localFont from "next/font/local"

export const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
})

export const optimusPrinceps = localFont({
  src: "../../public/OptimusPrinceps.ttf",
})
