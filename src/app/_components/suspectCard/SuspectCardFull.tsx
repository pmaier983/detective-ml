"use client"

import { motion } from "framer-motion"
import { useCallback, useState } from "react"

import { SuspectCardWrapper } from "~/app/_components/suspectCard/SuspectCardWrapper"
import type { Suspect } from "~/app/_state/caseTypes"

import styles from "./SuspectCardFull.module.css"
import { Button } from "~/app/_components/Button"

const FLIP_ANIMATION_DURATION = 0.3

export const SuspectCardFull = (suspect: Suspect) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleIsFlipped = useCallback(() => {
    // don't allow flipping while the card is animating
    if (!isAnimating) {
      setIsFlipped(!isFlipped)
      setIsAnimating(true)
    }
  }, [isAnimating, isFlipped])

  const isFrontVisible = !isFlipped || isAnimating

  return (
    <div className={styles.cardContainer}>
      <motion.div
        initial={isFlipped}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: FLIP_ANIMATION_DURATION }}
        onAnimationComplete={() => setIsAnimating(false)}
        className={styles.flipCardWrapper}
      >
        <div
          className={styles.cardFront}
          style={
            {
              "--visibility": isFrontVisible ? "visible" : "hidden",
            } as React.CSSProperties
          }
        >
          <SuspectCardWrapper {...suspect}>
            <div className="z-10 flex flex-col gap-0 leading-4 md:pl-1 md:pt-1 lg:pl-3 lg:pt-3 lg:text-2xl xl:text-3xl">
              <h4>{suspect.name}</h4>
              <span className="text-sm lg:text-lg xl:text-xl">
                Age: {suspect.age}
              </span>
              <Button
                onClick={toggleIsFlipped}
                className="absolute bottom-0 right-0 text-base"
              >
                Flip Card
              </Button>
            </div>
          </SuspectCardWrapper>
        </div>
        <div className={styles.cardBack}>
          <SuspectCardWrapper {...suspect} hasSuspectPhoto={false}>
            <div className="z-10">
              Card Back TODO
              <Button
                onClick={toggleIsFlipped}
                className="absolute bottom-0 right-0 text-base"
              >
                Flip Card
              </Button>
            </div>
          </SuspectCardWrapper>
        </div>
      </motion.div>
    </div>
  )
}
