import { AggravationScore } from "~/app/_components/AggravationScore"
import { findLastMessageWithData, useChat } from "~/app/_hooks/useChat"

interface TalkingInformationProps {
  className?: string
  suspectName: string
}

export const TalkingInformation = ({
  className,
  suspectName,
}: TalkingInformationProps) => {
  const { messages } = useChat({
    id: suspectName,
  })

  const mostRecentToolMessage = findLastMessageWithData(messages)

  console.log({ mostRecentToolMessage })

  return (
    <div className={`flex h-full flex-1 flex-col gap-2 ${className}`}>
      <div className="flex border-4 border-white/10 p-3">
        <AggravationScore
          aggravationPercent={
            mostRecentToolMessage?.data.aggravationPercent ?? 0
          }
        />
      </div>
      <div className="flex flex-1 border-4 border-white/10">Notes</div>
    </div>
  )
}
