import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

export const loaderVariants = cva(
  "box-content inline-block animate-spin rounded-full border-4 border-solid align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
  {
    variants: {
      variant: {
        primary: "border-[var(--primary-base)]",
        secondary: "border-[var(--color-secondary-base)]",
        tertiary: "border-[var(--color-tertiary-base)]",
        quaternary: "border-[var(--color-quartiary-base)]",
        light: "border-[var(--white)]",
        dark: "border-[var(--black)]",
      },
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type LoaderProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof loaderVariants>;

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <div
        className={cn(loaderVariants({ variant, size }), className)}
        style={{ borderInlineEndColor: "transparent" }}
        ref={ref}
        role="status"
        aria-label="Carregando..."
        {...props}
      >
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }
);

Loader.displayName = "Loader";
