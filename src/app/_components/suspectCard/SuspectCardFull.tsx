"use client"

import { motion } from "framer-motion"
import { useCallback, useState } from "react"

import { SuspectCardWrapper } from "~/app/_components/suspectCard/SuspectCardWrapper"

import styles from "./SuspectCardFull.module.css"
import { Button } from "~/app/_components/Button"
import type { Suspect } from "~/app/_state/caseTypes"

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
            <div className="z-10 flex flex-col gap-0 text-sm leading-4 lg:text-xl xl:text-2xl">
              <h4 className="lg:text-4xl xl:text-5xl">{suspect.name}</h4>
              <span>Age: {suspect.age}</span>
              <Button
                onClick={toggleIsFlipped}
                className="absolute bottom-0 right-0 text-sm lg:text-xl xl:text-2xl"
              >
                Flip Card
              </Button>
            </div>
          </SuspectCardWrapper>
        </div>
        <div className={styles.cardBack}>
          <SuspectCardWrapper {...suspect} hasSuspectPhoto={false}>
            <div className="z-10 text-sm lg:text-xl xl:text-2xl">
              <h4 className="lg:text-4xl xl:text-5xl">{suspect.name}</h4>
              <ul className="flex flex-col gap-1 pl-4">
                {suspect.facts.map((fact) => {
                  // TODO: Add links for names in facts

                  return (
                    // TODO: this should technically not be a disc, but should instead be a square thing...
                    <li key={fact} className="list-disc">
                      {fact}
                    </li>
                  )
                })}
              </ul>
              <Button
                onClick={toggleIsFlipped}
                className="absolute bottom-0 right-0"
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
