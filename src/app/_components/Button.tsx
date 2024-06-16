interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className="group text-center text-3xl ">
      <span>[</span>
      <span className="group-hover:underline">{children}</span>
      <span>]</span>
    </button>
  )
}
