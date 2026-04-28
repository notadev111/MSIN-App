import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[8px] text-[14px] font-semibold transition duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] px-4 py-[9px] text-white hover:bg-[var(--accent-hover)]",
        secondary:
          "border border-[var(--border)] bg-[var(--surface)] px-4 py-[9px] text-[var(--text)] hover:bg-[var(--surface-raised)]",
        ghost:
          "px-0 py-0 text-[var(--text-secondary)] hover:text-[var(--text)]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, fullWidth }), className)}
      {...props}
    />
  );
}
