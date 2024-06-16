export const SUSPECT_CARD_VARIANTS = {
  PREVIEW: "PREVIEW",
  FULL: "FULL",
} as const

export type SuspectCardVariant =
  (typeof SUSPECT_CARD_VARIANTS)[keyof typeof SUSPECT_CARD_VARIANTS]
