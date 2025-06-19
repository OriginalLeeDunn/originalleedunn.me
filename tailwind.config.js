/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-rajdhani)", ...fontFamily.sans],
        heading: ["var(--font-orbitron)", ...fontFamily.sans],
        mono: ["var(--font-fira-code)", ...fontFamily.mono],
      },
      colors: {
        // Brand Colors
        brand: {
          rust: "#B7410E",
          terminal: "#39FF14",
          neon: "#00F5FF",
          light: {
            DEFAULT: "#FAFAFA",
            subtle: "#F5F5F5"
          },
          dark: {
            DEFAULT: "#0A0A0A",
            subtle: "#1A1A1A"
          }
        },
        // Semantic Colors
        primary: {
          DEFAULT: "#B7410E", // Rust Orange
          light: "#D45A12",
          dark: "#8C3300",
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#39FF14", // Terminal Green
          light: "#6EFF52",
          dark: "#00CC00",
          foreground: "#0A0A0A"
        },
        accent: {
          DEFAULT: "#00F5FF", // Neon Blue
          light: "#5AFCFF",
          dark: "#00B8C2",
          foreground: "#0A0A0A"
        },
        rust: {
          DEFAULT: "#B7410E", // Primary Rust Orange
          50: "#FEF2EC",
          100: "#FCDED0",
          200: "#F8BCA0",
          300: "#F49A70",
          400: "#F07840",
          500: "#B7410E",
          600: "#9B370C",
          700: "#7F2D0A",
          800: "#632308",
          900: "#471906",
          950: "#391405",
        },
        terminal: {
          DEFAULT: "#39FF14", // Terminal Green
          50: "#F0FFEE",
          100: "#D7FFD3",
          200: "#A6FF9D",
          300: "#75FF68",
          400: "#45FF33",
          500: "#39FF14",
          600: "#2DCC10",
          700: "#22990C",
          800: "#176608",
          900: "#0C3304",
          950: "#061902",
        },
        neon: {
          DEFAULT: "#00F5FF", // Neon Blue
          50: "#E6FDFF",
          100: "#CCFBFF",
          200: "#99F7FF",
          300: "#66F3FF",
          400: "#33EFFF",
          500: "#00F5FF",
          600: "#00C4CC",
          700: "#009399",
          800: "#006266",
          900: "#003133",
          950: "#00191A",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-left": {
          "0%": { transform: "translateX(20px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "slide-right": {
          "0%": { transform: "translateX(-20px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "slide-left": "slide-left 0.5s ease-out",
        "slide-right": "slide-right 0.5s ease-out",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        "glow-sm": "0 0 4px 0 rgba(0, 0, 0, 0.1)",
        glow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        "glow-md": "0 0 15px 0 rgba(0, 0, 0, 0.3)",
        "glow-lg": "0 0 25px 0 rgba(0, 0, 0, 0.4)",
        "glow-xl": "0 0 35px 0 rgba(0, 0, 0, 0.5)",
        "glow-2xl": "0 0 50px 0 rgba(0, 0, 0, 0.6)",
        "inner-glow": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        "glow-primary": "0 0 10px 0 hsl(var(--primary) / 0.5)",
        "glow-secondary": "0 0 10px 0 hsl(var(--secondary) / 0.5)",
        "glow-accent": "0 0 10px 0 hsl(var(--accent) / 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        noise: "url('/images/noise.png')",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.foreground"),
            a: {
              color: theme("colors.primary.DEFAULT"),
              "&:hover": {
                color: theme("colors.primary.600"),
              },
            },
            h1: {
              color: theme("colors.foreground"),
              fontWeight: "700",
              fontFamily: theme("fontFamily.heading").join(","),
            },
            h2: {
              color: theme("colors.foreground"),
              fontWeight: "700",
              fontFamily: theme("fontFamily.heading").join(","),
            },
            h3: {
              color: theme("colors.foreground"),
              fontWeight: "600",
              fontFamily: theme("fontFamily.heading").join(","),
            },
            code: {
              color: theme("colors.neon.500"),
              backgroundColor: theme("colors.neon.900"),
              padding: "0.2em 0.4em",
              borderRadius: theme("borderRadius.DEFAULT"),
              "&::before, &::after": {
                content: "none",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
};
