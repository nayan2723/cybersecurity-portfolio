import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        // Material-UI inspired variants
        contained: "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90 active:scale-95",
        text: "text-primary hover:bg-primary/10 hover:scale-105",
        // Chakra UI inspired variants  
        solid: "bg-cyber-green text-dark-bg shadow-cyber hover:shadow-glow hover:scale-105 active:scale-95",
        // Ant Design inspired variants
        primary: "bg-gradient-to-r from-cyber-green to-cyber-blue text-dark-bg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        dashed: "border-2 border-dashed border-primary text-primary hover:bg-primary/10 hover:border-solid",
        // Cyberpunk variants
        neon: "bg-transparent border-2 border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-dark-bg hover:shadow-cyber hover:scale-105 transition-all duration-300",
        matrix: "bg-dark-bg border border-cyber-green text-cyber-green font-mono hover:bg-cyber-green hover:text-dark-bg hover:shadow-glow",
        glitch: "bg-cyber-blue text-dark-bg hover:animate-pulse hover:scale-105 before:content-[''] before:absolute before:inset-0 before:bg-neon-pink before:opacity-0 hover:before:opacity-20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
      loading: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </div>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
