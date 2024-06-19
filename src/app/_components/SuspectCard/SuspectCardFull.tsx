import type { Suspect } from "~/app/_state/caseTypes"

export const SuspectCardFull = ({ name, age }: Suspect) => {
  return (
    // TODO: figure out a better way to scale things
    <div className="flex flex-col gap-0 leading-4 md:pl-1 md:pt-1 lg:pl-3 lg:pt-3 lg:text-2xl xl:text-3xl">
      <h4>{name}</h4>
      <span className="text-sm lg:text-lg xl:text-xl">Age: {age}</span>
    </div>
  )
}
