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
          DEFAULT: "#25D366",
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
        sans: ["Source Sans 3", "Arial", "sans-serif"],
        heading: ["Source Sans 3", "Arial", "sans-serif"],
      },

      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["13px", { lineHeight: "1.5" }],
        base: ["15px", { lineHeight: "1.6" }],
        lg: ["16px", { lineHeight: "1.5" }],
        xl: ["18px", { lineHeight: "1.4" }],
        "2xl": ["22px", { lineHeight: "1.3" }],
        "3xl": ["27px", { lineHeight: "1.2" }],
        "4xl": ["32px", { lineHeight: "1.15" }],
        "5xl": ["44px", { lineHeight: "1.1" }],

        body: ["15px", { lineHeight: "1.6" }],
        "page-title": [
          "30px",
          { lineHeight: "1.08", letterSpacing: "-1px", fontWeight: "800" },
        ],
        "section-title": [
          "22px",
          { lineHeight: "1.2", letterSpacing: "-0.6px", fontWeight: "800" },
        ],
        "card-title": [
          "16px",
          { lineHeight: "1.3", letterSpacing: "-0.2px", fontWeight: "800" },
        ],
        eyebrow: [
          "11.5px",
          { lineHeight: "1.4", letterSpacing: "1.6px", fontWeight: "700" },
        ],
        price: [
          "15px",
          { lineHeight: "1.3", letterSpacing: "-0.3px", fontWeight: "800" },
        ],
        button: ["14px", { lineHeight: "1.4", fontWeight: "700" }],
        "button-lg": ["15px", { lineHeight: "1.4", fontWeight: "700" }],
        menu: ["12px", { lineHeight: "1.4", fontWeight: "700" }],
        badge: ["13px", { lineHeight: "1.3", fontWeight: "800" }],
        label: ["13px", { lineHeight: "1.4", fontWeight: "600" }],
        input: ["14.5px", { lineHeight: "1.5", fontWeight: "400" }],
        note: ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        footer: [
          "12px",
          { lineHeight: "1.4", letterSpacing: "0.6px", fontWeight: "700" },
        ],
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
