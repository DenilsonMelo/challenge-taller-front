import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary-base)] text-[var(--white)] hover:bg-[var(--color-primary-dark)] focus-visible:ring-[var(--primary-base)]",
        secondary: "bg-[var(--color-secondary-base)] text-[var(--white)] hover:bg-[var(--color-secondary-dark)] focus-visible:ring-[var(--color-secondary-base)]",
        tertiary: "bg-[var(--color-tertiary-base)] text-[var(--white)] hover:bg-[var(--color-tertiary-dark)] focus-visible:ring-[var(--color-tertiary-base)]",
        quaternary: "bg-[var(--color-quartiary-base)] text-[var(--white)] hover:bg-[var(--color-quartiary-dark)] focus-visible:ring-[var(--color-quartiary-base)]",
        outline: "border-2 border-[var(--primary-base)] text-[var(--primary-base)] bg-transparent hover:bg-[var(--color-primary-lightest)] focus-visible:ring-[var(--primary-base)]",
        ghost: "text-[var(--primary-base)] bg-transparent hover:bg-[var(--color-primary-lightest)] focus-visible:ring-[var(--primary-base)]",
        destructive: "bg-[var(--primary-darkest)] text-[var(--white)] hover:bg-[var(--primary-base)] focus-visible:ring-[var(--primary-darkest)]",
        link: "text-[var(--primary-base)] underline-offset-4 hover:underline hover:text-[var(--color-primary-dark)] bg-transparent shadow-none",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-10 px-6 py-2",
        lg: "h-12 rounded-lg px-8 text-base",
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

export { Button }
