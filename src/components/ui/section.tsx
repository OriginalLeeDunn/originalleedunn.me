import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClass?: string;
  titleClass?: string;
  showDivider?: boolean;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  containerClass = "",
  titleClass = "",
  showDivider = true,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} {...props}>
      <div className={cn("container px-4 mx-auto", containerClass)}>
        <div className="text-center mb-12">
          {subtitle && (
            <p className="text-sm font-medium text-primary mb-2">{subtitle}</p>
          )}
          <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", titleClass)}>
            {title}
          </h2>
          {showDivider && (
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-secondary mt-4" />
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function SectionContent({
  children,
  className = "",
  ...props
}: SectionContentProps) {
  return (
    <div className={cn("mt-8", className)} {...props}>
      {children}
    </div>
  );
}
