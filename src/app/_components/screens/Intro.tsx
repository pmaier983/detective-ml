"use client"

interface IntroProps {
  title: string
  description: string
}

export const Intro = ({ title, description }: IntroProps) => {
  // TODO setup the react context like this: https://github.com/pmndrs/zustand?tab=readme-ov-file#react-context
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-center text-5xl">{title}</h2>
      <p className="flex max-w-[800px] flex-1 items-center self-center text-4xl">
        {description}
      </p>
      <button className="text-center text-3xl">[Continue / Enter]</button>
    </div>
  )
}
