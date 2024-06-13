import { redirect } from "next/navigation"

export default async function Home() {
  // TODO: Setup a real home page, and avoid an immediate redirect to the first case
  redirect("/case/1")

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      Wait for it...
    </main>
  )
}
