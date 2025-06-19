"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  showLabel?: boolean;
  variant?: 'ghost' | 'outline' | 'default' | 'link' | 'secondary' | null | undefined;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
}

export function ThemeToggle({
  className,
  showLabel = false,
  variant = "ghost" as const,
  size = "icon",
  ...props
}: ThemeToggleProps) {
  const { theme, setTheme, isDark, isLight, isSystem } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Only render the theme toggle client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsLoading(true);
    if (isDark) {
      setTheme('light');
    } else if (isLight) {
      setTheme('system');
    } else {
      setTheme('dark');
    }
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 300);
  };

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={toggleTheme}
        className={cn("relative", className)}
        disabled={isLoading}
        aria-label="Toggle theme"
        {...props as any}
      >
        <Sun className="h-5 w-5" />
        {showLabel && <span className="ml-2">Theme</span>}
      </Button>
    );
  }

  const getThemeLabel = () => {
    if (isSystem) return 'System';
    return isDark ? 'Dark' : 'Light';
  };

  const getThemeIcon = () => {
    if (isSystem) return <Moon className="h-5 w-5" />;
    return isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        "hover:bg-accent/10 hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "dark:focus-visible:ring-offset-foreground/10",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Switch to ${isDark ? 'light' : isLight ? 'system' : 'dark'} mode`}
      {...props as any}
    >
      <span className="relative flex items-center">
        <span className={cn(
          "inline-flex items-center justify-center transition-transform duration-300",
          isHovered ? "scale-110" : "scale-100"
        )}>
          {getThemeIcon()}
        </span>
        {showLabel && (
          <span className="ml-2 font-medium">
            {getThemeLabel()}
          </span>
        )}
      </span>
      <span className="sr-only">Toggle theme</span>
      
      {/* Animated background highlight */}
      <span 
        className={cn(
          "absolute inset-0 -z-10 bg-accent/5 dark:bg-accent/10",
          "transform origin-bottom scale-y-0 transition-transform duration-300",
          isHovered && "scale-y-100"
        )}
        aria-hidden="true"
      />
    </Button>
  );
}
