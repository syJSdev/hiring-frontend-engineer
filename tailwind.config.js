/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        black: "rgb(0, 0, 0)",
        "jungle-green": {
          700: "rgb(28, 31, 55)",
        },
        red: { 700: "rgb(185, 28, 28)" },
        purple: { 700: "rgb(109, 40, 217)" },
        "light-blue": {
          600: "rgb(9, 129, 195)",
        },
        blue: {
          500: "rgb(59, 130, 246)",
        },
        orange: { 500: "rgb(249, 115, 22)" },
        teal: { 500: "rgb(20, 184, 166, 1)" },
        gray: {
          50: "rgb(249, 250, 251)",
          100: "rgb(246, 248, 250)",
          150: "rgb(241, 242, 250)",
          300: "rgb(209, 213, 219)",
          900: "rgb(55, 65, 81)",
        },
        white: "rgb(255, 255, 255)",
      },
    },
  },
  plugins: [],
};
