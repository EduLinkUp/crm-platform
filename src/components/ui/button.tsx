import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-black disabled:pointer-events-none disabled:opacity-50 animated-border-button",
  {
    variants: {
      variant: {
        default: "bg-cyber-black text-neon-yellow border border-neon-yellow hover:bg-neon-yellow hover:text-cyber-black shadow-neon-yellow hover:shadow-neon-yellow",
        destructive: "bg-cyber-black text-neon-red border border-neon-red hover:bg-neon-red hover:text-cyber-black shadow-neon-red hover:shadow-neon-red",
        outline: "border border-neon-yellow bg-transparent text-neon-yellow hover:bg-neon-yellow hover:text-cyber-black shadow-neon-yellow hover:shadow-neon-yellow",
        secondary: "bg-cyber-gray text-neon-pink border border-neon-pink hover:bg-neon-pink hover:text-cyber-black shadow-neon-pink hover:shadow-neon-pink",
        ghost: "text-neon-yellow hover:bg-neon-yellow/10 hover:text-neon-yellow hover:shadow-neon-yellow",
        link: "text-neon-yellow underline-offset-4 hover:underline hover:shadow-neon-yellow",
        neon: "bg-gradient-to-r from-neon-yellow to-neon-red text-cyber-black font-bold border-0 shadow-neon-yellow hover:shadow-neon-red animate-neon-pulse",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
