import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-sm",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border hover:bg-accent",
        // Material-UI inspired
        chip: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:scale-105",
        // Chakra UI inspired
        solid: "bg-cyber-green text-dark-bg border-transparent shadow-sm hover:shadow-md",
        subtle: "bg-cyber-green/10 text-cyber-green border-cyber-green/20 hover:bg-cyber-green/20",
        // Ant Design inspired
        processing: "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20 animate-pulse",
        success: "bg-green-500/10 text-green-400 border-green-500/20",
        warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        error: "bg-red-500/10 text-red-400 border-red-500/20",
        // Cyberpunk variants
        neon: "bg-transparent border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-dark-bg hover:shadow-cyber animate-pulse",
        matrix: "bg-dark-bg border-cyber-green text-cyber-green font-mono hover:animate-pulse",
        glitch: "bg-cyber-blue/20 text-cyber-blue border-cyber-blue hover:bg-neon-pink/20 hover:text-neon-pink hover:border-neon-pink",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      interactive: {
        true: "cursor-pointer hover:scale-105 active:scale-95",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  closable?: boolean
  onClose?: () => void
}

function Badge({ className, variant, size, interactive, icon, closable, onClose, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, interactive }), className)} {...props}>
      {icon && <span className="mr-1 flex items-center">{icon}</span>}
      {children}
      {closable && (
        <button
          onClick={onClose}
          className="ml-1 hover:bg-current hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  )
}

export { Badge, badgeVariants }
