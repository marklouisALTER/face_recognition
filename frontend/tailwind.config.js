/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5d99ff",
        secondary: "#000000",
        optional: "#eeeeee",
        onMouse: "#166534",
        shadow: "#d0d0d0",
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
        secondary: ['Karla', 'sans-serif'],
        optional : ['Inter', 'sans-serif'],
        fontBold: ['Bungee', 'cursive'],
      },
    },
  },
  plugins: [],
}

