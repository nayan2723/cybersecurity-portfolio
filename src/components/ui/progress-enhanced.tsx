import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Ant Design inspired Progress component
export interface ProgressProps {
  value?: number
  max?: number
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "error" | "cyber"
  showText?: boolean
  strokeWidth?: number
  type?: "line" | "circle" | "dashboard"
  status?: "normal" | "success" | "exception" | "active"
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    value = 0, 
    max = 100, 
    size = "md", 
    variant = "default", 
    showText = false,
    strokeWidth,
    type = "line",
    status = "normal",
    className,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizeClasses = {
      sm: "h-1",
      md: "h-2", 
      lg: "h-3"
    }

    const variantClasses = {
      default: "bg-primary",
      success: "bg-green-500",
      warning: "bg-yellow-500", 
      error: "bg-red-500",
      cyber: "bg-gradient-to-r from-cyber-green to-cyber-blue"
    }

    const strokeWidths = {
      sm: strokeWidth || 4,
      md: strokeWidth || 6,
      lg: strokeWidth || 8
    }

    if (type === "line") {
      return (
        <div ref={ref} className={cn("relative w-full", className)} {...props}>
          <div className={cn(
            "w-full bg-muted rounded-full overflow-hidden",
            sizeClasses[size]
          )}>
            <motion.div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                variantClasses[variant],
                status === "active" && "animate-pulse"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          {showText && (
            <div className="absolute right-0 top-0 -mt-6 text-sm font-medium">
              {Math.round(percentage)}%
            </div>
          )}
        </div>
      )
    }

    if (type === "circle" || type === "dashboard") {
      const radius = 45
      const circumference = 2 * Math.PI * radius
      const strokeDasharray = type === "dashboard" ? circumference * 0.75 : circumference
      const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray
      const rotation = type === "dashboard" ? "rotate(135deg)" : "rotate(-90deg)"

      return (
        <div ref={ref} className={cn("relative inline-flex items-center justify-center", className)} {...props}>
          <svg
            className="transform"
            style={{ transform: rotation }}
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidths[size]}
              className="text-muted opacity-20"
              strokeDasharray={type === "dashboard" ? strokeDasharray : undefined}
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth={strokeWidths[size]}
              className={cn("transition-all duration-300", 
                variant === "cyber" ? "stroke-cyber-green" : variantClasses[variant].replace("bg-", "stroke-")
              )}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: strokeDasharray }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
          {showText && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium">
                {Math.round(percentage)}%
              </span>
            </div>
          )}
        </div>
      )
    }

    return null
  }
)
Progress.displayName = "Progress"

export { Progress }