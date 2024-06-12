import { Intro } from "~/app/_components/screens/Intro"

const TITLE = "The Case of the Cereal Killer"

const DESCRIPTION =
  'Sugarvale is in a heap of trouble! A breakfast-loving maniac, the "Cereal Killer," is leaving a trail of victims and their signature cereals. Can you sift through the suspects, a bowlful of flakes and braniacs, and decipher the cryptic cereal messages? Prepare for a case that\'s both chilling and a little nutty. Just bring your detective skills (and maybe some Tums).'

export default async function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <Intro title={TITLE} description={DESCRIPTION} />
    </main>
  )
}
