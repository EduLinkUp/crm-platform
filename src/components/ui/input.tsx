import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-neon-yellow bg-cyber-black/50 px-3 py-2 text-sm text-neon-yellow placeholder:text-neon-yellow/50 focus:border-neon-red focus:outline-none focus:ring-2 focus:ring-neon-red focus:ring-offset-2 focus:ring-offset-cyber-black disabled:cursor-not-allowed disabled:opacity-50 shadow-cyber-border hover:shadow-neon-yellow transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
