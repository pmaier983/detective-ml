import Image from "next/image"
import type React from "react"
import type { Suspect } from "~/app/_state/caseTypes"

import styles from "./SuspectCardWrapper.module.css"

export const ASPECT_RATIO_WIDTH = 214
export const ASPECT_RATIO_HEIGHT = 324

type SuspectCardWrapperProps = {
  children: React.ReactNode
  className?: string
} & Suspect &
  React.HTMLAttributes<HTMLDivElement>

export const SuspectCardWrapper = ({
  children,
  imageUrl,
  colorHex,
  textColorHex,
  name,
  className,
  style,
  onClick,
}: SuspectCardWrapperProps) => {
  return (
    <div
      className={`flex h-full w-auto flex-1 justify-center ${styles.buttonReset}`}
      style={{ color: textColorHex, ...style }}
    >
      <div
        className={`w-auto max-w-full content-center`}
        style={{
          aspectRatio: `${ASPECT_RATIO_WIDTH}/${ASPECT_RATIO_HEIGHT}`,
        }}
      >
        {/* 
          TODO: how to make this a button instead of a div with an onClick
          Doing so (even with a reset) causes major issues for some reason 
        */}
        <div
          className={`relative w-auto hover:cursor-pointer ${className}`}
          onClick={onClick}
          style={{
            aspectRatio: `${ASPECT_RATIO_WIDTH}/${ASPECT_RATIO_HEIGHT}`,
          }}
        >
          <SuspectCardShapeWrapper colorHex={colorHex} />
          <div className={styles.cardContent}>
            {children}
            <div className="relative flex flex-1">
              <Image
                src={imageUrl}
                alt={`An image of ${name}, a suspect in the case`}
                fill
                className="h-auto max-w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SuspectCardPreviewProps {
  colorHex: string
}

export const SuspectCardShapeWrapper = ({
  colorHex,
}: SuspectCardPreviewProps) => (
  // IMPORTANT: KEEP THIS ASPECT RATIO IN SYNC TOP LEVEL CARD CONTAINER
  <svg
    viewBox={`0 0 ${ASPECT_RATIO_WIDTH} ${ASPECT_RATIO_HEIGHT}`}
    fill="none"
    preserveAspectRatio="none"
  >
    <mask id="path-1-inside-1_3_605" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0H207V4H211V8H215V316H211V320H207V324H8V320H4V316H0V8H4V4H8V0Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0H207V4H211V8H215V316H211V320H207V324H8V320H4V316H0V8H4V4H8V0Z"
      fill={colorHex}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0H207V4H211V8H215V316H211V320H207V324H8V320H4V316H0V8H4V4H8V0Z"
      fill="url(#pattern0_3_605)"
    />
    <path
      d="M207 0H211V-4H207V0ZM8 0V-4H4V0H8ZM207 4H203V8H207V4ZM211 4H215V0H211V4ZM211 8H207V12H211V8ZM215 8H219V4H215V8ZM215 316V320H219V316H215ZM211 316V312H207V316H211ZM211 320V324H215V320H211ZM207 320V316H203V320H207ZM207 324V328H211V324H207ZM8 324H4V328H8V324ZM8 320H12V316H8V320ZM4 320H0V324H4V320ZM4 316H8V312H4V316ZM0 316H-4V320H0V316ZM0 8V4H-4V8H0ZM4 8V12H8V8H4ZM4 4V0H0V4H4ZM8 4V8H12V4H8ZM207 -4H8V4H207V-4ZM211 4V0H203V4H211ZM207 8H211V0H207V8ZM207 4V8H215V4H207ZM215 4H211V12H215V4ZM219 316V8H211V316H219ZM211 320H215V312H211V320ZM207 316V320H215V316H207ZM211 316H207V324H211V316ZM211 324V320H203V324H211ZM8 328H207V320H8V328ZM4 320V324H12V320H4ZM8 316H4V324H8V316ZM8 320V316H0V320H8ZM0 320H4V312H0V320ZM-4 8V316H4V8H-4ZM4 4H0V12H4V4ZM8 8V4H0V8H8ZM4 8H8V0H4V8ZM4 0V4H12V0H4Z"
      fill="white"
      fillOpacity="0.2"
      mask="url(#path-1-inside-1_3_605)"
    />
    <defs>
      <pattern
        id="pattern0_3_605"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use transform="matrix(0.00148074 0 0 0.000982591 0.12093 0.300896)" />
      </pattern>
    </defs>
  </svg>
)
