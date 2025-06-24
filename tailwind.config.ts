import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
        brand: {
          50: "hsl(215, 100%, 95%)",
          100: "hsl(215, 100%, 90%)",
          200: "hsl(215, 100%, 80%)",
          300: "hsl(215, 100%, 70%)",
          400: "hsl(215, 100%, 60%)",
          500: "hsl(215, 100%, 42%)",
          600: "hsl(215, 100%, 35%)",
          700: "hsl(215, 100%, 28%)",
          800: "hsl(215, 100%, 21%)",
          900: "hsl(215, 100%, 14%)",
        },
        green: {
          50: "hsl(152, 60%, 95%)",
          100: "hsl(152, 60%, 85%)",
          200: "hsl(152, 60%, 75%)",
          300: "hsl(152, 60%, 65%)",
          400: "hsl(152, 60%, 55%)",
          500: "hsl(152, 60%, 45%)",
          600: "hsl(152, 60%, 35%)",
          700: "hsl(152, 60%, 25%)",
          800: "hsl(152, 60%, 15%)",
          900: "hsl(152, 60%, 10%)",
        },
        orange: {
          50: "hsl(34, 100%, 95%)",
          100: "hsl(34, 100%, 85%)",
          200: "hsl(34, 100%, 75%)",
          300: "hsl(34, 100%, 65%)",
          400: "hsl(34, 100%, 55%)",
          500: "hsl(34, 100%, 45%)",
          600: "hsl(34, 100%, 35%)",
          700: "hsl(34, 100%, 25%)",
          800: "hsl(34, 100%, 15%)",
          900: "hsl(34, 100%, 10%)",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
