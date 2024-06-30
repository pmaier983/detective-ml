interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, className, ...rest }: ButtonProps) => (
  <button {...rest} className={`group text-center ${className}`}>
    <span>[</span>
    <span className="text-inherit group-hover:underline group-active:decoration-double">
      {children}
    </span>
    <span>]</span>
  </button>
)
