import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060D20",
          900: "#0B1736",
          800: "#132352",
          700: "#1D3373",
        },
        brand: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
          light: "#3B82F6",
          soft: "#EFF6FF",
          border: "#DBEAFE",
        },
        govgreen: {
          DEFAULT: "#16A34A",
          light: "#DCFCE7",
          dark: "#15803D",
          border: "#BBF7D0",
        },
        govorange: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
          dark: "#D97706",
          border: "#FDE68A",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#64748B",
          subtle: "#94A3B8",
        },
        mist: "#F8FAFC",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(11, 23, 54, 0.08)",
        premium: "0 4px 20px -2px rgba(11, 23, 54, 0.05), 0 2px 6px -1px rgba(11, 23, 54, 0.03)",
        card: "0 10px 30px -5px rgba(37, 99, 235, 0.06), 0 4px 10px -2px rgba(15, 23, 42, 0.03)",
        glow: "0 0 25px -5px rgba(37, 99, 235, 0.35)",
        "glow-green": "0 0 25px -5px rgba(22, 163, 74, 0.35)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
