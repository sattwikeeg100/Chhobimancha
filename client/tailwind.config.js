/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background1: "#000",
        background2: "#161616",
        shadow: "#696969",
        primary_text: "#fff",
        secondary_text: "#d0cccc",
        highlight: "#E72929",
        highlight_hover: "#7D0A0A",
      },
    },
  },
  plugins: [],
};
