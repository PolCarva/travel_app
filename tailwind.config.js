/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "6px 10px 24px rgba(0, 0, 0, 0.07)",
      },
      colors: {
        primary: {
          DEFAULT: "#345AFA",
          hover: "#2B4BDF",
        },
        secondary: {
          DEFAULT: "#FF361D",
          hover: "#FF533C",
        },
        tertiary: {
          DEFAULT: "#F1CC0E",
          hover: "#D1B10B",
        },
        black: {
          DEFAULT: "#080E1E",
          hover: "#1D2431",
        },
        white: {
          DEFAULT: "#FFFFFF",
          hover: "#F8F8F8",
        },
        gray: {
          10: "#EFEEEE",
          50: "#9E9EA4",
          100: "#64646E",
        },
      },
    },
  },
  plugins: [],
};
