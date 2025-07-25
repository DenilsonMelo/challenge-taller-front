import * as React from "react";

import { cn } from "@/shared/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border-2 border-[var(--light-grey)] bg-[var(--white)] px-4 py-2 text-sm text-[var(--black)] transition-all duration-200 placeholder:text-[var(--random-4)] focus:border-[var(--primary-base)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-base)]/20 focus:ring-offset-0 hover:border-[var(--color-primary-light)] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--light-grey)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--black)] shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
