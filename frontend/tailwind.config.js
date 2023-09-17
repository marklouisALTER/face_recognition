/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#44a03e",
        secondary: "#000000",
        optional: "#eeeeee",
        onMouse: "#166534",
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
        secondary: ['Karla', 'sans-serif'],
        optional : ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

