import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClass?: string;
  fullWidth?: boolean;
};

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  containerClass = "",
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 relative",
        className
      )}
    >
      <div className={cn(
        fullWidth ? "px-0" : "px-4",
        containerClass
      )}>
        {(title || subtitle) && (
          <div className={cn(
            "text-center mb-12",
            fullWidth ? "container mx-auto px-4" : ""
          )}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={fullWidth ? "" : "container mx-auto"}>
          {children}
        </div>
      </div>
    </section>
  );
}
