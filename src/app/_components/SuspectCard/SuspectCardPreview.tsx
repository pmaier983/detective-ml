import type { Suspect } from "~/app/_state/caseTypes"

export const SuspectCardPreview = ({ name, age }: Suspect) => {
  return (
    <div className="flex flex-col gap-0 pl-4 pt-4 leading-4">
      <h4>{name}</h4>
      <span className="text-sm">Age: {age}</span>
    </div>
  )
}
