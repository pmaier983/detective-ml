interface TalkingInformationProps {
  className?: string
}

export const TalkingInformation = ({ className }: TalkingInformationProps) => {
  return (
    <div className={`flex h-full flex-1 flex-col gap-2 ${className}`}>
      <div className="flex border-4 border-white/10">Aggravation</div>
      <div className="flex flex-1 border-4 border-white/10">Notes</div>
    </div>
  )
}
