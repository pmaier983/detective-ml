interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, className, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={`active: group text-center text-xl ${className}`}
  >
    <span>[</span>
    <span className="group-hover:underline group-active:decoration-double">
      {children}
    </span>
    <span>]</span>
  </button>
)
