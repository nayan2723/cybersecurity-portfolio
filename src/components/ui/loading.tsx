import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Material-UI inspired Loading component
export interface LoadingProps {
  size?: "sm" | "md" | "lg"
  variant?: "circular" | "linear" | "dots" | "pulse"
  color?: "primary" | "secondary" | "accent"
  className?: string
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = "md", variant = "circular", color = "primary", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6", 
      lg: "w-8 h-8"
    }

    const colorClasses = {
      primary: "text-primary border-primary",
      secondary: "text-secondary border-secondary",
      accent: "text-accent border-accent"
    }

    if (variant === "circular") {
      return (
        <div
          ref={ref}
          className={cn(
            "border-2 border-t-transparent rounded-full animate-spin",
            sizeClasses[size],
            colorClasses[color],
            className
          )}
          {...props}
        />
      )
    }

    if (variant === "linear") {
      return (
        <div ref={ref} className={cn("w-full bg-muted rounded-full h-2", className)} {...props}>
          <motion.div
            className={cn("h-full rounded-full", `bg-${color}`)}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "30%" }}
          />
        </div>
      )
    }

    if (variant === "dots") {
      return (
        <div ref={ref} className={cn("flex space-x-1", className)} {...props}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={cn("w-2 h-2 rounded-full", `bg-${color}`)}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )
    }

    if (variant === "pulse") {
      return (
        <motion.div
          ref={ref}
          className={cn(
            "rounded-full",
            sizeClasses[size],
            `bg-${color}`,
            className
          )}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          {...props}
        />
      )
    }

    return null
  }
)
Loading.displayName = "Loading"

export { Loading }