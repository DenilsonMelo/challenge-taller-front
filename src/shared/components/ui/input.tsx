import * as React from "react";

import { cn } from "@/shared/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  hint?: string;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hint, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border-2 bg-[var(--white)] px-4 py-2 text-sm text-[var(--black)] transition-all duration-200 placeholder:text-[var(--random-4)] focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--light-grey)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--black)] shadow-sm",
            error 
              ? "border-[var(--primary-base)] focus:border-[var(--primary-base)] focus:ring-[var(--primary-base)]/20 hover:border-[var(--color-primary-dark)]"
              : "border-[var(--light-grey)] focus:border-[var(--primary-base)] focus:ring-[var(--primary-base)]/20 hover:border-[var(--color-primary-light)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && (
          <p className={cn(
            "mt-1 text-xs transition-colors duration-200",
            error 
              ? "text-[var(--primary-base)]" 
              : "text-[var(--random-4)]"
          )}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };