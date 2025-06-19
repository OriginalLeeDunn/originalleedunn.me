"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary button with brand gradient
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
        // Default variant (same as primary for backward compatibility)
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
        // Secondary button with subtle background
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm",
        // Outline button with border
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // Ghost button for less emphasis
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link button that looks like text
        link: "text-primary underline-offset-4 hover:underline",
        // Terminal-style button
        terminal: "bg-terminal text-terminal-foreground font-mono border border-terminal-border hover:bg-terminal/90 hover:shadow-terminal-glow",
        // Accent color button
        accent: "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonBaseProps = {
  asChild?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'>
  & VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonBaseProps & Omit<HTMLMotionProps<"button">, 'onDrag' | 'onDragStart' | 'onDragEnd'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    disabled = false,
    children,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    rounded = false,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;
    
    // Animation variants
    const motionProps: HTMLMotionProps<"button"> = React.useMemo(() => ({
      initial: { scale: 1 },
      whileTap: isDisabled ? {} : { scale: 0.98 },
      whileHover: isDisabled ? {} : { scale: 1.02 },
    }), [isDisabled]);

    // Button content
    const buttonContent = (
      <>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        )}
        <span className={cn(
          'flex items-center gap-2',
          { 'opacity-0': loading }
        )}>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </span>
      </>
    );

    // Class names
    const buttonClasses = cn(
      buttonVariants({ variant, size }),
      {
        'w-full': fullWidth,
        'rounded-full': rounded,
        'relative': loading,
      },
      className
    );

    if (asChild) {
      const { asChild: _, ...slotProps } = props as ButtonProps;
      return (
        <Slot
          ref={ref as any}
          className={buttonClasses}
          disabled={isDisabled}
          aria-busy={loading}
          {...slotProps}
        >
          {buttonContent}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        aria-busy={loading}
        {...motionProps}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
