"use client";

import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>("system");

  // Update the current theme when the system theme changes
  useEffect(() => {
    setMounted(true);
    setCurrentTheme(theme as Theme);
  }, [theme]);

  // Get the actual theme being used (respects system preference)
  const activeTheme = theme === "system" ? systemTheme : theme;

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(activeTheme === "dark" ? "light" : "dark");
  };

  return {
    theme: currentTheme,
    activeTheme,
    setTheme: (newTheme: Theme) => {
      setCurrentTheme(newTheme);
      setTheme(newTheme);
    },
    toggleTheme,
    isDark: activeTheme === "dark",
    mounted,
  };
}
