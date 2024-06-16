import Image from "next/image"
import type { Suspect } from "~/app/_state/caseTypes"

import styles from "./SuspectCardWrapper.module.css"

interface SuspectCardWrapperProps extends Suspect {
  children: React.ReactNode
  className?: string
}

export const SuspectCardWrapper = ({
  children,
  imageUrl,
  colorHex,
  name,
  className,
}: SuspectCardWrapperProps) => {
  return (
    <div
      className={`${styles.cardContainer} ${className}`}
      // TODO: is there a better way to do this?
      style={{ "--card-color": colorHex } as React.CSSProperties}
    >
      <Image
        src={imageUrl}
        alt={`An image of ${name}, a suspect in the case`}
        fill
        objectFit="contain"
      />
      {children}
    </div>
  )
}

export const SuspectCardCorner = () => {
  return <div>X</div>
}
