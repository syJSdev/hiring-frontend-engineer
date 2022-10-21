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
        "jungle-green-dark": "rgba(28, 31, 55, 1)",
        charcoal: "rgba(55, 65, 81, 1)",
        "ghost-white": "rgba(246, 248, 250, 1)",
        munsell: "rgba(241, 242, 250, 1)",
        "light-blue": "rgba(9, 129, 195, 1)",
      },
    },
  },
  plugins: [],
};
