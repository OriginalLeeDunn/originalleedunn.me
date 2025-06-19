declare module 'next-themes/dist/types' {
  export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: string;
    storageKey?: string;
    disableTransitionOnChange?: boolean;
    enableSystem?: boolean;
    enableColorScheme?: boolean;
    themes?: string[];
    forcedTheme?: string | null;
    attribute?: string | 'class';
    value?: Record<string, string>;
    nonce?: string;
  }

  export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'theme',
    disableTransitionOnChange = false,
    enableSystem = true,
    enableColorScheme = true,
    themes = ['light', 'dark'],
    forcedTheme,
    attribute = 'class',
    value,
    nonce,
  }: ThemeProviderProps): JSX.Element;

  export function useTheme(): {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    themes: string[];
    systemTheme: 'light' | 'dark' | undefined;
  };
}
