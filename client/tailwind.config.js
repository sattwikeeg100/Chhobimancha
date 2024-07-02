/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background1: "#000407",
        background2: "#010b14",
        shadow: "#696969",
        primary_text: "#FFFAF4",
        secondary_text: "#a3a09d",
        highlight: "#e1251a",
        highlight_hover: "#f43a3a77",
      },
    },
  },
  plugins: [],
};
