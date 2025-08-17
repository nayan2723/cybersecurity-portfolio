import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

// Material-UI inspired Select component with enhanced features
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
}

export interface EnhancedSelectProps {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "cyber" | "outlined"
  className?: string
}

const EnhancedSelect = React.forwardRef<HTMLDivElement, EnhancedSelectProps>(
  ({ 
    options,
    value,
    onValueChange,
    placeholder = "Select option...",
    multiple = false,
    searchable = false,
    clearable = false,
    disabled = false,
    size = "md",
    variant = "default",
    className,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      multiple ? (value ? [value] : []) : (value ? [value] : [])
    )

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchTerm) return options
      return options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [options, searchTerm, searchable])

    const selectedOption = options.find(opt => opt.value === value)
    
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4", 
      lg: "h-12 px-5 text-lg"
    }

    const variantClasses = {
      default: "border border-input bg-background hover:bg-accent",
      cyber: "border border-cyber-green bg-dark-bg text-cyber-green hover:bg-cyber-green/10",
      outlined: "border-2 border-primary bg-transparent hover:border-primary/80"
    }

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue]
        setSelectedValues(newValues)
        onValueChange?.(newValues.join(","))
      } else {
        setSelectedValues([optionValue])
        onValueChange?.(optionValue)
        setIsOpen(false)
      }
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Trigger */}
        <motion.button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "relative w-full flex items-center justify-between rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            sizeClasses[size],
            variantClasses[variant],
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
        >
          <span className={cn(
            "flex items-center gap-2 truncate",
            !selectedOption && "text-muted-foreground"
          )}>
            {selectedOption?.icon && (
              <span className="flex-shrink-0">{selectedOption.icon}</span>
            )}
            {selectedOption?.label || placeholder}
          </span>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
          </motion.div>
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-hidden"
            >
              {/* Search input */}
              {searchable && (
                <div className="p-2 border-b border-border">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}

              {/* Options */}
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value)
                    
                    return (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => !option.disabled && handleSelect(option.value)}
                        disabled={option.disabled}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          isSelected && "bg-accent text-accent-foreground",
                          option.disabled && "opacity-50 cursor-not-allowed"
                        )}
                        whileHover={!option.disabled ? { backgroundColor: "var(--accent)" } : {}}
                        whileTap={!option.disabled ? { scale: 0.98 } : {}}
                      >
                        {multiple && (
                          <div className={cn(
                            "w-4 h-4 border border-input rounded flex items-center justify-center",
                            isSelected && "bg-primary border-primary"
                          )}>
                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                        )}
                        
                        {option.icon && (
                          <span className="flex-shrink-0">{option.icon}</span>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground truncate">
                              {option.description}
                            </div>
                          )}
                        </div>
                        
                        {!multiple && isSelected && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </motion.button>
                    )
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    )
  }
)
EnhancedSelect.displayName = "EnhancedSelect"

export { EnhancedSelect }