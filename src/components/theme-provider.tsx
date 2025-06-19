"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

type Theme = "light" | "dark" | "system";

interface CustomThemeProviderProps extends Omit<ThemeProviderProps, 'children'> {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props
}: CustomThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering the theme provider on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme class to document element for Tailwind
  React.useEffect(() => {
    const root = window.document.documentElement;
    
    // Add theme class
    const theme = localStorage.getItem(storageKey) || defaultTheme;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = theme === 'light' ? 'light' : 'normal';
    }

    // Disable transitions during theme changes if needed
    if (disableTransitionOnChange) {
      const handleChange = () => {
        const applyTransition = () => {
          root.classList.add('transition', 'duration-200');
          root.removeEventListener('transitionend', applyTransition);
        };
        root.addEventListener('transitionend', applyTransition);
        return () => root.removeEventListener('transitionend', applyTransition);
      };
      return handleChange();
    }
  }, [defaultTheme, storageKey, disableTransitionOnChange]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props as any}
    >
      {children}
    </NextThemesProvider>
  );
}

// Custom hook to use theme with type safety
export function useTheme() {
  const { theme, setTheme, themes, resolvedTheme } = useNextTheme();
  
  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return {
    theme: theme as Theme | undefined,
    setTheme: setTheme as (theme: Theme) => void,
    toggleTheme,
    resolvedTheme: resolvedTheme as 'light' | 'dark' | undefined,
    themes: themes as Theme[],
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: theme === 'system'
  };
}
