import { useElementSize } from "~/app/_hooks/useElementSize"

interface AggravationScoreProps {
  aggravationPercent: number
}

// ░ = renders as 10.18 x 23.98 pixels on my screen
const WEIRD_CHARACTER = "░"
const WEIRD_CHARACTER_WIDTH = 12.71

export const AggravationScore = ({
  aggravationPercent,
}: AggravationScoreProps) => {
  const { element, elementRef } = useElementSize()

  const containerWidth = element?.contentRect.width ?? 0

  const countOfWeirdCharacters = containerWidth / WEIRD_CHARACTER_WIDTH

  const countOfAggravatedCharacters = Math.floor(
    (countOfWeirdCharacters * aggravationPercent) / 100,
  )

  return (
    <div className="flex max-w-full flex-1 flex-col gap-2 text-xl">
      <div className="flex-1 text-center opacity-40">Aggravation</div>
      <div className="flex flex-row gap-2">
        <div className="w-full flex-1 overflow-hidden" ref={elementRef}>
          {Array.from({ length: countOfWeirdCharacters }).map((_, index) => (
            <span
              key={index}
              className={`${
                index < countOfAggravatedCharacters
                  ? aggravationPercent >= 80
                    ? "text-red-500"
                    : "text-white"
                  : "text-gray-100 opacity-20"
              }`}
            >
              {WEIRD_CHARACTER}
            </span>
          ))}
        </div>
        {aggravationPercent}%
      </div>
    </div>
  )
}
