import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

// Chakra UI inspired Alert component
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error"
  status?: "loading" | "success" | "error" | "warning" | "info"
  size?: "sm" | "md" | "lg"
  closable?: boolean
  onClose?: () => void
  icon?: React.ReactNode
  title?: string
  description?: string
}

const alertVariants = {
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
  error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
}

const statusIcons = {
  info: <Info className="w-4 h-4" />,
  success: <CheckCircle className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  error: <AlertCircle className="w-4 h-4" />,
  loading: (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  ),
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = "info", 
    status, 
    size = "md", 
    closable = false, 
    onClose, 
    icon, 
    title, 
    description, 
    children, 
    ...props 
  }, ref) => {
    const [visible, setVisible] = React.useState(true)
    const alertStatus = status || variant

    const handleClose = () => {
      setVisible(false)
      onClose?.()
    }

    const sizeClasses = {
      sm: "p-3 text-sm",
      md: "p-4",
      lg: "p-6 text-lg"
    }

    return (
      <AnimatePresence>
        {visible && (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative flex items-start gap-3 rounded-lg border",
                alertVariants[alertStatus as keyof typeof alertVariants],
                sizeClasses[size],
                className
              )}
            >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {icon || statusIcons[alertStatus as keyof typeof statusIcons]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {title && (
                <h4 className="font-semibold text-sm mb-1">
                  {title}
                </h4>
              )}
              {description && (
                <p className="text-sm opacity-90 mb-2">
                  {description}
                </p>
              )}
              {children && (
                <div className="text-sm">
                  {children}
                </div>
              )}
            </div>

            {/* Close button */}
            {closable && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
Alert.displayName = "Alert"

export { Alert }