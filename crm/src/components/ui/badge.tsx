import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neon-yellow focus:ring-offset-2 focus:ring-offset-cyber-black",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neon-yellow text-cyber-black shadow-neon-yellow",
        secondary:
          "border-transparent bg-neon-pink text-cyber-black shadow-neon-pink",
        destructive:
          "border-transparent bg-neon-red text-cyber-black shadow-neon-red",
        outline: "border-neon-yellow text-neon-yellow shadow-cyber-border",
        success: "border-transparent bg-matrix-green text-cyber-black",
        warning: "border-transparent bg-warning-yellow text-cyber-black",
        neon: "border-transparent bg-gradient-to-r from-neon-yellow to-neon-red text-cyber-black shadow-neon-yellow animate-neon-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
