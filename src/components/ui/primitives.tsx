import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes, TextareaHTMLAttributes } from "react";

// ═══════════════════════════════════════════════════════════════
// BUTTON
// ═══════════════════════════════════════════════════════════════

const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-200 ease-out min-h-[44px] min-w-[44px] cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-paper hover:text-ink border-2 border-ink",
        secondary: "bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-paper",
        ghost: "bg-transparent text-ink hover:bg-muted",
        link: "bg-transparent text-ink underline decoration-2 underline-offset-4 hover:text-accent hover:decoration-accent border-none",
        accent: "bg-accent text-paper hover:bg-paper hover:text-accent border-2 border-accent",
      },
      size: {
        sm: "px-3 py-2 text-[10px]",
        md: "px-5 py-3 text-xs",
        lg: "px-8 py-4 text-sm",
        full: "w-full px-5 py-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// INPUT
// ═══════════════════════════════════════════════════════════════

const inputVariants = cva(
  "w-full bg-transparent border-b-2 border-ink font-mono text-sm py-2 px-1 transition-all duration-200 focus:bg-neutral-100 focus:outline-none placeholder:text-neutral-400",
  {
    variants: {
      inputSize: {
        sm: "text-xs py-1",
        md: "text-sm py-2",
        lg: "text-base py-3",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

export function Input({ className, inputSize, ...props }: InputProps) {
  return (
    <input
      className={twMerge(inputVariants({ inputSize }), className)}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// TEXTAREA
// ═══════════════════════════════════════════════════════════════

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={twMerge(
        "w-full bg-transparent border-2 border-ink font-mono text-sm p-3 transition-all duration-200 focus:bg-neutral-100 focus:outline-none placeholder:text-neutral-400 min-h-[120px] resize-y",
        className
      )}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// CARD
// ═══════════════════════════════════════════════════════════════

const cardVariants = cva("border border-ink bg-paper", {
  variants: {
    cardVariant: {
      default: "",
      interactive: "hard-shadow-hover cursor-pointer",
      inverted: "bg-ink text-paper border-ink",
      newsprint: "border-2 bg-paper",
    },
    padding: {
      none: "",
      sm: "p-3",
      md: "p-5",
      lg: "p-8",
    },
  },
  defaultVariants: {
    cardVariant: "default",
    padding: "md",
  },
});

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, cardVariant, padding, ...props }: CardProps) {
  return (
    <div
      className={twMerge(cardVariants({ cardVariant, padding }), className)}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// BADGE
// ═══════════════════════════════════════════════════════════════

const badgeVariants = cva(
  "inline-flex items-center font-mono text-[10px] uppercase tracking-widest font-bold border",
  {
    variants: {
      badgeVariant: {
        default: "border-ink text-ink bg-transparent px-2 py-0.5",
        accent: "border-accent text-accent bg-transparent px-2 py-0.5",
        filled: "bg-ink text-paper border-ink px-2 py-0.5",
        breaking: "bg-accent text-paper border-accent px-2 py-0.5",
      },
    },
    defaultVariants: {
      badgeVariant: "default",
    },
  }
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, badgeVariant, ...props }: BadgeProps) {
  return (
    <span
      className={twMerge(badgeVariants({ badgeVariant }), className)}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION LABEL
// ═══════════════════════════════════════════════════════════════

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={twMerge("font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500", className)}>
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// RULE (horizontal divider)
// ═══════════════════════════════════════════════════════════════

export function Rule({ variant = "single", className }: { variant?: "single" | "double" | "heavy"; className?: string }) {
  const styles = {
    single: "border-t border-ink",
    double: "border-t-[3px] border-b border-ink border-double py-1",
    heavy: "border-t-4 border-ink",
  };
  return <hr className={twMerge(styles[variant], className)} />;
}

// ═══════════════════════════════════════════════════════════════
// ORNAMENT
// ═══════════════════════════════════════════════════════════════

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={twMerge("ornament", className)} aria-hidden="true">
      ✧ ✧ ✧
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDITION BAR
// ═══════════════════════════════════════════════════════════════

export function EditionBar({ className }: { className?: string }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className={twMerge("flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-neutral-500 py-1 border-b border-muted", className)}>
      <span>Vol. 1</span>
      <span>{today}</span>
      <span>Jakarta Edition</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STAT
// ═══════════════════════════════════════════════════════════════

export function Stat({ label, value, className }: { label: string; value: string | number; className?: string }) {
  return (
    <div className={twMerge("border border-ink p-4 text-center", className)}>
      <div className="font-mono text-2xl font-bold text-ink">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-1">{label}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GRID CELL
// ═══════════════════════════════════════════════════════════════

export function GridCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge("border border-ink p-5", className)}>
      {children}
    </div>
  );
}
