import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Using a simpler variant map instead of full CVA to save dependency weight for now
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-espresso disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      default: "bg-[var(--color-espresso)] text-[var(--color-linen)] hover:bg-[var(--color-espresso)]/90 shadow-sm",
      outline: "border border-[var(--color-espresso)] bg-transparent hover:bg-[var(--color-espresso)]/5",
      ghost: "hover:bg-[var(--color-espresso)]/5",
      link: "text-[var(--color-espresso)] underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 px-4 text-xs",
      lg: "h-14 px-8 text-base",
      icon: "h-11 w-11",
    }

    return (
      <Comp
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
