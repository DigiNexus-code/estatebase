import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14231F",
        paper: "#F7F5EF",
        line: "#E4E0D4",
        primary: {
          DEFAULT: "#1F6E58",
          dark: "#154A3B",
          light: "#EAF3EF",
        },
        brass: {
          DEFAULT: "#C99A2E",
          dark: "#9C7620",
          light: "#FAF1DC",
        },
        clay: "#B54B32",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, #14231F0d 1px, transparent 1px), linear-gradient(to bottom, #14231F0d 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
    },
  },
  plugins: [],
};
export default config;
