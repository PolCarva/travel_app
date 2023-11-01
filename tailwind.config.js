/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#345AFA",
          hover: "#2B4BDF",
        },
        secondary: {
          DEFAULT: "#FF361D",
          hover: "#D1230C",
        },
        tertiary: {
          DEFAULT: "#F1CC0E",
          hover: "#D1B10B",
        },
        black: {
          DEFAULT: "#080E1E",
          hover: "#171C25",
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
