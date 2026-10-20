/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // content: [
  //   "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./components/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./app/**/*.{js,ts,jsx,tsx,mdx}",
  // ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#1a56db",
          100: "#1749bd",
          200: "#123a98",
        },
        light: {
          DEFAULT: "#f6f9ff",
          50: "#eef3ff",
          100: "#e7ebf3",
          200: "#f0f3f9",
        },
        green: {
          DEFAULT: "#12885a",
        },
        red: {
          DEFAULT: "#e5443b",
        },
        brand: {
          DEFAULT: "#1a56db",
          600: "#1749bd",
          700: "#123a98",
          50: "#eef3ff",
          25: "#f6f9ff",
          "025": "#f6f9ff",
        },
        gold: {
          DEFAULT: "#ffcf24",
          600: "#e9b400",
          50: "#fff7d6",
          700: "#8a6a00",
        },
        purple: {
          DEFAULT: "#6C53C7",
          50: "#E6DDFD",
        },
        ink: {
          DEFAULT: "#0f1830",
          50: "#3a4660",
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
