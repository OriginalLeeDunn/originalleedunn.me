import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  from?: string;
  via?: string;
  to?: string;
  className?: string;
}

export function GradientText({
  children,
  from = "from-primary",
  via = "via-secondary",
  to = "to-secondary", // Removed blue accent
  className,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r",
        from,
        via,
        to,
        "bg-clip-text text-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
