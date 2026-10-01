/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: "#031057",
          600: "#031057",
          700: "#031057",
          50: "#eef3ff",
          25: "#f6f9ff",
          "025": "#f6f9ff",
        },
        gold: {
          DEFAULT: "#F7842A",
          600: "#F7842A",
          50: "#fff7d6",
          700: "#8a6a00",
        },
        ink: {
          DEFAULT: "#031057",
          2: "#031057",
        },
        muted: "#63708a",
        faint: "#93a0b6",
        surface: "#f6f8fc",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },

      // ADD Poppins here
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        heading: ['"Plus Jakarta Sans"', "Inter", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      screens: {
        xs: "374px",
      },
      keyframes: {
        fade: {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "none" },
        },
      },
      animation: {
        fade: "fade .3s ease",
      },
    },
  },
  plugins: [typography],
};
