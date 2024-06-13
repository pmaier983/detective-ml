import { Case } from "~/app/_components/Case"

export const generateStaticParams = () => [
  {
    caseId: "1",
  },
]

const CasePage = () => {
  return <Case />
}

export default CasePage
